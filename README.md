# :balloon: :tada: firmata-party :tada: :balloon:

This CLI tool provides a quick way to flash Standard Firmata to your Arduino board.

## Install

1. Install NodeJS from [nodejs.org](http://nodejs.org)
2. Run `npm install -g firmata-party` in your shell of choice

## Usage

```bash
usage: firmata-party [<arduino name> | list] [--party] [--debug]

firmata-party list # list all supported boards
firmata-party uno # flash Standard Firmata to an Arduino Uno
firmata-party uno --debug # show debug info
firmata-party uno --party # keep flashing firmata on new arduinos until you quit the program with ctrl+c!
firmata-party help # show usage info
```

## Supported boards:

+ **Arduino Uno**
+ **Arduino Mega**
+ **Arduino Leonardo**
+ **Arduino Micro**
+ **Arduino Nano**
+ **Arduino Duemilanove (168)**
+ **Arduino Pro Mini**
+ **Femtoduino IMUduino**
+ **Blend-Micro**
+ **Tinyduino**
+ **Sparkfun Pro Micro**
+ **Qtechknow Qduino**
