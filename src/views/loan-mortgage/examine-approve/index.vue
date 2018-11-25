<template>
  <div class="app-container">
    <h2>审批列表</h2>
    <el-table :data="examineApproveList" v-loading.body="examineApproveListLoading" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column :sortable="true" prop="rootId" label="贷款编号" width="200"></el-table-column>
      <el-table-column :sortable="true" prop="clientName" label="客户姓名"></el-table-column>
      <el-table-column :sortable="true" prop="clientPhone" label="联系方式" width="200"></el-table-column>
      <el-table-column :sortable="true" prop="extra.commentType" label="已出报告类型" width="150"
        :filter-method="filterCommentType"
        :filters="[{ text: '正评', value: '正评' }, { text: '预评', value: '预评' }]"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.extra.commentType == '正评' ? 'success' : 'warning'">
            {{scope.row.extra.commentType}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :sortable="true" prop="state" label="当前状态"
        :filter-method="filterState"
        :filters="[{ text: '待填写相关表格', value: 'open' }, { text: '已完成', value: 'finish' }, { text: '已关闭', value: 'close' }]"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <template v-if="scope.row.state == 'open'">
            <el-tag :type="scope.row.extra.catalogState.done ? 'success' : 'primary'">
              {{scope.row.extra.catalogState.message}}
            </el-tag>
            <el-tag :type="scope.row.extra.sendState.done ? 'success' : 'primary'">
              {{scope.row.extra.sendState.message}}
            </el-tag>
            <el-tag :type="scope.row.extra.approveState.done ? 'success' : 'primary'">
              {{scope.row.extra.approveState.message}}
            </el-tag>
            <el-tag :type="scope.row.extra.approveComment.done ? 'success' : 'primary'" v-if="scope.row.extra.commentType == '预评'">
              {{scope.row.extra.approveComment.message}}
            </el-tag>
          </template>
          <el-tag :type="tagState(scope.row.state)" v-else>
            {{formateState(scope.row.state)}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.state == 'open' ? false : true" type="primary" size="mini" @click="goNext(scope.row)">办理</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
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
      getApproveListByEmployeeId(this.userId).then(data => {
        this.examineApproveListLoading = false
        if (data) {
          this.examineApproveList = data
        } else {
          this.$message({
            type: 'error',
            message: '审批列表获取失败'
          })
        }
      })
    },
    goNext (item) {
      this.$router.push({ path: `/loan-mortgage/examine-approve/edit-info/${item.id}` })
    },
    tagState (item) {
      switch (item) {
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
          return '待填写相关表格'
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
    },
    filterCommentType (value, row) {
      return row.extra.commentType === value
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
