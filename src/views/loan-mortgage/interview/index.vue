<template>
  <div class="app-container">
    <h2>面谈列表</h2>
    <el-table :data="interviewList" v-loading.body="interviewListLoading" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column :sortable="true" prop="rootId" label="贷款编号" width="200"></el-table-column>
      <el-table-column :sortable="true" prop="clientName" label="客户姓名"></el-table-column>
      <el-table-column :sortable="true" prop="clientPhone" label="联系方式" width="200"></el-table-column>
      <el-table-column :sortable="true" prop="state" label="当前状态"
        :filter-method="filterState"
        :filters="[{ text: '待填写面谈建议', value: 'open' }, { text: '已完成', value: 'finish' }, { text: '已关闭', value: 'close' }]"
        filter-placement="bottom-end">
        <template slot-scope="scope">
            <el-tag :type="tagState(scope.row.state)">
              {{formateState(scope.row.state)}}
            </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.state == 'open' ? false : true" type="primary" size="mini" @click="goNext(scope.row)">办理</el-button>
          <!-- <el-button :disabled="scope.row.state == 'open' ? false : true" type="danger" size="mini" @click="wasteSheetOperation(scope.row)">废单</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getViewListByEmployeeId
} from '@/api/mortgage'
export default {
  name: 'interview',
  data () {
    return {
      interviewList: null,
      interviewListLoading: true
    }
  },
  created () {
    this.getInterviewList()
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    getInterviewList () {
      getViewListByEmployeeId(this.userId).then(({ data }) => {
        this.interviewListLoading = false
        if (data) {
          this.interviewList = data
        } else {
          this.$message({
            type: 'error',
            message: '面谈列表获取失败'
          })
        }
      })
    },
    goNext (item) {
      this.$router.push({ path: `/loan-mortgage/interview/edit-info/${item.id}` })
    },
    tagState (state) {
      switch (state) {
        case 'open':
          return 'primary'
        case 'finish':
          return 'success'
        case 'close':
          return 'danger'
        default:
          return 'info'
      }
    },
    formateState (state) {
      switch (state) {
        case 'open':
          return '待填写面谈建议'
        case 'finish':
          return '已完成'
        case 'close':
          return '已关闭'
        default:
          return '其他'
      }
    },
    filterState (value, row) {
      return row.state === value
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
