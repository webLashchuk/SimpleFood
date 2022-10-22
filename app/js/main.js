$(function () {

    $(window).scroll(function () {
        if ($(window).scrollTop() >= headerHeight) {
            $('.header').addClass('header__sticky')
        } else {
            $('.header').removeClass('header__sticky')
        }
    });

    const headerHeight = $('.header').outerHeight();

    $('.reviews-slider').slick({
        dots:true,
        infinite: true
    });

    let mixer = mixitup('.food', {
        controls: {
            toggleDefault: 'none'
        },
        classNames: {
            block: '',
            elementFilter: 'category'
        }
    });


    mixer.toggleOn('.category-burger');
});



