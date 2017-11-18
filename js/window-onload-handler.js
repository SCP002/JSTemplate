$(window).load(function () {
    NS_RELOAD.loadContent('f1.html');

    $('span.year').html(new Date().getFullYear());
});
