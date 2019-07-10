//添加用户
$("#formData").on("submit", function() {
    // 这里是在 new一个 将文件转换成二进制的数据
    var formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/users",
        data: formData,
        success: function(response) {
            location.reload();
        },
        error: function() {
            alert("用户添加失败")
        }
    });
    return false;
})

//监听文件上传  并在页面上预览图像 并利用隐藏域 把图像路径传到数据库
$("#mynewtable").on("change", "#avatar", function() {
    var formData = new FormData()
    formData.set("avatar", this.files[0])
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            $("#preview").attr("src", response[0].avatar)
            $("#hiddenAvatar").val(response[0].avatar)
        }
    });
})


//动态利用模板渲染页面的列表数据
$.ajax({
    type: "get",
    url: "/users/",
    success: function(response) {
        var html = template("doc", { doc: response })
        $("#table").html(html)
    }
});


//修改信息 监听 它下面的编辑按钮 然后再进行模板拼接
//由于ajax请求是异步的 不知道它什么返回 所以这里要利用事件委托
//因为元素的父级没有进行ajax请求
$("#table").on("click", ".edit", function() {
    var id = $(this).attr("data-id")
        // console.log(id)
    $.ajax({
        type: "get",
        url: "/users/" + id,
        success: function(response) {
            // console.log(response)
            var html = template("xiugai", response)
                // console.log(html)
            $("#mynewtable").html(html)
        },
        error: function() {
            alert("编辑失败")
        }
    });
})

//为表单进行提交
$("#mynewtable").on("submit", "#formData", function() {
    var formData = $(this).serialize();
    var id = $(this).attr("data-id")
    $.ajax({
        type: "put",
        url: "/users/" + id,
        data: formData,
        success: function(response) {
            location.reload()
        }
    });
    return false
})

//根据id删除用户

$("#table").on("click", ".delete", function() {
    var id = $(this).attr("data-id")
    if (confirm("确定删除该用户吗")) {
        $.ajax({
            type: "delete",
            url: "/users/" + id,
            success: function(response) {
                location.reload()
            }
        });
    }
})


//点击全选 下面都跟着选中

//获取全选按钮
var selectAll = $("#selectAll")
selectAll.on("change", function() {

    var status = $(this).prop("checked")

    if (status) {
        $("#deleteMany").show()
    } else {
        $("#deleteMany").hide()
    }
    //获取所有用户的状态 并和 全选按钮绑定在一i去
    $("#table").find("input").prop("checked", status)
})

//当用户的checked发生变化时 全选   全选按钮也要跟着勾上
// 因为动态生成的 采用事件委托
$("#table").on("change", ".userStatus", function() {
    //获取所有用户
    var inputs = $("#table").find("input")

    //filter 是过滤的意思 把所有的用户checked选中的用户看能不能跟总个数相等
    //返回满足条件的选项
    if (inputs.length == inputs.filter(":checked").length) {
        selectAll.prop("checked", true)
    } else {
        selectAll.prop("checked", false)
    }

    //被选中按钮的时候长度大于0
    if (inputs.filter(':checked').length > 0) {
        // 显示批量删除按钮
        $("#deleteMany").show()
    } else {
        // 隐藏批量删除按钮
        $("#deleteMany").hide()
    }

})

//点击批量删除按钮
$("#deleteMany").on("click", function() {
    var ids = [];
    var box = $("#table").find("input").filter(":checked")

    box.each(function(index, element) {
        ids.push($(element).attr("data-id"))
    })
    if (confirm("您确定删除吗")) {
        $.ajax({
            type: "delete",
            url: "/users/" + ids.join("-"),
            success: function(response) {
                location.reload()
            }
        });
    }
})