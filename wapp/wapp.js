/** The web application 
 * @namespace
 */
var wapp = {
  /** the list of icons */
  icons: {},
  /** debug mode (in location search) */
  debug: (/debug/.test(window.location.search)),

  /** Initialize function */
  initialize: function(){},

  /** Show a page */
  showPage: function(id) {
    if (!$("#"+(id||"none")).length) id="home";
    $("[data-page]").hide();
    $("#"+id).show();
    $(".menu a").removeClass("select");
    $(".menu a."+id).addClass("select");
    $(window).scrollTop(0);
    wapp.currentPage=id;
    wapp.getUrl();
  },

  /** Retrieve current url */
  getUrl: function() {
    var url = document.location.href.split('?')[0] 
      + '?' + (wapp.debug ? 'debug&' : '') 
      + (wapp.currentIcon ? "icon=" + wapp.currentIcon : '')
      + '&page=' + $('[data-page]:visible').attr('id');
    window.history.replaceState (null, null, url);
    return url;
  },

  /** Enlarge font
   * @param {boolean}
   */
  enlarge: function(b) {
    var fs = parseInt($('i .icons').css('font-size'));
    if (b) {
      if (fs>40) return;
      $('i .icons').css('font-size', (fs+5)+'px');
    } else {
      if (fs<12) return;
      $('i .icons').css('font-size', (fs-5)+'px');
    }
  },

  /** Set debug mode 
   * @param {boolean} b true/false
   */
  setDebug: function(b) {
    this.debug = (b!==false);
    var icon = $(".icon i").first().attr("class").replace(/icss-anim|icss-|\ /g,"");
    var s = "?" + (this.debug?"debug&":"") + "icon=" + icon;
    document.location = document.location.href.split("?")[0] + s;
  },

  // Search function
  search: function (val) {
    var n = 0;
    var rex = new RegExp(val,"i");
    $("#icons .icons i").each(function(){
        var tags = (wapp.iconData[$(this).data('icss')].tags || '').split(',');
        var found = rex.test($(this).data('icss'));
        tags.forEach(function(k) {
          found = found || rex.test(k);
        });
        if (found) {
          $(this).parent().show();
          n++;
        }
        else {
          $(this).parent().hide();
        }
    });
    $(".search .nb").text(n);
  },

  // Search function
  recent: function (val) {
    var n = 0;
    var date = 0;
    $("#icons .icons i").each(function() {
      var d = wapp.iconData[$(this).data('icss')].date;
      if (!d) return;
      d = new Date(d);
      if (d > date) date = d;
    });
    var date = new Date(date-24*30*1000*60*60);
    $("#icons .icons i").each(function() {
      var d = wapp.iconData[$(this).data('icss')].date;
      if (d && new Date(d) > date) {
        $(this).parent().show();
        n++;
      }
      else {
        $(this).parent().hide();
      }
    });
    $(".search .nb").text(n);
  },

  /** Copy CSS to clipboard 
   */
  copy2clipboard: function() {
    var icon = $(".icon i").first().attr("class").replace(/icss-anim|icss-|\ /g,"");
    if (wapp.icons[icon]) {
      $(".icon textarea").val(wapp.icons[icon]).select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    }
    else console.log('Oops, unable to copy');
  }
};

// Initialize on ready
$(document).ready(function(){ wapp.initialize();});

(function() {

// Debug mode
if (wapp.debug) {
  $("body").addClass("debug");
  $(window).bind('beforeunload', function(e) {
      return "Stay on page";
  });
}

// Search function
$(".search input").on("keyup", function() {
    wapp.search($(this).val());
});

// Color menu
$(".color").on('mouseover', function(){ $("ul",this).show(); })
    .on('mouseleave', function(){ $("ul", this).hide(); });

$(".color li").click(function(e) { 
    $("body").css('color', $(this).css('background-color'));
    $(this).parent().hide();
    e.stopPropagation();
});


/** Change icon
 */
function showICSS(icon) {
  // Get icon in url
  if (!icon || !wapp.icons[icon]) icon = "home";

  $(".icons > div").removeClass("selected");
  $(".icss-"+icon,".icons div").parent().addClass("selected");
  
  $(".icon i.icss").removeClass().addClass("icss icss-anim icss-"+icon);
  $(".icon .title").text(icon);

  var tag = $(".icon .tag").html('');
  (wapp.iconData[icon].tags || '').split(',').forEach(function(k) {
    if (tag.html()) $('<span>').text(' - ').appendTo(tag);
    $('<a>').text(k)
      .click(function(){ 
        $('.search input[type=search]').val(k);
        wapp.search(k);
      })
      .appendTo(tag);
  });

  // Set icon in permalink
  wapp.currentIcon = (icon!=="home" ? icon:null);
  wapp.getUrl();
};

function loadIcon(i) {
  wapp.icons[i] = 'loding';
  $.ajax({
    url: "css/"+i+".css",
    dataType: "text",
    success:function(r) {
      wapp.icons[i] = r;
    }
  });
}

function carousel() {
  if (wapp.currentPage === "home") {
    var icons = Object.keys(wapp.icons);
    if (icons.length) {
      var newIcon = icons[Math.round(Math.random()*icons.length)];
      $(".title .left i").removeClass()
        .addClass("icss-anim icss-"+newIcon);
      $(".title .left p").text(newIcon);
    }
  }
  setTimeout(carousel, 5000);
}

/** Initialize function.
 * Runs when document is ready.
 */
wapp.initialize = function() {
  // Load config
  $.ajax("config.json",{
    dataType: "json",
    cache: false,
    success:function(r) {
      wapp.iconData = r.icons;
      if (!wapp.debug) $('<link/>', { rel: 'stylesheet', href: "dist/iconicss.css" }).appendTo('head');
      var n=0;
      for(i in r.icons) {
        // console.log(i);
        n++;
        if (wapp.debug) $('<link/>', { rel: 'stylesheet', href: "css/"+i+".css" }).appendTo('head');
        loadIcon(i);                
        var div = $("<div>")
          .addClass("icss-stack")
          .data('icon',i)
          .click(function() {
            showICSS($(this).data('icon')) 
          });
        if (r.icons[i].color) div.appendTo(".icons.color");
        else div.appendTo(".icons.standard");
        $("<i>").attr('title',i)
          .data("icss",i)
          .addClass('icss-'+i)
          .appendTo(div);
      }
      // Nb icons
      $(".nb").text(n);

      var page="home";
      var locSearch = {};
      document.location.search.replace(/^\?/,'').split('&').forEach(function(e) {
        e = e.split('=');
        locSearch[e[0]] = e[1];
      });

      // Show current page
      page = locSearch.page || "home";
      wapp.showPage(page);
      // Select current icon
      $('.search input[type=search]').val(locSearch.icon||'');
      showICSS(locSearch.icon==='home' ? null : locSearch.icon);
      wapp.search(locSearch.icon)

      // Start carousel
      carousel();
      
      // Show page
      pageLoader.hide();
    },
    error: function(){
    }
  });
};

})();