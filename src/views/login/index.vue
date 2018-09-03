<template>
  <div class="app-wrapper">
    <el-container>
      <el-main>
        <div class="form-wrapper">
          <h3 class="title">日晟行贷款管理系统</h3>
          <el-card class="box-card">
            <div slot="header" class="form-title">
              <span>登录到我的账户</span>
            </div>
            <el-form :model="loginForm" ref="loginForm" :rules="loginRules" status-icon>
              <el-form-item label="用户名" prop="name">
                <el-input v-model="loginForm.name" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" auto-complete="off" @keyup.enter.native="handleLogin" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item class="form-action">
                <el-button type="primary" @click.native.prevent="handleLogin" :loading="loading">{{loading?'正在登录...':'登录'}}</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-main>
      <el-footer>
        <span>{{new Date().getFullYear()}} &copy; <abbr title="Intelligent Medical">IM</abbr> </span>
        <span>Powered by <abbr title="WuHan University">WHU</abbr> |
          <a target="_blank" href="javascript:;">LiBingTeam</a>
        </span>
      </el-footer>
    </el-container>
    <!-- <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">日晟行贷款管理系统</h3>
      <el-form-item prop="userName">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.name" autoComplete="on" placeholder="用户名" />
      </el-form-item>
      <el-form-item prop="userPassword">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="密码"></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form> -->
  </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        name: '123456@qq.com',
        password: '123456'
      },
      loginRules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度为6到16位', trigger: ['blur', 'change'] }
        ]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    showPwd () {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then((res) => {
            this.loading = false
            if (res.data.success) {
              // 登录成功，跳转到首页
              this.$router.push({ path: '/' })
            } else {
              // 登录出错提示
              this.$message({
                message: res.data.message,
                type: 'error',
                duration: 5 * 1000
              })
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.app-wrapper {
  .el-header {
    padding: 0 100px;
    border-bottom: 1px solid #eee;
    img {
      height: 60px;
    }
  }
  .el-main {
    .form-wrapper {
      .title {
        margin: 50px 0;
        text-align: center;
      }
      .box-card {
        margin: 0 auto;
        max-width: 350px;
      }
      .form-title {
        font-weight: bold;
      }
      .el-radio-group {
        width: 100%;
      }
      .form-action {
        padding-top: 20px;
        button {
          width: 100%;
        }
      }
    }
  }
  .el-footer {
    text-align: center;
    height: 60px;
    font-size: 10px;
    line-height: 60px;
    color: #333;
  }
}
@media (max-width: 767px) {
  .app-wrapper {
    .el-header {
      padding: 0 20px;
      img {
        height: 40px;
        margin-top: 10px;
      }
    }
    .el-main {
      padding: 0 30px;
      .el-row {
        padding-left: 0;
      }
      .box-card {
        margin: 0 auto;
        border: none;
        box-shadow: none;
      }
    }
  }
}
@media (min-width: 768px) and (max-width: 1200px) {
  .app-wrapper {
    .el-header {
      padding: 0 50px;
      img {
        height: 50px;
        margin-top: 5px;
      }
    }
    .el-main {
      .el-row {
        padding-left: 30px;
        .el-col {
          .info-wrapper {
            margin-right: 50px;
          }
        }
      }
    }
  }
}
</style>
