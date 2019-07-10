//监听图片上传功能
$("#image").on("change", function() {
    var formData = new FormData()
    formData.set("heihei", this.files[0])
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log(response)
            $("#imagehidden").val(response[0].heihei)
                // var imgpath = response[0].heihei;
                // console.log(imgpath)
        }
    });
})


//实现轮播图添加
$("#tianjiao").on("submit", function() {
    var formData = $(this).serialize()

    $.ajax({
        type: "post",
        url: "/slides",
        data: formData,
        success: function(response) {
            location.reload()
        }
    });
    return false
})

//获取轮播图数据展示

$.ajax({
    type: "get",
    url: "/slides",
    success: function(response) {
        console.log(response)

        var html = template("tel", { doc: response })

        $("#box").html(html)
    }
});

//实现轮播图删除功能

$("#box").on("click", ".shanchu", function() {

    var id = $(this).attr("data-id")

    $.ajax({
        type: "delete",
        url: "/slides/" + id,
        success: function(response) {
            // console.log(response)
            location.reload()
        }
    });


})