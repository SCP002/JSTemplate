var NS_RELOAD = {
    loadContent: function (file, anchor, replaceState) {
        var url = '?file=' + file + '&anchor=' + anchor;

        $.get(NS_CONFIG.templatesPath + file, function (html) {
            var stateData = {html: html, anchor: anchor, randomData: window.Math.random()};

            if (replaceState) {
                History.replaceState(stateData, window.document.title, url);
            } else {
                History.pushState(stateData, window.document.title, url);
            }
        });
    },

    pushHistoryState: function (file, anchor) {
        var url = '?file=' + file + '&anchor=' + anchor;
        var html = $('div.content').html();
        var stateData = {html: html, anchor: anchor, randomData: window.Math.random()};

        History.pushState(stateData, window.document.title, url);
    },

    getURLParameter: function (url, parameter) {
        var regExp = new RegExp(parameter + '=([^&#]*)');
        var encodedResults = regExp.exec(url);

        if (encodedResults) {
            return decodeURIComponent(encodedResults[1]);
        }

        return null;
    },

    scrollTo: function (anchor) {
        var animateParams = {scrollTop: 0};
        var anchorElement = $('#' + anchor);

        if (typeof anchorElement.offset() !== 'undefined') {
            animateParams.scrollTop = anchorElement.offset().top + NS_CONFIG.scrollOffset;
        }

        $('html, body').animate(animateParams, NS_CONFIG.scrollSpeed);
    },

    navbarChangeActive: function (callerId) {
        $('div.header').find('a.active').removeClass('active');

        $('#' + callerId).addClass('active');
    }
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
            NS_RELOAD.pushHistoryState(currentFile, targetAnchor);
        } else {
            NS_RELOAD.loadContent(targetFile, targetAnchor, false);
        }
    } else if (event.which !== 1) {
        localStorage.setItem('targetFile', targetFile);
        localStorage.setItem('targetAnchor', targetAnchor);

        if (isNavbarItem) {
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
});
