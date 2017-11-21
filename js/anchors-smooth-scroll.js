var NS_ANCHORS = {
    scrollTo: function (hash) {
        var animateParams = {scrollTop: 0};
        var offset = $(hash).offset();

        if (typeof offset !== 'undefined') {
            animateParams.scrollTop = offset.top - 20;
        }

        $('html, body').animate(animateParams, 500);
    }
};

$('body').on('click', 'a[href^=\\#]:not([data-file], .no-scroll)', function (event) {
    event.preventDefault();

    var file = NS_RELOAD.getURLParameter(window.location.href, 'file');
    var url = '?file=' + file + '&anchor=' + this.hash.replace('#', '');

    History.pushState({html: null, hash: this.hash, randomData: window.Math.random()}, window.document.title, url);
});
