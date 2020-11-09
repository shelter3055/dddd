import {
  HomeOutlined,
  DotChartOutlined,
  DingdingOutlined,
  WeiboCircleOutlined,
  CodepenCircleOutlined,
  GitlabOutlined,
  DropboxOutlined,
  WifiOutlined,
  SettingOutlined
} from '@ant-design/icons'
export default [
  {
    path: '/',
    name: '首页',
    locale: 'menu.home',
    icon: 'HomeOutlined',
    component: '../pages/index'
  },
  {
    path: '/dashboard',
    name: '数据可视化',
    locale: 'menu.dashboard',
    icon: 'DotChartOutlined',
    routes: [
      {
        name: '分析页',
        path: '/dashboard/fenxi',
        component: '../pages/dashboard/Analyze'
      },
      {
        name: '监控页',
        path: '/dashboard/jiankong',
        component: '../pages/dashboard/Jiankong'
       
      },
      {
        name: '工作台',
        path: '/dashboard/work',
        component: '../pages/dashboard/Work'
      },
    ],
  },
  {
    path: '/data_manger',
    name: '数据管理',
    locale: 'menu.data_manger',
    icon: 'DingdingOutlined',
    routes: [
      {
        path: '/data_manger/user',
        name: '用户列表',
        locale: 'menu.other.outLoadMenu',
        component: '../pages/data-manger/UserList',
        wrappers: ['@/wrappers/auth']
        // hideInMenu: true,
      },
      {
        path: '/data_manger/work_order',
        name: '工单列表',
        locale: 'menu.other.outHomeEdit',
        component: '../pages/data-manger/WorkOrder'
      },
      {
        path: '/data_manger/apply_for',
        name: '申请列表',
        locale: 'menu.other.outHomeEdit',
        component: '../pages/data-manger/ApplyFor'
      },
    ],
  },
  {
    path: '/detail',
    name: '详情',
    locale: 'menu.detail',
    icon: 'WeiboCircleOutlined',
    routes: [
      {
        path: '/other/upLoad',
        name: 'odps同步导入',
        locale: 'menu.other.upLoad',
      },
      {
        path: '/other/upLoadMenu',
        name: '菜单导入',
        locale: 'menu.other.upLoadMenu',
      },
      {
        path: '/other/homeEdit',
        name: '概述编辑',
        locale: 'menu.other.homeEdit',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/error',
    name: '异常页',
    locale: 'menu.detail',
    icon: 'CodepenCircleOutlined',
    routes: [
      {
        path: '/other/upLoad',
        name: 'odps同步导入',
        locale: 'menu.other.upLoad',
      },
      {
        path: '/other/upLoadMenu',
        name: '菜单导入',
        locale: 'menu.other.upLoadMenu',
      },
      {
        path: '/other/homeEdit',
        name: '概述编辑',
        locale: 'menu.other.homeEdit',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/result',
    name: '结果页',
    locale: 'menu.detail',
    icon: 'GitlabOutlined',
    routes: [
      {
        path: '/other/upLoad',
        name: 'odps同步导入',
        locale: 'menu.other.upLoad',
      },
      {
        path: '/other/upLoadMenu',
        name: '菜单导入',
        locale: 'menu.other.upLoadMenu',
      },
      {
        path: '/other/homeEdit',
        name: '概述编辑',
        locale: 'menu.other.homeEdit',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/mine',
    name: '个人页',
    locale: 'menu.detail',
    icon: 'DropboxOutlined',
    routes: [
      {
        path: '/other/upLoad',
        name: 'odps同步导入',
        locale: 'menu.other.upLoad',
      },
      {
        path: '/other/upLoadMenu',
        name: '菜单导入',
        locale: 'menu.other.upLoadMenu',
      },
      {
        path: '/other/homeEdit',
        name: '概述编辑',
        locale: 'menu.other.homeEdit',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/edit',
    name: '图形编辑器',
    locale: 'menu.detail',
    icon: 'WifiOutlined',
    routes: [
      {
        path: '/edit/graphics',
        name: '图形',
        locale: 'menu.edit.graphics',
        component: '../pages/edit'
      },
    ],
  },
  {
    path: '/setting',
    name: '设置',
    locale: 'menu.setting',
    icon: 'SettingOutlined',
    routes: [
      {
        path: '/setting/set',
        name: '设置',
        locale: 'menu.setting.set',
        component: '../pages/setting',
        wrappers: ['@/wrappers/auth']
      }
    ],
  },
  {
    path: '/user',
    component: '../pages/user'
  },
  {
    path: '/login',
    component: '../pages/user/Login'
  },
  {
    path: '/register',
    component: '../pages/user/Register'
  },
  {
    path: '*',
    component: '../pages/404'
  }
];
