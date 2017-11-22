/** The web application */
var wapp= {
    /** the list of icons */
    icons: {},
    /** debug mode (in location search) */
    debug: (/debug/.test(window.location.search)),

    /** Initialize function */
    initialize: function(){},

    /** Set debug mode 
     * @param {boolean} b true/false
     */
    setDebug: function(b) 
    {   this.debug = (b!==false);
        var icon = $(".icon i").first().attr("class").replace(/icss-anim|icss-|\ /g,"");
        var s = "?" + (this.debug?"debug&":"") + "icon=" + icon;
        document.location = document.location.href.split("?")[0] + s;
    },

    /** Copy CSS to clipboard 
     */
    copy2clipboard: function()
    {   var icon = $(".icon i").first().attr("class").replace(/icss-anim|icss-|\ /g,"");
        if (wapp.icons[icon])
        {   $(".icon textarea").val(wapp.icons[icon]).select();
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
if (wapp.debug) 
{   $("body").addClass("debug");
    $(window).bind('beforeunload', function(e) {
        return "Saty on page";
    });
}

// Search function
$(".search input").on("keyup", function()
{   var n = 0;
	var val = $(this).val();
    var rex = new RegExp(val,"i");
    $(".icons i").each(function(){
        if (rex.test($(this).data('icss'))) 
        {   $(this).parent().show();
            n++;
        }
        else 
        {   $(this).parent().hide();
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
function showICSS(icon)
{	// Get icon in url
    if (!icon)
    {   icon = "home";
        var hash = document.location.search;
        if (hash)
        {	hash = hash.replace(/(^#|^\?)/,"").split("&");
            for (var i=0; i<hash.length;  i++)
            {	var t = hash[i].split("=");
                if(t[0]=='icon') icon = t[1];
            }
        }
    }

    $(".icons > div").removeClass("selected");
    $(".icss-"+icon,".icons div").parent().addClass("selected");
    
    $(".icon i").removeClass().addClass("icss-anim icss-"+icon);
    $(".icon .title").text(icon);
    // Set icon in permalink
    var s = "?" + (wapp.debug?"debug&":"") + "icon=" + icon;
    window.history.replaceState (null, null, document.location.href.split("?")[0] + s);
};



function loadIcon(i)
{   $.ajax("css/"+i+".css",
    {   success:function(r)
        {   wapp.icons[i] = r;
        }
    });
}

wapp.initialize = function()
{   // Load config
    $.ajax("config.json",{
        dataType: "json",
        cache: false,
        success:function(r) {
            if (!wapp.debug) $('<link/>', { rel: 'stylesheet', href: "dist/iconicss.css" }).appendTo('head');
            var n=0;
            for(i in r.icons)
            {	console.log(i);
                n++;
                if (wapp.debug) $('<link/>', { rel: 'stylesheet', href: "css/"+i+".css" }).appendTo('head');
                loadIcon(i);                
                var div = $("<div>").click(function()
                            {   showICSS($("i", this).attr('class').replace("icss-","")) 
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
            // Select current icon
            showICSS();
        },
        error:function(){

        }
    });
};

})();