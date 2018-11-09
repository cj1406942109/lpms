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
      path: 'visa-interview/edit-info/:taskId/:checklistId/:loanId',
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
      path: 'evaluate-order/edit-info/:taskId/:loanId',
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
      path: 'examine-approve/edit-info/:taskId/:loanType/:catalogId',
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
      path: 'mortgage/edit-info/:taskId/:loanId',
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
      path: 'charge/edit-info/:taskId',
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
      path: 'make-loans/edit-info',
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
    }]
  },
  {
    path: '/loan-management',
    component: Layout,
    redirect: 'noredirect',
    name: '贷款管理',
    meta: { title: '贷款管理', icon: 'set' },
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
    }]
  },
  {
    path: '/system',
    component: Layout,
    redirect: 'noredirect',
    name: '系统管理',
    meta: { title: '系统管理', icon: 'set' },
    children: [{
      path: 'department',
      component: () => import('@/views/system/department'),
      name: '部门管理',
      meta: { title: '部门管理', icon: 'department' }
    }, {
      path: 'account',
      component: () => import('@/views/system/account'),
      name: '账号管理',
      meta: { title: '账号管理', icon: 'account' }
    }, {
      path: 'account/edit-info/:id',
      hidden: true,
      component: () => import('@/views/system/account/editInfo')
    }, {
      path: 'permission',
      component: () => import('@/views/system/permission'),
      name: '权限管理',
      meta: { title: '权限管理', icon: 'permission' }
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
