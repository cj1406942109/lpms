<template>
  <div class="app-container">
    <h2>担保列表</h2>
    <el-table :data="guaranteeList" v-loading.body="guaranteeListLoading" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column :sortable="true" prop="rootId" label="贷款编号" width="200"></el-table-column>
      <el-table-column :sortable="true" prop="clientName" label="客户姓名"></el-table-column>
      <el-table-column :sortable="true" prop="clientPhone" label="联系方式" width="200"></el-table-column>
      <el-table-column :sortable="true" prop="extra.commentType" label="正评状态" width="150"
        :filter-method="filterCommentType"
        :filters="[{ text: '已出正评', value: '正评' }, { text: '待出正评', value: '预评' }]"
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
            <el-tag :type="scope.row.extra.guaranteeState.done ? 'success' : 'primary'">
              {{scope.row.extra.guaranteeState.message}}
            </el-tag>
            <el-tag :type="scope.row.extra.reportState.done ? 'success' : 'primary'" v-if="scope.row.extra.commentType == '预评'">
              {{scope.row.extra.reportState.message}}
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
  getGuaranteeListByEmployeeId
} from '@/api/house'
export default {
  name: 'guarantee',
  data () {
    return {
      guaranteeList: null,
      guaranteeListLoading: true
    }
  },
  created () {
    this.getGuaranteeList()
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    getGuaranteeList () {
      getGuaranteeListByEmployeeId(this.userId).then(({ data }) => {
        this.guaranteeListLoading = false
        if (data) {
          this.guaranteeList = data
        } else {
          this.$message({
            type: 'error',
            message: '担保列表获取失败'
          })
        }
      })
    },
    goNext (item) {
      this.$router.push({ path: `/house/guarantee/edit-info/${item.id}` })
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
