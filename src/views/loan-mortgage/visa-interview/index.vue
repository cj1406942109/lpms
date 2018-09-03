<template>
  <div class="app-container">
    <h2>正在面签列表</h2>
    <el-table :data="visaInterviewList" v-loading.body="visaInterviewListLoading" style="width: 100%" border stripe>
      <el-table-column prop="taskId" label="编号" width="300"></el-table-column>
      <el-table-column prop="name" label="客户姓名"></el-table-column>
      <el-table-column prop="phone" label="联系方式"></el-table-column>
      <!-- <el-table-column prop="status" label="当前状态" width="200">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === '待确定签约状态' ? 'warning' : 'infro'"
            close-transition>{{scope.row.status}}</el-tag>
        </template>
      </el-table-column> -->
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
import { getVisaInterviewList } from '@/api/mortgage'
export default {
  name: 'visa-interview',
  data () {
    return {
      visaInterviewList: null,
      visaInterviewListLoading: true
    }
  },
  created () {
    this.GetVisaInterviewList()
    console.log(this.visaInterviewList)
  },
  methods: {
    GetVisaInterviewList () {
      getVisaInterviewList().then(response => {
        this.visaInterviewList = response.data.data
        console.log(this.visaInterviewList)
        this.visaInterviewListLoading = false
      })
    },
    goNext (item) {
      this.$router.push({ path: `/loan-mortgage/visa-interview/edit-info/${item.checklistId}` })
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
