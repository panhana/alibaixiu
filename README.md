# 阿里百秀项目

#### 主要练习了ajax请求

**一些常用关于的知识点：**

1. $(this).serialize(); 获取传过去的name值 自动给你拼接  用&符隔开  这里获取的name值表单中的name一定得跟接口文档一致
2. javascript:;  阻止a标签默认跳转
3.  return false 阻止表单事件默认提交
4. location.search 查询获取浏览器地址栏的参数
5.  stbstr（从第几个开始截取，截取多少） 字符串截取
6. template.defaults.imports.Formdata = function (date) {
        date = new Date(date);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    };**处理时间格式化  调用formdata函数**
7. location.reload() 重新刷新页面
8. 监听上传头像有没有发生变化的onchange   以及表单提交的submit事件  图片视频属于二进制 要**new 一个 formdata对象** 进行操作
9. **processData: false,   contentType: false,**上传二进制文件 formdata对象已经配置好了 这里就需要告诉ajax请求
10. function getUrlParams(name) {
    	var paramsAry = location.search.substr(1).split('&');
        	// 循环数据
        	for (var i = 0; i < paramsAry.length; i++) {
        		var tmp = paramsAry[i].split('=');
        		if (tmp[0] == name) {
        			return tmp[1];
        		}
        	}
        	return -1;
    }    调用getUrlParams函数（“地址栏接的key属性    一般都是id”）**从浏览器地址栏获取查询的参数**
11. 上传文件头像时 为了让图像路径存储在数据库中 这里要用到隐藏域     <input type="hidden" name="接口文档中图像对应的值">
12. ajax    response返回的是一个数组就以对象形式拼接  如果就是一个对象，那么第二个参数就是它自己
13. 获取或者监听一个动态渲染出来的元素或属性时   因为代码从上往下执行ajax异步函数请求 需要一定的时间 所以这里一定要用到**事件委托绑定在它父亲身上**
14. 删除用户是弹出一个确认框 confirm  确定为true 
15. script 标签中可以传要跳转的地方
16. 做**分页模块**的时候上一页下一页或者点击数字的时候都是onclick="changpage({{page - 1}})"  这种形式  创建一个函数 函数里面发ajax请求获取
17. **评论模块没有做  添加不到数据库。。**

采用的也是一个前后端分离的模式，这个项目注重后端管理页面的增加改查，前端页面相当于较少....



