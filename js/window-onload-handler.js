$(window).load(function () {
    var url = window.location.href;
    var file = NS_RELOAD.getURLParameter(url, 'file');
    var anchor = NS_RELOAD.getURLParameter(url, 'anchor');

    if (!file) {
        file = 'f1.html';
    }

    if (!anchor) {
        anchor = 'top';
    }

    NS_RELOAD.loadContent(file, anchor, true);

    $('span.year').html(new Date().getFullYear());
});
