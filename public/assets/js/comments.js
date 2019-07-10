//获取评论列表
$.ajax({
    type: "get",
    url: "/comments",
    success: function(response) {
        console.log(response)
        var html = template("tel", { doc: response })
        $("#box").html(html)

        var page = template("del", { doc: response })
        $("#fuqin").html(page)
    }
});

//定义列表分页的那个函数
function changpage(page) {
    $.ajax({
        type: "get",
        url: "/comments",
        // 第一个page是服务端需要传过去的参数  第二个是这个函数的形参
        // 也就是客户端实参的那个$value
        data: {
            page: page
        },
        success: function(response) {
            // console.log(response)
            var html = template("tel", { doc: response })
            $("#box").html(html)

            var page = template("del", { doc: response })
            $("#fuqin").html(page)
        }
    });
}

//时间格式化
template.defaults.imports.xixixi = function(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}


//实现评论审核功能
$("#box").on("click", ".dianji", function() {
    var states = $(this).attr("data-state")
    var id = $(this).attr("data-id")
    $.ajax({
        type: "put",
        url: "/comments/" + id,
        data: {
            state: states == 0 ? 1 : 0
        },
        success: function(response) {
            location.reload()
        }
    });
})

//实现评论删除功能
$("#box").on("click", ".shanchu", function() {
    var id = $(this).attr("data-id")

    if (confirm("确定删除吗")) {
        $.ajax({
            type: "delete",
            url: "/comments/" + id,
            success: function(response) {
                location.reload()
            }
        });


    }
})