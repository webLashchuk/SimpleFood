$(function () {

    $(window).scroll(function () {
        if ($(window).scrollTop() >= headerHeight) {
            $('.header').addClass('header__sticky')
        } else {
            $('.header').removeClass('header__sticky')
        }
    });

    $('.burger-btn, .header-menu__link').on('click', function () {
        $('.logo').toggleClass('logo__menu');
        $('.header-menu__list').toggleClass('burger__menu');
        $('.header-menu__item').toggleClass('burger__menu__item');
        $('.mobile-menu').toggleClass('mobile-menu--active');
        $('body').toggleClass('lock');
    })

    const headerHeight = $('.header').outerHeight();

    $('.reviews-slider__list').slick({
        dots: true,
        infinite: true,
        adaptiveHeight: true,
        appendArrows: $('.reviews-slider__controls'),
        appendDots: $('.reviews-slider__controls'),
        responsive:[
            {
                breakpoint: 560,
                settings: {
                    dots: false
                }
            }
        ]
    });

    const mediaQuery = window.matchMedia('(max-width: 768px)')
    
    function handleTableChange(e) {
        if (e.matches) {
            $('.restaurants__list').slick({
                arrows: false,
                dots: true,
                infinite: true,
                slidesToShow: 1,
                adaptiveHeight: true,
                appendDots: $('.restaurants__controls-dots')
            })
        } else {
            $('.restaurants__list').slick('unslick');
        }
    }


    mediaQuery.addListener(handleTableChange);
    handleTableChange(mediaQuery);

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



