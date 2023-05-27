const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
    entry: {
        common0: './src/js/jquery.js',
        common1: './src/js/bootstrap.bundle.min.js',
        common2: './src/js/bootstrap-table.min.js',
        common3: './src/js/bootstrap-table-zh-CN.min.js',
        common4: './src/js/bootstrap-table-jumpto.js',
        common5: './src/js/bootstrap-select.min.js',
        common6: './src/js/item-type.js',
        index: './src/js/index.js',
        item: './src/js/item.js',
        marketable: './src/js/marketable.js',
        visitor: './src/js/visitor.js'
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true
    },
    mode: 'production',
    module: {
        rules: []
    },
    resolve: {
        preferRelative: true,
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    ecma: undefined,
                    parse: {},
                    compress: false,
                    mangle: false, // Note `mangle.properties` is `false` by default.
                    module: false,
                    // Deprecated
                    output: null,
                    format: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_classnames: true,
                    keep_fnames: true,
                    safari10: false,
                },
            }),
        ],
    },
    plugins: [//这里需要打包两个html，所以有两个HtmlWebpackPlugin对象各自进行配置
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['common0', 'common1', 'common2', 'common3', 'common4', 'common5', 'index']//配置html需要引入的chunk
        }),
        new HtmlWebpackPlugin({
            template: './src/item.html',
            filename: 'item.html',
            chunks: ['common0', 'common1', 'common2', 'common3', 'common4', 'common5', 'common6', 'item']//配置html需要引入的chunk
        }),
        new HtmlWebpackPlugin({
            template: './src/marketable.html',
            filename: 'marketable.html',
            chunks: ['common0', 'common1', 'common2', 'common3', 'common4', 'common5', 'common6', 'marketable']//配置html需要引入的chunk
        }),
        new HtmlWebpackPlugin({
            template: './src/visitor.html',
            filename: 'visitor.html',
            chunks: ['common0', 'common1', 'common2', 'common3', 'common4', 'common5', 'visitor']//配置html需要引入的chunk
        })
    ]
}
