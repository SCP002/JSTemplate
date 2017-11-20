var NS_RELOAD = {
    loadContent: function (file, hash, replaceState) {
        var url = '?file=' + file + '&anchor=' + hash.replace('#', '');

        $.get(file, function (html) {
            if (replaceState) {
                History.replaceState({html: html, hash: hash, randomData: window.Math.random()}, document.title, url);
            } else {
                History.pushState({html: html, hash: hash, randomData: window.Math.random()}, document.title, url);
            }
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

    NS_RELOAD.loadContent(file, hash, false);
});

History.Adapter.bind(window, 'statechange', function () {
    var state = History.getState();

    if (state.data.html === null) {
        NS_ANCHORS.scrollTo(state.data.hash);
    } else {
        $('div.content').html(state.data.html);

        NS_ANCHORS.scrollTo(state.data.hash);
    }
});
