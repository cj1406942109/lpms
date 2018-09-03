<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card class="box-card todo-list">
          <div slot="header">
            <span class="title">待办事项</span>
            <el-button type="text" @click="moreTodo">查看更多>>></el-button>
          </div>
          <el-table :data="todoList" v-loading.body="toodoListLoading" border stripe style="width: 100%" height="400">
            <el-table-column prop="taskId" label="贷款编号"></el-table-column>
            <!-- <el-table-column prop="type" label="贷款类型"></el-table-column> -->
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="phone" label="电话"></el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="goNext(scope.row)">办理</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card quick-entrance">
          <div slot="header">
            <span class="title">快捷入口</span>
            <el-button type="text">编辑</el-button>
          </div>
          <div class="tag-wrapper">
            <h3 v-if="quickEntrance && quickEntrance.diya.length > 0">抵押贷款</h3>
            <el-tag v-for="item in quickEntrance.diya" :key="item" v-if="quickEntrance.diya">{{item}}</el-tag>
          </div>
          <div class="tag-wrapper">
            <h3 v-if="quickEntrance && quickEntrance.ershoufang.length > 0">二手房贷款</h3>
            <el-tag v-for="item in quickEntrance.ershoufang" :key="item"  v-if="quickEntrance.ershoufang">{{item}}</el-tag>
          </div>
          <div class="tag-edit-wrapper" v-if="quickEntrance">
            <!-- <el-transfer v-model="quickEntrance.diya" :data="quickEntranceList"></el-transfer> -->
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
import { getTodoList, getQuickEntrance, getNotice } from '@/api/dashboard'
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  data () {
    return {
      todoList: null,
      toodoListLoading: true,
      quickEntrance: '',
      quickEntranceList: ['接单', '面谈', '面签', '评估下单', '审批', '抵押', '放款'],
      notice: null
    }
  },
  computed: {
    ...mapGetters([
      'user_id'
    ])
  },
  created () {
    this.GetTodoList()
    this.GetQuickEntrance()
    this.GetNotice()
  },
  methods: {
    GetTodoList () {
      this.toodoListLoading = true
      getTodoList(this.user_id).then(response => {
        this.todoList = response.data.data
        this.toodoListLoading = false
      })
    },
    GetQuickEntrance () {
      getQuickEntrance().then(response => {
        this.quickEntrance = response.data
      })
    },
    GetNotice () {
      getNotice().then(response => {
        this.notice = response.data
      })
    },
    moreTodo () {
      this.$router.push({ path: '/quickpath/todo' })
    },
    moreNotice () {
      this.$router.push({ path: '/quickpath/notice' })
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
            margin-left: 10px;
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
