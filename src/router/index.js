import Vue from 'vue';
import Router from 'vue-router';
import auth from '@/utils/auth';

Vue.use(Router)

const router = new Router({
    // mode: 'history',
    routes: [{
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: resolve => require(['@/views/home'], resolve),
            redirect: '/dashboard',
            meta: { title: '首页' },
            children: [ //children配置子路由
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: resolve => require(['@/views/home/dashboard'], resolve),
                    meta: { //配置路由元信息表
                        title: '系统首页',
                        keepAlive: true, // 需要被缓存
                        needLogin: true // 需要登录
                    },
                },
                {
                    path: '/icon',
                    name: 'icon',
                    component: resolve => require(['@/views/home/icon'], resolve),
                    meta: {
                        title: '自定义图标',
                        keepAlive: true, // 需要被缓存
                        needLogin: true, //是否需要登录权限
                    },
                },
                {
                    path: '/excelDate',
                    name: 'excelDate',
                    component: resolve => require(['@/views/home/excelDate'], resolve),
                    meta: {
                        title: 'Excel导入导出',
                        keepAlive: true, // 需要被缓存
                        needLogin: true, //是否需要登录权限
                    },
                },
                {
                    path: '/table',
                    name: 'table',
                    component: resolve => require(['@/views/home/table'], resolve),
                    meta: {
                        title: '基础表格',
                        keepAlive: true, // 需要被缓存
                        needLogin: true, //是否需要登录权限
                    },
                },
                {
                    path: '/tabs',
                    name: 'tabs',
                    component: resolve => require(['@/views/home/tabs'], resolve),
                    meta: {
                        title: 'tab选项卡',
                        keepAlive: true, // 需要被缓存
                        needLogin: true, //是否需要登录权限
                    },
                },
                {
                    path: '/basicForm',
                    name: 'basicForm',
                    component: resolve => require(['@/views/home/form/basicForm'], resolve),
                    meta: {
                        title: '基本表单',
                        keepAlive: true, // 需要被缓存
                        needLogin: true, //是否需要登录权限
                    },
                },
                {
                    path: '/richTextEditor',
                    name: 'richTextEditor',
                    component: resolve => require(['@/views/home/form/levelMenu/richTextEditor'], resolve),
                    meta: {
                        title: '富文本编辑器',
                        keepAlive: true, // 需要被缓存
                        needLogin: true, //是否需要登录权限
                    },
                },
                {
                    path: '/markdown',
                    name: 'markdown',
                    component: resolve => require(['@/views/home/form/levelMenu/markdown'], resolve),
                    meta: {
                        title: 'markdown编辑器',
                        keepAlive: false, // 不需要被缓存
                        needLogin: true, //是否需要登录权限
                    },
                },
                {
                    path: '/upload',
                    name: 'upload',
                    component: resolve => require(['@/views/home/form/upload'], resolve),
                    meta: {
                        title: '文件上传',
                        keepAlive: false, // 不需要被缓存
                        needLogin: true, //是否需要登录权限
                    },
                },
                {
                    path: '/charts',
                    name: 'charts',
                    component: resolve => require(['@/views/home/charts'], resolve),
                    meta: {
                        title: '地图数据图表',
                        keepAlive: true, // 需要被缓存
                        needLogin: true, //是否需要登录权限
                    },
                },
                {
                    path: '/threeImage',
                    name: 'threeImage',
                    component: resolve => require(['@/views/home/threeImage'], resolve),
                    meta: {
                        title: 'Three.js全局场景图',
                        needLogin: true, //是否需要登录权限
                    },
                }, ,
                {
                    path: '/map',
                    name: 'map',
                    component: resolve => require(['@/views/home/map'], resolve),
                    meta: {
                        title: '地图定位',
                        needLogin: true, //是否需要登录权限
                    },
                },
                {
                    path: '/antVG2',
                    name: 'antVG2',
                    component: resolve => require(['@/views/home/antVG2'], resolve),
                    meta: {
                        title: 'antV/G2看板',
                        keepAlive: true, // 需要被缓存
                        needLogin: true, //是否需要登录权限
                    },
                },
                {
                    path: '/antVG6',
                    name: 'antVG6',
                    component: resolve => require(['@/views/home/antVG6'], resolve),
                    meta: {
                        title: 'antV/G6流程图',
                        keepAlive: true, // 需要被缓存
                        needLogin: true, //是否需要登录权限
                    },
                },
                {
                    path: '/echartsLiquidfill',
                    name: 'echartsLiquidfill',
                    component: resolve => require(['@/views/home/echartsLiquidfill'], resolve),
                    meta: {
                        title: 'echarts水晶球',
                        keepAlive: true, // 需要被缓存
                        needLogin: true, //是否需要登录权限
                    },
                },
                {
                    path: '/drag',
                    name: 'drag',
                    component: resolve => require(['@/views/home/dragComponent/drag'], resolve),
                    meta: {
                        title: '拖拽列表',
                        keepAlive: true, // 需要被缓存
                        needLogin: true, //是否需要登录权限
                    },
                },
                {
                    path: '/dialog',
                    name: 'dialog',
                    component: resolve => require(['@/views/home/dragComponent/dialog'], resolve),
                    meta: {
                        title: '拖拽式自定义表单生成',
                        keepAlive: true, // 需要被缓存
                        needLogin: true, //是否需要登录权限
                    },
                },
                {
                    path: '/i18n',
                    name: 'i18n',
                    component: resolve => require(['@/views/home/i18n'], resolve),
                    meta: {
                        title: '工单编辑',
                        keepAlive: true, // 需要被缓存
                        needLogin: true, //是否需要登录权限
                    },
                },
                {
                    path: '/permission',
                    name: 'permission',
                    component: resolve => require(['@/views/home/errorHandling/permission'], resolve),
                    meta: {
                        title: '权限测试',
                        permission: true,
                        keepAlive: true, // 需要被缓存
                        needLogin: true, //是否需要登录权限
                    },
                },
                {
                    path: '/errorHandling',
                    name: 'errorHandling',
                    component: resolve => require(['@/views/home/errorHandling'], resolve),
                    meta: {
                        title: '错误处理',
                        keepAlive: true // 需要被缓存
                    },
                },
                {
                    path: '/donate',
                    name: 'donate',
                    component: resolve => require(['@/views/home/donate'], resolve),
                    meta: {
                        title: '支持作者',
                        keepAlive: false // 不需要被缓存
                    },
                },
            ]
        },
        {
            path: '*',
            component: resolve => require(['@/views/notFoundComponent'], resolve),
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['@/views/login'], resolve),
        }
    ]
})

// 全局路由守卫 (全局控制登录)
router.beforeEach((to, from, next) => {
    let isLogin = localStorage.getItem('token');
    console.log(isLogin)
    console.log(to.meta)
    if (to.meta.needLogin) { // 判断该路由是否需要登录权限
        if (isLogin != null) { // 判断是否已经登录
            next()
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next()
    }
})


export default router;