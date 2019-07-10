// 先实现图片上传
$("#logo").on("change", function() {
    var formData = new FormData()
    formData.set("xixi", this.files[0])

    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log(response)
            $("#logos").val(response[0].xixi)
        }
    });
})

//进行网站配置添加功能

$("#baocun").on("submit", function() {

    var formData = $(this).serialize();
    console.log(formData);
    $.ajax({
        type: "post",
        url: "/settings",
        data: formData,
        success: function(response) {
            location.reload()
        }
    });
    return false
})




// 向服务器端发送请求 索要网站设置数据
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(response) {
        // console.log(response)
        if (response) {
            // 将logo地址存储在隐藏域中
            $("#logos").val(response.logo)
                // 将logo显示在页面中 
            $("#img").attr("src", response.logo)
                // 将网站标题显示在页面中
            $("input[name='title']").val(response.title)
                // 将是否开启评论功能显示在页面中
            $("input[name='comment']").prop('checked', response.comment)
                // 将评论是否经过人工审核显示在页面中
            $("input[name='review']").prop('checked', response.review)

        }


        // $("#site_keywords").val(response.keywords)


        // $.fn.itheimaSerialize = function() {
        //     var arr = this.serializeArray();
        //     var $input = $('input[type=radio],input[type=checkbox]', this);
        //     var obj = {};
        //     $.each($input, function() {
        //         if (!obj.hasOwnProperty(this.name)) {
        //             if ($("input[name='" + this.name + "']:checked").length == 0) {
        //                 obj[this.name] = "false";
        //                 arr.push({ name: this.name, value: "false" });
        //             }
        //         }
        //     });
        //     return $.param(arr);
        // };
    }
})