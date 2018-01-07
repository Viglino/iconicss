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
    wapp.currentPage=id;
    wapp.getUrl();
  },

  /** Retrieve current url */
  getUrl: function() {
    var url = document.location.href.split("?")[0] 
      + "?" + (wapp.debug?"debug&":"") 
      + "icon=" + (wapp.currentIcon || "home")
      + "&page=" + $("[data-page]:visible").attr("id");
    window.history.replaceState (null, null, url);
    return url;
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
      return "Saty on page";
  });
}

// Search function
$(".search input").on("keyup", function() {
  var n = 0;
	var val = $(this).val();
    var rex = new RegExp(val,"i");
    $("#icons .icons i").each(function(){
        if (rex.test($(this).data('icss'))) {
          $(this).parent().show();
           n++;
        }
        else {
          $(this).parent().hide();
        }
    });
    $(".search .nb").text(n);
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
  if (!icon) {
    icon = "home";
    var hash = document.location.search;
    if (hash) {
      hash = hash.replace(/(^#|^\?)/,"").split("&");
      for (var i=0; i<hash.length;  i++) {
        var t = hash[i].split("=");
        if(t[0]=='icon') icon = t[1];
      }
    }
  }

  $(".icons > div").removeClass("selected");
  $(".icss-"+icon,".icons div").parent().addClass("selected");
  
  $(".icon i").removeClass().addClass("icss-anim icss-"+icon);
  $(".icon .title").text(icon);

  // Set icon in permalink
  wapp.currentIcon = (icon!=="home" ? icon:null);
  wapp.getUrl();
};

function loadIcon(i) {
  $.ajax("css/"+i+".css", {
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
      if (!wapp.debug) $('<link/>', { rel: 'stylesheet', href: "dist/iconicss.css" }).appendTo('head');
      var n=0;
      for(i in r.icons) {
        console.log(i);
        n++;
        if (wapp.debug) $('<link/>', { rel: 'stylesheet', href: "css/"+i+".css" }).appendTo('head');
        loadIcon(i);                
        var div = $("<div>")
          .click(function() {
            showICSS($("i", this).attr('class').replace("icss-","")) 
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

      // Start at home page
      if (/page\=/.test(document.location.search)) wapp.showPage (document.location.search.replace(/(.*)page=(.*)(.*)/,"$2")||"home");
      else wapp.showPage();

      // Select current icon
      showICSS();

      carousel();
      
      // Show page
      pageLoader.hide();
    },
    error: function(){
    }
  });
};

})();