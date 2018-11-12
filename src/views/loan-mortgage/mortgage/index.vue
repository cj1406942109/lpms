<template>
  <div class="app-container">
    <h2>抵押列表</h2>
    <el-table :data="mortgageList" v-loading.body="mortgageListLoading" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column :sortable="true" prop="rootId" label="贷款编号" width="200"></el-table-column>
      <el-table-column :sortable="true" prop="clientName" label="客户姓名"></el-table-column>
      <el-table-column :sortable="true" prop="clientPhone" label="联系方式" width="200"></el-table-column>
      <el-table-column :sortable="true" prop="state" label="当前状态"
        :filter-method="filterState"
        :filters="[{ text: '待填写相关表格', value: 'open' }, { text: '已完成', value: 'finish' }, { text: '已关闭', value: 'close' }]"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <template v-if="scope.row.state == 'open'">
            <el-tag :type="scope.row.extra.mortgageState.done ? 'success' : 'primary'">
              {{scope.row.extra.mortgageState.message}}
            </el-tag>
            <el-tag :type="scope.row.extra.guaranteeApprove.done ? 'success' : 'primary'">
              {{scope.row.extra.guaranteeApprove.message}}
            </el-tag>
            <el-tag :type="scope.row.extra.guaranteePublish.done ? 'success' : 'primary'">
              {{scope.row.extra.guaranteePublish.message}}
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
          <el-button type="primary" :disabled="scope.row.state == 'open' ? false : true" size="mini" @click="goNext(scope.row)">办理</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  // getMortgageList
  getMortgageListByEmployeeId
} from '@/api/mortgage'
export default {
  name: 'evaluate-order',
  data () {
    return {
      mortgageList: null,
      mortgageListLoading: true
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  created () {
    this.getMortgageList()
  },
  methods: {
    getMortgageList () {
      getMortgageListByEmployeeId(this.userId).then(data => {
        this.mortgageListLoading = false
        this.mortgageList = data
      })
    },
    goNext (item) {
      this.$router.push({ path: `/loan-mortgage/mortgage/edit-info/${item.id}/${item.extra.mortgageState.done}/${item.extra.guaranteeApprove.done}/${item.extra.guaranteePublish.done}/${item.des}` })
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
