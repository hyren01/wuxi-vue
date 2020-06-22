import Vue from 'vue'
import Router from 'vue-router'
import paths from './paths'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/api/store'

const constantRoutes = [
  {
    path: '/',
    meta: {
      breadcrumb: false,
      public: true
    },
    name: 'loading',
    component: () => import(`@/components/loading.vue`)
  },
  //登录界面
  {
    path: '/login',
    meta: {
      breadcrumb: false,
      public: true
    },
    name: 'login',
    component: () => import('@/components/Login.vue')
  },
  {
    path: '/404',
    meta: {
      breadcrumb: false,
      public: true
    },
    name: 'Error',
    component: () => import('@/components/error.vue')
  },
  {
    path: '/standard/sm2',
    meta: {
      breadcrumb: false
    },
    name: 'standard-modify2',
    component: () => import(`@/pages/standardModify/StandardModify2.vue`)
  },
  {
    path: '/standard/sv/mi',
    meta: {
      breadcrumb: false
    },
    name: 'stdmodel-info',
    component: () => import('@/pages/standardView/stdModelInfo.vue')
  },
  {
    path: '/standard/sv/mi2',
    meta: {
      breadcrumb: false
    },
    name: 'stdmodel-info2',
    component: () => import('@/pages/standardView/stdModelInfo2.vue')
  },
  {
    path: '/dateImportstandard/edit',
    meta: {
      breadcrumb: false
    },
    name: 'dateImport-edit',
    component: () => import('@/pages/dateImport/DateImportEdit.vue')
  },
  {
    path: '/dateImportstandard/add',
    meta: {
      breadcrumb: false
    },
    name: 'dateImport-add',
    component: () => import('@/pages/dateImport/DateImportAdd.vue')
  },
  {
    path: '/standard/sv/view',
    meta: {
      breadcrumb: false
    },
    name: 'stdmodel-view',
    component: () => import('@/pages/standardView/stdModelview.vue')
  },
  {
    path: '/standard/code/add',
    meta: {
      breadcrumb: false
    },
    name: 'standard-addorupdate',
    component: () => import('@/pages/standardCode/StandardCodeAdd.vue')
  },
  //码表新增页面
  {
    path: '/standard/code/newadd',
    meta: {
      breadcrumb: false
    },
    name: 'standard-add',
    component: () => import('@/pages/standardCode/StandardNewAdd')
  },
  //码表查看页面
  {
    path: '/standard/code/view',
    meta: {
      breadcrumb: false
    },
    name: 'standard-stdview',
    component: () => import('@/pages/standardCode/StandardCodeView.vue')
  },
  // 统计
  //模型列表查看1
  {
    path: '/standard/models/history',
    meta: {
      breadcrumb: false
    },
    name: 'standard-models-history',
    component: () => import(`@/pages/standardModels/StandardHistory.vue`)
  },
  //模型列表查看2
  {
    path: '/standard/models/history2',
    meta: {
      breadcrumb: false
    },
    name: 'standard-models-history2',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy" */
        `@/pages/standardModels/StandardHistory2.vue`
      )
  },
  //文档查看
  {
    path: '/catalog/fileView',
    meta: {
      breadcrumb: false,
      title: '文档查看'
    },
    name: 'standard-fileview',
    component: () => import('@/pages/standardFileupload/StandardFileview.vue')
  },
  //文档申请
  {
    path: '/catalog/fileApplication',
    meta: {
      breadcrumb: false
    },
    name: 'standard-fileapplication',
    component: () =>
      import('@/pages/standardFileupload/StandardFileapplication.vue')
  },
  //文档查看
  {
    path: '/catalog/fileApplication2',
    meta: {
      breadcrumb: false
    },
    name: 'standard-fileapplication2',
    component: () =>
      import('@/pages/standardFileupload/StandardFileapplication2.vue')
  },
  {
    path: '/catalog/fileApplication3',
    meta: {
      breadcrumb: false
    },
    name: 'standard-fileapplication3',
    component: () =>
      import('@/pages/standardFileupload/StandardFileapplication3.vue')
  },
  //数据检测
  {
    path: '/standard/models/datacheck',
    meta: {
      breadcrumb: false
    },
    name: 'standard-models-datacheck',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy" */
        `@/pages/standardModels/StandardModelsDataCheck.vue`
      )
  },
]

Vue.use(Router)
const router = new Router({
  base: '/',
  mode: 'hash', //
  linkActiveClass: 'active', //
  routes: constantRoutes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/#/') {
    next()
  } else {
    let token = sessionStorage.getItem('Authorization')
    if (token === 'null' || token === '') {
      next('/#/')
    } else {
      NProgress.start()
      if(!store.state.routerList.length){
        const menu = JSON.parse(localStorage.getItem('menu'))
        if(menu &&　menu.length){
          store.commit('setSouterList', menu)
          next({...to, replace: true})
        }
      }
      next()
    }
  }
})
router.afterEach(() => {
  // ...
  NProgress.done()
})

export default router
