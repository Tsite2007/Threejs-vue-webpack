var context =require("../src/libs/interface/context.js");

module.exports = [{
    path: '/',
    name: '/',
    meta: {
        title: '导航',
        author:"马腾"
    },
    component: resolve => resolve(require('./views/nav.vue'))
},
{
    path: context.name + '/group/index.html',
    name:'/group/index.html',
    meta: {
        title: '组合测试',
        author:"--"
    },
    component: resolve=>resolve(require('./views/game/group/index.vue'))
},
{
    path: context.name + '/rotate/index.html',
    name:'/rotate/index.html',
    meta: {
        title: '旋转测试',
        author:"--"
    },
    component: resolve=>resolve(require('./views/game/rotate/index.vue'))
},
{
    path: context.name + '/ratio/index.html',
    name:'/ratio/index.html',
    meta: {
        title: '占比测试',
        author:"--"
    },
    component: resolve=>resolve(require('./views/game/ratio/index.vue'))
},
{
    path: context.name + '/line/index.html',
    name:'/line/index.html',
    meta: {
        title: '连线测试',
        author:"--"
    },
    component: resolve=>resolve(require('./views/game/line/index.vue'))
},
{
    path: context.name + '/grid/index.html',
    name:'/grid/index.html',
    meta: {
        title: '方块测试',
        author:"--"
    },
    component: resolve=>resolve(require('./views/game/grid/index.vue'))
},
{
    path: context.name + '/draw/index.html',
    name:'/draw/index.html',
    meta: {
        title: '画图测试',
        author:"--"
    },
    component: resolve=>resolve(require('./views/game/draw/index.vue'))
},
{
    path: context.name + '/bulk/index.html',
    name:'/bulk/index.html',
    meta: {
        title: '体积测试',
        author:"--"
    },
    component: resolve=>resolve(require('./views/game/bulk/index.vue'))
},
{
    path: context.name + '/area/index.html',
    name:'/area/index.html',
    meta: {
        title: '面积测试',
        author:"--"
    },
    component: resolve=>resolve(require('./views/game/area/index.vue'))
},
{
    path: context.name + '/index.html',
    name: '/index.html',
    meta: {
        title: '导航',
        author:"马腾"
    },
    component: resolve => resolve(require('./views/nav.vue'))
},{
    path: "*",
    name: '/errorPages.html',
    meta: {
        title: '发生错误',
        author:"陈明"
    },
    component: resolve => resolve(require('../src/libs/modules/errorPages/index.vue'))
}
];
