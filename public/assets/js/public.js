//获取随机推荐数据
$.ajax({
    type: "get",
    url: "/posts/random",
    success: function(response) {
        // console.log(response)
        var bianliang = `
        {{each doc}}
    <li>
        <a href="detail.html?id={{$value._id}}">
            <p class="title">{{$value.title}}</p>
            <p class="reading">阅读({{$value.meta.views}})</p>
            <div class="pic">
                <img src="{{$value.thumbnail}}">
            </div>
        </a>
    </li>
        {{/each}}   
        `
        var html = template.render(bianliang, { doc: response })
        $("#baba").html(html)
    }
});


//获取最新评论数据
$.ajax({
    type: "get",
    url: "/comments/lasted",
    success: function(response) {
        // console.log(response)

        var bianliang = `
        {{each doc}}
        <li>
            <a href="detail.html?id={{$value._id}}">
                <div class="avatar">
                    <img src="{{$value.author.avatar}}" alt="">
                </div>
                <div class="txt">
                    <p>
                        <span>{{$value.author.nickName}}</span>{{Formdata($value.author.createTime)}}说:
                    </p>
                    <p>{{$value.content}}</p>
                </div>
            </a>
        </li>
        {{/each}}
    `
        var html = template.render(bianliang, { doc: response })
        $("#babababa").html(html)

    }
});
// 处理日期格式
template.defaults.imports.Formdata = function(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
};

// 边上导航功能展示
// 页面用的是响应式编程，当页面缩小的时候，导航栏会相应的切换，所以我们需要给两个导航栏里面渲染内容
$.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        // console.log(response)

        var bianliang = `
        {{each doc}}
        <li><a href="list.html?id={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
        {{/each}}
        `
        var html = template.render(bianliang, { doc: response })
        $("#yeye").html(html)

        $("#yeyeye").html(html)
    }
});

function huoqu(name) {
    var paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    return -1;
}

//为搜索表单写提交事件
$("#sousuo").on("submit", function() {
        // 获取到用户在表单中输入的搜索关键字
        var keys = $(this).find('.keys').val();
        // 跳转到搜索结果页面 并且将用户输入的搜索关键字传递到搜索结果页面
        location.href = "/search.html?key=" + keys
            // 阻止表单默认提交行为
        return false
    })
    // 然后这个后面代码去search看