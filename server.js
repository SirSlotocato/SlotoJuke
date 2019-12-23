#!/usr/bin/env node

// Enable ES6 modules and run the startup script
require = require('esm')(module);
module.exports = require("./main");