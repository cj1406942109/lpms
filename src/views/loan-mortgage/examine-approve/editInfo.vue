<template>
  <div class="app-container">
    <div class="form-wrapper">
      <h2>审批进度</h2>
      <el-form :model="shenpijinduForm" ref="shenpijinduForm" label-width="200px" inline>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      shenpijinduForm: {

      }
    }
  }
}
</script>


<style lang="scss" scoped>
  .app-container {
    .form-wrapper {
      padding: 20px;
      margin-bottom: 20px;
      background-color: #fff;
    }
  }
</style>