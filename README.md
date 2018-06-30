# Star Wars RPG


**DESCRIPTION:** RPG style game that puts Star Wars characters head-to-head in a button mashing showdown.

![App Tutorial](Star-Wars-RPG.gif)

**GAME PLAY**

* Player goes up against a bank of Star Wars characters with the goal of defeating everyone.  Each character has unique values for hit points, attack power and counter-attack power.
* After defeating each computer player, the user's character *levels up* and as a result, has their total *attack power* multiply by the new level.
* Upon defeating every computer player, the user's win tally increases by one and is prompted to play again.

**PROGRAMMING / FUNCTIONALITY**

* App is built using the following languages/libraries: 
  - *HTML* 
  - *CSS* 
  - *JavaScript*
  - *jQuery*
* As players' health decreases, background color of the health bars proportionately lose green/blue hex values and increase red hex value.
* With the exception of the character, Jar Jar, every character stands a swinging chance of beating all competitors.
* A custom slideshow rotates photos between game action.
  - Slideshow functions with 2 absolutely positioned divs that load a new image while hidden and take turns fading in.


**FILE STRUCTURE**

```
.
├── README.md
├── assets
│   ├── css
│   │   ├── reset.css
│   │   └── style.css
│   ├── images
│   │   ├── _0000_background.jpg
│   │   ├── _0001_background.jpg
│   │   ├── _0002_background.jpg
│   │   ├── _0003_background.jpg
│   │   ├── _0004_background.jpg
│   │   ├── _0005_background.jpg
│   │   ├── _0006_background.jpg
│   │   ├── background-0.jpg
│   │   ├── background-1.jpg
│   │   ├── background-2.jpg
│   │   ├── background-3.jpg
│   │   ├── background-4.jpg
│   │   ├── background.psd
│   │   ├── backgrounds.psd
│   │   ├── character-0.jpg
│   │   ├── character-1.jpg
│   │   ├── character-2.jpg
│   │   ├── character-3.jpg
│   │   ├── character-4.jpg
│   │   ├── favicon.ai
│   │   └── favicon.png
│   └── js
│       └── functions.js
└── index.html

```