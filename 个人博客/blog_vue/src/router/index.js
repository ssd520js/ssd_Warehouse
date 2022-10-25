import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ('../views/About.vue')
    }, {
        path: '/article',
        name: 'Article',
        component: () =>
            import ('../views/Article.vue')
    },{
        path: '/article/:id',
        name: 'ArticleBase',
        component: () =>
            import ('../views/ArticleBase/ArticleBase.vue')
    }, {
        path: '/links',
        name: 'Links',
        component: () =>
            import ('../views/Links.vue')
    }, {
        path: '/message',
        name: 'Message',
        component: () =>
            import ('../views/Message.vue')
    },
    {
        path: '/information',
        name: 'Information',
        beforeEnter: add,
        component: () =>
            import ('../views/Information.vue')
    }, 
    {
        path: '/admin',
        name: 'Admin',
        beforeEnter: root,
        component: () =>
            import ('../views/Admin.vue')
    },
    {
        path: '/adminArticleBase/:id',
        name: 'AdminArticleBase',
        component: () =>
            import ('../views/ArticleBase/AdminArticleBase.vue')
    }
]

const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
    })
    //修改资料
function add(to, from, next) {
    let id = router.app.$store.state.userInfo._id
    if (id) {
        next()
    } else {
        next({ path: "/" })
    }

}
//root路由
function root(to, from, next) {
    let rootName = router.app.$store.state.rootName
    if (rootName) {
        next()
    } else {
        next({ path: "/" })
    }
}
export default router