$(window).load(function () {
    var url = window.location.href;

    var targetFile = store.get('targetFile');

    if (!targetFile) {
        targetFile = NS_RELOAD.getURLParameter(url, 'file');

        if (!targetFile) {
            targetFile = NS_CONFIG.defaultContentFile;
        }
    }

    var targetAnchor = store.get('targetAnchor');

    if (!targetAnchor) {
        targetAnchor = NS_RELOAD.getURLParameter(url, 'anchor');

        if (!targetAnchor) {
            targetAnchor = NS_CONFIG.defaultAnchor;
        }
    }

    NS_RELOAD.loadContent(targetFile, targetAnchor, true);

    var navbarItemId = store.get('navbarItemId');

    if (!navbarItemId) {
        navbarItemId = NS_CONFIG.getNavbarItemIdForPage(targetFile, targetAnchor);
    }

    if (navbarItemId) {
        NS_CONFIG.navbarChangeActive(navbarItemId);
    }

    $('span.year').html(new Date().getFullYear());

    store.remove('targetFile');
    store.remove('targetAnchor');
    store.remove('navbarItemId');
});
