var path = require('path');
// 載入轉存 css 檔案的套件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    context: path.resolve(__dirname, 'js'),
    entry: {
        index: './index.js'
    },
    output: {
        path: path.resolve(__dirname, 'js'),
        filename: './index.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    // 需要用到的 loader
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 指定輸出位置
            // [name] 為上方進入點設定的 "名稱"
            filename: "../css/index.bundle.css"
        })
    ]
}