$.ajax({
    type: "get",
    url: "/posts/recommend",
    success: function(response) {
        // console.log(response)


        //这里有多个地方用到 模板拼接搞到js里面用个变量存储

        var bianliang = `
        {{each doc}}
        <li>
            <a href="detail.html?id={{$value._id}}">
                <img src="{{$value.thumbnail}}">
                <span>{{$value.title}}</span>
            </a>
        </li>
        {{/each}}
        `
            //这里要用render模板方法
        var html = template.render(bianliang, { doc: response })
        $("#rementuijian").html(html)
    }
});