var webpack = require('webpack');  
module.exports = {  
    entry: [
      'webpack/hot/only-dev-server',
      "./app/js/app.js"
    ],
    output: {
        path: __dirname + '/build',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.jsx?$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query:
              {
                presets:['es2015', 'react']
              }
            },
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin()
    ]

};
