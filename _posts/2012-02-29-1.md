---
layout: post
title: "Ruby的Block与控制结构变量作用域小差别"
date: 2012-02-29 23:04
categories: tech
---

在方法中,Block是新作用域,而控制结构还是方法的作用域.

```ruby
def foo
  while true #控制结构
    i = 10
    break
  end
  puts i #正常输出10

  [1].map{ j = 100 }
  puts j #undefined local variable 错误 
end

foo
```
