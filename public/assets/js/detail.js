// 定义一个全局变量 把评论状态里的review导入出来
//评论是否通过人工审核
var review;


//获取地址栏中的id
var dizhilan = huoqu("id")
    // console.log(dizhilan)
    //根据id查询获取文章详细信息 根据id获取文章 
$.ajax({
    type: "get",
    url: "/posts/" + dizhilan,
    success: function(response) {
        console.log(response)
        var html = template("heihei", response)
        $("#fuqin").html(html)
    }
});

//评论功能 获取网站配置
$.ajax({
    type: "GET",
    url: "/settings",
    success: function(response) {
        review = response.review
        console.log(response)
        if (response.comment) {
            var html = template("pinglun")
            $("#comment").html(html);
        }
    }
});


//为评论功能做提交事件 

$("#comment").on("submit", "#tijiao", function() {
    // 评论人id //就是地址栏获取的id 

    // 获取评论的内容
    var content = $(this).find("textarea").val()

    // 评论人的状态
    var state;

    if (review) {
        // 要经过人工审核
        state = 0;
    } else {
        // 不需要经过人工审核
        state = 1;
    }

    // 向服务器端发送请求 执行添加评论操作
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            content: content,
            post: dizhilan,
            state: state
        },
        success: function() {
            alert('评论成功')
            location.reload();
        },
        error: function() {
            alert('评论失败')
        }
    })



    return false
})