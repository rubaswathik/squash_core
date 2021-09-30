const editJsonFile = require("edit-json-file");
var fs = require('fs');
var config = editJsonFile(__root+__core+'config.json');
var conf,secret,conf_path=config.get("config_path");

secret = config.get("secret");

module.exports = {
  'secret': secret
};