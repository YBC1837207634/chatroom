import axios from "axios"

const func = function() {
  var req = axios.create({
    baseURL: '/',
    timeout: 10000,
  })
  req.interceptors.request.use(function (config){
    // 是否携带令牌
    if (config.url != '/api/login' && !config.headers.token) {
    //   let jwt = JSON.parse(window.localStorage.getItem('userInfo')).jwt
      let info = JSON.parse(window.localStorage.getItem('userInfo'))
      config.headers.token = info.token
    }
    return config
  })
  req.interceptors.response.use((res) => {
      // 登陆失效
      if (res.data.code === 0 && res.data.msg === 'NOT_LOGIN') {
        window.localStorage.removeItem("userInfo")
      }
      return res
  })
  return req
}


// vue 插件
export default {}.install = function (Vue) {
    
    // 添加实例
    Vue.prototype.$request = func()
  }
