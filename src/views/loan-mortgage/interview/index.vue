<template>
  <div class="app-container">
    <h2>正在面谈列表</h2>
    <el-table :data="interviewList" v-loading.body="interviewListLoading" style="width: 100%" border stripe>
      <el-table-column prop="taskId" label="编号" width="300"></el-table-column>
      <el-table-column prop="name" label="客户姓名"></el-table-column>
      <el-table-column prop="phone" label="联系方式"></el-table-column>
      <el-table-column prop="state" label="当前状态" width="200">
        <!-- <template slot-scope="scope">
          <el-tag
            :type="scope.row.state === '表格未填写' ? 'warning' : 'success'"
            close-transition>{{scope.row.state}}</el-tag>
        </template> -->
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <!-- <el-dropdown>
            <el-button type="primary">
              选项<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="goNext(scope.row)">办理</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
          <el-button type="primary" size="mini" @click="goNext(scope.row)">办理</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getInterviewList } from '@/api/mortgage'
export default {
  name: 'interview',
  data () {
    return {
      interviewList: null,
      interviewListLoading: true
    }
  },
  created () {
    this.GetInterviewList()
  },
  methods: {
    GetInterviewList () {
      getInterviewList().then(response => {
        console.log(response)
        this.interviewList = response.data.data
        this.interviewListLoading = false
      })
    },
    goNext (item) {
      console.log(item)
      this.$router.push({ path: `/loan-mortgage/interview/edit-info/${item.taskId}` })
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
