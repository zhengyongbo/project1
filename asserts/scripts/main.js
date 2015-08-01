$(function() {
    $.material.init();

    $('#my-tab a').click(function(e) {
        e.preventDefault();
        var $this = $(this);
        $this.addClass('active').siblings().removeClass('active');
        $(this).tab('show');
    });

    $('#go-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 600);
        return false;
    });
});
