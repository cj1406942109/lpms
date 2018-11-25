<template>
  <div class="app-container">
    <h2>订单管理</h2>
    <div class="table-options">
      <el-collapse>
        <el-collapse-item>
          <template slot="title"><h3>订单选项查询</h3></template>
          <div>
            <el-form v-model="optionForm" ref="optionForm" label-width="200px" inline>
              <el-form-item label="订单时间段">
                <el-date-picker
                  v-model="optionForm.period"
                  type="daterange"
                  align="left"
                  unlink-panels
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="timestamp"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
              <br>
              <!-- <el-form-item label="订单类型">
                <el-select v-model="optionForm.loanType" placeholder="请选择">
                  <el-option label="所有" value=""></el-option>
                  <el-option label="抵押贷款" :value="1"></el-option>
                  <el-option label="二手房贷款" :value="2"></el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="贷款编号">
                <el-input clearable v-model="optionForm.loanNumber"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="客户姓名">
                <el-input clearable v-model="optionForm.clientName"></el-input>
              </el-form-item>
              <!-- <el-form-item label="客户身份证号">
                <el-input clearable v-model="optionForm.IDCard"></el-input>
              </el-form-item> -->
              <br>
              <el-form-item label="经办银行">
                <el-select v-model="optionForm.bank" placeholder="请选择">
                  <el-option label="所有" :value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="经办人员">
                <el-input clearable v-model="optionForm.employeeName"></el-input>
              </el-form-item>
              <br>
              <el-form-item label=" ">
                <el-button type="primary" @click="queryOrder()">查询</el-button>
                <el-button @click="resetForm('optionForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div>
      <el-tabs v-model="activeTab" @tab-click="tabChange">
        <el-tab-pane label="抵押贷款" name="mortgage">
          <el-table :data="orderList" v-loading.body="orderListLoading" style="width: 100%" border stripe>
            <el-table-column type="index" label="序号" width="100"></el-table-column>
            <el-table-column :sortable="true" prop="id" label="贷款编号" width="200"></el-table-column>
            <el-table-column :sortable="true" label="贷款类型">
              <template slot-scope="scope">
                <el-tag :type="`${scope.row.id}`[0] == '1' ? 'success':'warning'">
                  {{`${scope.row.id}`[0] == '1' ? '抵押贷款' : '二手房贷款' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column :sortable="true" prop="clientName" label="客户姓名"></el-table-column>
            <el-table-column :sortable="true" prop="clientPhone" label="联系方式"></el-table-column>
            <el-table-column :sortable="true" prop="state" label="贷款当前所处流程" width="200">
              <template slot-scope="scope">
                {{scope.row.state | formatState}}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="250">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="goDetail(scope.row)">查看</el-button>
                <el-button type="danger" size="mini" @click="deleteOrder(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="二手房贷款" name="house">
          <el-table :data="orderList" v-loading.body="orderListLoading" style="width: 100%" border stripe>
            <el-table-column type="index" label="序号" width="100"></el-table-column>
            <el-table-column :sortable="true" prop="id" label="贷款编号" width="200"></el-table-column>
            <el-table-column :sortable="true" label="贷款类型">
              <template slot-scope="scope">
                <el-tag :type="`${scope.row.id}`[0] == '1' ? 'success':'warning'">
                  {{`${scope.row.id}`[0] == '1' ? '抵押贷款' : '二手房贷款' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column :sortable="true" prop="clientName" label="客户姓名"></el-table-column>
            <el-table-column :sortable="true" prop="clientPhone" label="联系方式"></el-table-column>
            <el-table-column :sortable="true" prop="state" label="贷款当前所处流程" width="200">
              <template slot-scope="scope">
                {{scope.row.state | formatState}}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="250">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="goDetail(scope.row)">查看</el-button>
                <el-button type="danger" size="mini" @click="deleteOrder(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal">
      </el-pagination>
    </div>
    <el-dialog title="删除订单" :visible.sync="dialogFormVisible" width="500px" @close="resetForm('deleteForm')">
      <el-alert
        title="删除订单操作将终止当前订单的所有流程，请谨慎操作！"
        type="warning"
        description="如果确定要删除该订单，请在下方的输入框中填写删除原因..."
        :closable="false"
        show-icon>
      </el-alert>
      <el-form :model="deleteform" ref="deleteForm" :rules="deleteFormRules">
        <el-form-item label="删除原因备注" prop="comment">
          <el-input  type="textarea" v-model="deleteform.comment" placeholder="删除原因..."></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="danger" @click="confirmDelete()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getOrderList, deleteOrder } from '@/api/loan'

export default {
  name: 'order-management',
  data () {
    return {
      activeTab: 'mortgage',
      orderList: null,
      orderListLoading: true,
      optionForm: {
        loanType: 1,
        loanNumber: '',
        clientName: '',
        IDCard: '',
        employeeName: '',
        bank: '',
        period: ''
      },
      deleteform: {
        comment: ''
      },
      deleteFormRules: {
        comment: [
          { required: true, message: '请输入删除原因' }
        ]
      },
      pageNo: 1,
      pageSize: 10,
      pageTotal: 0,
      dialogFormVisible: false,
      selectedOrder: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  filters: {
    formatState: function (val) {
      switch (val) {
        case 'checklist':
          return '接单'
        case 'view':
          return '面谈'
        case 'visa':
          return '面签'
        case 'order':
          return '评估下单'
        case 'input':
          return '整件输机'
        case 'approve':
          return '审批'
        case 'transfer':
          return '过户'
        case 'mortgage':
          return '抵押'
        case 'mortgageA':
          return '抵押'
        case 'guarantee':
          return '担保'
        case 'loan':
          return '放款'
        case 'charge':
          return '收费'
        case 'finish':
          return '已完成'
        case 'close':
          return '已废单'
      }
    }
  },
  created () {
    this.queryOrder()
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      this.queryOrder()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.queryOrder()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    queryOrder () {
      getOrderList(this.optionForm, this.pageNo, this.pageSize).then(data => {
        this.orderListLoading = false
        if (data) {
          this.orderList = data.list
          this.pageTotal = data.size
        } else {
          this.$message({
            type: 'error',
            message: '订单列表获取失败'
          })
        }
      })
    },
    goDetail (item) {
      this.$router.push({ path: `/loan-management/order/status/${item.id}` })
    },
    deleteOrder (item) {
      this.dialogFormVisible = true
      this.selectedOrder = item
    },
    confirmDelete () {
      this.$refs['deleteForm'].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          deleteOrder(this.selectedOrder.rootId, this.selectedOrder.id, this.deleteform.comment).then(data => {
            if (data) {
              this.$message({
                type: 'success',
                message: '订单删除成功'
              })
              this.queryOrder()
            }
          })
        } else {
          return false
        }
      })
    },
    tabChange (tab) {
      this.activeTab = tab.name
      if (this.activeTab === 'house') {
        this.optionForm.loanType = 2
      } else {
        this.optionForm.loanType = 1
      }
      this.queryOrder()
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    padding: 20px;
    background-color: #fff;
    .table-options {
      margin-bottom: 20px;
      .el-collapse {
        border-top: none;
        border: 1px solid #409eff;
        padding: 20px;
        h3 {
          margin: 0;
        }
      }
    }
    .el-pagination {
      text-align: right;
    }
    .el-table {
      margin: 20px 0;
    }
  }
</style>