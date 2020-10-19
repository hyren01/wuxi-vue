export default [

  {
    path: '/catalog',
    redirect: '/catalog/Menu-Manage',
    meta: {
      breadcrumb: false
    },
  },
  {
    path: '/standard/sv',
    meta: {
      breadcrumb: false
    },
    name: 'standard-view',
    component: () => import(`@/pages/standardView/StandardView.vue`)
  },
  {
    path: '/standard/sm',
    meta: {
      breadcrumb: false
    },
    name: 'standard-modify',
    component: () => import(`@/pages/standardModify/StandardModify.vue`)
  },
  // 用户信息管理
  {
    path: '/catalog/User-Manage',
    meta: {
      breadcrumb: false
    },
    name: 'User-Manage',
    component: () => import('@/pages/manage/a-message.vue')
  },
  // 角色管理
  {
    path: '/catalog/Role-Manage',
    meta: {
      breadcrumb: false
    },
    name: 'Role-Manage',
    component: () => import('@/pages/manage/b-role.vue')
  },
  // 菜单管理
  {
    path: '/catalog/Menu-Manage',
    meta: {
      breadcrumb: false
    },
    name: 'Menu-Manage',
    component: () => import('@/pages/manage/c-menu.vue')
  },
  {
    path: '/dateImportstandard',
    meta: {
      breadcrumb: false,
      title: '数据库导入标准'
    },
    name: 'dateImport-standard',
    component: () => import('@/pages/dateImport/DateImportStandard.vue')
  },
  // 目录管理
  {
    path: '/standardcatalog',
    meta: {
      breadcrumb: false
    },
    name: 'standard-catalog',
    component: () => import('@/pages/StandardCatalog.vue')
  },
  // 标准检测
  {
    path: '/standard/detection',
    meta: {
      breadcrumb: false
    },
    name: 'standard-detection',
    component: () => import('@/pages/StandardDetection.vue')
  },
  // 码表主页面
  {
    path: '/standard/code',
    meta: {
      breadcrumb: false
    },
    name: 'standard-code',
    component: () => import('@/pages/standardCode/StandardCode.vue')
  },
  // 码表编辑页面
  {
    path: '/standard/statistical',
    meta: {
      breadcrumb: false
    },
    name: 'standard-statistical',
    component: () => import('@/pages/StandardStatistical.vue')
  },
  // 模型列表
  {
    path: '/standard/models',
    meta: {
      breadcrumb: false
    },
    name: 'standard-models',
    component: () => import('@/pages/standardModels/StandardModels.vue')
  },
  // 文件上传
  {
    path: '/catalog/fileUpload',
    meta: {
      breadcrumb: false,
      keepAlive: true,
      isDoFresh: false,
      title: '文档上传'
    },
    name: 'standard-fileupload',
    component: () => import('@/pages/standardFileupload/StandardFileupload.vue')
  },
 
]
