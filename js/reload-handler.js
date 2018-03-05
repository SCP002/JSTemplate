var NS_RELOAD = {};

NS_RELOAD.pushHistoryState = function (file, html, anchor, replaceState) {
    var url = '?file=' + file + '&anchor=' + anchor;

    if (!html) {
        html = $('div.content').html();
    }

    var stateData = {
        file: file,
        html: html,
        anchor: anchor,
        randomData: Math.random() // Workaround for https://github.com/browserstate/history.js/issues/293
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

NS_RELOAD.navbarChangeActive = function (callerId) {
    $(NS_CONFIG.navbarActiveElementSelector).parent().removeClass('active');

    $('#' + callerId).parent().addClass('active');
};


$('body').on('click mousedown taphold', 'a[href^=\\#]:not(.ignore)', function (event) {
    var targetFile = $(this).data('file');
    var targetAnchor = this.hash.replace('#', '');

    if (event.type === 'click') {
        event.preventDefault();

        var currentFile = NS_RELOAD.getURLParameter(window.location.href, 'file');

        if (!targetFile || targetFile === currentFile) {
            NS_RELOAD.pushHistoryState(currentFile, null, targetAnchor, false);
        } else {
            NS_RELOAD.loadContent(targetFile, targetAnchor, false);
        }
    } else if (event.type === 'taphold' || event.which !== 1) {
        if (targetFile) {
            store.set('targetFile', targetFile);
        }

        if (targetAnchor) {
            store.set('targetAnchor', targetAnchor);
        }
    }
});

History.Adapter.bind(window, 'statechange', function () {
    var state = History.getState();
    var navbarItemId = NS_CONFIG.getNavbarItemIdForPage(state.data.file, state.data.anchor);

    $('div.content').html(state.data.html);

    NS_SCROLL.scrollTo(state.data.anchor);

    NS_RELOAD.navbarChangeActive(navbarItemId);

    NS_CONFIG.whenStateChanged(state.data.file, state.data.anchor);
});
