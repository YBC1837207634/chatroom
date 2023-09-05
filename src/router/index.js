import VueRouter from 'vue-router'
import ChatRoom from '../pages/ChatRoom';
import LoginPage from '../pages/LoginPage'
const routes = [
    {
        path: '/',
        name: '主页',
        component: ChatRoom,
    },
    {
        path: '/login',
        name: '登陆',
        component: LoginPage
    },
    
    /* 解决hash 白屏 */
    {
        path: '*',
        redirect: '/'
    }
]

var router = new VueRouter({
    routes
}) 

// 全局前置路由守卫
router.beforeEach((to, from, next)=>{
    if (!to.path.startsWith('/login')) {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        if (userInfo == null || userInfo.token == null) {
            next('/login')
        } 
    } 
    next()
})

/* 配置路由 */
export default router