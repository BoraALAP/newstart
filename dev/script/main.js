const app = {}
app.list = [];
app.counter = 0;

app.display = (res) => {
    $('.description ul').empty();
    $('.description #ptag').empty();
    $('.description h2').text(res.title);
    

    res.description.forEach(element => {
        $('.description #ptag').append(`<p>${element}</p>`);
    });

    res.list.forEach(element => {
        $('.description ul').append(`<li>${element}</li>`);
    });

    $('.description a').text(res.status).attr("href", `${res.link}`);

    $('#slide_num').text(`${res.id}/${app.list.length}`);
    $('.img_container').css(`background-image`,`url("${res.url}"`);
}

app.enterence = () => {
    $('#enterence').addClass('appear');
    setTimeout(function(){
        $('#enterence').remove();
    },5800)
    setTimeout(function(){
        $('#page').addClass('page_load');
    },5300)
    
}
 
app.slider = () => {
    
    $.ajax({
        url: "public/js/slide.json",
        data: "data",
        dataType: "json",
        success: function (response) {
            app.list = response.slides;
            app.display(app.list[app.counter]);
        }
    });
}

app.events = () => {
    const $header = $('#header');
    const $button = $header.find($('button'));
    const $pop = $('#pop-up');
    const $close = $('#title button');
    
    $button.on("click", function () { 
        if ($(this).is('.active')){
            $button.removeClass("active");
            // $button.each( function() {
            //     $(this).text($(this).data('name'));
            // })
            $pop.removeClass("active");
            setTimeout(function() {
                $(`#pop-up > div`).removeClass("active");
            },800)
        } else {
            $button.removeClass("active");
            $button.each( function() {
                $(this).text($(this).data('name'));
            })
            $(this).addClass("active");
            // $(this).text("Close");
            $pop.addClass("active");

            let data = $(this).data('name');
            $(`#pop-up > div`).removeClass("active");
            // $(`#pop-up > div[data-content="${data}"]`).addClass("active");
            $(`#pop-up > div#${data}`).addClass("active");

            if ($(this).data('name') == "contact") {
                app.initMap();
            }
        }
    });

    $close.on("click", function () {
        $button.removeClass("active");
        $pop.removeClass("active");
        setTimeout(function() {
            $(`#pop-up > div`).removeClass("active");
        },800)
    });

    $('#left_button').on("click", function () { 
        $('#content').addClass('loading');
        setTimeout(function () {
            if(app.counter > 0){
                app.counter--
                app.display(app.list[app.counter]); 
                $('#content').removeClass('loading');
            } else {
                app.counter = app.list.length -1;
                app.display(app.list[app.counter]);
                $('#content').removeClass('loading');   
            }
        },500);
    });


    $('#right_button').on("click", function () { 
        $('#content').addClass('loading');
        setTimeout(function () {
            if(app.counter < app.list.length - 1){
                app.counter++
                app.display(app.list[app.counter]);
                $('#content').removeClass('loading'); 
            } else {
                app.counter = 0;
                app.display(app.list[app.counter]);
                $('#content').removeClass('loading'); 
            } 
        },500);
    });

}

app.initMap = () => {
    const center = {lat: 43.6479327, lng: -79.3690824};
    
    let map = (options) => {
        map = new google.maps.Map(document.getElementById('map'), {
            center: center,
            zoom: 16,
            styles: options
        });

        
        var marker = new google.maps.Marker({
            position: center,
            map: map
        });
    }   
    
    $.ajax({
        url: "public/js/map.json",
        data: "data",
        dataType: "JSON",
        success: function (response) {
            map(response);
        }
    });
}

app.init = () => {
    app.slider(); 
    app.enterence();
}



$(function() {
    app.init();
    app.events();
});
