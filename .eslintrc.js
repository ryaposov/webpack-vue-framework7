module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
		commonjs: true,
	  es6: true,
	  jquery: true,
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
		"indent": [2, "tab", {"SwitchCase": 1}],
		"no-tabs": 0,
    "camelcase": 0,
		"no-return-assign": 0,
		"one-var": 0,
		"eqeqeq": 0,
		"no-new": 0,
		"import/first": 0
	}
}
