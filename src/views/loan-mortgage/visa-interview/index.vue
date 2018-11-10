<template>
  <div class="app-container">
    <h2>正在面签列表</h2>
    <el-table :data="visaInterviewList" v-loading.body="visaInterviewListLoading" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="rootId" label="贷款编号" width="300"></el-table-column>
      <el-table-column prop="clientName" label="客户姓名"></el-table-column>
      <el-table-column prop="clientPhone" label="联系方式"></el-table-column>
      <el-table-column prop="state" label="当前状态" width="200"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="goNext(scope.row)">办理</el-button>
          <el-button type="success" size="mini" @click="assignTask(scope.row)">分配</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="可分配用户列表" :visible.sync="dialogTableVisible" v-loading.body="assignUserListLoading">
      <el-table :data="assignUserList" >
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column property="name" label="姓名"></el-table-column>
        <el-table-column property="phone" label="联系方式"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="assignTaskToUser(scope.row)">分配任务</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getVisaList,
  getVisaListByEmployeeId,
  assignTaskToUser,
  getAssignUserList
} from '@/api/mortgage'
export default {
  name: 'visa-interview',
  data () {
    return {
      visaInterviewList: null,
      visaInterviewListLoading: true,
      assignUserListLoading: true,
      assignUserList: [{
        name: '李华',
        phone: '13377665544'
      }],
      dialogTableVisible: false,
      selectedTask: null,
      departmentId: '3242bdd1b6e14896a464514ed4e52236'
    }
  },
  created () {
    this.getVisaInterviewList()
  },
  computed: {
    ...mapGetters([
      'userId',
      'permission'
    ])
  },
  methods: {
    getVisaInterviewList () {
      if (this.permission.includes('mortgage_visa_getVisaList')) {
        getVisaList().then(data => {
          this.visaInterviewListLoading = false
          this.visaInterviewList = data
        })
      } else {
        getVisaListByEmployeeId(this.userId).then(data => {
          this.visaInterviewListLoading = false
          this.visaInterviewList = data
        })
      }
    },
    goNext (item) {
      console.log(item)
      this.$router.push({ path: `/loan-mortgage/visa-interview/edit-info/${item.id}/${item.rootId}` })
    },
    assignTask (item) {
      this.selectedTask = item
      getAssignUserList(this.departmentId).then(response => {
        this.assignUserListLoading = false
        if (response.data.status) {
          this.assignUserList = response.data.data
          this.assignUserList.forEach(function (item) {
            let prefix = '1'
            for (let i = 0; i < 10; i++) {
              prefix += Math.floor(Math.random() * 10)
            }
            item.phone = prefix
          })
        } else {
          this.$message({
            type: 'error',
            message: '可分配用户列表获取失败，请稍候重试'
          })
        }
      })
      this.dialogTableVisible = true
    },
    assignTaskToUser (item) {
      assignTaskToUser(this.selectedTask.taskId, item.id).then(response => {
        if (response.data.status) {
          this.dialogTableVisible = false
          this.$message({
            type: 'success',
            message: '任务分配成功'
          })
          this.GetVisaInterviewList()
        }
      })
      console.log(item)
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    padding: 20px;
    background-color: #fff;
  }
</style>
