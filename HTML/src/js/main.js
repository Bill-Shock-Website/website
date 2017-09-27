////
//Application Module
////////////////////

 var app = (function () {   
     "use strict";  
     //-----------------------------------------------------------------
     // Page Initalization handler : exposed to app.init();
     //-----------------------------------------------------------------
     var init = function () {
        // var wow = new WOW({
        //         boxClass:     'wow',      // animated element css class (default is wow)
        //         animateClass: 'animated', // animation css class (default is animated)
        //         offset:       0,          // distance to the element when triggering the animation (default is 0)
        //         mobile:       false,       // trigger animations on mobile devices (default is true)
        //         live:         true,       // act on asynchronously loaded content (default is true)
        //         callback:     function(box) {
        //           // the callback is fired every time an animation is started
        //           // the argument that is passed in is the DOM node being animated
        //     },
        //         scrollContainer: null // optional scroll container selector, otherwise use window
        //     }
        // );
        // wow.init();

        //slick count  
        $( ".gallery-container" ).each(function() {
          var slideCount = null;
          var gallery = $(this).find('.gallery');
          var total = $(this).find('.total');
          var current = $(this).find('.current');
          gallery.on('init', function(event, slick, currentSlide){
              slideCount = slick.slideCount;
              setCurrentSlideNumber(slick.currentSlide);
              total.text(slideCount);
          });
          gallery.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            setCurrentSlideNumber(nextSlide);
          });
          function setCurrentSlideNumber(currentSlide) {
              var $el = current;
              $el.text(currentSlide + 1);
          }
        });  

        var windowWidth = $(window).width(), //retrieve current window width
            containerWidth = $('.container').width(),
            innerContent = $('.quates-block .col-3').width(),
            xWidth = Math.round((windowWidth - containerWidth)/2),
            yWidth = Math.round((containerWidth - innerContent)/2),
            totalWidth = xWidth + yWidth;
          $('.quates-block').css({marginLeft: -totalWidth, marginRight: -totalWidth})

          $('.mobile-accordion h2').on('click', function(){
              if(!$(this).hasClass('active')){
                  $('.mobile-accordion h2').removeClass('active');
                  $('.mobile-accordion-content').slideUp();
                  $(this).addClass('active');
                  $(this).parents('.mobile-accordion').find('.mobile-accordion-content').slideDown();
              }else{
                  $('.mobile-accordion h2').removeClass('active');
                  $('.mobile-accordion-content').slideUp();
              }
          });

          $(".price-menu").find('li:first-child').addClass('current');
          $(".price-menu li a").on('click',function(event) {
              event.preventDefault();
              $(this).parent().addClass("current");
              $(this).parent().siblings().removeClass("current");
              var tab = $(this).attr("href");
              $(".tab-content").not(tab).css("display", "none");
              $(tab).fadeIn();
          });
            
        // mobile accordion
        if(windowWidth <767){
          $(document).on('click', '.accordion h6', function(){
            if($(this).hasClass('open') === false) {
              $('.accordion h6').removeClass('open');
              $('.mobile-accordion').slideUp();
              $(this).addClass('open');
              $(this).parents('.accordion').find('.mobile-accordion').slideDown();
            } else {
               $('.accordion h6').removeClass('open');
               $('.mobile-accordion').slideUp();
            }
            return false;
          });  


          $('.feature-rightBlk').slick({
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '60px',
            dots: true
        });

        }

        _loader();
        //_afterEffects();
        //_scrollAnimation();
        _initHandler();
        _menuToggle();
        _gallerySlider();
        _formElements();
        _accordion();
        responsiveView();
        _fileBrowes();
        _mobileMenu();
        _floatTrigger();
        _workSlider();
        _jarallax();
        _processSlick();
     },
     //-----------------------------------------------------------------
     // Helper Function: Add CSS Class to page-hd element on scroll
     //-----------------------------------------------------------------

     _loader = function(){
        NProgress.configure({ showSpinner: false });
        NProgress.start();
     },

     // _scrollAnimation = function(){
     //    var s = skrollr.init();
     // },

     // _afterEffects = function(){
     //    var animation = bodymovin.loadAnimation({
     //        container: document.getElementById('bm'),
     //        renderer:'svg',
     //        loop: true,
     //        autoplay: true,
     //        path:'data.json'
     //    })
     // },


     _floatTrigger = function(){
        $('.float-tigger').on('click', function(){
          $('.float-form').toggleClass('active');
        });
     },

    _menuToggle = function() {
        $('.menu-toggle').on('click', function() {
            $(this).toggleClass('on');
            $('nav').toggleClass('slide');
            $('body').toggleClass('hidden');
        });
    },



    _mobileMenu = function() {      
      $('nav li ul').addClass('sub-menu');
      $('nav li ul').parents('li').append('<span class="dropdown-trigger"></span>');
      $('.dropdown-trigger').on('click', function(){
          if(!$(this).parents('li').hasClass('active')){
            $('nav li').removeClass('active');
            $('.sub-menu').slideUp();
            $(this).parents('li').addClass('active');
            $(this).parents('li').find('.sub-menu').slideDown();
          }else{
            $('nav li').removeClass('active');
            $('.sub-menu').slideDown();
          }
      });
    },

    _jarallax = function(){
        $('.jarallax').jarallax({
            speed: 0.2,
            noAndroid: true
        }); 
    },

    _processSlick = function(){
      var $window = $(window),
          $card = $('.process-innerBlk');

      if ($window.width() < 767) {
        $card.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          fade: true,
        });
      }else{
        if($card.hasClass('slick-initialized')){
          $card.unslick();          
        }
      }
      $('nav li a').on('click', function(e) {
        var id = $(this).attr('href');
            // target element
        var $id = $(id);
        if ($id.length === 0) {
            return;
        }

        // prevent standard hash navigation (avoid blinking in IE)
        e.preventDefault();

        // top position relative to the document
        var pos = $id.offset().top;

        // animated top scrolling
        $('body, html').animate({scrollTop: pos}, 1000);
      });

    },


    _workSlider =function(){
       $('.slider-for').slick({
          autoplay:true,
          autoplaySpeed: 4000,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          fade: true,
          asNavFor: '.slider-nav',
          responsive: [
            {
              breakpoint: 767,
              settings: {
                unslick: true
              }
            }
          ]
        });
        $('.slider-nav').slick({
          autoplay:true,
          autoplaySpeed: 4000,
          slidesToShow: 1,
          slidesToScroll: 1,
          asNavFor: '.slider-for',
          arrows: false,
          dots: false,
          fade: true,
          centerMode: true,
          focusOnSelect: true,
          responsive: [
            {
              breakpoint: 767,
              settings: {
                unslick: true
              }
            }
          ]
        });
    },

    _gallerySlider = function(){
        $('.gallery').slick({
            arrows:true,
            infinite: false,
            speed: 500,
            fade: true,
            prevArrow:'<i class="fa fa-caret-left prev"></i>',
            nextArrow:'<i class="fa fa-caret-right next"></i>',
            cssEase: 'linear',
            swipe: true,
            swipeToSlide: true,
            touchThreshold: 10,
        }); 

        $('.mobile-slide').slick({
            arrows: false,
            infinite: false,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 1,
            responsive: [            
            {
                breakpoint: 940,
                settings: {
                    dots: true,
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 640,
                settings: {
                    dots: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
          ]
        });
                
        $('.testimonial-blog').slick({
            arrows: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            fade: true,
            adaptiveHeight: true,
            prevArrow:'<i class="fa fa-angle-left prev"></i>',
            nextArrow:'<i class="fa fa-angle-right next"></i>',
            responsive: [            
              {
                breakpoint: 767,
                settings: {
                  dots: true,
                  autoplay: true,
                  fade: false,
                  adaptiveHeight: false,
                }
              }
            ]
        });
    },  

    _accordion = function(){
       $('.accordion h5').on('click',function(){   
          if(!$(this).hasClass('open')){
              $('.accordion h5').removeClass('open');
              $('.accordion-content').stop(true, true).slideUp();
              $(this).addClass('open');
              $(this).parent('.accordion').find('.accordion-content').slideDown();
          }else{
              $('.accordion h5').removeClass('open');
              $('.accordion-content').stop(true, true).slideUp();
          }
        });
    },

    _fileBrowes = function(){
      $(".file-upload").change(function(){
        var x = ($(".file-upload").val());
        $('#file-upload-value').val(x);
      });
   },

    _formElements = function() {   
        /*jquery ui selectbox placeholder start*/
        $.widget('app.selectmenu', $.ui.selectmenu, {
            _drawButton: function() {
               this._super();
               var selected = this.element
                   .find('[selected]')
                   .length,
                   placeholder = this.options.placeholder;

               if (!selected && placeholder) {
                   this.buttonItem.text(placeholder);
               } 
           }
        });

       //Select menu
       $('.select-menu').each(function() {
        var $placeholder = $(this).parent().data('placeholder');
        $(this).selectmenu({
          placeholder: $placeholder,
          appendTo: $(this).parent(".select-row"),
          create: function(event, ui) {
              $('.ui-selectmenu-text').addClass('placeholder');
          },
          change: function(event, ui) {
            $(this).removeClass('placeholder');
          },
        });
      }); 

       $('.floating-item input, textarea').focus(function(){
           $(this).parent('.floating-item').addClass('input-animate'); 
        });
        $('.floating-item input, textarea').blur(function(){
           $(this).parent('.floating-item').removeClass('input-animate'); 
        });

        $('input, textarea').keyup(function() {
            if ($(this).val() !== "") {
                $(this).addClass('input-email-active'); 
            } else {
                $(this).removeClass('input-email-active');  
            } 
        });        
    },

    _initHandler = function(){     
        //magnific video pop up init
        var groups = {};
         $('.galleryItem').each(function() {
           var id = parseInt($(this).attr('data-group'), 10);
           if(!groups[id]) {
             groups[id] = [];
           } 
           groups[id].push( this );
         });

         $.each(groups, function() {
           $(this).magnificPopup({
               type: 'iframe',
               removalDelay: 160,
               preloader: false,
               closeOnContentClick: true,
               closeBtnInside: false,
               gallery: { enabled:true }
           });
        });                

        // newsletter
        var $emailButton = $('#email-button');
        var $preloader   = $('.preloader');
        var $mailBox     = $('.mail-box');
        var $succesMsg   = $('.succes-message');

        $mailBox.on('keyup', function(){
            if($(this).val() != 0) {
                $emailButton.removeAttr('disabled');
            }
        });

        $emailButton.on('click', function(){
            $(this).fadeOut(500, function(){
                $preloader.fadeIn(500, function(){
                    $preloader.fadeOut(800, function(){
                        $emailButton.fadeIn();
                        $succesMsg.fadeIn();
                    });
                });
            });
        });            
        // equal height rows
        var highestBox = 0;
        // Select and loop the elements you want to equalise
          $('.tile-caption', this).each(function(){
            
            // If this box is higher than the cached highest then store it
            if($(this).height() > highestBox) {
              highestBox = $(this).height(); 
            }          
          });             
          // Set the height of all those children to whichever was highest 
          $('.tile-caption',this).height(highestBox);

          var highestBox1 = 0;
        // Select and loop the elements you want to equalise
          $('.cards-block', this).each(function(){
            
            // If this box is higher than the cached highest then store it
            if($(this).height() > highestBox1) {
              highestBox1 = $(this).height(); 
            }          
          });             
          // Set the height of all those children to whichever was highest 
          $('.cards-block',this).height(highestBox1);
          //ripple button call function
           window.rippler = $.ripple('.button', {
            debug: true,
            multi: true,
            opacity: 0.15,
            color: "auto",
            duration: 1
        });

        // selling buying tab 
        $('.tab-header li:first').addClass('current');
        $('.tab-desc').hide();
        $('.views-tab').hide();
        $('.views-tab:first').fadeIn();
        $('.tab-desc:first').fadeIn();
        $('.tab-header li').click(function(){
          var tab_id = $(this).attr('data-tab');
          $('.tab-header li').removeClass('current');
          $('.tab-desc').hide();
          $('.views-tab').hide();
          $(this).addClass('current');
          $("#"+tab_id).fadeIn();
          return false;
        });
    },

    responsiveView = function(){
      //accordion menu
        // var windowWidth = $(window).width(); //retrieve current window width
        //     if(windowWidth <767){

        //         $(window).scroll(function(){
        //             var top = $(window).scrollTop();
        //             if (top >= 100) {
        //                 $(".menu-toggle").addClass("mobile-fixed");
        //             }else{
        //               $(".menu-toggle").removeClass("mobile-fixed");
        //             }
        //         })
                          
        //     // append button into right tile section
        //     $('.tile-section.overlay .button').appendTo('.right-tile .col-8');
        //     $('.tile-section.overlay .button').removeClass('vertical-align');
        //     // append button into right tile section
        //     // $('.subscriber').appendTo('.contact');
        //     //paapend logo to subpage
        //     $('.menu-open .logo').appendTo('header');
        //     $('.copy-rights .col-5').insertAfter('.copy-rights .col-7');
        // }
        // else{              
        //     $('header .logo').insertAfter('.menu-toggle');
        //      // prepend button into right tile section
        //     $('.right-tile .col-8 .button').insertAfter('.tile-section.overlay img');
        //     // append button into right tile section
        //     // $('.subscriber').insertAfter('.split');
        //     // parallex plugin call
        //     /*$('.component-hero-banner').parallax("50%", 0.3);*/
        //     return false;
        // }
        _processSlick();
    };

    // Expose Global Functions
    return {
        init: init,
        responsiveView: responsiveView
     };
})();
 
$().ready(function () {
    app.init();           
});
$( window ).resize(function() {
  app.responsiveView();
});
$(window).scroll(function() {
     var scroll = $(window).scrollTop();
     var headerHeight = $('header').innerHeight();
     var window_w = ($(window).width());
     if (scroll > 10){
         $('header').addClass("secondary-header");
     }else {
         $('header').removeClass("secondary-header");
     }
}); 
$(window).on('load', function(){
  // $('html, body').animate({
  //     scrollTop: 0
  // }, 800);

  // $('.subpage').animate({opacity:1}, 1000, function(){
  //     NProgress.done();
  // });
  if(sessionStorage.getItem('loader') == null) {
    setTimeout(function() { 
      $('.render-blk').animate({opacity:1}, 500, function(){
        NProgress.done();
        $('.intro-hero-banner-content').fadeIn(800, function(){
          $('.intro-hero-banner').addClass('slide', function(){
            $('header').delay(2500).animate({opacity:1});
          });
        });
      });
    }, 5000);
    sessionStorage.setItem('loader', 'true');
    }else{
      $('.render-blk, header').animate({opacity:1}, 500, function(){
        NProgress.done();
      });
      $('.intro-hero-banner').hide();
    }

  setTimeout(function(){     
    $("html").addClass('page-opened');
  }, 1000); 

    // if(sessionStorage.getItem('loader') == null) {
    //     setTimeout(function() { 
    //         $('.render-blk').animate({opacity:1}, 800, function(){
    //             $('.intro-hero-banner-content').fadeIn(1500, function(){
    //                 $('html, body').animate({
    //                     scrollTop: $('#scroll-banner-container').offset().top
    //                 }, 2000, function(){
    //                     $('.intro-hero-banner').hide(100, function(){
    //                         window.scrollTo(0, 0);
    //                     });
    //                     $('header').animate({opacity:1});
    //                 });
    //                 return false;
    //             });
    //         });
    //     }, 5000);
    //     sessionStorage.setItem('loader', 'true');
    // }else{
    //      $('.render-blk, header').animate({opacity:1});
    //      $('.intro-hero-banner').hide();
    // }
});