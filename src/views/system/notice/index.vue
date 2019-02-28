<template>
  <div class="app-container">
    <h2>公告列表</h2>
    <div class="function-container">
      <el-button type="primary" icon="el-icon-plus" @click="goEdit()">发布公告</el-button>
      <!-- <el-input placeholder="请输入内容" style="width: 300px;margin-left:50px;">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input> -->
    </div>
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
          <el-button size="mini" type="success" @click="goDetail(scope.row)">查看</el-button>
          <el-button size="mini" type="primary" @click="goEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="公告" :visible.sync="dialogVisible" width="500px" :close-on-press-escape="false" :close-on-click-modal="false" @close="$refs['notice'].resetFields()">
      <el-form :model="notice" :rules="noticeRules" ref="notice">
        <el-form-item label="标题" prop="title">
          <el-input v-model="notice.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="notice.content" type="textarea" :autosize="{ minRows: 10 }"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveHandler()" :loading="formLoading">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import { getNoticeList, deleteNoticeById, getNoticeById, saveNotice, updateNoticeById } from '@/api/system'

export default {
  name: 'account',
  data () {
    return {
      noticeList: null,
      noticeListLoading: true,
      notice: {
        title: '',
        content: ''
      },
      noticeRules: {
        title: [{ required: true, message: '标题不能为空' }],
        content: [{ required: true, message: '内容不能为空' }]
      },
      formLoading: false,
      dialogVisible: false,
      moment
    }
  },
  created () {
    this.getNoticeList()
  },
  methods: {
    getNoticeList () {
      getNoticeList().then(({ data }) => {
        if (data) {
          this.noticeList = data
          this.noticeListLoading = false
        } else {
          this.$message({
            type: 'error',
            message: '获取公告列表失败'
          })
        }
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
    },
    goEdit (id) {
      this.dialogVisible = true
      if (id) {
        getNoticeById(id).then(({ data }) => {
          if (data) {
            this.notice = JSON.parse(JSON.stringify(data))
          } else {
            this.$message({
              type: 'error',
              message: '公告信息获取失败'
            })
          }
        })
      }
      // this.$router.push({ path: '/system/notice/edit-info' })
    },
    saveHandler () {
      this.$refs['notice'].validate((valid) => {
        if (valid) {
          this.formLoading = true
          if (!this.notice.id) {
            saveNotice(this.notice.title, this.notice.content).then(({ data }) => {
              if (data) {
                this.formLoading = false
                this.$message({
                  type: 'success',
                  message: '保存成功'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '保存失败'
                })
              }
              this.dialogVisible = false
              this.getNoticeList()
            })
          } else {
            updateNoticeById(this.notice.id, this.notice.title, this.notice.content).then(({ data }) => {
              if (data) {
                this.formLoading = false
                this.$message({
                  type: 'success',
                  message: '保存成功'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '保存失败'
                })
              }
              this.dialogVisible = false
              this.getNoticeList()
            })
          }
        } else {
          return false
        }
      })
    },
    remove (row) {
      this.$confirm('该操作将删除此公告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteNoticeById(row.id).then(({ data }) => {
          if (data) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          } else {
            this.$message({
              type: 'info',
              message: '删除失败'
            })
          }
          this.getNoticeList()
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    padding: 20px;
    background-color: #fff;
    .function-container {
      padding: 20px 0;
    }
  }
</style>
