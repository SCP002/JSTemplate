var NS_WIN_SCROLL = {
    scrollTopBottom: parseInt($('a.scroll-top').css('bottom')),
    footerHeight: parseInt($('div.footer').css('height'))
};

$(window).scroll(function () {
    var scrollTopBtn = $('a.scroll-top');

    // .scroll-top button fading.
    if ($(window).scrollTop() > 200) {
        scrollTopBtn.fadeIn(200);
    } else {
        scrollTopBtn.fadeOut(200);
    }

    // .scroll-top button positioning.
    var scrollTopSpace = NS_WIN_SCROLL.scrollTopBottom + NS_WIN_SCROLL.footerHeight;

    if ($(window).scrollTop() + $(window).height() > $(window.document).height() - scrollTopSpace) {
        var offset = $(window).scrollTop() +
            ($(window).height() - $(window.document).height() + scrollTopSpace) +
            NS_WIN_SCROLL.scrollTopBottom;

        scrollTopBtn.css('bottom', offset);
    }
});
