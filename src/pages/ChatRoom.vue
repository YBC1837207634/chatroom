<template>

    <el-container class="height100 clear-margin-padding">
    <el-aside width="150px" class="clear-margin-padding l-aside" style="overflow-x: hidden;">
            <el-menu background-color="#413e3e"  text-color="#fff" class="width100">
            <el-menu-item  v-for="name, index in userNames" :key="index" @click="current(name)">
                <span slot="title">{{ name }}</span>  
            </el-menu-item>
            </el-menu>
    </el-aside>
    <el-container>
        <el-header class="clear-margin-padding" height="40px">
        <span>正在与 {{ currentUserName }} 聊天</span>
        </el-header>
        <el-main class="clear-margin-padding" style="overflow-y: hidden;" v-if="currentUserName">
            <div class="top">

                <div v-for="record,_,index in currentUserRecord" :key="index">
                    <LeftMessage
                        v-if="record.userName !== name"
                        :currentUser="record.userName"
                        :msg="record.msg">
                    </LeftMessage>
                    <!-- 右聊天 -->
                    <RightMessage
                        v-else
                        :msg="record.msg">
                    </RightMessage>
                </div>

            </div>
            <div class="bottom">
                <div> 
                    <i class="el-icon-picture-outline"></i>
                    <i class="el-icon-folder-add"></i>
                </div>
                <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入内容"
                    v-model="textarea"
                    size="medium"
                    @keyup.alt.enter="send"
                    >
                </el-input>
                <el-tag type="success">{{ name }}</el-tag>
                <el-button 
                    type="success" p
                    lain class="align-right-block"
                    size="medium" 
                    style="width: 200px;"
                    @click="send"
                    >
                    发送
                </el-button>
            </div>
        </el-main>
    </el-container>
    </el-container>

</template>

<script>
    import RightMessage from '../components/RightMessage.vue'
    import LeftMessage from '../components/LeftMessage.vue'
    export default {
        components: {
            RightMessage, LeftMessage
        },
        data() {
            return {
                userNames: [],
                onlineUsers:{},
                name: '',
                currentUserName: '',  // 当前正在聊天的用户
                textarea: '',  // 输入框

            }
        },
        computed: {
            currentUserRecord() {
                if (this.currentUserName !== '' && this.currentUserName !== null) {
                    return this.onlineUsers[this.currentUserName].msg
                }
                return null   
            }
        },
        created() {
            this.name = JSON.parse(localStorage.getItem('userInfo')).name
            this.initWS()  // 初始化 websocket 
        },
        beforeDestroy() {
            this.$ws.close()   // 主动断开链接 如果已经关闭则什么都不做
        },
        methods: {
            // 添加记录给某个对象
            addRecord(target, record){
                this.onlineUsers[target].msg.push(record)
            },
            send() {
                this.addRecord(this.currentUserName, {
                        // 对应一条聊天记录
                        userName: this.name, 
                        msg: this.textarea
                }) 
                // 向服务端发送消息
                this.$ws.send(JSON.stringify({
                    target: this.currentUserName,   
                    message: this.textarea,
                }))
                this.textarea=''
            },
            current(name) {
                this.currentUserName = name
            },
            initWS() {
                var ws = new WebSocket('ws://localhost:8080/websocket')
                ws.onopen = () => {
                    this.$message({
                        message: '连接成功',
                        type: 'success'
                    })
                }
                ws.onmessage = (message) => { 
                    let data = JSON.parse(message.data);  // 接受从服务器发送的消息 是一个字符串
                    
                    // 是否是系统广播
                    if (data.broadcast) {  
                        // 排除自己
                        this.userNames = data.msg.filter(item=> {
                            if (item !== this.name)
                                return item
                        }) 
                        // 处理已经断开链接的用户
                        if (!this.userNames.includes(this.currentUserName)) {
                            this.currentUserName = ''
                        }
                        // 根据服务器返回的在线用户更新客户端用户信息
                        // 对于下线用户没有采取删除策略，对应的所有聊天记录都保存在 vue中
                        for (let name of this.userNames) {
                            if (!this.onlineUsers[name])
                                this.$set(this.onlineUsers, name, {msg:[]}) 
                        }   
                    } else {
                        this.addRecord(data.from, {
                            userName: data.from,
                            msg: data.msg
                        })

                    }
                }
                ws.onerror = () => {
                    localStorage.removeItem('userInfo')
                    this.$message.error('连接异常')
                }
                ws.onclose = (event) => {
                    // 正常关闭
                    if (event.code === 1000) {
                        this.currentUserName= '',  // 当前正在聊天的用户
                        this.userNames= [],
                        this.$message.error('会话关闭')
                    } else {
                         // 服务器断开
                        this.$message.error('与服务器断开连接。请重新登陆！')
                        localStorage.removeItem('userInfo')
                        this.$router.push('/login')
                    }
                    // console.log(event);
                }
                this.$ws = ws
            }
        }
    }
</script>

<style scoped>

.el-aside {
    background-color: #413e3e;
    color: #ffffff;
}
.el-header {
    text-align: center;
    height: 40px;
    line-height: 40px;
    background-color: rgb(248, 248, 248);
    border-bottom: black 1px solid;
}
.item {
  margin-top: 20px;

  /* width: 100%; */
}

.top {
    height: 70%;
    /* background-color: aqua; */
    border-bottom: 1px black solid;
    font-size: 20px;
    overflow: auto;
}
.bottom {
    height: 30%;
    /* background-color: red; */
}
/* 消息气泡 */
.message {
    margin: 10px 0;
    font-size: 16px;

}
.head-icon {
    height: 50px;
    width: 50px;
}
.message-bubble {
    margin-left: 5px;
    vertical-align: top;
    display: inline-block;
}
.message-text {
    display: inline-block;
    padding: 8px;
    max-width: 30em;
    background-color: #95ec69;
    overflow-wrap: break-word;
    word-wrap: break-word;
    border-radius: 8px;
}
.message-title {
    font-size: 0.5em;
    color: red;
}


</style>