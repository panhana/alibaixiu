//展示 获取 轮播图 列表
$.ajax({
    type: "get",
    url: "/slides",
    success: function(response) {
        // console.log(response)
        var html = template("tel", { data: response })
        $("#box").html(html)


        // 因为轮播数据是动态渲染的 异步会需要时间 所以轮播图函数的代码要放到这里的后面执行
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function(index) {
                // index++;
                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });
        // 上/下一张
        $('.swipe .arrow').on('click', function() {
            var _this = $(this);
            if (_this.is('.prev')) {
                swiper.prev();
            } else if (_this.is('.next')) {
                swiper.next();
            }
        })

    }
});


// 页面最新发布数据展示

$.ajax({
    type: "get",
    url: "/posts/lasted",
    success: function(response) {
        // console.log(response);

        var html = template("del", { doc: response })
        $("#fu").html(html)


    }
});