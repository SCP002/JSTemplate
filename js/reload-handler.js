var NS_RELOAD = {
    loadContent: function (file) {
        return $.get(file, function (data) {
            $('div.content').html(data);
        });
    }
};

$('body').on('click', 'a.reload', function (event) {
    event.preventDefault();

    var hash = this.hash;
    var file = $(this).data('file');

    NS_RELOAD.loadContent(file).success(function () {
        NS_ANCHORS.scrollTo(hash);
    });
});
