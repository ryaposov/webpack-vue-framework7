module.exports = {
	filename: 'index.html',
	// template: 'src/index.html',
	template: require('html-webpack-template'),
	inject: false,
	// excludeAssets: [/(android)(.+).css$/, /(ios)(.+).css$/],
	appMountId: 'app',
	meta: [
		{
			'http-equiv': 'Content-Security-Policy',
			content: "default-src * data: gap: https://ssl.gstatic.com; style-src * 'unsafe-inline'; script-src * 'unsafe-inline' 'unsafe-eval'"
		},
		{
			name: 'viewport',
			content: `width=device-width,${process.env.npm_config_platform === 'ios' ? ' viewport-fit=cover,' : ''} initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui`
		}
	],
	title: 'My Awesome App',
	lang: 'en-EN',
	chunksSortMode: 'dependency',
	minify: {
		removeComments: true,
		removeScriptTypeAttributes: true,
		removeAttributeQuotes: true,
		useShortDoctype: true,
		decodeEntities: true,
		collapseWhitespace: true,
		minifyCSS: true
	}
}
