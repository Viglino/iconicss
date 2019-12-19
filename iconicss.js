var icss = {};

(function() {

/** private classes */
var cName = [
  'icss-stack',
  'icss-anim',
  'icss-spin',
  'icss-pulse',
  'icss-ring',
  'icss-vibes',
  'icss-tada',
  'icss-reverse'
];

/** Effect classes */
var cEffect = [
  'icss-spin',
  'icss-pulse',
  'icss-ring',
  'icss-vibes',
  'icss-tada'
];

/** Get a array of DOM element
 * @param {Element | Array<Element> | string} elt DOM elements or a string selector
 * @return Array<Element>
 * @private
 */
function getElement (elt) {
  if (typeof(elt) === 'string') {
    elt = document.querySelectorAll(elt);
  }
  if (!elt.length) {
    elt = [elt];
  }
  return elt;
};

/** Get private classes
 */
function getPrivate(className, effect) {
  var sClass = [];
  (effect ? cEffect : cName).forEach(function(c) {
    if (new RegExp('\\b'+c+'\\b').test(className)) {
      sClass.push(c);
    }
    if (new RegExp('\b'+c+'-hover\b').test(className)) {
      sClass.push(c+'-hover');
    }
  });
  return sClass;
};


/** Set an effect 
 * @param {Element | Array<Element> | string} elt DOM elements or a string selector
 * @param {string} effect name of the effect
 */
icss.setEffect = function (elt, effect) {
  effect = 'icss-' + effect;
  elt = getElement(elt);
  for (var i=0, e; e=elt[i]; i++) {
    if (getPrivate(effect, true).length) {
      // remove current effect
      var sClass = getPrivate(e.className, true);
      sClass.forEach(function(c) {
        e.className = e.className.replace(c, '').replace('  ','').trim();
      });
      // Add new one
      e.className += (e.className ? ' ':'') + effect;
    }
  }
};

/** Set an effect 
 * @param {Element | Array<Element> | string} elt DOM elements or a string selector
 */
icss.removeEffect = function (elt) {
  elt = getElement(elt);
  for (var i=0, e; e=elt[i]; i++) {
    // remove current effect
    var sClass = getPrivate(e.className, true);
    sClass.forEach(function(c) {
      e.className = e.className.replace(c, '').replace('  ','').trim();
    });
  }
};

/** Set an effect 
 * @param {Element | Array<Element> | string} elt DOM elements or a string selector
 */
icss.toggleEffect = function (elt, effect) {
  var rex = new RegExp('icss-' + effect);
  elt = getElement(elt);
  for (var i=0, e; e=elt[i]; i++) {
    if (rex.test(e.className)) {
      icss.removeEffect(e);
    } else {
      icss.setEffect(e, effect)
    }
  }
};

/** Remove all current icss classes and add the new one
 * @param {Element | Array<Element> | string} elt DOM elements or a string selector
 * @param {string} icssName iConicss name
 */
icss.setClass = function (elt, icssName) {
  elt = getElement(elt);
  for (var i=0, e; e=elt[i]; i++) {
    if (e instanceof Element) {
      // save private classes
      var sClass = getPrivate(e.className);
      // remove old icss
      e.className = e.className.replace(/\bicss-[^\ ]*/g,'').trim();
      // add new one
      e.className += (e.className ? ' ':'') + 'icss-' + icssName;
      // restore save classes
      sClass.forEach(function(c) {
        e.className += ' '+c;
      });
    }
  }
};

/** Start animation 
 * @param {Element | Array<Element> | string} elt DOM elements or a string selector
 * @param {*} options
 *  @param {string | Array<string>} options.icssName iConicss name or an array of iConicss name to animate to
 *  @param {number} options.delay delay in ms, default 5000 (5s)
 *  @param {boolean} options.start start animating, default true
 *  @param {boolean} options.random random choice, default incremental
 *  @param {function} options.onchange callback function on change, default none
 * @return {*} animation controler with start, pause, stop functions
 */
icss.animate = function (elt, options) {
  if (!options) options = {};
  elt = getElement(elt);
  elt.forEach(function(e) {
    if (!/\bicss-animate\b/.test(e.className)) {
      e.className += (e.className ? ' ':'') + 'icss-anim';
    }  
  })
  if (!(options.icssName instanceof Array)) options.icssName = [options.icssName];
  var timeOut = null;
  var control = {
    pos: -1
  };
  // Pause animation
  control.pause = function() {
    clearTimeout(timeOut);
    control.timeOut = null;
  };
  // Stop animation
  control.stop = function() {
    control.pos = -1;
    control.pause();
  };
  // Next animation
  control.next = function() {
    if (control.timeOut) clearTimeout(timeOut);
    timeOut = setTimeout(function() {
      if (options.random) {
        control.pos = Math.ceil((Math.random()*options.icssName.length)) % options.icssName.length;
      } else {
        control.pos = (control.pos+1) % options.icssName.length;
      }
      icss.setClass(elt, options.icssName[control.pos]);
      control.next();
      if (typeof(options.onchange) === 'function') options.onchange(options.icssName[control.pos]);
    }, options.delay || 5000);
  }
  // Start animating
  control.start = function() {
    if (control.timeOut) clearTimeout(timeOut);
    timeOut = setTimeout(function() {
      control.pos = (control.pos+1) % options.icssName.length;
      if (options.icssName[control.pos]) {
        icss.setClass(elt, options.icssName[control.pos]);
        if (options.icssName.length > 1) control.next();
        if (typeof(options.onchange) === 'function') options.onchange(options.icssName[control.pos]);
      }
    }, 100);
  };
  // Start animation
  if (options.start !== false) control.start();
  return control;
};

})();
