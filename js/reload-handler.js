var NS_RELOAD = {
    loadContent: function (file, hash) {
        var title = 'Page Title';
        var url = '?file=' + file + '&anchor=' + hash.replace('#', '');

        $.get(file, function (html) {
            History.pushState({html: html, hash: hash}, title, url);
        });
    },

    getURLParameter: function (url, parameter) {
        var result = new RegExp(parameter + '=([^&]*)').exec(url.substring(1));

        if (result) {
            return decodeURIComponent(result[1]);
        }

        return null;
    }
};

$('body').on('click', 'a.reload', function (event) {
    event.preventDefault();

    var hash = this.hash;
    var file = $(this).data('file');

    NS_RELOAD.loadContent(file, hash);
});

History.Adapter.bind(window, 'statechange', function () {
    var state = History.getState();
    var divContent = $('div.content');

    if (state.data.html === null) {
        NS_ANCHORS.scrollTo(state.data.hash);
    } else {
        divContent.html(state.data.html);

        NS_ANCHORS.scrollTo(state.data.hash);
    }
});
