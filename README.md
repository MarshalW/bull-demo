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


