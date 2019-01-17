<template>
  <div class="app-container">
    <div class="form-wrapper">
      <h2 v-if="isEditMode">编辑用户</h2>
      <h2 v-else>新增用户</h2>
      <el-form :model="accountForm" :rules="accountFormRules" ref="accountForm" label-width="200px">
        <el-row :gutter="20">
          <el-col :span="10">
            <h3>账号信息</h3>
            <el-form-item label="手机号（登录账号）" prop="phone">
              <el-input v-model="accountForm.phone"></el-input>
            </el-form-item>
            <!-- <el-form-item label="账号" prop="account">
              <el-input v-model="accountForm.account"></el-input>
            </el-form-item> -->
            <el-form-item label="密码" :prop="isEditMode ? '' : 'password'">
              <el-input v-model="accountForm.password" :placeholder="isEditMode ? '******' : ''"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="accountForm.name"></el-input>
            </el-form-item>
            <!-- <el-form-item label="部门">
              <el-select v-model="accountForm.department" placeholder="请选择部门">
                <el-option label="部门1" value="1"></el-option>
                <el-option label="部门2" value="2"></el-option>
              </el-select>
            </el-form-item>-->
            <el-form-item label="角色" prop="role">
              <el-select v-model="accountForm.role" placeholder="请选择角色">
                <el-option
                  v-for="role in roleList"
                  :key="role.id"
                  :label="role.name"
                  :value="role.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="position">
              <el-input v-model="accountForm.position"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <!-- <h3>账号权限</h3>
            <el-form-item>
              <el-tree :data="permissions" show-checkbox node-key="id"></el-tree>
            </el-form-item>-->
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="option">
      <el-button type="primary" @click="submit">保存</el-button>
      <!-- <el-button @click="resetForm('accountForm')">重置</el-button> -->
    </div>
  </div>
</template>

<script>
import {
  getUserById,
  getRoleList,
  createUser,
  updateUserById,
  gePermissionByEmployeeId
} from '@/api/system'

export default {
  data () {
    return {
      isEditMode: false,
      accountForm: {
        // account: '',
        password: '',
        name: '',
        department: '',
        role: '',
        phone: '',
        permission: {}
      },
      accountFormRules: {
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[0-9]{10}$/, message: '手机号格式有误', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        // account: [
        //   { required: true, message: '账号不能为空', trigger: 'blur' }
        // ],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '部门和角色不能为空', trigger: 'change' }
        ]
      },
      roleList: []
    }
  },
  methods: {
    getUser () {
      getUserById(this.$route.params.id).then(({ data }) => {
        // console.log(data)
        if (data) {
          this.accountForm.account = data.account
          this.accountForm.name = data.name
          this.accountForm.phone = data.phone
          this.accountForm.position = data.position
          this.accountForm.role = data.roles ? data.roles[0] ? data.roles[0].id : '' : ''
        } else {
          this.$message({
            type: 'error',
            message: '获取用户信息失败'
          })
        }
      })
    },
    getRoleList () {
      getRoleList().then(({ data }) => {
        if (data) {
          this.roleList = data
        } else {
          this.$message({
            type: 'error',
            message: '获取角色列表失败'
          })
        }
      })
    },
    getPermission () {
      gePermissionByEmployeeId(this.$route.params.id).then(({ data }) => {
        console.log(data)
      })
    },
    submit () {
      this.$refs['accountForm'].validate((valid) => {
        if (valid) {
          if (this.isEditMode) {
            const updateUserData = {
              id: this.$route.params.id,
              account: this.accountForm.phone,
              name: this.accountForm.name,
              phone: this.accountForm.phone,
              position: this.accountForm.position,
              roles: [this.accountForm.role]
            }
            if (this.accountForm.password) {
              updateUserData.password = this.accountForm.password
            }
            updateUserById(updateUserData).then(({ data }) => {
              if (data) {
                this.$message.success('更新成功')
              } else {
                this.$message.error('更新失败')
              }
            })
          } else {
            createUser({
              name: this.accountForm.name,
              account: this.accountForm.phone,
              password: this.accountForm.password,
              phone: this.accountForm.phone,
              position: this.accountForm.position,
              roles: [this.accountForm.role]
            }).then(({ data }) => {
              if (data) {
                this.$message.success('创建成功')
                this.$router.push({ path: '/system/account' })
              } else {
                this.$message.error('更新失败')
              }
            })
          }
        }
      })
    }
  },
  created () {
    this.getRoleList()
    if (this.$route.params.id !== undefined) {
      this.getUser()
      this.isEditMode = true
      // this.getPermission()
    } else {
      this.isEditMode = false
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
      margin-left: 50px;
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
