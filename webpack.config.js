const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        common0: ['./src/js/jquery.js'],
        common1: './src/js/bootstrap.bundle.min.js',
        common2: ['./src/js//bootstrap-table.min.js', './src/js/bootstrap-table-zh-CN.min.js', './src/js/bootstrap-table-jumpto.js'],
        common3: './src/js/bootstrap-select.min.js',
        itemType: './src/js/itemType.js',
        index: './src/js/index.js',
        item: './src/js/item.js',
        marketable: './src/js/marketable.js',
        visitor: './src/js/visitor.js'
    },
    output: {
        path: resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    mode: 'production',
    module: {
        rules: []
    },
    resolve: {
        preferRelative: true,
    },
    plugins: [//这里需要打包两个html，所以有两个HtmlWebpackPlugin对象各自进行配置
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['common0', 'common1', 'common2', 'common3', 'index']//配置html需要引入的chunk
        }),
        new HtmlWebpackPlugin({
            template: './src/item.html',
            filename: 'item.html',
            chunks: ['common0', 'common1', 'common2', 'common3', 'itemType', 'item']//配置html需要引入的chunk
        }),
        new HtmlWebpackPlugin({
            template: './src/marketable.html',
            filename: 'marketable.html',
            chunks: ['common0', 'common1', 'common2', 'common3', 'itemType', 'marketable']//配置html需要引入的chunk
        }),
        new HtmlWebpackPlugin({
            template: './src/visitor.html',
            filename: 'visitor.html',
            chunks: ['common0', 'common1', 'common2', 'common3', 'visitor']//配置html需要引入的chunk
        })
    ]
}
