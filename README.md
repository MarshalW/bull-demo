# Bull使用示例

演示在生产环境下如何使用Bull。

## Bull示例依赖的环境

[Bull](https://github.com/OptimalBits/bull)是基于Redis的任务（Job）和消息（Message）服务。

我们需要：

* Redis
* 可视化的查看Job/Job生命周期/Redis状态

我们搭建了满足要求的环境：

* 通过Docker-compose启动
* 启动一个Redis Server
* 启动一个[arena](https://github.com/bee-queue/arena) Web管理端

启动：

```
docker-compose up -d
```

通过浏览器访问：http://localhost:4567

配置文件在`config/arena.json`，如果需要增加新的队列，按照配置文件语法直接配置就可以了，无需重启服务，直接刷屏生效。

## 运行示例


### Producer

启动producer，每隔1秒发送1个Job：

```
$ ./bin/producer
```

### Consumer

启动consumer，simple模式，即，在当前process接收Job：

```
$ ./bin/consumer
```

可以在simple模式下，设置延时，模拟复杂耗时的任务，下面延时`1000ms`:

```
$ ./bin/consumer -d 1000
```

使用sandboxed模式，生产环境下使用，下面启动3个进程处理Job：

```
$ ./bin/consumer -s 3
```

设置为`3`不一定能启动3个进程，要看进程池里是否有空闲进程。

如果想看到跑到进程数，可以：

* 先启动`producer`，形成一定数量的`waiting`的Job，再启动`consumer`
* 给`consumer`的执行，设置延时，在`config/default.json`中设置`delay`毫秒数

## 代码说明

生产环境要使用类似下面代码的方式：

* `lib/consumer/sandboxed.js`
* `lib/consumer/worker.js`

这是官方推荐的方式，`separed processes`，主要好处是：

* 防止出现Job`stalled`的情况，当接收消息出现`event loop busy`时会出现这样的情况
    * 因为处理job的进程，Bull又称为`sandboxed process`，其实并不处理Queue
    * Node.js主进程得到Queue Job后，再通知`sandboxed process`去处理Job
    * `sandboxed process`即使阻塞，也不会引起`stalled`
* 这种架构还带来了其他好处
  * 不担心`sandboxed process`崩溃，因为Bull的API会自动创建新的进程，补足process pool
  * 不会因为做cluster使用更多的redis连接，因为连接还在Node.js主进程
  * 可以把多核cpu利用起来
