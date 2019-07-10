$("#btn").on("click", function() {
    var qwe = confirm("您确定要退出吗")
    if (qwe == true) {
        $.ajax({
            type: "post",
            url: "/logout",
            success: function(response) {
                location.href = "login.html"
            },
            error: function() {
                alert("退出失败")
            }
        });
    }
})


$.ajax({
    type: "get",
    url: "/users/" + userId,
    success: function(response) {
        // console.log(response)
        $(".avatar").attr("src", response.avatar)
        $(".name").html(response.nickName)
    }
});