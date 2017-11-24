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
        var result = new RegExp(parameter + '=([^&]*)').exec(url.substring(1));

        if (result) {
            return decodeURIComponent(result[1]);
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
    }
};

$('body').on('click', 'a[href^=\\#]:not(.ignore)', function (event) {
    event.preventDefault();

    var anchor = this.hash.replace('#', '');
    var targetFile = $(this).data('file');
    var currentFile = NS_RELOAD.getURLParameter(window.location.href, 'file');

    if (!targetFile || targetFile === currentFile) {
        NS_RELOAD.pushHistoryState(currentFile, anchor);
    } else {
        NS_RELOAD.loadContent(targetFile, anchor, false);
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
