<template>
  <div class="app-container">
    <div class="form-wrapper">
      <h2>审批进度</h2>
      <el-steps :active="activeStep" finish-status="success" align-center>
        <el-step title="确定资料目录表">
        </el-step>
        <el-step title="报审"></el-step>
        <el-step title="确定审批状态"></el-step>
        <el-step title="出正评"></el-step>
      </el-steps>
      <div class="form-wrapper" v-if="activeStep=='0'">
        <h3>资料目录表</h3>
        <el-form :model="catalogForm" ref="catalogForm" label-width="200px" :rules="catalogRules" v-if="catalogForm">
          <el-row>
            <el-col :span="10">
              <el-form-item label="完成时间" prop="finish_time">
                <el-date-picker type="date" placeholder="选择日期" v-model="catalogForm.finish_time" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
              <el-form-item label="贷款人姓名" prop="client_name">
                <el-input clearable v-model="catalogForm.client_name"></el-input>
              </el-form-item>
              <el-form-item label="贷款金额" prop="loan_amount">
                <el-input clearable v-model.number="catalogForm.loan_amount"><template slot="append">元</template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="接单人员姓名" prop="clerk_name">
                <el-input clearable v-model="catalogForm.clerk_name"></el-input>
              </el-form-item>
              <el-form-item label="接单人员电话" prop="clerk_phone">
                <el-input clearable v-model="catalogForm.clerk_phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <table cellspacing="0">
            <thead>
              <tr>
                <th>序号</th>
                <th>有无</th>
                <th>资料内容明细</th>
                <th>说明</th>
                <th>页码</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <el-checkbox v-model="catalogForm.has_client_id_card"></el-checkbox>
                </td>
                <td>借款人身份证</td>
                <td>
                  <el-radio-group v-model="catalogForm.client_id_card_des">
                    <el-radio :label="0" >原件</el-radio>
                    <el-radio :label="1">复印件</el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input clearable type="number" v-model="catalogForm.client_id_card_page" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input clearable type="text" v-model="catalogForm.client_id_card_remark" size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <el-checkbox v-model="catalogForm.has_client_account"></el-checkbox>
                </td>
                <td>借款人户口：&nbsp;&nbsp;
                  <el-checkbox label="首页" v-model="catalogForm.client_account_home"></el-checkbox>
                  <el-checkbox label="户主页" v-model="catalogForm.client_account_household"></el-checkbox>
                  <el-checkbox label="本人页" v-model="catalogForm.client_account_myself"></el-checkbox>
                </td>
                <td>
                  <el-radio-group v-model="catalogForm.client_account_des">
                    <el-radio :label="0" >原件</el-radio>
                    <el-radio :label="1">复印件</el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input clearable type="number" v-model="catalogForm.client_account_page" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input clearable type="text" v-model="catalogForm.client_account_remark" size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>
                  <el-checkbox v-model="catalogForm.has_client_spouse_id_card"></el-checkbox>
                </td>
                <td>借款人配偶身份证</td>
                <td>
                  <el-radio-group v-model="catalogForm.client_spouse_id_card_des">
                    <el-radio :label="0" >原件</el-radio>
                    <el-radio :label="1">复印件</el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input clearable type="number" v-model="catalogForm.client_spouse_id_card_page" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input clearable type="text" v-model="catalogForm.client_spouse_id_card_remark" size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>
                  <el-checkbox v-model="catalogForm.has_client_spouse_account"></el-checkbox>
                </td>
                <td>借款人配偶户口：&nbsp;&nbsp;
                  <el-checkbox label="首页" v-model="catalogForm.client_spouse_account_home"></el-checkbox>
                  <el-checkbox label="户主页" v-model="catalogForm.client_spouse_account_household"></el-checkbox>
                  <el-checkbox label="本人页" v-model="catalogForm.client_spouse_account_myself"></el-checkbox>
                </td>
                <td>
                  <el-radio-group v-model="catalogForm.client_spouse_account_des">
                    <el-radio :label="0" >原件</el-radio>
                    <el-radio :label="1">复印件</el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input clearable type="number" v-model="catalogForm.client_spouse_account_page" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input clearable type="text" v-model="catalogForm.client_spouse_account_remark" size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>
                  <el-checkbox v-model="catalogForm.has_marriage_proof"></el-checkbox>
                </td>
                <td>婚姻证明：&nbsp;&nbsp;
                  <el-checkbox label="结婚证" v-model="catalogForm.marriage_certificate"></el-checkbox>
                  <el-checkbox label="离婚证" v-model="catalogForm.divorce_certificate"></el-checkbox>
                  <el-checkbox label="离婚协议" v-model="catalogForm.divorce_agreement"></el-checkbox>
                </td>
                <td>
                  <el-radio-group v-model="catalogForm.marriage_proof_des">
                    <el-radio :label="0" >原件</el-radio>
                    <el-radio :label="1">复印件</el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input clearable type="number" v-model="catalogForm.marriage_proof_page" min="0"  size="small"></el-input>
                </td>
                <td>
                  <el-input clearable type="text" v-model="catalogForm.marriage_proof_remark"  size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td>6</td>
                <td>
                  <el-checkbox v-model="catalogForm.has_house_mortgage"></el-checkbox>
                </td>
                <td>抵押物房产两证：&nbsp;&nbsp;
                  <el-input clearable type="number" v-model="catalogForm.house_mortgage" min="0" style="width:80px" size="small"></el-input>&nbsp;&nbsp;套
                </td>
                <td>
                  <el-radio-group v-model="catalogForm.house_mortgage_des">
                    <el-radio :label="0" >原件</el-radio>
                    <el-radio :label="1">复印件</el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input clearable type="number" v-model="catalogForm.house_mortgage_page" min="0" size="small">></el-input>
                </td>
                <td>
                  <el-input clearable type="text" v-model="catalogForm.house_mortgage_remark" size="small">></el-input>
                </td>
              </tr>
              <tr>
                <td>7</td>
                <td>
                  <el-checkbox v-model="catalogForm.has_assets_certificate"></el-checkbox>
                </td>
                <td>资产证件复印件：&nbsp;&nbsp;
                  <el-checkbox label="房产证" v-model="catalogForm.assets_house_certificate"></el-checkbox>
                  <template v-if="catalogForm.assets_house_certificate">
                    <el-input clearable type="number" v-model="catalogForm.assets_house_number" min="0" style="width:80px" size="small"></el-input>&nbsp;&nbsp;套&nbsp;&nbsp;
                  </template>
                  <el-checkbox label="车产证" v-model="catalogForm.assets_car_certificate"></el-checkbox>
                  <template v-if="catalogForm.assets_car_certificate">
                    <el-input clearable type="number" v-model="catalogForm.assets_car_number" min="0" style="width:80px" size="small"></el-input>&nbsp;&nbsp;套&nbsp;&nbsp;
                  </template>
                  <el-checkbox label="其他资产" v-model="catalogForm.assets_other"></el-checkbox>
                  <template v-if="catalogForm.assets_other">
                    <el-input clearable type="text" v-model="catalogForm.assets_other_remark" style="width:150px" size="small"></el-input>
                  </template>
                </td>
                <td>
                  <el-radio-group v-model="catalogForm.assets_certificate_des">
                    <el-radio :label="0" >原件</el-radio>
                    <el-radio :label="1">复印件</el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input clearable type="number" v-model="catalogForm.assets_certificate_page" min="0" size="small">></el-input>
                </td>
                <td>
                  <el-input clearable type="text" v-model="catalogForm.assets_certificate_remark" size="small">></el-input>
                </td>
              </tr>
              <tr>
                <td>8</td>
                <td>
                  <el-checkbox v-model="catalogForm.has_income_proof"></el-checkbox>
                </td>
                <td>收入证明</td>
                <td>
                  <el-radio-group v-model="catalogForm.income_proof_des">
                    <el-radio :label="0" >原件</el-radio>
                    <el-radio :label="1">复印件</el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input clearable type="number" v-model="catalogForm.income_proof_page" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input clearable type="text" v-model="catalogForm.income_proof_remark" size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td>9</td>
                <td>
                  <el-checkbox v-model="catalogForm.has_purpose_contact"></el-checkbox>
                </td>
                <td>用途合同</td>
                <td>
                  <el-radio-group v-model="catalogForm.purpose_contact_des">
                    <el-radio :label="0" >原件</el-radio>
                    <el-radio :label="1">复印件</el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input clearable type="number" v-model="catalogForm.purpose_contact_page" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input clearable type="text" v-model="catalogForm.purpose_contact_remark" size="small"></el-input>
                </td>
              </tr>
              <!-- 抵押消费对应id为20,抵押经营对应id为21 -->
              <template v-if="$route.params.loanType==21">
                <tr>
                  <td>10</td>
                  <td>
                    <el-checkbox v-model="catalogForm.has_business_license"></el-checkbox>
                  </td>
                  <td>营业执照（三证合一）</td>
                  <td>
                    <el-radio-group v-model="catalogForm.business_license_des">
                      <el-radio :label="0" >原件</el-radio>
                      <el-radio :label="1">复印件</el-radio>
                    </el-radio-group>
                  </td>
                  <td>
                    <el-input clearable type="number" v-model="catalogForm.business_license_page" min="0" size="small"></el-input>
                  </td>
                  <td>
                    <el-input clearable type="text" v-model="catalogForm.business_license_remark" size="small"></el-input>
                  </td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>
                    <el-checkbox v-model="catalogForm.has_legal_representative"></el-checkbox>
                  </td>
                  <td>企业法定代表人身份证</td>
                  <td>
                    <el-radio-group v-model="catalogForm.legal_representative_des">
                      <el-radio :label="0" >原件</el-radio>
                      <el-radio :label="1">复印件</el-radio>
                    </el-radio-group>
                  </td>
                  <td>
                    <el-input clearable type="number" v-model="catalogForm.legal_representative_page" min="0" size="small"></el-input>
                  </td>
                  <td>
                    <el-input clearable type="text" v-model="catalogForm.legal_representative_remark" size="small"></el-input>
                  </td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>
                    <el-checkbox v-model="catalogForm.has_company_statute"></el-checkbox>
                  </td>
                  <td>公司章程</td>
                  <td>
                    <el-radio-group v-model="catalogForm.company_statute_des">
                      <el-radio :label="0" >原件</el-radio>
                      <el-radio :label="1">复印件</el-radio>
                    </el-radio-group>
                  </td>
                  <td>
                    <el-input clearable type="number" v-model="catalogForm.company_statute_page" min="0" size="small"></el-input>
                  </td>
                  <td>
                    <el-input clearable type="text" v-model="catalogForm.company_statute_remark" size="small"></el-input>
                  </td>
                </tr>
                <tr>
                  <td>13</td>
                  <td>
                    <el-checkbox v-model="catalogForm.has_grant_deed"></el-checkbox>
                  </td>
                  <td>经营地租赁合同或产权证明</td>
                  <td>
                    <el-radio-group v-model="catalogForm.grant_deed_des">
                      <el-radio :label="0" >原件</el-radio>
                      <el-radio :label="1">复印件</el-radio>
                    </el-radio-group>
                  </td>
                  <td>
                    <el-input clearable type="number" v-model="catalogForm.grant_deed_page" min="0" size="small"></el-input>
                  </td>
                  <td>
                    <el-input clearable type="text" v-model="catalogForm.grant_deed_remark" size="small"></el-input>
                  </td>
                </tr>
                <tr>
                  <td>14</td>
                  <td>
                    <el-checkbox v-model="catalogForm.has_trading_contact"></el-checkbox>
                  </td>
                  <td>贸易合同</td>
                  <td>
                    <el-radio-group v-model="catalogForm.trading_contact_des">
                      <el-radio :label="0" >原件</el-radio>
                      <el-radio :label="1">复印件</el-radio>
                    </el-radio-group>
                  </td>
                  <td>
                    <el-input clearable type="number" v-model="catalogForm.trading_contact_page" min="0" size="small"></el-input>
                  </td>
                  <td>
                    <el-input clearable type="text" v-model="catalogForm.trading_contact_remark" size="small"></el-input>
                  </td>
                </tr>
              </template>
              <tr v-for="(item, index) in catalogForm.mortgageCatalogOthers" :key="item.id">
                <td v-if="$route.params.loanType=='21'">{{14 + index + 1}}</td>
                <td v-else>{{9 + index + 1}}</td>
                <td></td>
                <td><el-input clearable type="text" v-model="item.content" size="small"></el-input></td>
                <td><el-input clearable type="text" v-model="item.description" size="small"></el-input></td>
                <td><el-input clearable type="number" v-model="item.page" min="0" size="small"></el-input></td>
                <td><el-input clearable type="text" v-model="item.remark" size="small" style="width:calc(100% - 100px)"></el-input>
                <el-button @click.prevent="removeContent(item)" type="danger" size="small" style="width:80px;">删除</el-button></td>
              </tr>
            </tbody>
          </table>
          <el-button type="info" @click="addContent()" style="margin: 20px 0 50px 200px;display:block;">添加资料内容</el-button>
          <el-form-item label=" ">
            <el-button type="primary" @click="saveCatalog()">保存</el-button>
            <el-button type="success" @click="confirmCatalogComplete()">确定资料收齐</el-button>
            <el-button @click="resetForm('catalogForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="form-wrapper" v-if="activeStep=='1'">
        <h3>报审</h3>
        <el-form :model="baoshenForm" ref="baoshenForm" label-width="200px" inline>
          <el-form-item label="上报审批时间" prop="time">
            <el-date-picker type="date" placeholder="选择日期" v-model="baoshenForm.time" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="primary" @click="finishBaoshen">完成报审</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="form-wrapper" v-if="activeStep=='2'">
        <h3>确定审批状态</h3>
        <el-form :model="approveStatusForm" ref="approveStatusForm" label-width="200px">
          <el-form-item label="审批状态" prop="approve_state">
            <el-radio-group v-model="approveStatusForm.approve_state">
              <el-radio :label="1" >已通过</el-radio>
              <el-radio :label="0">未通过</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="approveStatusForm.approve_state === 1">
            <el-form-item label="审批通过时间" prop="application_time">
              <el-date-picker type="date" placeholder="选择日期" v-model="approveStatusForm.approve_time" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="金额">
              <el-input clearable v-model="approveStatusForm.amount"></el-input>
            </el-form-item>
            <el-form-item label="年限">
              <el-input clearable v-model="approveStatusForm.period"></el-input>
            </el-form-item>
            <el-form-item label="利率">
              <el-input clearable v-model="approveStatusForm.rate"></el-input>
            </el-form-item>
            <el-form-item label="放款条件">
              <el-select v-model="approveStatusForm.loan_condition" placeholder="请选择">
                <el-option v-for="item in loanConditions" :key="item.id" :label="item.content" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注">
              <el-input clearable type="textarea" v-model="approveStatusForm.remark" style="width:400px;"></el-input>
            </el-form-item>
          </template>
          <template v-if="approveStatusForm.approve_state === 0">
            <el-form-item label="审批未通过时间" prop="application_time">
              <el-date-picker type="date" placeholder="选择日期" v-model="approveStatusForm.approve_time" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="未通过原因">
              <el-select v-model="approveStatusForm.loan_condition.content" placeholder="请选择">
                <el-option label="银行拒贷" value="银行拒贷"></el-option>
                <el-option label="补充资料" value="补充资料"></el-option>
                <el-option label="" value="其他"></el-option>
              </el-select>
              <el-input clearable v-model="approveStatusForm.fail_reason_other" placeholder="其他原因" v-if="approveStatusForm.loan_condition.content == '其他'"></el-input>
            </el-form-item>
            <el-form-item label="后续操作">
              <el-select v-model="approveStatusForm.later_action" placeholder="请选择">
                <el-option label="继续操作" :value="1"></el-option>
                <el-option label="换行" :value="2"></el-option>
                <el-option label="废单" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </template>
          <el-form-item label=" ">
            <el-button type="primary" @click="confirmApproveStatus">提交</el-button>
          </el-form-item>

        </el-form>
      </div>
      <div class="form-wrapper" v-if="activeStep=='3'">
        <h3>出正评</h3>
        <el-form :model="reportForm" ref="reportForm" label-width="200px">
          <el-form-item label="出正评时间" prop="time">
            <el-date-picker type="date" placeholder="选择日期" v-model="reportForm.time" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-row>
            <el-col :span="10" v-for="report in reportForm.reports" :key="report.id">
              <h3 style="margin-left: 50px;">报告内容</h3>
              <el-form-item label="权利人">
                <el-input v-model="report.report_obligee"></el-input>
              </el-form-item>
              <el-form-item label="借款人">
                <el-input v-model="report.report_borrower"></el-input>
              </el-form-item>
              <el-form-item label="坐落">
                <el-input v-model="report.report_repose"></el-input>
              </el-form-item>
              <el-form-item label="房龄">
                <el-input v-model="report.report_house_age"></el-input>
              </el-form-item>
              <el-form-item label="面积">
                <el-input v-model="report.report_house_area"></el-input>
              </el-form-item>
              <el-form-item label="单价">
                <el-input v-model="report.report_house_single"></el-input>
              </el-form-item>
              <el-form-item label="总价">
                <el-input v-model="report.report_house_total"></el-input>
              </el-form-item>
              <el-form-item label="贷款金额">
                <el-input v-model="report.report_loan_amount"></el-input>
              </el-form-item>
              <el-form-item label="年限">
                <el-input v-model="report.report_loan_year"></el-input>
              </el-form-item>
              <el-form-item label="首套/两套">
                <el-radio-group v-model="report.report_first"><el-radio :label="1">首套</el-radio><el-radio :label="2">两套</el-radio></el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label=" ">
            <el-button type="primary" @click="saveReport()">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    <el-dialog :visible.sync="dialogVisible" width="30%" center>
      <div slot="title"><i class="el-icon-success" style="color:#67C23A;font-size:22px;vertical-align:middle;margin-right:5px;"></i>接单成功</div>
      <div>贷款编号为：<a style="color:blue">{{loanNum}}</a></div>
      <div>贷款状态为：<a style="color:blue">正在抵押（等待填写抵押相关表格）</a></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkStatus">查看贷款状态</el-button>
        <el-button @click="returnList">返回面谈列表</el-button>
        <el-button type="primary" @click="nextOperation">办理下一业务</el-button>
      </span>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import {
  getVisaInterviewCatalog,
  saveVisaInterviewCatalog,
  confirmCatalogComplete,
  finishBaoshen,
  getLoanCondition,
  confirmApproveStatus,
  saveReport
} from '@/api/mortgage'

