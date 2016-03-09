const path = require('path')
const webpack = require('webpack')

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'odot/server/blueprints/public/static')
}

module.exports = {
    // Step 1: Source Maps
    devtool: 'cheap-module-source-map',

    entry: PATHS.app,
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: PATHS.app,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ["es2015", "react", "stage-0"]
            }
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
}
