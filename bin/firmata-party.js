#!/usr/bin/env node
var Avrgirl = require('avrgirl-arduino');
var path = require('path');
var keypress = require('keypress');
var argv = require('minimist')(process.argv.slice(2), opts = {
  boolean: ['party', 'debug', 'help']
});
var fs = require('fs');

var debugMode = argv.debug;
var partyMode = argv.party;
var helpMsg = `usage: firmata-party [<arduino name> | <command>] [--party] [--debug]

firmata-party list # list all supported boards
firmata-party uno # flash Standard Firmata to an Arduino Uno
firmata-party uno --debug # show debug info
firmata-party uno --party # keep flashing firmata on new arduinos until you quit the program with ctrl+c!
firmata-party help # show usage info
`;

var supportedBoards = Avrgirl.listKnownBoards();
var supportedBoardsString = supportedBoards.join(', ');

function showHelp() {
  console.log(helpMsg);
}

function showSupported() {
  console.log('supported board flags: \n' + supportedBoardsString);
}

handleArgs(argv);

function handleArgs(argv) {
  var board = argv._[0];
  var args = argv._;
  if (!argv || args.length == 0 || args.indexOf('help') > -1 || args.indexOf('man') > -1) {
    var status = board ? 0 : 1;
    showHelp();
    return process.exit(status);
  } else if (args.indexOf('list') > -1) {
    showSupported();
    return process.exit(0);
  } else {

    var options = {board: board, debug: debugMode};

    if (supportedBoards.indexOf(options.board) < 0) {
      var error = new Error("oops! Sorry, the board '" + options.board + "'' is not currently supported");
      return console.error(error);
    }

    if (args.length > 1) {
      options["port"] = args[1]
    }

    if (partyMode) {
      party(options);
    } else {
      flashAndQuit(options);
    }
  }
}

function flash(options, callback) {
  var avrgirl = new Avrgirl(options);

  var avrgirlDir = path.dirname(require.resolve('avrgirl-arduino'));
  var firmataDir = path.resolve(avrgirlDir, 'junk', 'hex', options.board);
  var firmataPath;

  fs.readdir(firmataDir, function(err, files) {
    if (err) { return console.error(err); }

    for (var i = 0, len = files.length; i < len; i++) {
      var filename = files[i];
      if (filename.indexOf('StandardFirmata') > -1) {
        firmataPath = path.join(firmataDir, filename);
        break;
      }
    };

    if (typeof firmataPath === 'undefined') {
      var error = new Error("oops! Couldn't find Standard Firmata file for " + options.board + " board.");
      return console.error(error);
    }

    avrgirl.flash(firmataPath, callback);
  });
}

function flashAndQuit(options) {
  flash(options, function(error) {
    if (error) {
      console.error(error);
      return process.exit(1);
    } else {
      return process.exit();
    }
  });
}

function party(options) {
  var boardsFlashed = 0;
  keypress(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.resume();
  var flashing = false;

  console.log("Press any key to start the party! or q to go home!");

  process.stdin.on('keypress', function (ch, key) {
    if (!key ) { return; }
    if ((key.ctrl && key.name == 'c') || key.name == 'q') {
      return process.exit();
    }

    if (flashing) { return; }

    flashing = true;
    console.log('Starting the Party!');
    flash(options, function(error) {
      if (error) {
        console.error("Oh no! Party foul!", error);
      } else{
        console.error("Success! Party legend! Press any key to keep partying!");
      }
      flashing = false;
    });
  });
}
