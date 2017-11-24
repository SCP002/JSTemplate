$(window).load(function () {
    var url = window.location.href;
    var file = NS_RELOAD.getURLParameter(url, 'file');
    var anchor = NS_RELOAD.getURLParameter(url, 'anchor');

    if (!file) {
        file = NS_CONFIG.defaultContentFile;
    }

    if (!anchor) {
        anchor = NS_CONFIG.defaultAnchor;
    }

    NS_RELOAD.loadContent(file, anchor, true);

    $('span.year').html(new Date().getFullYear());
});
