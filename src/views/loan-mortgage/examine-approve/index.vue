<template>
  <div class="app-container">
    <h2>正在审批列表</h2>
    <el-table :data="examineApproveList" v-loading.body="examineApproveListLoading" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="rootId" label="贷款编号" width="300"></el-table-column>
      <el-table-column prop="clientName" label="客户姓名"></el-table-column>
      <el-table-column prop="clientPhone" label="联系方式"></el-table-column>
      <el-table-column prop="report_type" label="已出报告类型"></el-table-column>
      <el-table-column prop="state" label="当前状态" width="200"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="goNext(scope.row)">办理</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  // getApproveList
  getApproveListByEmployeeId
} from '@/api/mortgage'
export default {
  name: 'examineApprove',
  data () {
    return {
      examineApproveList: null,
      examineApproveListLoading: true
    }
  },
  created () {
    this.getApproveList()
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    getApproveList () {
      // getApproveList().then(data => {
      //   this.examineApproveListLoading = false
      //   this.examineApproveList = data
      // })
      getApproveListByEmployeeId(this.userId).then(data => {
        this.examineApproveListLoading = false
        this.examineApproveList = data
      })
    },
    goNext (item) {
      this.$router.push({ path: `/loan-mortgage/examine-approve/edit-info/${item.id}/${item.rootId}` })
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
