<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>

    <div class="avatar-container">
      <div class="avatar-container-patch">
        <div class="todo-container">
          <div class="todo-button success" @click="goTodo">完成 {{successCount}}</div>
          <div class="todo-button" @click="goTodo">待办 {{todoCount}}</div>
          <div class="todo-button warning" @click="goTodo">警告 {{warningCount}}</div>
        </div>
        <el-dropdown trigger="click">
          <div class="avatar-wrapper">
            <img class="user-avatar" src="./default-avatar.png">
            <span class="username">{{username}}</span>
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu class="user-dropdown" slot="dropdown">
            <router-link class="inlineBlock" to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span @click="logout" style="display:block;">注销登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data () {
    return {
      getTodoListTimer: 0
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'username',
      'userId',
      'successCount',
      'todoCount',
      'unreadTodoCount',
      'warningCount'
    ])
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    },
    logout () {
      this.$store.dispatch('Logout').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    goTodo () {
      this.$router.push({ path: '/quickpath/todo' })
    }
  },
  created () {
    this.$store.dispatch('getTodoList')
    this.getTodoListTimer = window.setTimeout(() => { this.$store.dispatch('getTodoList') }, 1000 * 60 * 5)
  },
  beforeDestroy () {
    window.clearTimeout(this.getTodoListTimer)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-container-patch {
      display: flex;
      align-items: center;
      height: 100%;
    }
    .todo-container {
      margin-right: 40px;
      display: flex;
      align-items: center;
      .todo-button {
        cursor: pointer;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: white;
        padding: 0 10px;
        background-color: #6397f8;
        border-radius: 5px;
        & + .todo-button {
          margin-left: 10px;
        }
        &.warning {
          background-color: #f86578;
        }
        &.success {
          background-color: #62b837;
        }
      }
    }
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      height: 50px;
      display: flex;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .username {
        margin-top: -5px;
        margin-left: 5px;
        display: inline-block;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 15px;
        font-size: 12px;
      }
    }
  }
}
</style>

