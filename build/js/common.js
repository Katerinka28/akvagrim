$(window).load(function() {
    $('.grid').masonry({
        columnWidth: 200,
        itemSelector: '.grid__item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
       
        horizontalOrder: true
    });
    
    
})

$.validator.addMethod("emailMethod", function(value, element) {
    return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);

});

$(document).ready(function() {
	$('.header__toggle').on('click', function(e) {
    console.log(e)
        $('.header__mobile').toggleClass('is-mobile-header');
        $('body').toggleClass('load');
    });

    var wrapper = $('body');
    var btn = $('.header__toggle');
    var drawer = $('.header__mobile');


    btn.on('click', function(e) {
        if (btn.hasClass('sm-visible--active-visible')) {
            btn.removeClass('sm-visible--active-visible')
            return
        }
        wrapper.toggleClass('wrapper--active')
        btn.addClass('sm-visible--active-visible')
        drawer.addClass('is-mobile-header')
        // btn.classList.add('header__toggle--active')
        // $('.header__logo-wrapper').fadeOut('slow')
        e.stopPropagation()
    })

    wrapper.on('click', checkEvent);
    drawer.on('touchmove', checkEvent);
    wrapper.on('touchmove', checkEvent);
    // wrapper.on('touchstart', checkEvent, false);
    // btn.on('click', checkEvent)
    // sidebar handle
    function checkEvent(e) {
        if (drawer.hasClass('is-mobile-header')) {
            var target = e.target
            if (target === drawer[0] || $.contains(drawer[0], target)) {
                return false
            }
            drawer.removeClass('is-mobile-header')
            btn.removeClass('header__toggle--active')
            btn.addClass('sm-visible--active')
            btn.removeClass('sm-visible--active-visible')
            // $('.header__logo-wrapper').fadeIn('slow')
        }
        e.stopPropagation()
    }
    $('.header__link').on('click', function(event) {
        console.log(event)
        var link = $(this).attr('href')
        location.href = '/' +link
    });
    var swiper = new Swiper('.swipper-container',  {    

        initialSlide: 0,
        autoplay: 2500,
        autoplayDisableOnInteraction: 'true',
        loop: 'true',
        speed: 1000,
        grabCursor: false,
        effect: 'fade'
    })


    $('.grid').each(function() { // the containers for all your galleries
        $(this).magnificPopup({

            delegate: 'a',
            type: 'image',
            gallery: {
                enabled: true
            },
        });
    })
    $(".feedback").validate({
        rules: {
            "name": {
                "required": true
            },
            "tel": {
                "required": true
            },
            "mail": {
                "emailMethod": true,
                "required": true
            },
            "message": {
                "required": true
            }
        },
        messages: {
            "mail": {
                "emailMethod": "Введите корректный email адрес"
            }
        },
        submitHandler: function(form) {
            console.log(55)
            $.magnificPopup.open({
                items: {
                    src: '#callbackthanks'
                },
                type: 'inline',
                fixedContentPos: true,
                fixedBgPos: true,
                overflowY: 'scroll',
                closeBtnInside: true,
                preloader: false,
                midClick: true,
                removalDelay: 300,
                mainClass: 'my-mfp-zoom-in',
                // callbacks: {
                //     open: function() { $('.header, body').css('padding-right', getScrollBarWidth() + "px"); },
                //     close: function() { $('.header, body').css('padding-right', 0); }
                // }
            });


            $(".feedback").trigger("reset");

        },
    })
})
