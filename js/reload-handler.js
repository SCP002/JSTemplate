var NS_RELOAD = {
    pageTitle: 'JSTemplate',

    loadContent: function (file, anchor, replaceState) {
        var url = '?file=' + file + '&anchor=' + anchor;
        var templatesPath = '/templates/';

        $.get(templatesPath + file, function (html) {
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
        var offset = $('#' + anchor).offset();

        if (typeof offset !== 'undefined') {
            animateParams.scrollTop = offset.top - 20;
        }

        $('html, body').animate(animateParams, 500);
    }
};

/**
 Selector: Every <a> element, which not contain class 'ignore' and have a href attribute, value of which starts with #.
 */
$('body').on('click', 'a[href^=\\#]:not(.ignore)', function (event) {
    event.preventDefault();

    var anchor = this.hash.replace('#', '');
    var file = $(this).data('file');

    if (!file) {
        file = NS_RELOAD.getURLParameter(window.location.href, 'file');

        NS_RELOAD.pushHistoryState(file, anchor);
    } else {
        NS_RELOAD.loadContent(file, anchor, false);
    }
});

History.Adapter.bind(window, 'statechange', function () {
    var state = History.getState();

    if (!window.document.title) {
        window.document.title = NS_RELOAD.pageTitle;
    }

    if (state.data.html) {
        $('div.content').html(state.data.html);
    }

    if (state.data.anchor) {
        NS_RELOAD.scrollTo(state.data.anchor);
    }
});
