#!/usr/bin/env node
var Avrgirl = require('avrgirl-arduino');
var parseArgs = require('minimist');
var path = require('path');
var supportedBoards = require('../node_modules/avrgirl-arduino/boards.js');
var _ = require('underscore');

var args = (process.argv.slice(2));
var argv = parseArgs(args, opts={})
var arduino = argv._[0];
var help = 'usage: firmata-party <arduino name>';

function showHelp() {
  console.log(help);
}

handleInput(arduino);

function handleInput(board) {
  if (board && board !== 'list' && _.has(supportedBoards, board)) {
    flash({board: board, debug: true});
  } else if (board && board === 'list') {
    supported = _.keys(supportedBoards).join(', ');
    console.log('supported board flags: \n' + supported);
  } else {
    showHelp();
    return process.exit(1);
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
