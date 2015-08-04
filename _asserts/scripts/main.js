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

    var now_seconds =  $.now();
    var day_seconds = 3600*24*1000;
    var events_source = [
        {
            "id": 293,
            "title": "￥1999元",
            "start": now_seconds, // Milliseconds
            "end": now_seconds + 3600 // Milliseconds
        },

        {
            "id": 295,
            "title": "￥1999元",
            "start": now_seconds + day_seconds, // Milliseconds
            "end": now_seconds + day_seconds + 3600 // Milliseconds
        },

        {
            "id": 296,
            "title": "￥1999元",
            "start": now_seconds + 2*day_seconds, // Milliseconds
            "end": now_seconds + 2*day_seconds + 3600 // Milliseconds
        },

        {
            "id": 297,
            "title": "￥1999元",
            "start": now_seconds + 3*day_seconds, // Milliseconds
            "end": now_seconds + 3*day_seconds + 3600 // Milliseconds
        },

        {
            "id": 298,
            "title": "￥1999元",
            "start": now_seconds + 4*day_seconds, // Milliseconds
            "end": now_seconds + 4*day_seconds + 3600 // Milliseconds
        }
    ]

    var options = {
        events_source: events_source,
        view: 'month',
        tmpl_path: 'tmpls/',
        tmpl_cache: false,
        onAfterEventsLoad: function(events) {
            // if(!events) {
            //     return;
            // }
            // var list = $('#eventlist');
            // list.html('');

            // $.each(events, function(key, val) {
            //     $(document.createElement('li'))
            //         .html('<a href="' + val.url + '">' + val.title + '</a>')
            //         .appendTo(list);
            // });
        },
        onAfterViewLoad: function(view) {
            $('.page-header h3').text(this.getTitle());
        },
        classes: {
            months: {
                general: 'label'
            }
        }
    };

    var calendar = $('#calendar').calendar(options);

    

    if(calendar){
        $('.calendar-nav').click(function(){
            var $this = $(this);
            calendar.navigate($this.data('calendar-nav'));
        });

        calendar.setLanguage('zh-CN');
        calendar.setOptions({weekbox: false});
        calendar.view();
    }
});
