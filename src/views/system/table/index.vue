<template>
  <div class="app-container">
    <h2>表格列表</h2>
    <el-table :data="tableList" v-loading.body="tableListLoading" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="label" label="表格名称" width="300"></el-table-column>
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
            <!-- <li v-for="(item, index) in dialogData.value" :key="item.id">{{item.value}} -->
            <li v-for="item in dialogData.value" :key="item.id">{{item.value}}
              <!-- <el-button type="danger" size="mini" @click="removeOption(index)">删除</el-button> -->
            </li>
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
            <el-option :label="item.value" :value="item.id" v-for="item in dialogData.value" :key="item.id"></el-option>
            <el-option v-if="allowOther" value="其他">其他</el-option>
          </el-select>
          <el-input placeholder="请输入其他值" style="width:auto" v-if="selectValue=='其他'" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="allowOther">允许填写其他</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveTable()">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTableList, setTableValue } from '@/api/system'
export default {
  name: 'table-management',
  data () {
    return {
      tableList: [
        { label: '抵押贷款-面签-面签地点', valueType: 0, remark: 'mortgageViewPlace', value: [] },
        { label: '抵押贷款-评估下单-评估公司', valueType: 1, remark: 'mortgageOrderCompany', value: [] },
        { label: '抵押贷款-审批-放款条件', valueType: 2, remark: 'mortgageReleaseMoney', value: [] },
        { label: '二手房贷款-面签-面签地点', valueType: 3, remark: 'houseVisaPlace', value: [] },
        { label: '二手房贷款-评估下单-评估公司', valueType: 4, remark: 'houseOrderCompany', value: [] }
      ],
      tableListLoading: true,
      dialogFormVisible: false,
      dialogTitle: '',
      dialogData: [],
      selectValue: '',
      allowOther: false,
      optionForm: {
        addValue: ''
      },
      // 新添加的值
      newValueList: []
    }
  },
  created () {
    this.getTableList()
  },
  methods: {
    getTableList () {
      getTableList().then(({ data }) => {
        this.tableListLoading = false
        if (data) {
          this.tableList[0].value = data['mortgageViewPlace']
          this.tableList[1].value = data['mortgageOrderCompany']
          this.tableList[2].value = data['mortgageReleaseMoney']
          this.tableList[3].value = data['houseVisaPlace']
          this.tableList[4].value = data['houseOrderCompany']
        } else {
          this.$message({
            type: 'error',
            message: '获取表格数据失败'
          })
        }
      })
    },
    editTable (item) {
      this.dialogFormVisible = true
      this.dialogTitle = item.label
      this.dialogData = JSON.parse(JSON.stringify(item))
      console.log(this.dialogData)
    },
    saveTable () {
      // FIXME: 奇葩设计，不能删除，需FIX
      if (this.allowOther) {
        this.newValueList.push({
          remark: this.dialogData.remark,
          valueType: this.dialogData.valueType,
          value: '其他'
        })
      }
      console.log(this.newValueList)
      this.$confirm(`是否将确认修改当前表格的预设值？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'info',
          message: '正在处理...'
        })
        const pList = []
        this.newValueList.forEach(ele => {
          pList.push(new Promise((resolve, reject) => {
            setTableValue(ele.valueType, ele.value, ele.remark).then(({ data }) => {
              data ? resolve() : reject()
            })
          }))
        })
        Promise.all(pList).then(() => {
          this.$message.closeAll()
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.getTableList()
        }).catch(() => {
          this.$message.closeAll()
          this.$message({
            type: 'error',
            message: '保存失败'
          })
        })
      }).catch(() => {})
    },
    indexMethod (index) {
      return this.tableTypeList[index].label
    },
    valueFormatter (row) {
      const result = []
      row.value.forEach(ele => {
        result.push(ele.value)
      })
      return result.join('、')
    },
    addOption (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const newItem = {
            remark: this.dialogData.remark,
            valueType: this.dialogData.valueType,
            value: this.optionForm.addValue
          }
          this.dialogData.value.push(newItem)
          this.newValueList.push(newItem)
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
