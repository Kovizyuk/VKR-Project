
(function ($) {

    "use strict";

    var cfg = {
        scrollDuration: 800, 
        mailChimpURL: 'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc'  
    },

    $WIN = $(window);

    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


    /* Фуекция начальной загрузки страницы
     * -------------------------------------------------- */
    var clPreloader = function () {

        $("html").addClass('cl-preload');

        $WIN.on('load', function () {

            $('html, body').animate({ scrollTop: 0 }, 'normal');

            $("#loader").fadeOut("slow", function () {
             
                $("#preloader").delay(300).fadeOut("slow");
            });

            $("html").removeClass('cl-preload');
            $("html").addClass('cl-loaded');

        });
    };


    /* Фиксированная Шапка при скролле 
     * -------------------------------------------------- */
    var clMoveHeader = function () {

        var hero = $('.page-hero'),
            hdr = $('header'),
            triggerHeight = hero.outerHeight() - 170;


        $WIN.on('scroll', function () {

            var loc = $WIN.scrollTop();

            if (loc > triggerHeight) {
                hdr.addClass('sticky');
            } else {
                hdr.removeClass('sticky');
            }

            if (loc > triggerHeight + 20) {
                hdr.addClass('offset');
            } else {
                hdr.removeClass('offset');
            }

            if (loc > triggerHeight + 150) {
                hdr.addClass('scrolling');
            } else {
                hdr.removeClass('scrolling');
            }

        });


    };


    /* Открытие мобильного меню
     * ---------------------------------------------------- */
    var clMobileMenu = function () {

        var toggleButton = $('.header-menu-toggle'),
            nav = $('.header-nav-wrap');

        toggleButton.on('click', function (event) {
            event.preventDefault();

            toggleButton.toggleClass('is-clicked');
            nav.slideToggle();
        });

        if (toggleButton.is(':visible')) nav.addClass('mobile');

        $WIN.on('resize', function () {
            if (toggleButton.is(':visible')) nav.addClass('mobile');
            else nav.removeClass('mobile');
        });

        nav.find('a').on("click", function () {

            if (nav.hasClass('mobile')) {
                toggleButton.toggleClass('is-clicked');
                nav.slideToggle();
            }
        });

    };


    /* Функция активирует пункты из меню когда прокрутили до нужного экрана
     * ------------------------------------------------------ */
    var clWaypoints = function () {

        var sections = $(".target-section"),
            navigation_links = $(".header-nav li a");

        sections.waypoint({

            handler: function (direction) {

                var active_section;

                active_section = $('section#' + this.element.id);

                if (direction === "up") active_section = active_section.prevAll(".target-section").first();

                var active_link = $('.header-nav li a[href="#' + active_section.attr("id") + '"]');

                navigation_links.parent().removeClass("current");
                active_link.parent().addClass("current");

            },

            offset: '25%'

        });

    };


    /* Слайдер для галереи
     * ----------------------------------------------------- */
    var clPhotoswipe = function () {
        var items = [],
            $pswp = $('.pswp')[0],
            $folioItems = $('.item-folio');

        
        $folioItems.each(function (i) {

            var $folio = $(this),
                $thumbLink = $folio.find('.thumb-link'),
                $title = $folio.find('.item-folio__title'),
                $caption = $folio.find('.item-folio__caption'),
                $titleText = '<h4>' + $.trim($title.html()) + '</h4>',
                $captionText = $.trim($caption.html()),
                $href = $thumbLink.attr('href'),
                $size = $thumbLink.data('size').split('x'),
                $width = $size[0],
                $height = $size[1];

            var item = {
                src: $href,
                w: $width,
                h: $height
            }

            if ($caption.length > 0) {
                item.title = $.trim($titleText + $captionText);
            }

            items.push(item);
        });

        $folioItems.each(function (i) {

            $(this).on('click', function (e) {
                e.preventDefault();
                var options = {
                    index: i,
                    showHideOpacity: true
                }

                // инициализация фотосвайпера
                var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                lightBox.init();
            });

        });
    };


    /* Функция счетчик дней - "до запуска ракет"
     * ------------------------------------------------------ */
    var clStatCount = function () {

        var countDownDate = new Date("June 15, 2023 10:37:25").getTime();

        var x = setInterval(function () {

    
            var now = new Date().getTime();

            var distance = countDownDate - now;


            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  
            document.getElementById("stats-count").innerHTML = 
            `
            <div class="col-block item-stats ">
                <div class="item-stats__count">${days}</div>
                <h5>дней</h5>
            </div>
            <div class="col-block item-stats ">
                <div class="item-stats__count">${hours}</div>
                <h5>часов</h5>
            </div>
            <div class="col-block item-stats ">
                <div class="item-stats__count">${minutes}</div>
                <h5>минут</h5>
            </div>
            <div class="col-block item-stats ">
                <div class="item-stats__count">${seconds}</div>
                <h5>секунд</h5>
            </div>
            `

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("stats-count").innerHTML = "EXPIRED";
            }
        }, 1000);

    };



    /* Плавная прокрутка при переходе в секцию через меню
     * ------------------------------------------------------ */
    var clSmoothScroll = function () {

        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
                $target = $(target);

            e.preventDefault();
            e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

               
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };



    /* Функция всплывающего окна
     * ------------------------------------------------------ */
    var clAlertBoxes = function () {

        $('.alert-box').on('click', '.alert-box__close', function () {
            $(this).parent().fadeOut(500);
        });

    };


    /* Анимация при прокрутке страницы
     * ------------------------------------------------------ */
    var clAOS = function () {

        AOS.init({
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: 'mobile'
        });

    };



    /* Инициализация всех функций
     * ------------------------------------------------------ */
    (function clInit() {

        clPreloader();
        clMoveHeader();
        clMobileMenu();
        clWaypoints();
        clPhotoswipe();
        clStatCount();
        clSmoothScroll();
        clAlertBoxes();
        clAOS();

        $WIN.on('resize', function () {
            clMoveHeader();
        });

    })();

})(jQuery);