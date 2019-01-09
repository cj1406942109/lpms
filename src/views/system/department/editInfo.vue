<template>
  <div class="app-container">
    <el-form
      :model="departmentForm"
      ref="departmentForm"
      label-width="200px"
      :rules="departmentFormRules"
    >
      <el-row :gutter="20" class="form-wrapper">
        <el-col :span="10">
          <h2>部门角色基本信息</h2>
          <el-form-item label="部门角色名称" prop="name">
            <el-input clearable v-model="departmentForm.name"></el-input>
          </el-form-item>
          <el-form-item label="部门角色描述" prop="note">
            <el-input clearable type="textarea" v-model="departmentForm.note"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2" v-if="isEditMode">
          <h2>部门角色成员</h2>
          <el-table
            :data="userList"
            v-loading.body="userListLoading"
            style="width: 100%"
            border
            stripe
            max-height="300"
          >
            <el-table-column type="index" label="序号" width="100"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="position" label="备注"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="form-wrapper">
        <el-col :span="10">
          <h2>部门角色权限</h2>
          <el-form-item>
            <el-tree
              :data="computedPermissionOptions"
              ref="permits-tree"
              show-checkbox
              node-key="id"
            ></el-tree>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="option">
        <el-button type="primary" @click="submit">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import {
  getRoleById,
  getPermitList,
  createRole,
  updateRoleById
  // getEmployeeListByDepartmentId
} from '@/api/system'

export default {
  data () {
    return {
      isEditMode: false,
      departmentForm: {
        name: '',
        note: ''
      },
      departmentFormRules: {
        name: [{ required: true, message: '部门名称不能为空' }],
        note: [{ required: true, message: '部门描述不能为空' }]
      },
      userList: [],
      userListLoading: true,
      permitList: []
    }
  },
  computed: {
    computedPermissionOptions () {
      if (this.permitList.length) {
        const options = []
        let redundantId = -999
        this.permitList.forEach((permit) => {
          const groupIndex = options.findIndex((option) => {
            return option.label === permit.group
          })
          if (groupIndex === -1) {
            options.push({
              id: --redundantId,
              label: permit.group,
              children: [{
                id: permit.id,
                label: permit.name,
                children: [{ label: '增', id: 'create' }, { label: '删', id: 'delete' }, { label: '改', id: 'update' }, { label: '查', id: 'retrieve' }, { label: '分配', id: 'distribute' }].map((additionPermit) => {
                  return {
                    label: additionPermit.label,
                    id: `${permit.id}:${additionPermit.id}`
                  }
                })
              }]
            })
          } else {
            options[groupIndex].children.push({
              id: permit.id,
              label: permit.name,
              children: [{ label: '增', id: 'create' }, { label: '删', id: 'delete' }, { label: '改', id: 'update' }, { label: '查', id: 'retrieve' }, { label: '分配', id: 'distribute' }].map((additionPermit) => {
                return {
                  label: additionPermit.label,
                  id: `${permit.id}:${additionPermit.id}`
                }
              })
            })
          }
        })
        return options
      }
      return []
    },
    computedPermits () {
      try {
        const nodes = this.$refs['permits-tree'].getCheckedKeys()
        const permits = {}
        const permitsList = []
        nodes.forEach((key) => {
          // if (typeof key === 'number' && key > 0) {
          //   if (!permits[key]) {
          //     permits[key] = {
          //       name: key,
          //       additionPermit: []
          //     }
          //   }
          // }
          if (typeof key === 'string') {
            const keyList = key.split(':')
            const keyCode = keyList[0]
            const keyString = keyList[1]
            if (!permits[keyCode]) {
              permits[keyCode] = {
                name: keyCode,
                additionPermit: [keyString]
              }
            } else {
              permits[keyCode].additionPermit.push(keyString)
            }
          }
        })
        for (const permit in permits) {
          permitsList.push(`${permits[permit].name}:${permits[permit].additionPermit.join(',')}`)
        }
        return permitsList
      } catch (e) {
        return []
      }
    }
  },
  created () {
    this.getPermitList()
    if (this.$route.params.id !== undefined) {
      this.getRole()
      this.isEditMode = true
    } else {
      this.isEditMode = false
    }
  },
  methods: {
    getRole () {
      getRoleById(this.$route.params.id).then(data => {
        if (data) {
          this.departmentForm.name = data.name
          this.departmentForm.note = data.note
          this.setRolePermits(data.permits || [])
          this.userList = data.users
          this.userListLoading = false
        } else {
          this.$message({
            type: 'error',
            message: '获取部门成员失败'
          })
        }
      })
      // getEmployeeListByDepartmentId(this.$route.params.id).then(data => {
      //   if (data) {
      //     this.userList = data
      //     this.userListLoading = false
      //   } else {
      //     this.$message({
      //       type: 'error',
      //       message: '获取部门成员失败'
      //     })
      //   }
      // })
    },
    getPermitList () {
      getPermitList().then(data => {
        if (data) {
          this.permitList = data || []
        } else {
          this.$message({
            type: 'error',
            message: '获取部门成员失败'
          })
        }
      })
    },
    setRolePermits (permits) {
      const permitsList = []
      permits.forEach((permit) => {
        const permitCode = permit.id
        const permitOperationList = permit.operation.split(',')
        permitOperationList.forEach((o) => {
          permitsList.push(`${permitCode}:${o}`)
        })
      })
      this.$refs['permits-tree'].setCheckedKeys(permitsList)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    submit () {
      this.$refs['departmentForm'].validate((valid) => {
        if (valid) {
          if (this.isEditMode) {
            updateRoleById({
              id: this.$route.params.id,
              name: this.departmentForm.name,
              note: this.departmentForm.note,
              permits: this.computedPermits
            }).then(data => {
              if (data) {
                this.$message.success('更新成功')
              } else {
                this.$message.error('更新失败')
              }
            })
          } else {
            createRole({
              name: this.departmentForm.name,
              note: this.departmentForm.note,
              permits: this.computedPermits
            }).then(data => {
              if (data) {
                this.$message.success('创建成功')
                this.$router.push({ path: '/system/department' })
              } else {
                this.$message.error('更新失败')
              }
            })
          }
        }
      })
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
