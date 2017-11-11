// Debug mode
var debug = /debug/.test(window.location.search);
if (debug) $("body").addClass("debug");

// Search function
$(".search input").on("keyup", function()
{    var rex = new RegExp($(this).val(),"gi");
    $(".icons i").each(function(){
        if (rex.test($(this).attr('class'))) $(this).parent().show();
        else $(this).parent().hide();
    });
});

// Color
$(".color").on('mouseover', function(){ $("ul",this).show(); })
    .on('mouseleave', function(){ $("ul", this).hide(); });
$(".color li").click(function(e) { 
    $("body").css('color', $(this).css('background-color'));
    $(this).parent().hide();
    e.stopPropagation();
});

// Change icon
function showICSS()
{	$(".icons > div").removeClass("selected");
    var i = $("i",this).attr("class");
    $(".icon i").removeClass().addClass("icss-anim "+i);
    $(".icon .title").text(i.replace(/icss[\ |-]/g, ""));
    $(this).addClass("selected");
};

// Load config
$.ajax("config.json",{
    dataType: "json",
    cache: false,
    success:function(r) {
        var n=0;
        for(i in r.icons)
        {	console.log(i);
            n++;
            $('<link/>', { rel: 'stylesheet', href: "css/"+i+".css" }).appendTo('head');
            var div = $("<div>").click(showICSS).appendTo(".icons");
            $("<i>").attr('title',i)
                .data("icss",i)
                .addClass('icss-'+i)
                .appendTo(div);
        }
        $(".icons div").first().click();
        $(".nb").text(n);
    },
    error:function(){

    }
});
