<template>
  <div class="app-container">
    <h2>过户列表</h2>
    <el-table :data="transferList" v-loading.body="transferListLoading" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column :sortable="true" prop="rootId" label="贷款编号" width="200"></el-table-column>
      <el-table-column :sortable="true" prop="clientName" label="客户姓名"></el-table-column>
      <el-table-column :sortable="true" prop="clientPhone" label="联系方式" width="200"></el-table-column>
      <el-table-column :sortable="true" prop="houseManager" label="房管局">
        <template slot-scope="scope">
          {{scope.row.extra.transferState.houseManager}}
        </template>
      </el-table-column>
      <el-table-column :sortable="true" label="过户方式">
        <template slot-scope="scope">
          <el-tag type="primary">
            权证部过户
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :sortable="true" prop="state" label="当前状态"
        :filter-method="filterState"
        :filters="[{ text: '待填写相关表格', value: 'open' }, { text: '已完成', value: 'finish' }, { text: '已关闭', value: 'close' }]"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <template v-if="scope.row.state == 'open'">
            <el-tag :type="scope.row.extra.transferState.done ? 'success' : 'primary'">
              {{scope.row.extra.transferState.message}}
            </el-tag>
            <el-tag :type="scope.row.extra.receiptState.done ? 'success' : 'primary'">
              {{scope.row.extra.receiptState.message}}
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
  getTransferListByEmployeeId
} from '@/api/house'
export default {
  name: 'evaluate-order',
  data () {
    return {
      transferList: null,
      transferListLoading: true
    }
  },
  created () {
    this.getTransferList()
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    getTransferList () {
      getTransferListByEmployeeId(this.userId).then(data => {
        this.transferListLoading = false
        if (data) {
          this.transferList = data
        } else {
          this.$message({
            type: 'error',
            message: '过户列表获取失败'
          })
        }
      })
    },
    goNext (item) {
      this.$router.push({ path: `/house/transfer/edit-info/${item.id}/${item.extra.transferState.done}/${item.des}` })
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
