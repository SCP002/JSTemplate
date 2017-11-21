// TODO: In loadContent() accept anchor instead of hash?

var NS_RELOAD = {
    loadContent: function (file, hash, replaceState) {
        var url = '?file=' + file + '&anchor=' + hash.replace('#', '');
        var templatesPath = '/templates/';

        $.get(templatesPath + file, function (html) {
            var stateData = {html: html, hash: hash, randomData: window.Math.random()};

            if (replaceState) {
                History.replaceState(stateData, window.document.title, url);
            } else {
                History.pushState(stateData, window.document.title, url);
            }
        });
    },

    getURLParameter: function (url, parameter) {
        var result = new RegExp(parameter + '=([^&]*)').exec(url.substring(1));

        if (result) {
            return decodeURIComponent(result[1]);
        }

        return null;
    },

    scrollTo: function (hash) {
        var animateParams = {scrollTop: 0};
        var offset = $(hash).offset();

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

    var hash = this.hash;
    var file = $(this).data('file');

    if (!file) {
        file = NS_RELOAD.getURLParameter(window.location.href, 'file');
    }

    NS_RELOAD.loadContent(file, hash, false);
});

History.Adapter.bind(window, 'statechange', function () {
    var state = History.getState();
    var pageTitle = 'JSTemplate';

    if (!window.document.title) {
        window.document.title = pageTitle;
    }

    if (state.data.html) {
        $('div.content').html(state.data.html);
    }

    if (state.data.hash) {
        NS_RELOAD.scrollTo(state.data.hash);
    }
});
