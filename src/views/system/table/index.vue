<template>
  <div class="app-container">
    <h2>表格列表</h2>
    <el-table :data="tableTypeList" v-loading.body="tableListLoading" style="width: 100%" border stripe>
      <el-table-column prop="label" label="表格名称" width="300"></el-table-column>
      <el-table-column prop="value" label="预设值"></el-table-column>
      <!-- <el-table-column prop="status" label="当前状态" width="200">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === '待确定签约状态' ? 'warning' : 'infro'"
            close-transition>{{scope.row.status}}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editTable(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
    <!-- <el-form :model="form">
      <el-form-item label="活动名称">
      <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
      <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
      </el-select>
      </el-form-item>
    </el-form> -->
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTableList } from '@/api/system'
export default {
  name: 'visa-interview',
  data () {
    return {
      tableList: null,
      tableListLoading: true,
      tableTypeList: [
        { label: '抵押贷款-面签-面签地点', valueType: 0 },
        { label: '抵押贷款-评估下单-评估公司', valueType: 1 },
        { label: '抵押贷款-审批-放款条件', valueType: 2 },
        { label: '二手房贷款-面签-面签地点', valueType: 3 },
        { label: '二手房贷款-评估下单-评估公司', valueType: 4 }
      ],
      dialogFormVisible: false
    }
  },
  created () {
    this.GetTableList()
    console.log(this.tableList)
  },
  methods: {
    GetTableList () {
      getTableList().then(response => {
        this.tableList = response.data.data
        console.log(this.tableList)
        this.tableListLoading = false
      })
    },
    editTable (item) {
      this.dialogFormVisible = true
      // this.$router.push({ path: `/loan-mortgage/visa-interview/edit-info/${item.checklistId}` })
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
