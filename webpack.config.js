const path = require('path');
// solución error consola vuejs link vue-next
var webpack = require('webpack')

module.exports = {
    resolve: {
        alias: {
            '@': path.resolve('resources/js'),
        },
    },
    // solución error consola vuejs link vue-next
    plugins: [
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        })
    ]
};
