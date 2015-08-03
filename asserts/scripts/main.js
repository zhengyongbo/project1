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

    var shorPrice = document.getElementById('shor-price');

    if(shorPrice){
        noUiSlider.create(shorPrice, {
            start: 2000,
            connect: "lower",
            range: {
                'min': [  0 ],
                '12.5%': [  500 ],
                '25%': [  1000 ],
                '37.5%': [ 2000 ],
                'max': [8000]
            }
        });
    }

    var shorDay = document.getElementById('shor-day');

    if(shorDay){
        noUiSlider.create(shorDay, {
            start: 2000,
            connect: "lower",
            range: {
                'min': [  0 ],
                '12.5%': [  500 ],
                '25%': [  1000 ],
                '37.5%': [ 2000 ],
                'max': [8000]
            }
        });
    }
});
