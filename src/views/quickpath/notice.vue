<template>
  <div class="app-container">
    <h2>公告通知</h2>
    <el-table :data="noticeList" v-loading.body="noticeListLoading" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="date" label="发布时间" width="300"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="tag" label="标记" width="200">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '已读' ? 'success' : 'warning'"
            close-transition>{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="goDetail(scope.row)">查看详情</el-button>
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
    this.getNoticeList()
  },
  methods: {
    getNoticeList () {
      getNoticeList().then(data => {
        this.noticeList = data
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

