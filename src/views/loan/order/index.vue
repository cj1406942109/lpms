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
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
              <br>
              <el-form-item label="订单类型">
                <el-select v-model="optionForm.loanType" placeholder="请选择">
                  <el-option label="所有" :value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="贷款编号">
                <el-input clearable v-model="optionForm.loanNumber"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="客户姓名">
                <el-input clearable v-model="optionForm.clientName"></el-input>
              </el-form-item>
              <el-form-item label="客户身份证号">
                <el-input clearable v-model="optionForm.IDCard"></el-input>
              </el-form-item>
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
      <el-table :data="orderList" v-loading.body="orderListLoading" style="width: 100%" border stripe>
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="loanId" label="贷款编号"></el-table-column>
        <el-table-column prop="loanType" label="借款品种">
          <template slot-scope="scope">
            <el-tag :type="tagLoanType(scope.row.loanType)">{{formateLoanType(scope.row.loanType)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="客户姓名"></el-table-column>
        <el-table-column prop="phone" label="联系方式"></el-table-column>
        <el-table-column prop="state" label="贷款当前状态" width="200">
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="goDetail(scope.row)">查看</el-button>
            <el-button type="danger" size="mini" @click="deleteOrder(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[20, 50, 100]"
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
import { formateLoanType, tagLoanType } from '@/utils/loan'
import { getOrderList, deleteOrder } from '@/api/loan'

export default {
  name: 'order-management',
  data () {
    return {
      orderList: null,
      orderListLoading: true,
      optionForm: {
        loanType: '',
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
      pageSize: 20,
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
  created () {
    this.queryOrder()
  },
  methods: {
    formateLoanType (loanType) {
      return formateLoanType(loanType)
    },
    tagLoanType (loanType) {
      return tagLoanType(loanType)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    queryOrder () {
      getOrderList(
        this.optionForm.loanType,
        this.optionForm.loanNumber,
        this.optionForm.clientName,
        this.optionForm.IDCard,
        this.optionForm.employeeName,
        this.optionForm.bank,
        this.optionForm.period ? this.optionForm.period[0] : '',
        this.optionForm.period ? this.optionForm.period[1] : '',
        this.pageNo,
        this.pageSize
      ).then(response => {
        console.log(response)
        this.orderListLoading = false
        if (response.data.status) {
          this.orderList = response.data.data
        }
      })
    },
    goDetail (item) {
      this.$router.push({ path: `/loan/order/status/${item.loanId}` })
    },
    deleteOrder (item) {
      this.dialogFormVisible = true
      this.selectedOrder = item
    },
    confirmDelete () {
      this.dialogFormVisible = false
      deleteOrder(this.selectedOrder.loanId, this.selectedOrder.taskId, this.deleteform.comment).then(response => {
        if (response.data.status) {
          this.$message({
            type: 'success',
            message: '订单删除成功'
          })
          this.queryOrder()
        }
      })
    }
  }
}
</script>


<style lang="scss" scoped>
  .app-container {
    padding: 20px;
    background-color: #fff;
    .table-options {
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