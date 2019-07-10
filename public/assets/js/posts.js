//获取文章列表数据
$.ajax({
    type: "get",
    url: "/posts",
    success: function(response) {
        // console.log(response)
        var html = template("tel", { doc: response })
            // console.log(html)
        $("#box").html(html)
            //在页面展示分页页码
        var page = template("del", response)
        $("#page").html(page)
    }
});

// template.defaults.imports.dateFormat = function () {
//     date = new Date(date);
//     return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
// };

// 处理日期时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}


//处理分页调用的那个函数
function changpage(page) {
    // console.log(page)
    // alert(page)
    //获取文章列表数据
    $.ajax({
        type: "get",
        url: "/posts",
        data: {
            page: page
        },
        success: function(response) {
            // console.log(response)
            var html = template("tel", { doc: response })
                // console.log(html)
            $("#box").html(html)
                //在页面展示分页页码
            var page = template("del", response)
            $("#page").html(page)
        }
    });
}
//(文章筛选)
//查询文章分类列表
$.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        console.log(response)
        var html = template("del1", { doc: response })
        $("#xiala").html(html);
    }
});

$("#shaixuan").on("submit", function() {
    var formData = $(this).serialize();
    // console.log(formData)
    // 根据条件索要文章列表数据
    $.ajax({
        type: "get",
        url: "/posts",
        data: formData,
        success: function(response) {
            // console.log(response)
            var html = template("tel", { doc: response })
                // console.log(html)
            $("#box").html(html)
                //在页面展示分页页码
            var page = template("del", response)
            $("#page").html(page)
        }
    })
    return false
})


//实现删除
$("#box").on("click", ".shanchu", function() {
    if (confirm("确定删除吗")) {
        var id = $(this).attr("data-id")
        $.ajax({
            type: "delete",
            url: "/posts/" + id,
            success: function(response) {
                location.reload()
            }
        });
    }
})