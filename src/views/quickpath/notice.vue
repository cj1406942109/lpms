<template>
  <div class="app-container">
    <h2>公告通知</h2>
    <el-table :data="noticeList" v-loading.body="noticeListLoading" style="width: 100%" border stripe>
      <el-table-column prop="date" label="发布时间" width="300"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="tag" label="标记" width="200">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '已读' ? 'success' : 'warning'"
            close-transition>{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button type="primary">
              选项<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="goDetail(scope.row)">查看详情</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getNoticeList } from '@/api/dashboard'

export default {
  name: 'notice',
  data () {
    return {
      noticeListLoading: true,
      noticeList: null
    }
  },
  created () {
    this.GetNoticeList()
  },
  methods: {
    GetNoticeList () {
      this.noticeListLoading = true
      getNoticeList().then(response => {
        this.noticeList = response.data
        this.noticeListLoading = false
      })
    },
    goDetail (row) {
      console.log(row)
      this.$msgbox({
        title: '公告详情',
        message: `<el-card><div slot="header"><h3>${row.title}</h3><span>${row.date}</span><hr><img src='${row.img}'><p>${row.content}</p></div></el-card>`,
        dangerouslyUseHTMLString: true,
        center: true,
        confirmButtonText: '我知道了',
        callback: action => {
          if (action === 'confirm') {
            row.tag = '已读'
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    background-color: #fff;
    padding: 20px;
  }
</style>

