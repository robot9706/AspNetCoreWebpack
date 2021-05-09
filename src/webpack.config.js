const path = require("path");
const fs = require("fs");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

// Output settings
const bundleFileName = "bundle";
const dirName = "wwwroot/dist";

// Read config
const compileConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, "compile.json"), 'utf8'));

// Prepare config
const entryPoints = compileConfig.Entry.map(filter => glob.sync(filter)).reduce((flat, toFlatten) => flat.concat(toFlatten));
Object.keys(compileConfig.Lib).forEach(libName => {
    compileConfig.Lib[libName] = path.resolve(__dirname, compileConfig.Lib[libName]);
});

module.exports = (env, argv) => {
    return {
        mode: argv.mode === "production" ? "production" : "development",
        devtool: "source-map",
        entry: entryPoints,
        output: {
            filename: bundleFileName + ".js",
            path: path.resolve(__dirname, dirName)
        },
        resolve: {
            extensions: [".ts", ".js"],
            alias: compileConfig.Lib || {}
        },
        externals: compileConfig.External || {},
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [],
                },
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: [
                        "ts-loader"
                    ],
                },
                {
                    test: /\.s[c|a]ss$/,
                    use: [
                        "style-loader",
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                esModule: false,
                            },
                        },
                        "css-loader",
                        "sass-loader"
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: bundleFileName + ".css"
            }),
            new ForkTsCheckerWebpackPlugin(), // run TSC on a separate thread
        ]
    };
};