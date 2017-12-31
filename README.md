# iConicss

<img src="https://raw.githubusercontent.com/github/explore/6c6508f34230f0ac0d49e847a326429eefbfc030/topics/css/css.png" width="75" align="left" />


### a pure CSS3 icons set.
[Look at the demo page!](http://viglino.github.io/iconicss/)

## Why?

* Because CSS3 is now widely suported by all main browsers
* Because it may result in cool transition and morphing effects when changing icons
* Besause it's fun! Like building a Lego:registered: model with a limited set of bricks.

## Known limitation
* Some side effects may result in some browsers
* IE doesn't compute properly the `currentColor` keyword in the CSS `linear-gradient()` 
([it's a known bug since 2014!](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/1328019/)).
This will impact icons that use gradient background-image (just a few ones).

## How to use it?

All you need is download and include [iconicss.min.css](https://rawgit.com/Viglino/iconicss/master/dist/iconicss.min.css) in your html page:
````
<link rel="stylesheet" href="iconicss.min.css">
````

then just add `icss-` classes to an `<i>` elements to add a new icon on your page:
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
Then just change the `icss-home` class to `icss-github` to let the transition play.

## Developpement

### Debug mode

If you want to fork, modify or create new icons, you can use the [debug mode](https://viglino.github.io/iconicss/?debug&icon=bug).   
Just click on the button on top of the `index.html` page to access a page with one css per icon. Thus the icon's css can be easealy modified and download saved directly in your browser.

If you create a new icon, be sure to add a css with its name in the `./css` directory and add an entry in the [config.json](https://github.com/Viglino/iconicss/blob/master/config.json) file of the project.

Individual css don't include prefixed methods: they are added using `gulp-autoprefixer` when building the project.     
To achieve the task it uses the gulp command. 

### building with gulp

To install Gulp, you must first download and install [node.js](https://nodejs.org/en/).
Then, from the command line:
1. Install gulp globally with `npm install -g gulp`.
2. Navigate to the root `/iconicss` directory, then run `npm install`. npm will look at the package.json file and automatically install the necessary local dependencies listed there.

When completed, you'll be able to run the `gulp` commands provided from the command line to create the distribution files in the `./dist` directory of the project.

## Bugs

Please use the [GitHub issue tracker](https://github.com/Viglino/iconicss/issues) for all bugs and feature requests. Before creating a new issue, do a quick search to see if the problem has been reported already.

## Licence
Copyright (c) 2017 Jean-Marc Viglino. Licensed under [MIT Licence](https://github.com/michaelmawhinney/elementary/blob/master/LICENSE).
