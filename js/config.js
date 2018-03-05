var NS_CONFIG = {};

NS_CONFIG.templatesPath = './templates/';
NS_CONFIG.scrollSpeed = 500;
NS_CONFIG.scrollOffset = -20;
NS_CONFIG.readyStateCheckInterval = 100;
NS_CONFIG.defaultContentFile = 'f1.html';
NS_CONFIG.defaultAnchor = 'top';
NS_CONFIG.navbarActiveElementSelector = 'nav.navbar li.active a';

// noinspection JSUnusedLocalSymbols
/**
 * Use this function to define which navigation bar element should be highlighted when user requests page with specific
 * file and anchor.
 */
NS_CONFIG.getNavbarItemIdForPage = function (file, anchor, isHtmlSame) {
    var navbarItemId = null;

    if (isHtmlSame) {
        if (anchor === 'anchor1') {
            navbarItemId = 'nav-a1';
        } else if (anchor === 'anchor2') {
            navbarItemId = 'nav-a2';
        } else if (anchor === 'anchor3') {
            navbarItemId = 'nav-a3';
        }
    } else {
        if (file === 'f1.html') {
            navbarItemId = 'nav-p1top';
        } else if (file === 'f2.html') {
            navbarItemId = 'nav-p2a2';
        } else if (file === 'f3.html') {
            navbarItemId = 'nav-p3top';
        }
    }

    return navbarItemId;
};

// noinspection JSUnusedLocalSymbols
/**
 * Use this function to define what should be done after the browser history state changed.
 */
NS_CONFIG.whenStateChanged = function (file, anchor, isHtmlSame) {
    // Turn on bootstrap carousel auto play
    // if (file === 'file_with_carousel.html') {
    //    $('.carousel').carousel();
    // }
};
