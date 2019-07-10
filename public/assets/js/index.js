//查询文章数量
$.ajax({
    type: "get",
    url: "/posts/count",
    success: function(response) {
        // console.log(response)
        $("#wenzhang").html(response.postCount)
        $("#caogao").html(response.draftCount)
    }
});

//查询分类数量
$.ajax({
    type: "get",
    url: "/categories/count",
    success: function(response) {
        $("#fenglei").html(response.categoryCount)
    }
});

//查询评论数量
$.ajax({
    type: "get",
    url: "/comments/count",
    success: function(response) {
        $("#pl").html(response.commentCount)
    }
});