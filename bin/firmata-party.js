#!/usr/bin/env node
var Avrgirl = require('avrgirl-arduino');
var parseArgs = require('minimist');
var path = require('path');
var supportedBoards = require('../node_modules/avrgirl-arduino/boards.js').byName;
var _ = require('underscore');

var args = (process.argv.slice(2));
var argv = parseArgs(args, opts={})
var arduino = argv._[0];
var debug = argv.debug;
var help = 'usage: firmata-party <arduino name>';
var supported = _.keys(supportedBoards).join(', ');

function showHelp() {
  console.log(help);
}

function showSupported() {
  console.log('supported board flags: \n' + supported);
}

handleInput(arduino);

function handleInput(board) {
  if (!board || board === 'help' || board === 'man') {
    var status = board ? 0 : 1;
    showHelp();
    return process.exit(status);
  } else if (!_.has(supportedBoards, board)) {
    var status = (board === 'list') ? 0 : 1;
    showSupported();
    return process.exit(status);
  } else {
    flash({board: board, debug: debug});
  }
}

function flash(options) {
  var avrgirl = new Avrgirl(options);
  var filepath = path.resolve(__dirname, '..', 'node_modules', 'avrgirl-arduino', 'junk', 'hex', options.board, 'StandardFirmata.cpp.hex');
  //console.log(filepath)

  avrgirl.flash(filepath, function(error) {
    if (error) {
      console.error(error);
      return process.exit(1);
    } else {
      return process.exit();
    }
  });

}
