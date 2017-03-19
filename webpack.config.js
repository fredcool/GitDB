const webpack = require('webpack'); 

module.exports = {
    // decided to do a single page app so we have only 1 entry
    entry: [
      './src/GitDB/wwwroot/js/app.js'
    ],
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.js?$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query:
              {
                presets:['es2015', 'react'],
                plugins: ["transform-object-rest-spread"]
              }
            },
            { test: /\.css$/,
              use: [ 'style-loader', 'css-loader' ]
            },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,   loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file-loader" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
            { test: /\.json$/, loader: 'json-loader' }
        ]
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin()
    ],
    node: {
      console: true,
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }

};
