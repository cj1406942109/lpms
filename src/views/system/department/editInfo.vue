<template>
  <div class="app-container">
    <el-form :model="departmentForm" ref="departmentForm" label-width="200px" :rules="departmentFormRules">
      <el-row :gutter="20" class="form-wrapper">
        <el-col :span="10">
          <h2>部门基本信息</h2>
          <el-form-item label="部门名称" prop="name">
            <el-input clearable v-model="departmentForm.name"></el-input>
          </el-form-item>
          <el-form-item label="部门描述" prop="description">
            <el-input clearable type="textarea" v-model="departmentForm.description"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <h2>部门成员</h2>
          <el-table :data="userList" v-loading.body="userListLoading" style="width: 100%" border stripe>
            <el-table-column type="index" label="序号" width="100"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="role" label="角色"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="form-wrapper">
        <el-col :span="10">
          <h2>部门权限</h2>
          <el-form-item>
            <el-tree
              :data="permissions"
              show-checkbox
              node-key="id">
            </el-tree>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="option">
        <el-button type="primary">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import {
  getDepartmentById,
  getEmployeeListByDepartmentId
} from '@/api/system'

export default {
  data () {
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
    return {
      departmentForm: {
        name: '',
        description: ''
      },
      departmentFormRules: {
        name: [{ required: true, message: '部门名称不能为空' }],
        description: [{ required: true, message: '部门描述不能为空' }]
      },
      userList: [],
      userListLoading: true,
      permissions: permissionOptions
    }
  },
  created () {
    this.getDepartment()
  },
  methods: {
    getDepartment () {
      getDepartmentById(this.$route.params.id).then(data => {
        console.log(data)
      })
      getEmployeeListByDepartmentId(this.$route.params.id).then(data => {
        if (data) {
          this.userList = data
          this.userListLoading = false
        } else {
          this.$message({
            type: 'error',
            message: '获取部门成员失败'
          })
        }
      })
    },
    resetForm (formName) {
      console.log(formName)
      this.$refs[formName].resetFields()
    },
    addContent () {
      this.catalogForm.catalogOther.push({
        content: '',
        description: '',
        page: '',
        remark: ''
      })
    },
    removeContent (index) {
      this.$confirm('是否删除该行？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.catalogForm.catalogOther.splice(index, 1)
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    .form-wrapper {
      padding: 20px;
      margin-bottom: 20px;
      background-color: #fff;
      h3 {
        padding-left: 200px;
        color: #303133;
      }
    }
    .option {
      text-align: center;
      margin: 50px;
      button {
        width: 200px;
      }
    }
  }
</style>
