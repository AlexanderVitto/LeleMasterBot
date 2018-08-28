"use strict";

const folder = __dirname;
const parentfolder = folder.replace(folder.substring(folder.lastIndexOf('\\'), folder.length), "");

const configHandler = require('nodejs-config') (
	parentfolder
);

const util = require('util');

const config_formater = configHandler.get("config_settings.config_format");


class _Config {
	
 	static from_config(file, key){
		return configHandler.get(util.format(config_formater, file, key));
 	}
	
}

module.exports = _Config;
