//以下json数据结构中，items数组、header、divider不可以同时出现
const Menu = [
  {
    name: 'standard-fileupload',
    title: '文档上传',
    component: 'standard-fileupload',
    icon: 'mdi-file'
  },
  {
    name: 'standard-view',
    title: '标准管理',
    component: 'standard-view',
    icon: 'info'
  },
  {
    name: 'standard-modify',
    title: '标准审核',
    component: 'standard-modify',
    icon: 'gavel'
  },
  {
    name: 'standard-detection',
    title: '标准检测',
    component: 'standard-detection',
    icon: 'mdi-star'
  },
  {
    name: 'standard-code',
    title: '码表管理',
    component: 'standard-code',
    icon: 'event'
  },
  {
    name: 'standard-models',
    title: '模型列表',
    component: 'standard-models',
    icon: 'widgets'
  },
  {
    name: 'standard-catalog',
    title: '目录管理',
    component: 'standard-catalog',
    icon: 'home'
  },
  {
    name: 'standard-statistical',
    title: '统计管理',
    component: 'standard-statistical',
    icon: 'business'
  },
  {
    name: 'dateImport-standard',
    title: '数据库导入标准',
    component: 'dateImport-standard',
    icon: 'mdi-import'
  },
  {
    name: 'User-Manage',
    title: '用户管理',
    // component: 'dateImport-standard',
    icon: 'account_circle',
    items: [
      {
        name: 'User-Manage',
        title: '用户信息管理',
        component: 'User-Manage'
        // icon: 'mdi-import'
      },
      {
        name: 'Role-Manage',
        title: '角色管理',
        component: 'Role-Manage'
        // icon: 'mdi-import'
      },
      {
        name: 'Menu-Manage',
        title: '菜单管理',
        component: 'Menu-Manage'
        // icon: 'mdi-import'
      }
    ]
  }
]

export default Menu
