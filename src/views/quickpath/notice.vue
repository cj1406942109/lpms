<template>
  <div class="app-container">
    <h2>公告通知</h2>
    <el-table :data="noticeList" v-loading.body="noticeListLoading" style="width: 100%" border stripe>
      <el-table-column type="index" width="100" label="序号"></el-table-column>
      <el-table-column :sortable="true" prop="releaseTime" label="发布时间" width="300">
        <template slot-scope="scope">
          {{moment(scope.row.releaseTime).format('YYYY-MM-DD, HH:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column :sortable="true" prop="title" label="标题"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="goDetail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment'
import { getNoticeList } from '@/api/system'

export default {
  name: 'notice',
  data () {
    return {
      noticeListLoading: true,
      noticeList: null,
      moment
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
      this.$msgbox({
        title: '公告详情',
        message: `<el-card><div slot="header"><h3>${row.title}</h3><span>${moment(row.releaseTime).format('YYYY-MM-DD, HH:mm:ss')}</span><hr><p>${row.content}</p></div></el-card>`,
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

