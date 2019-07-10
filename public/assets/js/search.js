var dizhilan = huoqu("key")
console.log(dizhilan)

$.ajax({
    type: "get",
    url: "/posts/search/" + dizhilan,
    success: function(response) {
        console.log(response)

        var html = template("del", { doc: response })
        $("#fenglei").html(html)
    }
});
//注意 这里只有index页面给搜索添加了表单提交事件