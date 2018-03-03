var path = require('path')
var webpack = require('webpack')
//var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
    //the base directory (absolute path) for resolving the entry option
    context: __dirname,
    mode: 'development',
    //the entry point we created earlier. Note that './' means
    //your current directory. You don't have to specify the extension  now,
    //because you will specify extensions later in the `resolve` section
    entry: './web_client/main.jsx',

    output: {
        //where you want your compiled bundle to be stored
        path: path.resolve('./static'),
        //naming convention webpack should use for your files
        filename: 'bundle.js',
    },

    /*plugins: [
        //tells webpack where to store data about your bundles.
        new BundleTracker({filename: './webpack-stats.json'}),
        //makes jQuery available in every module
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],*/

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                //exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },

    resolve: {
        //extensions that should be used to resolve modules
        extensions: ['.js', '.jsx', '.css']
    }
}