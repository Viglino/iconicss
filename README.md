# iConicss

<img src="https://raw.githubusercontent.com/github/explore/6c6508f34230f0ac0d49e847a326429eefbfc030/topics/css/css.png" width="75" align="left" />

### More than 600 pure CSS3 icons!
[Look at the demo page!](http://viglino.github.io/iconicss/)

Each icon uses a single anchor element (one div) and just one color: the `currentColor` (and transparent) except for the colored icons (as the name suggests). Thus they can easily be included in a page with a single HTML element and use the current color and current font size.

## Why use iConicss?

* Because CSS3 is now widely suported by all main browsers.
* Because it may result in cool transition and morphing effects when changing icons.
* Because it's fun! Like building a Lego:registered: model with a limited set of bricks.

## Known limitation
* Some side effects may result in some browsers
* IE doesn't compute properly the `currentColor` keyword in the CSS `linear-gradient()` 
([it's a known bug since 2014!](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/1328019/)).
This will impact icons that use gradient background-image (just a few ones).

## How to use it?

Install iConicss using `npm install iconicss` or download [iconicss.min.css](https://rawgit.com/Viglino/iconicss/master/dist/iconicss.min.css) then add it in your html page:
````html
<link rel="stylesheet" href="iconicss.min.css">
````
Using npm you can `import 'iconicss/dist/iconicss.min.css'` or individual files such as `import 'iconicss/css/github.css'` but you'll have to `import 'iconics iconicss/icss.css` before.

Then just add `icss-` classes to an `<i>` elements to add a new icon on your page:
````html
<i class="icss-home"></i>
````

You can change color of icons as simple as set `color` in CSS.
````html
<i class="icss-home" style="color:red;"></i>
````
You can change the size of the icon just by changing the `font-size` in CSS
  
To animate the icon when changing just add the `icss-anim` class to the element.
````html
<i class="icss-anim icss-home"></i>
````
Then just change the `icss-home` class to `icss-github` to let the transition play.

## Developpement

### some rules

1. Each icon must be a single element
2. Don't use extra color (just the currentColor and transparen), except for colored icons...
3. Use relative font size units (em) to let the icon resize 
4. Color icons must have a standard icon and color must be justify (brand color)
5. Avoid transform on the base element (except rotation when it applies to the whole icon)
6. Use gradients sparingly (because IE doesn't love it)

### debug mode

If you want to fork, modify or create new icons, you can use the [debug mode](https://viglino.github.io/iconicss/?debug&icon=bug).   
Just click on the button on top of the `index.html` page to access a page with one css per icon. Thus the icon's css can be easealy accessed, modified and saved directly in your browser.

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
