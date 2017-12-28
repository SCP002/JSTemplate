var NS_WIN_SCROLL = {};

NS_WIN_SCROLL.scrollTopElement = $('a.scroll-top');
NS_WIN_SCROLL.scrollTopBottom = parseInt(NS_WIN_SCROLL.scrollTopElement.css('bottom'));
NS_WIN_SCROLL.footerHeight = parseInt($('div.footer').css('height'));


$(window).scroll(function () {
    // .scroll-top button fading.
    if ($(window).scrollTop() > 200) {
        NS_WIN_SCROLL.scrollTopElement.fadeIn(200);
    } else {
        NS_WIN_SCROLL.scrollTopElement.fadeOut(200);
    }

    // .scroll-top button positioning.
    var scrollTopSpace = NS_WIN_SCROLL.scrollTopBottom + NS_WIN_SCROLL.footerHeight;

    if ($(window).scrollTop() + $(window).height() > $(window.document).height() - scrollTopSpace) {
        var offset = $(window).scrollTop() +
            ($(window).height() - $(window.document).height() + scrollTopSpace) +
            NS_WIN_SCROLL.scrollTopBottom;

        NS_WIN_SCROLL.scrollTopElement.css('bottom', offset);
    }
});
