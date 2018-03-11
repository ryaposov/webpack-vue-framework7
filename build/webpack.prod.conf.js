'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPluginConfig = require('./HtmlWebpackPlugin.js')
var PrerenderSpaPlugin = require('prerender-spa-plugin')

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  watch: process.env.WEBPACK_WATCH === 'true',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath(process.env.npm_config_platform === 'ios'
				? '[name].[contenthash].css' : 'css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin(HtmlWebpackPluginConfig),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (process.env.npm_config_platform === 'browser') {
	const OfflinePlugin = require('offline-plugin')
	const WebpackPwaManifest = require('webpack-pwa-manifest')
	webpackConfig.plugins.push(
		new OfflinePlugin({
			appShell: 'index.html',
			caches: {
				main: [
					'index.html',
					'static/css/*.css',
					'static/js/*.js'
				],
				additional: [
					'static/fonts/*.woff'
				],
				externals: ['/']
			},
			safeToUseOptionalCaches: true,
			autoUpdate: 1000 * 60 * 2,
			ServiceWorker: {
				events: true,
				navigateFallbackURL: '/',
			},
		}),
		new WebpackPwaManifest({
			filename: "manifest.json",
			name: "App",
			orientation: "portrait",
			display: "standalone",
			inject: true,
			fingerprints: true,
			ios: true,
			name: 'My Awesome App',
			short_name: 'My App',
			description: 'My app is a good boy!',
			background_color: '#ffffff',
			'theme-color': '#ffffff',
			theme_color: '#00aaff',
			start_url: '/',
			related_applications: [{
				platform: 'play',
				url: ''
			},{
				platform: 'itunes',
				url: ''
			}],
			icons: [
				// {
				// 	src: path.resolve('src/assets/img/ios/icon-1024.png'),
				// 	sizes: [120, 152, 167, 180, 1024],
				// 	destination: path.join('icons', 'ios'),
				// 	ios: true
				// },
				// {
				// 	src: path.resolve('src/assets/img/ios/icon-1024.png'),
				// 	size: 1024,
				// 	destination: path.join('icons', 'ios'),
				// 	ios: 'startup'
				// },
				// {
				// 	src: path.resolve('src/assets/img/android/icon-512.png'),
				// 	destination: path.join('icons', 'android'),
				// 	sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
				// },
				// {
				// 	src: path.resolve('src/assets/img/android/icon-1024.png'),
				// 	destination: path.join('icons', 'android'),
				// 	size: '1024x1024' // you can also use the specifications pattern
				// }
			]
		})
	)
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
