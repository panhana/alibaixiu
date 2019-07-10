// 获取地址栏传过来的id
var dizhilan = huoqu("id")
    // console.log(dizhilan)

// 根据分类获取文章列表
$.ajax({
    type: "get",
    url: "/posts/category/" + dizhilan,
    success: function(response) {
        // console.log(response)

        var html = template("del", { doc: response })
            // console.log(html)
        $("#fenglei").html(html)
    }
});

//根据id查询分类
$.ajax({
    type: "get",
    url: "/categories/" + dizhilan,
    success: function(response) {
        // console.log(response)
        $("#chaxun").html(response.title)
    }
});

// 给点赞绑定事件委托点击事件
//这里id是传的具体文章页的id  不是地址栏根据分类查询文章的id
$("#fenglei").on("click", ".zan", function() {
    var id = $(this).attr("data-id")
    $.ajax({
        type: "post",
        url: "/posts/fabulous/" + id,
        success: function(response) {
            alert("点赞成功")
            location.reload()
        }
    });
})