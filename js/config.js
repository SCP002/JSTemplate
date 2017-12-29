var NS_CONFIG = {};

NS_CONFIG.templatesPath = './templates/';
NS_CONFIG.scrollSpeed = 500;
NS_CONFIG.scrollOffset = -20;
NS_CONFIG.defaultContentFile = 'f1.html';
NS_CONFIG.defaultAnchor = 'top';

// Use this function to define which navigation bar element should be highlighted when user requests page with specific
// file and anchor.
// noinspection JSUnusedLocalSymbols
NS_CONFIG.getNavbarItemIdForPage = function (file, anchor) {
    var navbarItemId = null;

    if (file === 'f1.html') {
        navbarItemId = 'nav-p1top';
    } else if (file === 'f2.html') {
        navbarItemId = 'nav-p2a2';
    } else if (file === 'f3.html') {
        navbarItemId = 'nav-p3top';
    }

    return navbarItemId;
};

// Use this function to define what should be done after the content file was loaded.
// noinspection JSUnusedLocalSymbols
NS_CONFIG.whenContentLoaded = function (file, anchor) {
    // Turn on bootstrap carousel auto play
    if (file === 'file_with_carousel.html') {
        $('.carousel').carousel();
    }

    // ...
};
