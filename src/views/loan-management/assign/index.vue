<template>
  <div class="app-container">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="抵押贷款" name="mortgage">
        <h3>抵押贷款业务分配</h3>
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
      mortgageListLoading: true,
      houseList: [],
      houseListLoading: true,
      activeTab: 'mortgage',
      dialogVisible: false,
      userList: [],
      currentTask: ''
    }
  },
  created () {
    this.getMortgageList()
    this.getHouseList()
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
    getMortgageList () {
      this.mortgageList = []
      let viewList = []
      let visaList = []
      Promise.all([getViewList().then(data => {
        if (data) {
          viewList = data
        } else {
          this.$message({
            type: 'error',
            message: '获取抵押贷款面谈任务列表失败'
          })
        }
      }), getVisaMList().then(data => {
        if (data) {
          visaList = data
        } else {
          this.$message({
            type: 'error',
            message: '获取抵押贷款面签任务列表失败'
          })
        }
      })]).then(() => {
        this.mortgageListLoading = false
        viewList.forEach(ele => {
          if (ele.state === 'open') {
            this.mortgageList.push(ele)
          }
        })
        visaList.forEach(ele => {
          if (ele.state === 'open') {
            this.mortgageList.push(ele)
          }
        })
      })
    },
    getHouseList () {
      this.houseList = []
      let visaList = []
      let orderList = []
      let transferList = []
      let guaranteeList = []
      Promise.all([getVisaHList().then(data => {
        if (data) {
          visaList = data
        } else {
          this.$message({
            type: 'error',
            message: '获取二手房贷款面签任务列表失败'
          })
        }
      }), getOrderList().then(data => {
        if (data) {
          orderList = data
        } else {
          this.$message({
            type: 'error',
            message: '获取二手房贷款评估下单任务列表失败'
          })
        }
      }), getTransferList().then(data => {
        if (data) {
          transferList = data
        } else {
          this.$message({
            type: 'error',
            message: '获取二手房贷款过户任务列表失败'
          })
        }
      }), getGuaranteeList().then(data => {
        if (data) {
          guaranteeList = data
        } else {
          this.$message({
            type: 'error',
            message: '获取二手房贷款担保任务列表失败'
          })
        }
      })]).then(() => {
        this.houseListLoading = false
        visaList.forEach(ele => {
          if (ele.state === 'open') {
            this.houseList.push(ele)
          }
        })
        orderList.forEach(ele => {
          if (ele.state === 'open') {
            this.houseList.push(ele)
          }
        })
        transferList.forEach(ele => {
          if (ele.state === 'open') {
            this.houseList.push(ele)
          }
        })
        guaranteeList.forEach(ele => {
          if (ele.state === 'open') {
            this.houseList.push(ele)
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
            this.getMortgageList()
            this.getHouseList()
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