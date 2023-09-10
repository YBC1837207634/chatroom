## chatroom

**客户端**

聊天室基础版

基于 vue 2 实现聊天室



## 安装依赖

```npm
npm install
```



## 运行

```bash
npm run serve
```



## 配置

端口和代理默认如下

```js
devServer: {
    port: 3000,
    proxy: {
      '/api': {    // 匹配 /api 开头的请求路径
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: true,
        pathRewrite: {'^/api': ''}  // 重写路径
      }
    }
  }
```



## 使用

客户端发送到服务端消息格式如下
```json
{"target":"王五","message":"hello"}
```

接受的消息格式如下

全体广播

```json
{"broadcast":true,"msg":["aaa","管"]}
```

单个消息发送

```json
{"broadcast":false,"from":"管理员","msg":"asdasdasd"}
```

在vue组件实例的data 中存放着每个与之对应用户的对象用来保存聊天记录，格式如下

```json
{
    "小明": {
        "msg": [
            {
                "userName": "小明",
                "msg": "asdasdasd"
            },
            {
                "userName": "王五",
                "msg": "hello"
            },
            {
                "userName": "王五",
                "msg": "hello"
            }
        ]
    }
}
```

currentUser 指向当前聊天的对象，会根据不同的用户渲染指定的数据到页面中。
