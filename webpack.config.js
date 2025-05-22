import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/root-config.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bootstrap.js',
      publicPath: '/',
      clean: isProduction ? true : false,
      module: true,
      library: {
        type: 'module',
      },
    },
    experiments: {
      outputModule: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.html$/i,
          type: 'asset/source',
          exclude: [path.resolve(__dirname, 'public')], // Exclude the public directory
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        inject: 'body',
        scriptLoading: 'module',
      }),
    ],
    devServer: {
      port: 3000,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
  };
};

export default config;
