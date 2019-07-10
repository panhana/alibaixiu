//添加数据
$("#tijiao").on("submit", function() {
    var formData = $(this).serialize();
    // console.log(formData)
    $.ajax({
        type: "post",
        url: "/categories",
        data: formData,
        success: function(response) {
            location.reload()
        }
    });
    return false
})


//利用模块动态渲染
$.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        var html = template("del", { doc: response })
        $("#box").html(html)
    }
});


//实现分类 信息修改
$("#box").on("click", ".bianji", function() {
    var id = $(this).data("id")
    $.ajax({
        type: "get",
        url: "/categories/" + id,
        success: function(response) {
            console.log(response)
            var html = template("tel", response)
            $("#fu").html(html)
        }
    });
})


//实现了文章修改提交功能
$("#fu").on("submit", "#tijiao", function() {
    var doc = $(this).serialize()
    var id = $(this).data('id')
        // console.log(id)
    $.ajax({
        type: "put",
        url: "/categories/" + id,
        data: doc,
        success: function(response) {
            location.reload()
        }
    });
    return false
})

$("#box").on("click", ".shanchu", function() {
    if (confirm("确定删除吗")) {
        var id = $(this).attr("data-id")

        $.ajax({

            type: "delete",
            url: "/categories/" + id,
            success: function(response) {
                location.reload()
            },
            error: function() {
                alert("出错啦")
            }
        });


    }
})