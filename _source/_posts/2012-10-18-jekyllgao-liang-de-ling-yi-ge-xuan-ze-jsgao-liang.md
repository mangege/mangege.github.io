---
layout: post
title: "Jekyll高亮的另一个选择:JS高亮"
date: 2012-10-18 21:00
categories: tech
---

[Jekyll](https://github.com/mojombo/jekyll)官方文档指导用户使用[Liquid](http://www.liquidmarkup.org/),再配合[Pygments](http://pygments.org/)实现高亮,但作为markdown的忠实粉丝,怎么能用如此繁锁的语法.

*Liquid代码块写法:*

```no-highlight
{% raw %}
{% highlight ruby %}
def foo
  puts 'foo'
end
{% endhighlight %}
{% endraw %}
```

*markdown [GFM](http://github.github.com/github-flavored-markdown/) fenced code 代码块写法:*

    ```ruby
    def foo
      puts 'foo'
    end
    ```

我相信你一眼就会爱上markdown的写法.

markdown高亮可以用Pygments,也可以用前台JS高亮,由于Jekyll使用redcarpet时定制Pygments高亮复杂度过高,所以我选择了简单的JS高亮.

需要用的到gem包版本

* `gem "jekyll", :git => 'git://github.com/chitsaou/jekyll.git', :branch => 'redcarpet-2.0'`, Jekyll 0.11.0版本不支持redcarpet 2.0以上,官方还没有合并此Pull Request
* `gem "redcarpet", "~> 2.1.1"`, 2.0以上才支持fenced code

修改Jekyll `_config.yml`

```yaml
redcarpet:
  extensions: [fenced_code_blocks]
  render_options:
```

页面引入[highlight.js](http://softwaremaniacs.org/soft/highlight/en/),当然你也可以换成其它的javascript高亮库,但highlight.js支持自动检测语言,而且主题也多.

```html
<link rel="stylesheet" href="http://yandex.st/highlightjs/7.1/styles/default.min.css">
<script src="http://yandex.st/highlightjs/7.1/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
```

最后,调用Jekyll需要加`--redcarpet`参数,例如`jekyll --redcarpet --server --auto`.  
如果问题,可以参考我的Jekyll配置, [https://github.com/mangege/mangege](https://github.com/mangege/mangege)
