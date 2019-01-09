<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card class="box-card todo-list">
          <div slot="header">
            <span class="title">待办事项</span>
            <el-button type="text" @click="moreTodo">查看更多>>></el-button>
          </div>
          <el-table :data="todoList" v-loading.body="toodoListLoading" border stripe style="width: 100%" height="400">
            <el-table-column type="index" label="序号" width="100"></el-table-column>
            <el-table-column :sortable="true" prop="id" label="贷款编号" width="200"></el-table-column>
            <el-table-column :sortable="true" prop="type" label="贷款类型">
              <template slot-scope="scope">
                <el-tag :type="`${scope.row.id}`[0] == '1' ? 'success':'warning'">
                  {{`${scope.row.id}`[0] == '1' ? '抵押贷款' : '二手房贷款' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column :sortable="true" prop="clientName" label="姓名"></el-table-column>
            <el-table-column :sortable="true" prop="clientPhone" label="电话"></el-table-column>
            <el-table-column label="操作" width="250">
              <template slot-scope="scope">
                <el-button :disabled="scope.row.state == 'finish'" type="primary" size="mini" @click="goNext(getNextPath(scope.row))">办理</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card quick-entrance">
          <div slot="header">
            <span class="title">快捷入口</span>
            <!-- <el-button type="text">编辑</el-button> -->
          </div>
          <div class="tag-wrapper" v-for="item in quickEntranceList" :key="item.id">
            <h3>{{item.title}}</h3>
            <el-tag v-for="tag in item.value" :key="tag.id" @click.native="goNext(`${item.baseUrl}/${tag.value}`)" :type="item.type">{{tag.title}}</el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card notice">
          <div slot="header">
            <span class="title">公告通知</span>
            <el-button type="text" @click="moreNotice">查看更多>>></el-button>
          </div>
          <div class="notice" v-if="notice">
            <h3>{{notice.title}}</h3>
            <span>{{notice.date}}</span>
            <hr>
            <p>{{notice.content}}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { getNoticeList } from '@/api/system'
import { getTaskListByEmployeeId as getTaskMListByEmployeeId } from '@/api/mortgage'
import { getTaskListByEmployeeId as getTaskHListByEmployeeId } from '@/api/house'

export default {
  name: 'dashboard',
  data () {
    return {
      todoList: null,
      toodoListLoading: true,
      quickEntranceList: [
        {
          title: '抵押贷款',
          baseUrl: '/loan-mortgage',
          type: 'success',
          value: [
            { title: '接单', value: 'order-taking' },
            { title: '面谈', value: 'interview' },
            { title: '面签', value: 'visa-interview' },
            { title: '评估下单', value: 'evaluate-order' },
            { title: '审批', value: 'examine-approve' },
            { title: '抵押', value: 'mortgage' },
            { title: '收费', value: 'charge' },
            { title: '放款', value: 'make-loans' }
          ]
        },
        {
          title: '二手房贷款',
          baseUrl: '/house',
          type: 'warning',
          value: [
            { title: '接单', value: 'order-taking' },
            { title: '面签', value: 'visa-interview' },
            { title: '评估下单', value: 'evaluate-order' },
            { title: '整件输机', value: 'integrate-input' },
            { title: '审批', value: 'examine-approve' },
            { title: '过户', value: 'transfer' },
            { title: '抵押', value: 'mortgage' },
            { title: '担保', value: 'guarantee' },
            { title: '放款', value: 'make-loans' },
            { title: '收费', value: 'charge' }
          ]
        }
      ],
      notice: null,
      moment
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  created () {
    this.getTodoList()
    this.getNotice()
  },
  methods: {
    getTodoList () {
      let listM = []
      let listH = []
      Promise.all([getTaskMListByEmployeeId(this.userId).then(data => {
        if (data) {
          listM = data
        } else {
          // this.$message({
          //   type: 'error',
          //   message: '获取抵押贷款任务列表失败'
          // })
        }
      }), getTaskHListByEmployeeId(this.userId).then(data => {
        if (data) {
          listH = data
        } else {
          // this.$message({
          //   type: 'error',
          //   message: '获取二手房贷款任务列表失败'
          // })
        }
      })]).then(() => {
        this.toodoListLoading = false
        this.todoList = listM.concat(listH)
      })
    },
    getNotice () {
      getNoticeList().then(data => {
        if (data) {
          this.notice = JSON.parse(JSON.stringify(data[data.length - 1]))
        } else {
          this.$message({
            type: 'error',
            message: '获取公告信息失败'
          })
        }
      })
    },
    moreTodo () {
      this.$router.push({ path: '/quickpath/todo' })
    },
    moreNotice () {
      this.$router.push({ path: '/quickpath/notice' })
    },
    goNext (path) {
      this.$router.push({ path })
    },
    getNextPath (item) {
      let baseUrl = ''
      let currentState = ''
      const type = parseInt(`${item.id}`[0])
      switch (type) {
        // 抵押贷款
        case 1:
          baseUrl = '/loan-mortgage'
          break
        case 2:
          baseUrl = '/house'
          break
      }
      switch (item.state) {
        case 'checklist':
          currentState = 'order-taking'
          break
        case 'view':
          currentState = 'interview'
          break
        case 'visa':
          currentState = 'visa-interview'
          break
        case 'order':
          currentState = 'evaluate-order'
          break
        case 'input':
          currentState = 'integrate-input'
          break
        case 'approve':
          currentState = 'examine-approve'
          break
        case 'transfer':
          currentState = 'visa-interview'
          break
        case 'mortgage':
          currentState = 'mortgage'
          break
        case 'mortgageA':
          currentState = 'mortgage'
          break
        case 'guarantee':
          currentState = 'guarantee'
          break
        case 'loan':
          currentState = 'make-loans'
          break
        case 'charge':
          currentState = 'charge'
          break
      }
      return `${baseUrl}/${currentState}`
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .el-row {
    .el-col {
      margin-bottom: 30px;
      .box-card {
        .title {
          font-size: 20px;
          font-weight: bold;
        }
        .el-button {
          padding: 3px 0;
        }
      }
      .todo-list {
        .title {
          color: #F86C6B;
        }
        .el-button {
          color: #F86C6B;
        }
        .el-table {
          .el-button {
            padding: 5px 10px;
            color: #fff;
          }
        }
      }
      .quick-entrance {
        .title {
          color: #4DBD74;
        }
        .el-button {
          color: #4DBD74;
        }
        .tag-wrapper {
          h3 {
            font-weight: normal;
            font-size: 18px;
          }
          .el-tag {
            cursor: pointer;
            margin: 10px;
          }
        }
      }
      .notice {
        .title {
          color: #20A8D8;
        }
        .el-button {
          color: #20A8D8;
        }
      }
    }
  }
}

</style>
