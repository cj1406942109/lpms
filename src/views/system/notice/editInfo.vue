<template>
  <div class="app-container">
    <h2>编辑公告</h2>
    <div class="form-wrapper">
      <el-form :model="noticeForm" ref="noticeForm" label-width="200px" inline>
        <el-form-item label="群发部门">
          <el-select v-model="noticeForm.department" placeholder="请选择部门">
            <el-option label="全部部门" value="1"></el-option>
            <el-option label="业务处" value="2"></el-option>
            <el-option label="综合管理部" value="3"></el-option>
            <el-option label="行驻" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="群发成员">
          <el-select v-model="noticeForm.member" placeholder="请选择成员">
            <el-option label="全部" value="1"></el-option>
            <el-option label="小红" value="2"></el-option>
            <el-option label="小明" value="3"></el-option>
            <el-option label="小刚" value="4"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="标题">
          <el-input v-model="noticeForm.title" style="width:500px;"></el-input>
        </el-form-item>
        <br>
        <br>
        <el-form-item label="正文">
          <el-input type="textarea" v-model="noticeForm.content" :autosize="{ minRows: 8}" style="width:500px;"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="图片">
          <el-upload
            class="img-uploader"
            action=""
            :show-file-list="false"
            :on-success="handleImgSuccess"
            :before-upload="beforeImgUpload">
            <img v-if="img" :src="img">
            <i v-else class="el-icon-plus img-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <br>
        <el-form-item label=" ">
          <el-upload
            class="file-uploader"
            action=""
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="noticeForm.appendix">
            <el-button size="small" type="primary">添加附件</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>
        <br>
        <br>
        <el-form-item label=" ">
          <el-button type="primary" @click="finishMortgage">提交</el-button>
          <el-button @click="resetForm('mortgageStatusForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      noticeForm: {
        title: '',
        content: '',
        img: '',
        department: '',
        member: '',
        appendix: []
      }
    }
  },
  methods: {
    handleImgSuccess (res, file) {
      this.noticeForm.img = URL.createObjectURL(file.raw)
    },
    beforeImgUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    padding: 20px;
    background-color: #fff;
    .form-wrapper {
      padding: 20px;
      h3 {
        margin-left: 50px;
      }
      .img-uploader {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        .el-upload:hover{
          border-color: #409EFF;
        }
        .img-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
        img {
          width: 178px;
          height: 178px;
          display: block;
        }
      }
    }
  }
</style>
