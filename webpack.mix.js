const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js').vue()
    .sass('resources/sass/app.scss', 'public/css')
    // solucion popperjs error net::ERR_HTTP_RESPONSE_CODE_FAILURE
    .sourceMaps()
    // -----
    .webpackConfig(require('./webpack.config'));

if (mix.inProduction()) {
    mix.version();
}