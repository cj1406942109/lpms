<template>
  <div class="app-container">
    <h2>正在面谈列表</h2>
    <el-table :data="interviewList" v-loading.body="interviewListLoading" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="loanId" label="贷款编号"></el-table-column>
      <el-table-column prop="name" label="客户姓名"></el-table-column>
      <el-table-column prop="phone" label="联系方式"></el-table-column>
      <el-table-column prop="state" label="当前状态" width="200">
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="goNext(scope.row)">办理</el-button>
          <el-button type="success" size="mini" @click="assignTask(scope.row)">分配</el-button>
          <el-button type="danger" size="mini" @click="wasteSheetOperation(scope.row)">废单</el-button>
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
  getInterviewList,
  // getInterviewById,
  wasteSheet,
  assignTaskToUser,
  getAssignUserList
} from '@/api/mortgage'
export default {
  name: 'interview',
  data () {
    return {
      interviewList: null,
      interviewListLoading: true,
      assignUserListLoading: true,
      assignUserList: [{
        name: '李华',
        phone: '13377665544'
      }],
      dialogTableVisible: false,
      selectedTask: null,
      departmentId: '0f165b4a1e8747a1a143fc23773f2a61'
    }
  },
  created () {
    this.getInterviewList()
  },
  computed: {
    ...mapGetters([
      'user_id'
    ])
  },
  methods: {
    getInterviewList () {
      // if (this.user_id === '823d84b92c314b16b39c63f78a1eee82') {
      //   getInterviewById(this.user_id).then(response => {
      //     this.interviewListLoading = false
      //     if (response.data.status) {
      //       this.interviewList = response.data.data
      //     } else {
      //       this.$message({
      //         type: 'error',
      //         message: '面谈列表获取失败，请稍候重试'
      //       })
      //     }
      //   })
      // } else {
      // }
      getInterviewList().then(response => {
        this.interviewListLoading = false
        if (response.data.status) {
          this.interviewList = response.data.data
        } else {
          this.$message({
            type: 'error',
            message: '面谈列表获取失败，请稍候重试'
          })
        }
      })
    },
    goNext (item) {
      this.$router.push({ path: `/loan-mortgage/interview/edit-info/${item.taskId}` })
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
          this.getInterviewList()
        }
      })
      console.log(item)
    },
    wasteSheetOperation (item) {
      console.log(item)
      this.$confirm('废单操作将结束当前贷款的所有流程，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'info',
          message: '正在处理...'
        })
        wasteSheet(item.taskId, this.user_id).then(response => {
          if (response.data.status) {
            this.$message({
              type: 'success',
              message: '废单操作执行成功'
            })
            this.getInterviewList()
          } else {
            this.$message({
              showClose: true,
              message: '操作失败，请稍候重试',
              type: 'error'
            })
          }
        })
      }).catch(() => {})
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
