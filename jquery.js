/*$(document).ready(function(){
    $(".liste").click(function(){
        $(".liste").css({"margin-left": "10px",
            "margin-right": "0",
            "background": "#EBEBEB",
            "border-bottom-left-radius": "10px",
            "border-top-left-radius": "10px",
            "border-style": "none"});
    });
});*/

$(function(){
    $(".liste").on( "click", "div", function( event ) {
        $(".liste").css({"margin-left": "10px",
            "margin-right": "0",
            "background": "#EBEBEB",
            "border-bottom-left-radius": "10px",
            "border-top-left-radius": "10px",
            "border-style": "none"});
    });
});

$(function(){
    $(".liste").on( "click", "div", function() {
        $(".liste").hide();
})});
