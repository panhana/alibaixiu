//想服务端发送请求  查询下拉框分类列表
$.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        var html = template("tel", { doc: response })
        $("#category").html(html)
    },
    error: function() {
        alert("出错了")
    }
});



// 实现图像二进制上传 监听文件上传 onchange事件
$("#feature").on("change", function() {
    var formData = new FormData()
    formData.set("avater", this.files[0])
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log(response)
            $("#thumbnail").val(response[0].avater)
        }
    });
})

//向服务端发送添加文章的请求

$("#tijiao").on("submit", function() {
    var formData = $(this).serialize();
    // console.log(formData)
    $.ajax({
        type: "post",
        url: "/posts",
        data: formData,
        success: function(response) {
            // 文章添加成功 跳转到文章列表页面
            location.href = '/admin/posts.html'
        }
    });
    return false
})


var id = huoqu("id");

if (id != -1) {
    //就调用ajax请求 根据id获取文章信息
    $.ajax({
        type: "get",
        url: "/posts/" + id,
        success: function(response) {
            //这个ajax请求是获取下拉框的那个请求
            $.ajax({
                type: "get",
                url: "/categories",
                success: function(categories) {
                    response.categories = categories;
                    // console.log(categories)
                    var html = template("del", response)
                        //这里添加到父元素的时候得重新创一个div 不然会覆盖的前面那两个写文章什么的
                    $("#fu").html(html)
                        // console.log(html)
                },
                error: function() {
                    alert("出错了")
                }
            });
        }
    });
}
//声明一个获取地址栏参数的函数
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

// 表单修改后提交
$("#yeye").on("submit", "#xiugai", function() {
    var formData = $(this).serialize();
    var id = $(this).attr("data-id")

    $.ajax({
        type: "put",
        url: "/posts/" + id,
        data: formData,
        success: function(response) {
            location.href = "/admin/posts.html"
        }
    });
    return false
})