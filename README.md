# iConicss

<img src="https://raw.githubusercontent.com/github/explore/6c6508f34230f0ac0d49e847a326429eefbfc030/topics/css/css.png" width="60" align="left" />


### a pure CSS3 icons set.
[Look at the demo page!](http://viglino.github.io/iconicss/)

## Why?

* Because CSS3 is now widely suported by all main browsers
* Because it my result in cool transition and morphing effects when changing icons
* Besause it's fun! Like building a Lego:registered: model with a limited set of bricks.

## Known limitation
* Some side effects may results in some browsers
* IE doesn't compute properly the `currentColor` keyword in the CSS `linear-gradient()` 
([it's a known bug since 2014!](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/1328019/)).
This will impact icons that use gradient background-image (just a few ones).

## How to use it?

All you need is to include the [css file](https://github.com/Viglino/iconicss/tree/master/dist) in your html page:
````
<link rel="stylesheet" href="iconicss.min.css">
````

then just add `icss-` classes to an `<i>` elements:
````
<i class="icss-home"></i>
````
You can change color of icons as simple as set color in the CSS.
````
<i class="icss-home" stle="color:red;"></i>
````
  
To animate the icon when changing just add the `icss-anim` class to the element.
````
<i class="icss-anim icss-home"></i>
````
Then just change the `icss-home` class to `icss-github`.


## Licence
Copyright (c) 2017 Jean-Marc Viglino. Licensed under [MIT Licence](https://github.com/michaelmawhinney/elementary/blob/master/LICENSE).
