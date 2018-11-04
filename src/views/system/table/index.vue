<template>
  <div class="app-container">
    <h2>表格列表</h2>
    <el-table :data="tableList" v-loading.body="tableListLoading" style="width: 100%" border stripe>
      <el-table-column type="index" label="表格名称" width="300" :index="indexMethod"></el-table-column>
      <el-table-column prop="value" label="预设值" :formatter="valueFormatter"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editTable(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFormVisible" width="40%" @close="closeDialog('optionForm')">
      <template slot="title">
        编辑：<span style="color:#409eff">{{dialogTitle}}</span>
      </template>
      <el-form label-width="80px" ref="optionForm" :model="optionForm">
        <el-form-item label="选项设置">
          <ul class="options-wrapper">
            <li v-for="(item, index) in dialogData" :key="item.id">{{item.value}}<el-button type="danger" size="mini" @click="removeOption(index)">删除</el-button></li>
            <li>
              <el-form-item :rules="[{ required: true, message: '值不能为空'}]" prop="addValue">
                <el-input clearable v-model="optionForm.addValue" style="width:70%;" placeholder="请填写要添加的选项"></el-input>
                <el-button type="success" size="mini" @click="addOption('optionForm')">添加</el-button>
              </el-form-item>
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="效果预览">
          <el-select placeholder="请选择" v-model="selectValue">
            <el-option :label="item.value" :value="item.id" v-for="item in dialogData" :key="item.id"></el-option>
            <el-option v-if="allowOther" value="其他">其他</el-option>
          </el-select>
          <el-input placeholder="请输入其他值" style="width:auto" v-if="selectValue=='其他'" clearable></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-checkbox v-model="allowOther">允许填写其他</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTableList } from '@/api/system'
export default {
  name: 'table-management',
  data () {
    return {
      tableList: [],
      tableListLoading: true,
      tableTypeList: [
        { label: '抵押贷款-面签-面签地点', valueType: 0 },
        { label: '抵押贷款-评估下单-评估公司', valueType: 1 },
        { label: '抵押贷款-审批-放款条件', valueType: 2 },
        { label: '二手房贷款-面签-面签地点', valueType: 3 },
        { label: '二手房贷款-评估下单-评估公司', valueType: 4 }
      ],
      dialogFormVisible: false,
      dialogTitle: '',
      dialogData: [],
      selectValue: '',
      allowOther: false,
      optionForm: {
        addValue: ''
      }
    }
  },
  created () {
    this.GetTableList()
  },
  methods: {
    GetTableList () {
      getTableList().then(response => {
        if (response.data.status) {
          const data = response.data.data
          const temp1 = []
          data.forEach(ele => {
            const temp2 = []
            ele.forEach(e => {
              // 不标准json字符串规范化
              // { id: 8, valueType: 4, value: '中国银行武汉狮子山支行', remark: 'houseOrderCompany'}
              temp2.push(JSON.parse(e.replace(/'/g, '"').replace(/(\w+)\s*:/g, function (match, $1) { return '"' + $1 + '":' })))
            })
            temp1.push(temp2)
          })
          this.tableList = temp1
          this.tableListLoading = false
        }
      })
    },
    editTable (item) {
      this.dialogFormVisible = true
      this.dialogTitle = this.tableTypeList[item[0].valueType].label
      console.log(item)
      this.dialogData = item
    },
    indexMethod (index) {
      return this.tableTypeList[index].label
    },
    valueFormatter (row) {
      const result = []
      row.forEach(ele => {
        result.push(ele.value)
      })
      return result.join('、')
    },
    addOption (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogData.push({
            value: this.optionForm.addValue
          })
        } else {
          return false
        }
      })
    },
    removeOption (index) {
      this.$confirm('是否删除该选项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogData.splice(index, 1)
      }).catch(() => {
        console.log('cancel')
      })
    },
    closeDialog (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    padding: 20px;
    background-color: #fff;
    .options-wrapper {
      list-style: none;
      padding: 0;
      li {
        button {
          float: right;
          margin: 6px 10px;
        }
        line-height: 40px;
      }
    }
  }
</style>
