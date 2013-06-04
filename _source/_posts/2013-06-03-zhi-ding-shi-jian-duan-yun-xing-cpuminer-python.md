---
layout: post
title: "指定时间段运行cpuminer(Python)"
date: 2013-06-03 13:21
categories: tech
---

利用空闲的内网服务器折腾[litecoin](http://litecoin.org/zh_HANS),但这东西太耗CPU资源了,不方便白天运行.  
所以有了如下的Python2脚本,指定时间段运行[cpuminer](https://github.com/pooler/cpuminer), 定时启动与关闭cpuminer.

```python
import shlex
from datetime import datetime, time
import time as atime
from subprocess import Popen

BEGIN_HOUR = 18
END_HOUR = 7
minerd_process = None


def run_minerd():
    command_line = ('sh -c "./minerd -o http://mine.pool-x.eu:8337/'
                    ' -O cxh116.public:x -t 6 >> l.log 2>&1"')
    args = shlex.split(command_line)
    global minerd_process
    minerd_process = Popen(args)


def check_time():
    begin_time = time(BEGIN_HOUR)
    end_time = time(END_HOUR)
    current_time = datetime.now().time()
    if BEGIN_HOUR > END_HOUR:
        if current_time > begin_time or current_time < end_time:
            return True
        else:
            return False
    else:
        if current_time > begin_time and current_time < end_time:
            return True
        else:
            return False


def start():
    global minerd_process
    if check_time() and (minerd_process is None):
        run_minerd()


def stop():
    global minerd_process
    if (not check_time()) and (minerd_process is not None):
        if minerd_process.poll() is None:
            minerd_process.kill()
        minerd_process = None


def scheduler():
    while True:
        start()
        stop()
        atime.sleep(60*3)

scheduler()
```
