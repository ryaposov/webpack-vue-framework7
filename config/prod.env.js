'use strict'
module.exports = {
  NODE_ENV: '"production"',
	PLATFORM: 'npm_config_platform' in process.env && process.env.npm_config_platform
		? `'${process.env.npm_config_platform}'` : '"browser"'
}
