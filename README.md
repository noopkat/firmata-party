# firmata-party

This CLI tool provides a quick way to flash Standard Firmata to your Arduino board.

Supported boards:

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

## How to install

1. Install NodeJS from [nodejs.org](http://nodejs.org)
2. Run `npm install -g firmata-party` in your shell of choice


## How to use

Run the following on your shell to flash Standard Firmata to an Arduino Uno:

`firmata-party uno` or `firmata-party uno --debug` to see debug info while it runs.

Substitute `uno` if you have a different board to an Arduino Uno. Running `firmata-party list` will list the keyword to use for all supported boards.
