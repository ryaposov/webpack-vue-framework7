'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
	PLATFORM: 'npm_config_platform' in process.env && process.env.npm_config_platform
		? `'${process.env.npm_config_platform}'` : '"browser"'
})