export default {
  data () {
    return {
      activeStep: 0,
      catalogForm: null,
      baoshenForm: {
        time: null
      },
      approveStatusForm: {
        approve_state: null,
        approve_time: null,
        amount: null,
        period: null,
        rate: null,
        loan_condition: null,
        remark: null,
        fail_reason: null,
        fail_reason_other: null,
        later_action: null
      },
      reportForm: {
        time: null,
        reports: [{
          report_obligee: null,
          report_borrower: null,
          report_repose: null,
          report_house_age: null,
          report_house_area: null,
          report_house_single: null,
          report_house_total: null,
          report_loan_amount: null,
          report_loan_year: null,
          report_first: null,
          report_type: null
        }]
      },
      catalogRules: {
        loan_amount: [
          { type: 'integer', message: '贷款金额必须为整数值' }
        ],
        clerk_phone: [
          { pattern: /^1[0-9]{10}$/, message: '手机号格式错误', trigger: 'blur' }
        ]
      },
      loanConditions: [],
      dialogVisible: false,
      loanNum: ''
    }
  },
  created () {
    this.getCatalogData()
    getLoanCondition().then(response => {
      if (response.data.status) {
        this.loanConditions = response.data.data
      }
    })
  },
  computed: {
    ...mapGetters([
      'user_id'
    ])
  },
  methods: {
    getCatalogData () {
      getVisaInterviewCatalog(this.$route.params.catalogId).then(response => {
        console.log(response)
        if (response.data.status) {
          this.catalogForm = response.data.data
          console.log(this.catalogForm.loan_amount)
          this.catalogForm.loan_amount = parseInt(this.catalogForm.loan_amount)
          if (this.catalogForm.finish_time) {
            this.catalogForm.finish_time = moment(this.catalogForm.finish_time).format('YYYY-MM-DD')
          }
        }
      })
    },
    addContent () {
      this.catalogForm.mortgageCatalogOthers.push({
        content: '',
        description: '',
        page: '',
        remark: ''
      })
    },
    removeContent (item) {
      this.$confirm('是否删除该行？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const index = this.catalogForm.mortgageCatalogOthers.indexOf(item)
        if (index !== -1) {
          this.catalogForm.mortgageCatalogOthers.splice(index, 1)
        }
      }).catch(() => {})
    },
    saveCatalog () {
      this.$refs['catalogForm'].validate((valid) => {
        if (valid) {
          saveVisaInterviewCatalog(JSON.stringify(this.catalogForm), this.$route.params.taskId, this.user_id).then(response => {
            if (response.data.status) {
              this.$message({
                type: 'success',
                message: '资料目录表保存成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: '资料目录表保存失败，请稍候重试'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    confirmCatalogComplete () {
      this.$refs['catalogForm'].validate((valid) => {
        if (valid) {
          confirmCatalogComplete(this.$route.params.taskId, this.user_id, JSON.stringify(this.catalogForm)).then(response => {
            if (response.data.status) {
              this.$message({
                type: 'success',
                message: '确认资料目录表收齐'
              })
              this.activeStep++
            } else {
              this.$message({
                type: 'error',
                message: '数据保存失败，请稍候重试'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    finishBaoshen () {
      finishBaoshen(this.baoshenForm.time, this.$route.params.taskId).then(response => {
        console.log(response)
        if (response.data.status) {
          this.$message({
            type: 'success',
            message: '确认报审时间成功'
          })
          this.activeStep++
        } else {
          this.$message({
            type: 'error',
            message: '确认报审时间失败，请稍候重试'
          })
        }
      })
    },
    confirmApproveStatus () {
      confirmApproveStatus(JSON.stringify(this.approveStatusForm), this.$route.params.taskId).then(response => {
        if (response.data.status) {
          this.$message({
            type: 'success',
            message: '确定审批状态成功'
          })
          this.activeStep++
        } else {
          this.$message({
            type: 'error',
            message: '确定审批状态失败，请稍候重试'
          })
        }
      })
    },
    saveReport () {
      this.$confirm('请确认信息填写无误，是否提交？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'info',
          message: '正在处理...'
        })
        saveReport(this.reportForm.time, JSON.stringify(this.reportForm.reports), this.$route.params.taskId).then(response => {
          this.formLoading = false
          if (response.data.status === 1) {
            this.loanNum = response.data.data
            this.dialogVisible = true
          } else {
            this.$message({
              showClose: true,
              message: '保存失败，请稍候重试！',
              type: 'error'
            })
          }
        })
      }).catch(() => {})
      this.dialogVisible = false
    },
    resetForm (formName) {
      console.log(formName)
      this.$refs[formName].resetFields()
    },
    checkStatus () {
      this.dialogVisible = false
      this.$router.push({ path: `/loan/order/status/${this.loanNum}` })
    },
    returnList () {
      this.dialogVisible = false
      this.$router.push({ path: '/loan-mortgage/examine-approve' })
    },
    nextOperation () {
      this.dialogVisible = false
      this.$router.push({ path: '/loan-mortgage/mortgage' })
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
      .el-input {
        width: auto;
      }
      h2 {
        margin: 0;
      }
      h3 {
        padding-left: 200px;
        color: #303133;
      }
      table {
        border: 1px solid #ccc;
        margin-left:200px;
        width:calc(100% - 300px);
        thead tr {
          background-color: #fafafa;
        }
        tr {
          
          td, th {
            padding: 10px 5px;
            text-align: center;
          }
          td {
            border-top: 1px solid #ddd;
          }
          td:nth-child(5) {
            width: 80px;
          }
        }
        tbody tr:nth-child(odd) {
          background-color: #fff;
        }
        tbody tr:nth-child(even) {
          background-color: #fafafa;
        }
      }
    }
  }
</style>