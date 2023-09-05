<template>
    <div>
        <input type="text" v-model="name">账号 <br>
        <input type="text" v-model="password">密码
        <button @click="send">确定</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                password: ''
            }
        },
        methods: {
            send() {
                let data = new FormData
                data.append('username', this.name)
                data.append('password', this.password)
                this.$request({
                    method: 'post',
                    url: '/api/login',
                    data,
                    Headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res=> {
                    if (res.data.code === 0) {
                        this.$message.error('账号密码错误!');
                    } else {
                        localStorage.setItem('userInfo', res.data.data)
                        this.$router.push('/')
                    }
                }).catch(error=>{
                    alert(error)
                }) 
                
            }
        }
    }
</script>