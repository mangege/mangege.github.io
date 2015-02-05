---
layout: post
title: "一个由IE8'显示友好 http 错误信息'引起的BUG"
date: 2012-09-24 21:02
categories: tech
---

使用[jQuery Form Plugin](http://www.malsup.com/jquery/form/)上传文件,在IE8下会临时创建一个iframe用于form提交.而就是由这个iframe可能会引发两个BUG

显示文件下载对话框
---
当html response head的content type设置成IE不支持(没有关联处理程序)会像"application/octet-stream"二进制类型显示下载对话框.

解决办法: 设置content type为"text/plain",为了保险同时设置jQuery Form Plugin的[dataType](http://www.malsup.com/jquery/form/#options-object)参数为你的正确类型.

response status 500时出错
---
重现这个Bug环境需要IE8,同时把浏览器设置"显示友好 http 错误信息"勾上.  
另外当上传出错时,response的status设置为500,同时响应内容字节不能超过512字节.当内容小于512字节时,IE8会显示友好错误. [https://github.com/malsup/form/issues/214#issuecomment-8189245](https://github.com/malsup/form/issues/214#issuecomment-8189245)
这样当错误提示内容小于512,同时选中显示友好http错误信息,上传正常出错时就会无法正常处理.

解决办法: 把错误主体内容用空白或其它字符填充,直大于512.例如Rails:  
`render :json => {:msg => 'error', :noop => ' '*512}, :status => 500, :content_type => Mime::TEXT`
