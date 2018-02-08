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

/**
 * Use this function to define how navigation bar will change active element. Modify it if you need extra logic.
 */
NS_CONFIG.navbarChangeActive = function (callerId) {
    $(NS_CONFIG.navbarActiveElementSelector).parent().removeClass('active');

    $('#' + callerId).parent().addClass('active');
};

// noinspection JSUnusedLocalSymbols
/**
 * Use this function to define what should be done after the content file was loaded.
 */
NS_CONFIG.whenContentLoaded = function (file, anchor) {
    // Turn on bootstrap carousel auto play
    // if (file === 'file_with_carousel.html') {
    //    $('.carousel').carousel();
    // }
};
