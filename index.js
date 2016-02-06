var fs        = require('fs'),
    imageSize = require('image-size'),
    sass      = require('node-sass'),
    dataUri   = require('data-uri');

module.exports = function (includePaths) {

    function imageWidth(imageFilename) {
        var filename = imageFilename.getValue();
        var w = getImageSize(filename).width;
        return makeSassNumber(w);
    }

    function makeSassNumber(h, unit) {
        return sass.types.Number(h, unit || 'px');
    }

    function imageHeight(imageFilename) {
        var filename = imageFilename.getValue();
        var h = getImageSize(filename).height;
        return makeSassNumber(h);
    }

    function getImageSize(imagePath) {
        var pathToImage = findFile(imagePath);

        return imageSize(pathToImage);
    }

    function inlineImage(imageFilename) {
        var filename, pathToImage, uri;

        filename = imageFilename.getValue();
        pathToImage = findFile(filename);

        uri = new dataUri(pathToImage);
        var cssDataUrl = 'url(' + uri.content + ')';
        return sass.types.String(cssDataUrl);
    }

    function findFile(imageFilename) {
        var failure = false;
        for(var x = 0; x < includePaths.length; x++) {
            var path = includePaths[x] + '/' + imageFilename;

            try {
                var stats = fs.statSync(path);

                if (stats.isFile()) {
                    return path;
                }
            } catch(e) { failure = e }
        }

        throw failure || new Error('No file found');
    }

    return {
        'image-width($filename)': imageWidth,
        'image-height($filename)': imageHeight,
        'inline-image($filename)': inlineImage
    };

};
