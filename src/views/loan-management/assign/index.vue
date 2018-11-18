<template>
  <div class="app-container">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="抵押贷款" name="mortgage">
        <h3>抵押贷款业务分配</h3>
        <el-alert title="开始分配之前，请选择要分配的贷款状态，点击确定按钮获取待分配列表" type="warning"></el-alert>
        <div class="option-wrapper">
          贷款状态：
          <el-select v-model="loanMStatus" placeholder="请选择贷款状态">
            <el-option v-for="item in loanMStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-button type="primary" @click="filterOrderList()">确定</el-button>
        </div>
        <el-table :data="mortgageList" v-loading.body="mortgageListLoading" style="width: 100%" border stripe>
          <el-table-column type="index" label="序号" width="100"></el-table-column>
          <el-table-column :sortable="true" prop="rootId" label="贷款编号" width="200"></el-table-column>
          <el-table-column :sortable="true" prop="clientName" label="客户姓名"></el-table-column>
          <el-table-column :sortable="true" prop="clientPhone" label="联系方式"></el-table-column>
          <el-table-column :sortable="true" prop="des" label="贷款当前所处流程" width="200">
            <template slot-scope="scope">
              <el-tag :type="tagState(scope.row.des)">
                {{scope.row.des}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column :sortable="true" prop="employeeId" label="所属用户ID" width="200"></el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="assignHandler(scope.row)">分配</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="二手房贷款" name="house">
        <h3>二手房贷款业务分配</h3>
        <el-alert title="开始分配之前，请选择要分配的贷款状态，点击确定按钮获取待分配列表" type="warning"></el-alert>
        <div class="option-wrapper">
          贷款状态：
          <el-select v-model="loanHStatus" placeholder="请选择贷款状态">
            <el-option v-for="item in loanHStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-button type="primary" @click="filterOrderList()">确定</el-button>
        </div>
        <el-table :data="houseList" v-loading.body="houseListLoading" style="width: 100%" border stripe>
          <el-table-column type="index" label="序号" width="100"></el-table-column>
          <el-table-column :sortable="true" prop="rootId" label="贷款编号" width="200"></el-table-column>
          <el-table-column :sortable="true" prop="clientName" label="客户姓名"></el-table-column>
          <el-table-column :sortable="true" prop="clientPhone" label="联系方式"></el-table-column>
          <el-table-column :sortable="true" prop="des" label="贷款当前所处流程" width="200">
            <template slot-scope="scope">
              <el-tag :type="tagState(scope.row.des)">
                {{scope.row.des}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column :sortable="true" prop="employeeId" label="所属用户ID" width="200"></el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="assignHandler(scope.row)">分配</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="可分配用户列表" :visible.sync="dialogVisible">
      <el-table :data="userList">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="departmentId" label="部门ID"></el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="assignUser(scope.row)">确定分配</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
// FIXME: 此处需要添加一个根据用户id去获取用户信息的接口
import { getUserList } from '@/api/system'
import { assinTaskToUser } from '@/api/loan'
import {
  getViewList,
  getVisaList as getVisaMList
} from '@/api/mortgage'

import {
  getVisaList as getVisaHList,
  getOrderList,
  getTransferList,
  getGuaranteeList
} from '@/api/house'
export default {
  data () {
    return {
      mortgageList: [],
      mortgageListLoading: false,
      houseList: [],
      houseListLoading: false,
      activeTab: 'mortgage',
      dialogVisible: false,
      userList: [],
      currentTask: '',
      loanMStatus: 'ALL',
      loanHStatus: 'ALL',
      loanMStatusOptions: [
        { label: '所有', value: 'ALL' },
        { label: '面谈', value: 'VIEW' },
        { label: '面签', value: 'VISA' }
      ],
      loanHStatusOptions: [
        { label: '所有', value: 'ALL' },
        { label: '面签', value: 'VISA' },
        { label: '评估下单', value: 'ORDER' },
        { label: '过户', value: 'TRANSFER' },
        { label: '担保', value: 'GUARANTEE' }
      ]
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    formatter (row, column) {
      return row.address
    },
    filterTag (value, row) {
      return row.tag === value
    },
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    getViewMList () {
      return this.getListByStatus(getViewList, '抵押', '面谈')
    },
    getVisaMList () {
      return this.getListByStatus(getVisaMList, '抵押', '面签')
    },
    getVisaHList () {
      return this.getListByStatus(getVisaHList, '二手房', '面签')
    },
    getOrderHList () {
      return this.getListByStatus(getOrderList, '二手房', '评估下单')
    },
    getTransferHList () {
      return this.getListByStatus(getTransferList, '二手房', '过户')
    },
    getGuaranteeHList () {
      return this.getListByStatus(getGuaranteeList, '二手房', '担保')
    },
    getListByStatus (f, loanType, status) {
      return new Promise((resolve, reject) => {
        f().then(data => {
          if (data) {
            if (data === 709) {
              this.$message({
                type: 'warning',
                message: `没有权限获取${loanType}贷款${status}任务列表`
              })
              resolve([])
            } else {
              resolve(data)
            }
          } else {
            this.$message({
              type: 'error',
              message: `获取${loanType}贷款${status}任务列表失败`
            })
            reject()
          }
        })
      })
    },
    getUserList () {
      getUserList().then(data => {
        if (data) {
          this.userList = data
        } else {
          this.$message({
            type: 'error',
            message: '获取用户列表失败'
          })
        }
      })
    },
    assignHandler (item) {
      this.currentTask = item
      this.dialogVisible = true
    },
    assignUser (item) {
      this.$confirm(`是否将当前任务分配给${item.name}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'info',
          message: '正在处理...'
        })
        assinTaskToUser(this.currentTask.rootId, item.id).then(data => {
          this.$message.closeAll()
          if (data) {
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: '任务分配成功'
            })
            this.filterOrderList()
          } else {
            this.$message({
              type: 'error',
              message: '任务分配失败'
            })
          }
        })
      }).catch(() => {})
    },
    tagState (state) {
      switch (state) {
        case '面谈':
          return 'primay'
        case '面签':
          return 'success'
        case '评估下单':
          return 'info'
        case '过户':
          return 'warning'
        case '担保':
          return 'danger'
        default:
          return 'primary'
      }
    },
    filterOrderList () {
      let tempList = []
      if (this.activeTab === 'mortgage') {
        // 抵押贷款
        this.mortgageList = []
        this.mortgageListLoading = true
        if (this.loanMStatus === 'ALL') {
          const viewList = []
          const visaList = []
          Promise.all([this.getViewMList().then(data => {
            this.viewList = data
          }), this.getVisaMList().then(data => {
            this.visaList = data
          })]).then(() => {
            this.mortgageListLoading = false
            tempList = viewList.concat(visaList)
          }).catch(() => {
            this.mortgageListLoading = false
          })
        } else if (this.loanMStatus === 'VIEW') {
          this.getViewMList().then((data) => {
            this.mortgageListLoading = false
            tempList = data
          }).catch(() => {
            this.mortgageListLoading = false
          })
        } else if (this.loanMStatus === 'VISA') {
          this.getVisaMList().then((data) => {
            this.mortgageListLoading = false
            tempList = data
          }).catch(() => {
            this.mortgageListLoading = false
          })
        }
        tempList.forEach(ele => {
          if (ele.state === 'open') {
            this.mortgageList.push(ele)
          }
        })
      } else if (this.activeTab === 'house') {
        // 二手房贷款
        this.houseList = []
        this.houseListLoading = true
        if (this.loanHStatus === 'ALL') {
          const visaList = []
          const orderList = []
          const transferList = []
          const guaranteeList = []
          Promise.all([this.getVisaHList().then(data => {
            this.visaList = data
          }), this.getOrderHList().then(data => {
            this.orderList = data
          }), this.getTransferHList().then(data => {
            this.transferList = data
          }), this.getGuaranteeHList().then(data => {
            this.guaranteeList = data
          })]).then(() => {
            this.houseListLoading = false
            tempList = visaList.concat(orderList).concat(transferList).concat(guaranteeList)
          }).catch(() => {
            this.houseListLoading = false
          })
        } else if (this.loanHStatus === 'VISA') {
          this.getVisaHList().then((data) => {
            this.houseListLoading = false
            tempList = data
          }).catch(() => {
            this.houseListLoading = false
          })
        } else if (this.loanHStatus === 'ORDER') {
          this.getOrderHList().then((data) => {
            this.houseListLoading = false
            tempList = data
          }).catch(() => {
            this.houseListLoading = false
          })
        } else if (this.loanHStatus === 'TRANSFER') {
          this.getTransferHList().then((data) => {
            this.houseListLoading = false
            tempList = data
          }).catch(() => {
            this.houseListLoading = false
          })
        } else if (this.loanHStatus === 'GUARANTEE') {
          this.getGuaranteeHList().then((data) => {
            this.houseListLoading = false
            tempList = data
          }).catch(() => {
            this.houseListLoading = false
          })
        }
        tempList.forEach(ele => {
          if (ele.state === 'open') {
            this.mortgageList.push(ele)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    padding: 20px;
    background-color: #fff;
    .option-wrapper {
      margin: 20px;
    }
  }
</style>