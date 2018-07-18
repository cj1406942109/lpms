<template>
  <div class="app-container">
    <div class="form-wrapper">
      <h2>下单资料</h2>
      <el-form :model="orderInfoForm" ref="orderInfoForm" label-width="200px" inline>
        <el-form-item label="中介">
          <el-input v-model="orderInfoForm.agency"></el-input>
        </el-form-item>
        <el-form-item label="证载类型">
          <el-input v-model="orderInfoForm.zhegnzai"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="银行支行">
          <el-input v-model="orderInfoForm.bank"></el-input>
        </el-form-item>
        <el-form-item label="客户经理">
          <el-input v-model="orderInfoForm.clientManager.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="orderInfoForm.clientManager.tel"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="产权人">
          <el-input v-model="orderInfoForm.propertyOwner.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="orderInfoForm.propertyOwner.tel"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="orderInfoForm.propertyOwner.address"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="需求价格">
          <el-input v-model="orderInfoForm.demandPrice"></el-input>
        </el-form-item>
        <el-form-item label="贷款类型">
          <el-input v-model="orderInfoForm.loanType"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="收件人">
          <el-input v-model="orderInfoForm.addressee.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="orderInfoForm.addressee.tel"></el-input>
        </el-form-item>
        <el-form-item label="寄送地址">
          <el-input v-model="orderInfoForm.addressee.mailingAddress"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="业务员">
          <el-input v-model="orderInfoForm.businessPersonnel"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="特殊说明">
          <el-input type="textarea" v-model="orderInfoForm.specialRemarks" :autosize="{ minRows: 4, maxRows: 6}" style="width:500px;"></el-input>
        </el-form-item>
        <br><br>
        <el-form-item label=" ">
          <el-button type="primary">复制下单格式</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-wrapper">
      <h2>确定下单状态</h2>
      <el-form :model="orderStatusForm" ref="orderStatusForm" label-width="200px" inline>
        <el-form-item label="完成时间" prop="finishDate">
          <el-date-picker type="date" placeholder="选择日期" v-model="orderStatusForm.finishDate"></el-date-picker>
        </el-form-item>
        <el-form-item label="评估公司">
          <el-select v-model="orderStatusForm.evaluateCompany" placeholder="请选择评估公司">
            <el-option label="公司1" value="1"></el-option>
            <el-option label="公司2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <br><br>
        <el-form-item label=" ">
          <el-button>下单已完成</el-button>
          <el-button type="primary">下单完成</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-wrapper">
      <h2>出报告</h2>
      <el-form :model="reportForm" ref="reportForm" label-width="200px" inline>
        <el-form-item label="完成时间" prop="finishDate">
          <el-date-picker type="date" placeholder="选择日期" v-model="reportForm.finishDate"></el-date-picker>
        </el-form-item>
        <br>
        <el-form-item label="环节状态">
          <el-radio-group v-model="reportForm.status"><el-radio :label="1">报告已出</el-radio><el-radio :label="0">出报告因事未完成，请继续提醒我</el-radio></el-radio-group>
        </el-form-item>
        <el-form-item label="报告类别">
          <el-radio-group v-model="reportForm.type"><el-radio :label="1">预评</el-radio><el-radio :label="2">正评</el-radio></el-radio-group>
        </el-form-item>
        <br><br>
        <h3 style="margin-left: 50px;">报告内容</h3>
        <el-form-item label="权利人">
          <el-input v-model="reportForm.content.obligee"></el-input>
        </el-form-item>
        <el-form-item label="借款人">
          <el-input v-model="reportForm.content.mortgagor"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="坐落">
          <el-input v-model="reportForm.content.zuoluo"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="房龄">
          <el-input v-model="reportForm.content.house.age"></el-input>
        </el-form-item>
        <el-form-item label="面积">
          <el-input v-model="reportForm.content.house.area"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="单价">
          <el-input v-model="reportForm.content.house.unitPrice"></el-input>
        </el-form-item>
        <el-form-item label="总价">
          <el-input v-model="reportForm.content.house.totalPrice"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="贷款金额">
          <el-input v-model="reportForm.content.loanAmount"></el-input>
        </el-form-item>
        <el-form-item label="年限">
          <el-input v-model="reportForm.content.ageLimit"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="首套/两套">
          <el-radio-group v-model="reportForm.content.firstOrTwo"><el-radio :label="1">首套</el-radio><el-radio :label="2">两套</el-radio></el-radio-group>
        </el-form-item>
        <br><br>
        <el-form-item label=" ">
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderInfoForm: {
        agency: '',
        bank: '',
        zhengzai: '',
        clientManager: {
          name: '',
          tel: ''
        },
        propertyOwner: {
          name: '',
          tel: '',
          address: ''
        },
        demandPrice: '',
        loanType: '',
        addressee: {
          name: '',
          tel: '',
          mailingAddress: ''
        },
        businessPersonnel: '',
        specialRemarks: ''
      },
      orderStatusForm: {
        finishDate: '',
        evaluateCompany: ''
      },
      reportForm: {
        finishDate: '',
        status: '',
        type: '',
        content: {
          obligee: '',
          mortgagor: '',
          zuoluo: '',
          house: {
            age: '',
            area: '',
            unitPrice: '',
            totalPrice: '',
            loanAmount: '',
            ageLimit: ''
          },
          firstOrTwo: ''
        }
      }
    }
  },
  methods: {
    submit () {
      const h = this.$createElement
      // h(param1, param2, param3)
      // @param1: 一个 HTML 标签，组件设置，或一个函数 {String | Object | Function}
      //    必须 Return 上述其中一个, 如'div'
      // @param2: {Object}, 一个对应属性的数据对象
      // @param3: 内部节点
      this.$msgbox({
        type: 'success',
        center: true,
        title: '评估下单完成',
        message: h('p', null, [
          '贷款编号为：',
          h('span', { style: 'color: blue' }, ['145245415']),
          h('br', null, []),
          '目前贷款状态为：',
          h('span', { style: 'color: blue' }, ['正在审批（待收齐资料）']),
          h('br', null, []),
          h('el-button', { style: 'margin-top: 20px', on: { click: this.checkStatus }}, '查看贷款状态'),
          h('el-button', { style: 'margin-top: 20px', on: { click: this.returnList }}, '返回评估下单列表'),
          h('el-button', { style: 'margin-top: 20px', attrs: { type: 'primary' }, on: { click: this.nextOperation }}, '办理下一业务')
        ]),
        showConfirmButton: false
      })
    },
    checkStatus () {
      this.$msgbox.close()
    },
    returnList () {
      this.$msgbox.close()
      this.$router.push({ path: '/loan-mortgage/evaluate-order' })
    },
    nextOperation () {
      this.$msgbox.close()
      this.$router.push({ path: '/loan-mortgage/examine-approve' })
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
