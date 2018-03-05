var NS_SCROLL = {};

NS_SCROLL.scrollTopElement = $('a.scroll-top');
NS_SCROLL.scrollTopBottom = parseInt(NS_SCROLL.scrollTopElement.css('bottom'));
NS_SCROLL.footerHeight = parseInt($('div.footer').css('height'));
NS_SCROLL.autoScrollInProcess = false;

NS_SCROLL.scrollTo = function (anchor) {
    var interval = setInterval(function () {
        if (window.document.readyState === 'complete') {
            var animateProperties = {scrollTop: 0};
            var animateOptions = {
                duration: NS_CONFIG.scrollSpeed,
                always: function () {
                    NS_SCROLL.autoScrollInProcess = false;
                }
            };
            var anchorElement = $('#' + anchor);

            if (typeof anchorElement.offset() !== 'undefined') {
                // noinspection JSSuspiciousNameCombination
                animateProperties.scrollTop = Math.round(anchorElement.offset().top) + NS_CONFIG.scrollOffset;
            }

            NS_SCROLL.autoScrollInProcess = true;

            $('html, body').animate(animateProperties, animateOptions);

            clearInterval(interval);
        }
    }, NS_CONFIG.readyStateCheckInterval);
};


$(window).on('mousewheel', function () {
    if (NS_SCROLL.autoScrollInProcess) {
        $('html, body').stop();
    }
});


$(window).on('scroll', function () {
    // .scroll-top button fading.
    if ($(window).scrollTop() > 200) {
        NS_SCROLL.scrollTopElement.fadeIn(200);
    } else {
        NS_SCROLL.scrollTopElement.fadeOut(200);
    }

    // .scroll-top button positioning.
    var scrollTopSpace = NS_SCROLL.scrollTopBottom + NS_SCROLL.footerHeight;

    if ($(window).scrollTop() + $(window).height() > $(window.document).height() - scrollTopSpace) {
        var offset = $(window).scrollTop() +
            ($(window).height() - $(window.document).height() + scrollTopSpace) +
            NS_SCROLL.scrollTopBottom;

        NS_SCROLL.scrollTopElement.css('bottom', offset);
    }
});
