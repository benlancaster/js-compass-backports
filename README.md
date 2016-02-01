# js-compass-backports

js-compass-backports is a tiny subset of some of the ```image-*``` functions that [Compass](https://github.com/Compass/compass) provides, backported to JavaScript in a way that's compatible with [node-sass](https://github.com/sass/node-sass)'s libsass integration.

## Raison d'être

These backports are not intended to, nor will never, serve as a 1:1 replacement for the whole Compass library. They were created in order to provide a more iterative approach to migrating _away_ from Compass by removing some of the pain of changing a project's whole toolset.

Long term, you should be using [a post-processor to provide inline images and width/height interpolation](https://github.com/assetsjs/postcss-assets).

## Backported functions

* image-width
* image-height
* inline-image

## Usage

These functions are intended to be plugged in to libsass' experimental ```functions``` API, available since 3.0.0.

Install with npm:

```
npm install --save-dev git+https://github.com/benlancaster/js-compass-backports.git
```

Include in your Gruntfile or equivalent:

```
module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    functions: require('js-compass-backports')(['path/to/images', 'other/path/to/images'])
                },
                files: {
                    'stylesheet.css': 'stylesheet.scss'
                }
            }
        }
    });
};
```

Notice that the module takes an array of paths, relative to the project root or absolute, which is where the image functions will attempt to resolve filenames in your SASS.

## Known limitations

Inline SVGs are Base64 encoded ([which is probably a bad idea](https://css-tricks.com/probably-dont-base64-svg/))
