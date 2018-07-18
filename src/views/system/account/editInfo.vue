<template>
  <div class="app-container">
    <h2>编辑用户</h2>
    <div class="form-wrapper">
      <el-form :model="accountForm" ref="accountForm" label-width="200px" inline>
        <h3>账号信息</h3>
        <el-form-item label="账号">
          <el-input v-model="accountForm.account"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="密码">
          <el-input v-model="accountForm.password"></el-input>
        </el-form-item>
        <br>
        <h3>基本信息</h3>
        <el-form-item label="姓名">
          <el-input v-model="accountForm.name"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="部门">
          <el-select v-model="accountForm.department" placeholder="请选择部门">
            <el-option label="部门1" value="1"></el-option>
            <el-option label="部门2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="角色">
          <el-select v-model="accountForm.role" placeholder="请选择角色">
            <el-option label="管理员" value="1"></el-option>
            <el-option label="普通员工" value="2"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="手机号">
          <el-input v-model="accountForm.phone"></el-input>
        </el-form-item>
        <br>
        <h3>账号权限</h3>
        <el-form-item label=" ">
          <el-tree
            :data="permissions"
            show-checkbox
            node-key="id">
          </el-tree>
        </el-form-item>
        <br>
        <el-form-item label=" ">
          <el-button type="primary" @click="submitForm('accountForm')">保存</el-button>
          <el-button @click="resetForm('accountForm')">重置</el-button>
        </el-form-item>
      </el-form>
      {{accountForm}}
    </div>
  </div>
</template>

<script>
import { getEmployee } from '@/api/system'
const permissionOptions = [{
  id: 'handle',
  label: '业务办理',
  children: [{
    id: 'handle_m',
    label: '抵押贷款',
    children: [
      { id: 'handle_m_order_receive', label: '接单' },
      { id: 'handle_m_view', label: '面谈' },
      { id: 'handle_m_sign', label: '面签' },
      { id: 'handle_m_ordering', label: '评估下单' },
      { id: 'handle_m_approve', label: '审批' },
      { id: 'handle_m_mortgage', label: '抵押' },
      { id: 'handle_m_loan', label: '放款' }
    ]
  }, {
    id: 'handle_h',
    label: '二手房贷款',
    children: [
      { id: 'handle_h_order_receive', label: '接单' },
      { id: 'handle_h_sign', label: '面签' },
      { id: 'handle_h_ordering', label: '评估下单' },
      { id: 'handle_h_zjsj', label: '整件输机' },
      { id: 'handle_h_approve', label: '审批' },
      { id: 'handle_h_transfer', label: '过户' },
      { id: 'handle_h_mortgage', label: '抵押' },
      { id: 'handle_h_guarantee', label: '担保' },
      { id: 'handle_h_loan', label: '放款' },
      { id: 'handle_h_charge', label: '收费' },
      { id: 'handle_h_mortgage_manage', label: '抵押管理' },
      { id: 'handle_h_chargeback', label: '退单' }
    ]
  }]
}, {
  id: 'query',
  label: '贷款查询',
  children: [{
    id: 'status',
    label: '查看状态',
    children: [
      { id: 'query_m_status', label: '抵押贷款' },
      { id: 'query_h_status', label: '二手房贷款' }
    ]
  }, {
    id: 'query_',
    label: '查看表格',
    children: [{
      id: 'query_m',
      label: '抵押贷款',
      children: [
        { id: 'query_m_order_receive', label: '接单' },
        { id: 'query_m_view', label: '面谈' },
        { id: 'query_m_sign', label: '面签' },
        { id: 'query_m_ordering', label: '评估下单' },
        { id: 'query_m_approve', label: '审批' },
        { id: 'query_m_mortgage', label: '抵押' },
        { id: 'query_m_loan', label: '放款' }
      ]
    }, {
      id: 'query_h',
      label: '二手房贷款',
      children: [
        { id: 'query_h_order_receive', label: '接单' },
        { id: 'query_h_sign', label: '面签' },
        { id: 'query_h_ordering', label: '评估下单' },
        { id: 'query_h_zjsj', label: '整件输机' },
        { id: 'query_h_approve', label: '审批' },
        { id: 'query_h_transfer', label: '过户' },
        { id: 'query_h_mortgage', label: '抵押' },
        { id: 'query_h_guarantee', label: '担保' },
        { id: 'query_h_loan', label: '放款' },
        { id: 'query_h_charge', label: '收费' },
        { id: 'query_h_mortgage_manage', label: '抵押管理' },
        { id: 'query_h_chargeback', label: '退单' }
      ]
    }]
  }]
}, {
  id: '',
  label: '系统管理',
  children: [{
    id: 'department',
    label: '部门管理',
    children: [
      { id: 'manage_department_add', label: '添加部门' },
      { id: 'manage_department_edit', label: '编辑部门' },
      { id: 'manage_department_delete', label: '删除部门' },
      { id: 'manage_department_query', label: '查看部门' }
    ]
  }, {
    id: 'account',
    label: '账号管理',
    children: [
      { id: 'manage_account_add', label: '创建账号' },
      { id: 'manage_account_edit', label: '编辑账号' },
      { id: 'manage_account_delete', label: '删除账号' },
      { id: 'manage_account_query', label: '查看账号' }
    ]
  }, {
    id: 'notice',
    label: '公告管理',
    children: [
      { id: 'manage_notice_add', label: '添加公告' },
      { id: 'manage_notice_edit', label: '编辑公告' },
      { id: 'manage_notice_delete', label: '删除公告' },
      { id: '', label: '查看公告' }
    ]
  }, {
    id: 'notice',
    label: '表格管理',
    children: [
      { id: 'manage_notice_add', label: '抵押贷款' },
      { id: 'manage_notice_edit', label: '二手房贷款' }
    ]
  }]
}]

export default {
  data () {
    return {
      accountForm: {
        account: '',
        password: '',
        name: '',
        department: '',
        role: '',
        cellphone: '',
        permission: {}
      },
      permissions: permissionOptions
    }
  },
  methods: {
    GetEmployee (id) {
      getEmployee(id).then(response => {
        // console.log(response)
        this.accountForm = response.data.data
        console.log(this.accountForm)
      })
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.GetEmployee(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    padding: 20px;
    background-color: #fff;
    .form-wrapper {
      padding: 20px;
      h3 {
        margin-left: 50px;
      }
    }
  }
</style>
