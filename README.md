# :balloon: :tada: firmata-party :tada: :balloon:

This CLI tool provides a quick way to flash Standard Firmata to your Arduino board.

## Install

1. Install NodeJS from [nodejs.org](http://nodejs.org)
2. Run `npm install -g firmata-party` in your shell of choice

## Usage

```bash
usage: firmata-party [<arduino name> | list] [--party] [--debug]

firmata-party list # list all supported boards
firmata-party uno [port] # flash Standard Firmata to an Arduino Uno
firmata-party uno [port] --debug # show debug info
firmata-party uno [port] --party # keep flashing firmata on new arduinos until you quit the program with ctrl+c!
firmata-party help # show usage info
```

Note that the port will be auto-detected except in the case of the Pro Mini (see [avrgirl-arduino](https://github.com/noopkat/avrgirl-arduino) for more info).

## Supported boards:

+ **Arduino Uno**
+ **Arduino Mega**
+ **Arduino ADK**
+ **Arduino Leonardo**
+ **Arduino Micro**
+ **Arduino Nano**
+ **Arduino Duemilanove (168)**
+ **Arduino Duemilanove (328)**
+ **Arduino Pro Mini**
+ **Arduino Lilypad USB**
+ **Arduino Yun**
+ **Arduino Esplora**
+ **Femtoduino IMUduino**
+ **RedBearLab Blend Micro**
+ **Tinycircuits Tinyduino**
+ **Sparkfun Pro Micro**
+ **Qtechknow Qduino**
+ **Pinoccio Scout**
+ **Adafruit Feather 32u4 Basic Proto**
+ **Arduboy**
+ **Adafruit Circuit Playground Classic**
+ **littleBits Arduino Bit**
+ **bqZum**
