$(function () {
    //sticky header
    const headerHeight = $('.header').outerHeight();
    
    $(window).scroll(function () {
        if ($(window).scrollTop() >= headerHeight) {
            $('.header').addClass('header__sticky')
        } else {
            $('.header').removeClass('header__sticky')
        }
    });

    $('.product-tabs__link').on('click', function (e) {
        e.preventDefault();
        $('.product-tabs__link').removeClass('product-tabs__link--active');
        $(this).addClass('product-tabs__link--active');

        $('.product-tabs__block').removeClass('product-tabs__block--active');
        $($(this).attr('href')).addClass('product-tabs__block--active');

    });

    $('.product__rating, .product-reviews__rating').rateYo({
        starWidth: '16px',
        spacing: "6px",
        normalFill: "#c1c1c1",
        ratedFill: "#ffb800",
        starSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>',
        readOnly: true,
    });

    $('.review-rating__label').rateYo({
        starWidth: '16px',
        spacing: "6px",
        normalFill: "#c1c1c1",
        ratedFill: "#ffb800",
        fullStar: true,
        starSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>',
    });

    $('#rating').rateYo({
        starWidth: '16px',
        spacing: "6px",
        normalFill: "rgba(193, 193, 193, 0.3)",
        ratedFill: "#ffb800",
        starSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>',
    });

    $('.product__quantity').styler()

    $(window).scroll(function () {
        if ($(window).scrollTop() >= headerHeight) {
            $('.header-catalog').addClass('header-catalog__sticky')
        } else {
            $('.header-catalog').removeClass('header-catalog__sticky')
        }
    });

    new Swiper('.product-slider', {
        navigation: {
            nextEl: '.product-slider__button--next',
            prevEl: '.product-slider__button--prev',
        },
        touchRatio: 1,
        grabCursor: true,
        slideToClickedSlide: true,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        spaceBetween: 75,
        slidesPerGroup: 1,
        centeredSlides: true,
        zoom: {
            maxRatio: 5,
            minRatio: 1,
        },
    });

    new Swiper('.related-products__slider', {
        navigation: {
            nextEl: '.related-products__button--next',
            prevEl: '.related-products__button--prev',
        },
        pagination: {
            el: '.related-products__pagination',
            clickable: true,
        },
        touchRatio: 1,
        grabCursor: true,
        slideToClickedSlide: true,
        slidesPerGroup: 2,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        spaceBetween: 10,
        slidesPerView: 2,
        infinite: false,
        // centeredSlides: true,
        loop: true,
        zoom: {
            maxRatio: 5,
            minRatio: 1,
        },
        breakpoints: {
            1200: {
                spaceBetween: 30,
                slidesPerView: 5,
                slidesPerGroup: 1,
            },
            992: {
            },
            768: {
                slidesPerView: 4,
            },
            560: {
                slidesPerGroup: 3,
                slidesPerView: 3,
            }
        }
    });

    // mixitup-filter
    const containerEl = document.querySelector('.food');
    let mixer;

    if (containerEl) {
        mixer = mixitup(containerEl, {
            controls: {
                toggleDefault: 'none'
            },
            classNames: {
                block: '',
                elementFilter: 'category'
            }
        });
    }


    Fancybox.bind("[data-fancybox='gallery']", {
        Toolbar  : false,
        selector : '.swiper-slide:not(.swiper-slide-duplicate)',
        animated: false,
        showClass: false,
        hideClass: false,
        infinite: false,
        closeButton: 'top',
        hideScrollbar: true,
        infinite: false,
        loop: false,
        mainClass: 'products-gallery',
        backFocus : false,
    
        Image: {
            click: 'close',
            wheel: 'slide',
            zoom: false,
            fit: "contain",
        }
    });

    //range-slider
    let $range = $('.price-range__slider'),
        $inputFrom = $('.price-range__field--from'),
        $inputTo = $('.price-range__field--to'),
        instance,
        min = 0,
        max = 1200,
        from = 0,
        to = 0;

    $range.ionRangeSlider({
        skin: 'round',
        type: 'double',
        min: min,
        max: max,
        from: 100,
        to: 1000,
        hide_min_max: true,
        hide_from_to: true,
        onStart: updateInputs,
        onChange: updateInputs,
        prefix: '$'
    });
    instance = $range.data('ionRangeSlider');

    function updateInputs(data) {
        from = data.from;
        to = data.to;
        $inputFrom.prop('value', + from);
        $inputTo.prop('value', + to);
    }

    $inputFrom.on('input', function () {
        let val = $(this).prop('value');

        if (val < min) {
            val = min;
        } else if (val > to) {
            val = to;
        }

        instance.update({
            from: val
        });
    });

    $inputTo.on('input', function () {
        let val = $(this).prop('value');

        if (val < from) {
            val = from;
        } else if (val > max) {
            val = max;
        }

        instance.update({
            to: val
        });
    });

    //mobile-menu
    $('.burger-btn, .header-menu__link').on('click', function () {
        $('.logo').toggleClass('logo__menu');
        $('.header-menu__list').toggleClass('burger__menu');
        $('.header-menu__item').toggleClass('burger-menu__item');
        $('.mobile-menu__inner').toggleClass('mobile-menu__inner--active');
        $('.overlay').toggleClass('overlay--active');
        $('body').toggleClass('lock');
    });

    //filter-menu catalog
    $('.sidebar-btn, .category__link').on('click', function () {
        $('.menu').toggleClass('menu--active');
        $('.sidebar__inner').toggleClass('sidebar__inner--active');
        $('.overlay').toggleClass('overlay--active');
        $('body').toggleClass('lock');
    });

    $('.reviews-slider__list').slick({
        dots: true,
        infinite: true,
        adaptiveHeight: true,
        appendArrows: $('.reviews-slider__controls'),
        appendDots: $('.reviews-slider__controls'),
        responsive: [
            {
                breakpoint: 560,
                settings: {
                    dots: false
                }
            }
        ]
    });

    //restaurants cards slider
    const mediaQuery = window.matchMedia('(max-width: 768px)')

    function handleTableChange(e) {
        if (e.matches) {
            $('.restaurants__list, .promotions__list').slick({
                arrows: false,
                dots: true,
                infinite: true,
                slidesToShow: 1,
                adaptiveHeight: true,
                appendDots: $('.restaurants__controls-dots, .promotions__controls-dots')
            })
        } else {
            $('.restaurants__list, .promotions__list').slick('unslick');
        }
    }
    mediaQuery.addListener(handleTableChange);
    handleTableChange(mediaQuery);

});

//dropdown menu
document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {

    const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
    const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
    const dropDownItems = dropDownList.querySelectorAll('.dropdown__item');
    const dropDownInput = dropDownWrapper.querySelector('.dropdown__input');

    dropDownBtn.addEventListener('click', function () {
        dropDownList.classList.toggle('dropdown__list--visible');
        this.classList.add('dropdown__button--active');
    });

    dropDownItems.forEach(function (listItem) {
        listItem.addEventListener('click', function (e) {
            e.stopPropagation();
            dropDownBtn.innerText = this.innerText;
            dropDownBtn.focus();
            dropDownInput.value = this.dataset.value;
            dropDownList.classList.remove('dropdown__list--visible');
        });
    });

    document.addEventListener('click', function (e) {
        if (e.target !== dropDownBtn) {
            dropDownBtn.classList.remove('dropdown__button--active');
            dropDownList.classList.remove('dropdown__list--visible');
        };
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab' || e.key === 'Escape') {
            dropDownBtn.classList.remove('dropdown__button--active');
            dropDownList.classList.remove('dropdown__list--visible');
        };
    });
});


