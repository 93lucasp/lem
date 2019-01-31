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
    $(document).ready(function() {
        $('#listProject').DataTable( {
            paging: false,
            searching: false,
            bInfo : false,
            responsive: true
        } );
        $(window).scroll(function (event) {
            var scroll = $(window).scrollTop();
           if (scroll > 30) {
               $('.navbar').addClass('border-bottomScroll');
           } else {
            $('.navbar').removeClass('border-bottomScroll');
           }
        });
    } );

    