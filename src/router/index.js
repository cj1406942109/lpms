import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/quickpath',
    component: Layout,
    redirect: 'noredirect',
    name: '快速访问',
    meta: { title: '快速访问', icon: 'entrance' },
    children: [{
      path: 'todo',
      component: () => import('@/views/quickpath/todo'),
      name: '快速访问-待办事项',
      meta: { title: '待办事项', icon: 'todo', noCache: true }
    }, {
      path: 'notice',
      component: () => import('@/views/quickpath/notice'),
      name: '快速访问-通知公告',
      meta: { title: '通知公告', icon: 'notice' }
    }, {
      path: 'monitor',
      component: () => import('@/views/quickpath/monitor'),
      name: '快速访问-运行监控',
      meta: { title: '运行监控', icon: 'monitor' }
    }]
  },
  {
    path: '/loan-mortgage', // 抵押贷款
    component: Layout,
    redirect: 'noredirect',
    name: '抵押贷款',
    meta: { title: '抵押贷款', icon: 'loan' },
    children: [{
      path: 'order-taking',
      component: () => import('@/views/loan-mortgage/order-taking'),
      name: '抵押贷款-接单',
      meta: { title: '接单', icon: 'order_on' }
    }, {
      path: 'interview',
      component: () => import('@/views/loan-mortgage/interview'),
      name: '抵押贷款-面谈',
      meta: { title: '面谈', icon: 'talk' }
    }, {
      path: 'interview/edit-info/:id',
      hidden: true,
      name: '抵押贷款-面谈建议',
      meta: { title: '面谈建议' },
      component: () => import('@/views/loan-mortgage/interview/editInfo')
    }, {
      path: 'visa-interview',
      component: () => import('@/views/loan-mortgage/visa-interview'),
      name: '抵押贷款-面签',
      meta: { title: '面签', icon: 'visa-interview' }
    }, {
      path: 'visa-interview/edit-info/:id',
      hidden: true,
      name: '抵押贷款-面签表格',
      meta: { title: '面签表格' },
      component: () => import('@/views/loan-mortgage/visa-interview/editInfo')
    }, {
      path: 'evaluate-order',
      component: () => import('@/views/loan-mortgage/evaluate-order'),
      name: '抵押贷款-评估下单',
      meta: { title: '评估下单', icon: 'evaluate' }
    }, {
      path: 'evaluate-order/edit-info/:id',
      hidden: true,
      name: '抵押贷款-评估下单表格',
      meta: { title: '评估下单表格' },
      component: () => import('@/views/loan-mortgage/evaluate-order/editInfo')
    }, {
      path: 'examine-approve',
      component: () => import('@/views/loan-mortgage/examine-approve'),
      name: '抵押贷款-审批',
      meta: { title: '审批', icon: 'approve' }
    }, {
      path: 'examine-approve/edit-info/:id',
      hidden: true,
      name: '抵押贷款-审批表格',
      meta: { title: '审批表格' },
      component: () => import('@/views/loan-mortgage/examine-approve/editInfo')
    }, {
      path: 'mortgage',
      component: () => import('@/views/loan-mortgage/mortgage'),
      name: '抵押贷款-抵押',
      meta: { title: '抵押', icon: 'mortgage' }
    }, {
      path: 'mortgage/edit-info/:id',
      hidden: true,
      name: '抵押贷款-抵押表格',
      meta: { title: '抵押表格' },
      component: () => import('@/views/loan-mortgage/mortgage/editInfo')
    }, {
      path: 'charge',
      component: () => import('@/views/loan-mortgage/charge'),
      name: '抵押贷款-收费',
      meta: { title: '收费', icon: 'charge' }
    }, {
      path: 'charge/edit-info/:id',
      hidden: true,
      name: '抵押贷款-收费表格',
      meta: { title: '收费表格' },
      component: () => import('@/views/loan-mortgage/charge/editInfo')
    }, {
      path: 'make-loans',
      component: () => import('@/views/loan-mortgage/make-loans'),
      name: '抵押贷款-放款',
      meta: { title: '放款', icon: 'make-loans' }
    }, {
      path: 'make-loans/edit-info/:id',
      hidden: true,
      name: '抵押贷款-放款表格',
      meta: { title: '放款表格' },
      component: () => import('@/views/loan-mortgage/make-loans/editInfo')
    }]
  },
  {
    path: '/house', // 二手房贷款
    component: Layout,
    redirect: 'noredirect',
    name: '二手房贷款',
    meta: { title: '二手房贷款', icon: 'house' },
    children: [{
      path: 'order-taking',
      component: () => import('@/views/loan-house/order-taking'),
      name: '二手房贷款-接单',
      meta: { title: '接单', icon: 'order_on' }
    }, {
      path: 'visa-interview',
      component: () => import('@/views/loan-house/visa-interview'),
      name: '二手房贷款-面签',
      meta: { title: '面签', icon: 'visa-interview' }
    }, {
      path: 'visa-interview/edit-info/:id',
      hidden: true,
      name: '二手房贷款-面签表格',
      meta: { title: '面签表格' },
      component: () => import('@/views/loan-house/visa-interview/editInfo')
    }, {
      path: 'evaluate-order',
      component: () => import('@/views/loan-house/evaluate-order'),
      name: '二手房贷款-评估下单',
      meta: { title: '评估下单', icon: 'evaluate' }
    }, {
      path: 'evaluate-order/edit-info/:id',
      hidden: true,
      name: '二手房贷款-评估下单表格',
      meta: { title: '评估下单表格' },
      component: () => import('@/views/loan-house/evaluate-order/editInfo')
    }, {
      path: 'integrate-input',
      component: () => import('@/views/loan-house/integrate-input'),
      name: '二手房贷款-整件输机',
      meta: { title: '整件输机', icon: 'integrate' }
    }, {
      path: 'integrate-input/edit-info/:id',
      hidden: true,
      name: '二手房贷款-整件输机表格',
      meta: { title: '整件输机表格' },
      component: () => import('@/views/loan-house/integrate-input/editInfo')
    }, {
      path: 'examine-approve',
      component: () => import('@/views/loan-house/examine-approve'),
      name: '二手房贷款-审批',
      meta: { title: '审批', icon: 'approve' }
    }, {
      path: 'examine-approve/edit-info/:id',
      hidden: true,
      name: '二手房贷款-审批表格',
      meta: { title: '审批表格' },
      component: () => import('@/views/loan-house/examine-approve/editInfo')
    }, {
      path: 'transfer',
      component: () => import('@/views/loan-house/transfer'),
      name: '二手房贷款-过户',
      meta: { title: '过户', icon: 'transfer' }
    }, {
      path: 'transfer/edit-info/:id',
      hidden: true,
      name: '二手房贷款-过户表格',
      meta: { title: '过户表格' },
      component: () => import('@/views/loan-house/transfer/editInfo')
    }, {
      path: 'mortgage',
      component: () => import('@/views/loan-house/mortgage'),
      name: '二手房贷款-抵押',
      meta: { title: '抵押', icon: 'mortgage' }
    }, {
      path: 'mortgage/edit-info/:id',
      hidden: true,
      name: '二手房贷款-抵押表格',
      meta: { title: '抵押表格' },
      component: () => import('@/views/loan-house/mortgage/editInfo')
    }, {
      path: 'guarantee',
      component: () => import('@/views/loan-house/guarantee'),
      name: '二手房贷款-担保',
      meta: { title: '担保', icon: 'guarantee' }
    }, {
      path: 'guarantee/edit-info/:id',
      hidden: true,
      name: '二手房贷款-担保表格',
      meta: { title: '担保表格' },
      component: () => import('@/views/loan-house/guarantee/editInfo')
    }, {
      path: 'make-loans',
      component: () => import('@/views/loan-house/make-loans'),
      name: '二手房贷款-放款',
      meta: { title: '放款', icon: 'make-loans' }
    }, {
      path: 'make-loans/edit-info/:id',
      hidden: true,
      name: '二手房贷款-放款表格',
      meta: { title: '放款表格' },
      component: () => import('@/views/loan-house/make-loans/editInfo')
    }, {
      path: 'charge',
      component: () => import('@/views/loan-house/charge'),
      name: '二手房贷款-收费',
      meta: { title: '收费', icon: 'charge' }
    }, {
      path: 'charge/edit-info/:id',
      hidden: true,
      name: '二手房贷款-收费表格',
      meta: { title: '收费表格' },
      component: () => import('@/views/loan-house/charge/editInfo')
    }]
  },
  // TODO: 新添加的奇怪需求
  {
    path: '/mortgage',
    component: Layout,
    redirect: 'noredirect',
    name: '抵押',
    meta: { title: '抵押', icon: 'mortgage' },
    children: [{
      path: 'mortgage',
      component: () => import('@/views/loan-house/mortgage'),
      name: '二手房贷款-抵押',
      meta: { title: '抵押', icon: 'mortgage' }
    }]
  },
  {
    path: '/guarantee',
    component: Layout,
    redirect: 'noredirect',
    name: '抵押',
    meta: { title: '抵押', icon: 'guarantee' },
    children: [{
      path: 'guarantee',
      component: () => import('@/views/loan-house/guarantee'),
      name: '二手房贷款-担保',
      meta: { title: '担保', icon: 'guarantee' }
    }]
  },
  {
    path: '/loan-management',
    component: Layout,
    redirect: 'noredirect',
    name: '贷款管理',
    meta: { title: '贷款管理', icon: 'loan-set' },
    children: [{
      path: 'order',
      component: () => import('@/views/loan-management/order'),
      name: '订单管理',
      meta: { title: '订单管理', icon: 'order' }
    }, {
      path: 'order/status/:orderId',
      hidden: true,
      name: '贷款状态',
      meta: { title: '贷款状态' },
      component: () => import('@/views/loan-management/order/status')
    }, {
      path: 'assign',
      component: () => import('@/views/loan-management/assign'),
      name: '业务分配',
      meta: { title: '业务分配', icon: 'assign' }
    }, {
      path: 'form',
      component: () => import('@/views/loan-management/form'),
      name: '统计报表',
      meta: { title: '统计报表', icon: 'form' }
    }]
  },
  {
    path: '/system',
    component: Layout,
    redirect: 'noredirect',
    name: '系统管理',
    meta: { title: '系统管理', icon: 'system-set' },
    children: [{
      path: 'department',
      component: () => import('@/views/system/department'),
      name: '部门管理',
      meta: { title: '部门管理', icon: 'department' }
    }, {
      path: 'department/edit-info/:id',
      hidden: true,
      name: '部门管理-部门详情',
      meta: { title: '部门详情' },
      component: () => import('@/views/system/department/editInfo')
    }, {
      path: 'department/create-info',
      hidden: true,
      name: '部门管理-新建部门',
      meta: { title: '新建部门' },
      component: () => import('@/views/system/department/editInfo')
    }, {
      path: 'account',
      component: () => import('@/views/system/account'),
      name: '账号管理',
      meta: { title: '账号管理', icon: 'account' }
    }, {
      path: 'account/create-info',
      hidden: true,
      name: '账号管理-新建账号',
      meta: { title: '新建账号' },
      component: () => import('@/views/system/account/editInfo')
    }, {
      path: 'account/edit-info/:id',
      hidden: true,
      name: '账号管理-账号详情',
      meta: { title: '账号详情' },
      component: () => import('@/views/system/account/editInfo')
    }, {
      path: 'table',
      component: () => import('@/views/system/table'),
      name: '表格管理',
      meta: { title: '表格管理', icon: 'table' }
    }, {
      path: 'notice',
      component: () => import('@/views/system/notice'),
      name: '公告管理',
      meta: { title: '公告管理', icon: 'notice' }
    }, {
      path: 'notice/edit-info',
      hidden: true,
      component: () => import('@/views/system/notice/editInfo')
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  base: process.env.NODE_ENV === 'production' ? '/loan/' : '',
  routes: constantRouterMap
})
