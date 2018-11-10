<template>
  <div class="app-container">
    <div class="form-wrapper">
      <el-form label-width="200px">
        <h2>部门基本信息</h2>

      </el-form>
    </div>
  </div>
</template>

<script>
import {
  getDepartmentById,
  getEmployeeListByDepartmentId
} from '@/api/system'

export default {
  name: 'sign-contract',
  data () {
    return {
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
        console.log(data)
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
      h2 {
        margin: 0;
      }
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
