$(function(){

    $(window).scroll(function () {
        if ($(window).scrollTop() >= headerHeight) {
            $('.header').addClass('sticky')
        } else {
            $('.header').removeClass('sticky')
        }
    });

    const headerHeight = $('.header').outerHeight();

    let mixer = mixitup('.food');
})