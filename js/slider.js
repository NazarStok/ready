jQuery(document).ready(function($) {
    const btns = $('.btn__block .slide__btn');
    const slides = $('.slider .slide');
    const texts = $('.slide-text .text');

    let timer;
    let slideIndex = 0;

    function updateButtonColor(index) {
        btns.removeClass('active');
        btns.eq(index).addClass('active');
    }

    function updateText(index) {
        texts.removeClass('active').css('display', 'none');
        texts.eq(index).addClass('active').css('display', 'block');
    }

    function autoSlide() {
        slideIndex = (slideIndex + 1) % slides.length;
        slides.removeClass('active');
        slides.eq(slideIndex).addClass('active');
        updateButtonColor(slideIndex);
        updateText(slideIndex);
    }

    function startSlideAnimation() {
        slides.removeClass('active');
        slides.eq(0).addClass('active');
        updateButtonColor(0);
        updateText(0);
        timer = setInterval(autoSlide, 6000);
    }

    btns.each(function(index) {
        $(this).on('click', function() {
            clearInterval(timer);
            slideIndex = index;
            slides.removeClass('active');
            slides.eq(slideIndex).addClass('active');
            updateButtonColor(slideIndex);
            updateText(slideIndex);
            timer = setInterval(autoSlide, 6000);
        });
    });

    startSlideAnimation();
});
