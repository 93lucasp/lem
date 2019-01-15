$(window).on("load", function() {
    $(".logo--effect").addClass("logo--effect--animated");
    $(".cta__line--1").addClass("cta__line--1--animated");
    $(".cta__line--2").addClass("cta__line--2--animated");
    $(".cta__title").addClass("cta__title--animated");
    $(".footer-home").addClass("footer-home--animated");
    $(".hamburger").click(function(){
        $(this).toggleClass("hamburger--active")
        $('.navbar__menu').toggleClass("navbar__menu--opened")
      });
});