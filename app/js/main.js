$(function () {

    $(window).scroll(function () {
        if ($(window).scrollTop() >= headerHeight) {
            $('.header').addClass('header__sticky')
        } else {
            $('.header').removeClass('header__sticky')
        }
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() >= headerHeight) {
            $('.header-catalog').addClass('header-catalog__sticky')
        } else {
            $('.header-catalog').removeClass('header-catalog__sticky')
        }
    });

    $('.burger-btn, .header-menu__link').on('click', function () {
        $('.logo').toggleClass('logo__menu');
        $('.header-menu__list').toggleClass('burger__menu');
        $('.header-menu__item').toggleClass('burger__menu__item');
        $('.mobile-menu__inner').toggleClass('mobile-menu__inner--active');
        $('.overlay').toggleClass('overlay--active')
        $('body').toggleClass('lock');
    });

    $('.filter-btn, .filters__category-link').on('click', function () {
        $('.menu').toggleClass('menu--active');
        $('.filters__inner').toggleClass('filters__inner--active');
        $('.overlay').toggleClass('overlay--active')
    });

    const headerHeight = $('.header').outerHeight();

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

    let mixer = mixitup('.food', {
        controls: {
            toggleDefault: 'none'
        },
        classNames: {
            block: '',
            elementFilter: 'category'
        }
    });



    //range-slider
    let $range = $('.filters__price-slider'),
        $inputFrom = $('.filters__price-field--from'),
        $inputTo = $('.filters__price-field--to'),
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

    function updateInputs (data) {
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


    mixer.toggleOn('.category-burger');
});


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




