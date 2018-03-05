$(window).on('load', function () {
    var url = window.location.href;

    var targetFile = store.get('targetFile');

    if (!targetFile) {
        targetFile = NS_STATE.getURLParameter(url, 'file');

        if (!targetFile) {
            targetFile = NS_CONFIG.defaultContentFile;
        }
    }

    var targetAnchor = store.get('targetAnchor');

    if (!targetAnchor) {
        targetAnchor = NS_STATE.getURLParameter(url, 'anchor');

        if (!targetAnchor) {
            targetAnchor = NS_CONFIG.defaultAnchor;
        }
    }

    NS_STATE.loadContent(targetFile, targetAnchor, true);

    $('span.year').html(new Date().getFullYear());

    store.remove('targetFile');
    store.remove('targetAnchor');
});
