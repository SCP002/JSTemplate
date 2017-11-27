$(window).load(function () {
    var url = window.location.href;

    var targetFile = localStorage.getItem('targetFile');

    if (!targetFile) {
        targetFile = NS_RELOAD.getURLParameter(url, 'file');

        if (!targetFile) {
            targetFile = NS_CONFIG.defaultContentFile;
        }
    }

    var targetAnchor = localStorage.getItem('targetAnchor');

    if (!targetAnchor) {
        targetAnchor = NS_RELOAD.getURLParameter(url, 'anchor');

        if (!targetAnchor) {
            targetAnchor = NS_CONFIG.defaultAnchor;
        }
    }

    NS_RELOAD.loadContent(targetFile, targetAnchor, true);

    $('span.year').html(new Date().getFullYear());

    localStorage.removeItem('targetFile');
    localStorage.removeItem('targetAnchor');
});
