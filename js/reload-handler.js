var NS_RELOAD = {};

NS_RELOAD.pushHistoryState = function (file, html, anchor, replaceState) {
    var url = '?file=' + file + '&anchor=' + anchor;

    if (!html) {
        html = $('div.content').html();
    }

    var activeNavbarItemId = $('div.header').find('a.active').attr('id');
    var stateData = {
        html: html,
        anchor: anchor,
        activeNavbarItemId: activeNavbarItemId,
        randomData: Math.random()
    };

    if (replaceState) {
        History.replaceState(stateData, window.document.title, url);
    } else {
        History.pushState(stateData, window.document.title, url);
    }
};

NS_RELOAD.loadContent = function (file, anchor, replaceState) {
    $.get(NS_CONFIG.templatesPath + file, function (html) {
        NS_RELOAD.pushHistoryState(file, html, anchor, replaceState);
    });
};

NS_RELOAD.getURLParameter = function (url, parameter) {
    var regExp = new RegExp(parameter + '=([^&#]*)');
    var encodedResults = regExp.exec(url);

    if (encodedResults) {
        return decodeURIComponent(encodedResults[1]);
    }

    return null;
};

NS_RELOAD.scrollTo = function (anchor) {
    setTimeout(function () {
        var animateParams = {scrollTop: 0};
        var anchorElement = $('#' + anchor);

        if (typeof anchorElement.offset() !== 'undefined') {
            // noinspection JSSuspiciousNameCombination
            animateParams.scrollTop = Math.round(anchorElement.offset().top) + NS_CONFIG.scrollOffset;
        }

        $('html, body').animate(animateParams, NS_CONFIG.scrollSpeed);
    }, 0);
};

NS_RELOAD.navbarChangeActive = function (callerId) {
    $('div.header').find('a.active').removeClass('active');

    $('#' + callerId).addClass('active');
};


$('body').on('click mousedown', 'a[href^=\\#]:not(.ignore)', function (event) {
    var targetFile = $(this).data('file');
    var targetAnchor = this.hash.replace('#', '');
    var isNavbarItem = this.className.indexOf('navbar-item') >= 0;

    if (event.type === 'click') {
        event.preventDefault();

        if (isNavbarItem) {
            NS_RELOAD.navbarChangeActive(this.id);
        }

        var currentFile = NS_RELOAD.getURLParameter(window.location.href, 'file');

        if (!targetFile || targetFile === currentFile) {
            NS_RELOAD.pushHistoryState(currentFile, null, targetAnchor, false);
        } else {
            NS_RELOAD.loadContent(targetFile, targetAnchor, false);
        }
    } else if (event.which !== 1) {
        if (targetFile) {
            localStorage.setItem('targetFile', targetFile);
        }

        if (targetAnchor) {
            localStorage.setItem('targetAnchor', targetAnchor);
        }

        if (isNavbarItem && this.id) {
            localStorage.setItem('navbarItemId', this.id);
        }
    }
});

History.Adapter.bind(window, 'statechange', function () {
    var state = History.getState();

    if (state.data.html) {
        $('div.content').html(state.data.html);
    }

    if (state.data.anchor) {
        NS_RELOAD.scrollTo(state.data.anchor);
    }

    if (state.data.activeNavbarItemId) {
        NS_RELOAD.navbarChangeActive(state.data.activeNavbarItemId);
    }
});
