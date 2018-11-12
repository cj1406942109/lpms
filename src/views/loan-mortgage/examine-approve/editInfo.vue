<template>
  <div class="app-container">
    <el-steps :active="activeStep" align-center finish-status="success" class="form-wrapper">
      <el-step title="步骤1" description="确定资料目录表"></el-step>
      <el-step title="步骤2" description="报审"></el-step>
      <el-step title="步骤3" description="确定审批状态"></el-step>
      <el-step title="步骤4" description="出正评" v-if="reportType == '1'"></el-step>
    </el-steps>
    <div class="form-wrapper" v-if="activeStep=='0'">
      <h3>资料目录表</h3>
       <el-form :model="catalogForm" ref="catalogForm" label-width="200px" :rules="catalogFormRules" v-if="catalogForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="完成时间" prop="finishTime">
              <el-date-picker type="date" placeholder="选择日期" v-model="catalogForm.finishTime" value-format="timestamp"></el-date-picker>
            </el-form-item>
            <el-form-item label="贷款人姓名" prop="clientName">
              <el-input clearable v-model="catalogForm.clientName"></el-input>
            </el-form-item>
            <el-form-item label="拟上报金额" prop="loanAmount">
              <el-input clearable v-model.number="catalogForm.loanAmount" type="number"><template slot="append">元</template></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="接单人员姓名" prop="clerkName">
              <el-input clearable v-model="catalogForm.clerkName"></el-input>
            </el-form-item>
            <el-form-item label="接单人员电话" prop="clerkPhone">
              <el-input clearable v-model="catalogForm.clerkPhone"></el-input>
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
                <el-checkbox v-model="catalogForm.hasClientIdCard" :true-label="1" :false-label="0"></el-checkbox>
              </td>
              <td>借款人身份证</td>
              <td>
                <el-radio-group v-model="catalogForm.clientIdCardDes">
                  <el-radio :label="1">原件</el-radio>
                  <el-radio :label="2">复印件</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-input clearable type="number" v-model="catalogForm.clientIdCardPage" min="0" size="small"></el-input>
              </td>
              <td>
                <el-input clearable v-model="catalogForm.clientIdCardRemark" size="small"></el-input>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <el-checkbox v-model="catalogForm.hasClientAccount" :true-label="1" :false-label="0"></el-checkbox>
              </td>
              <td>借款人户口：&nbsp;&nbsp;
                <el-checkbox label="首页" v-model="catalogForm.clientAccountHome" :true-label="1" :false-label="0"></el-checkbox>
                <el-checkbox label="户主页" v-model="catalogForm.clientAccountHousehold" :true-label="1" :false-label="0"></el-checkbox>
                <el-checkbox label="本人页" v-model="catalogForm.clientAccountMyself" :true-label="1" :false-label="0"></el-checkbox>
              </td>
              <td>
                <el-radio-group v-model="catalogForm.clientAccountDes">
                  <el-radio :label="1" >原件</el-radio>
                  <el-radio :label="2">复印件</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-input clearable type="number" v-model="catalogForm.clientAccountPage" min="0" size="small"></el-input>
              </td>
              <td>
                <el-input clearable v-model="catalogForm.clientAccountRemark" size="small"></el-input>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                <el-checkbox v-model="catalogForm.hasClientSpouseIdCard" :true-label="1" :false-label="0"></el-checkbox>
              </td>
              <td>借款人配偶身份证</td>
              <td>
                <el-radio-group v-model="catalogForm.clientSpouseIdCardDes">
                  <el-radio :label="1" >原件</el-radio>
                  <el-radio :label="2">复印件</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-input clearable type="number" v-model="catalogForm.clientSpouseIdCardPage" min="0" size="small"></el-input>
              </td>
              <td>
                <el-input clearable v-model="catalogForm.clientSpouseIdCardRemark" size="small"></el-input>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>
                <el-checkbox v-model="catalogForm.hasClientSpouseAccount" :true-label="1" :false-label="0"></el-checkbox>
              </td>
              <td>借款人配偶户口：&nbsp;&nbsp;
                <el-checkbox label="首页" v-model="catalogForm.clientSpouseAccountHome" :true-label="1" :false-label="0"></el-checkbox>
                <el-checkbox label="户主页" v-model="catalogForm.clientSpouseAccountHousehold" :true-label="1" :false-label="0"></el-checkbox>
                <el-checkbox label="本人页" v-model="catalogForm.clientSpouseAccountMyself" :true-label="1" :false-label="0"></el-checkbox>
              </td>
              <td>
                <el-radio-group v-model="catalogForm.clientSpouseAccountDes">
                  <el-radio :label="1" >原件</el-radio>
                  <el-radio :label="2">复印件</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-input clearable type="number" v-model="catalogForm.clientSpouseAccountPage" min="0" size="small"></el-input>
              </td>
              <td>
                <el-input clearable v-model="catalogForm.clientSpouseAccountRemark" size="small"></el-input>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>
                <el-checkbox v-model="catalogForm.hasMarriageProof" :true-label="1" :false-label="0"></el-checkbox>
              </td>
              <td>婚姻证明：&nbsp;&nbsp;
                <el-checkbox label="结婚证" v-model="catalogForm.marriageCertificate" :true-label="1" :false-label="0"></el-checkbox>
                <el-checkbox label="离婚证" v-model="catalogForm.divorceCertificate" :true-label="1" :false-label="0"></el-checkbox>
                <el-checkbox label="离婚协议" v-model="catalogForm.divorceAgreement" :true-label="1" :false-label="0"></el-checkbox>
              </td>
              <td>
                <el-radio-group v-model="catalogForm.marriageProofDes">
                  <el-radio :label="1" >原件</el-radio>
                  <el-radio :label="2">复印件</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-input clearable type="number" v-model="catalogForm.marriageProofPage" min="0"  size="small"></el-input>
              </td>
              <td>
                <el-input clearable v-model="catalogForm.marriageProofRemark"  size="small"></el-input>
              </td>
            </tr>
            <tr>
              <td>6</td>
              <td>
                <el-checkbox v-model="catalogForm.hasHouseMortgage" :true-label="1" :false-label="0"></el-checkbox>
              </td>
              <td>抵押物房产两证：&nbsp;&nbsp;
                <el-input clearable type="number" v-model="catalogForm.houseMortgage" min="0" style="width:80px" size="small"></el-input>&nbsp;&nbsp;套
              </td>
              <td>
                <el-radio-group v-model="catalogForm.houseMortgageDes">
                  <el-radio :label="1" >原件</el-radio>
                  <el-radio :label="2">复印件</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-input clearable type="number" v-model="catalogForm.houseMortgagePage" min="0" size="small">></el-input>
              </td>
              <td>
                <el-input clearable v-model="catalogForm.houseMortgageRemark" size="small">></el-input>
              </td>
            </tr>
            <tr>
              <td>7</td>
              <td>
                <el-checkbox v-model="catalogForm.hasAssetsCertificate" :true-label="1" :false-label="0"></el-checkbox>
              </td>
              <td>资产证件复印件：&nbsp;&nbsp;
                <el-checkbox label="房产证" v-model="catalogForm.assetsHouseCertificate" :true-label="1" :false-label="0"></el-checkbox>
                <template v-if="catalogForm.assetsHouseCertificate">
                  <el-input clearable type="number" v-model="catalogForm.assetsHouseNumber" min="0" style="width:80px" size="small"></el-input>&nbsp;&nbsp;套&nbsp;&nbsp;
                </template>
                <el-checkbox label="车产证" v-model="catalogForm.assetsCarCertificate" :true-label="1" :false-label="0"></el-checkbox>
                <template v-if="catalogForm.assetsCarCertificate">
                  <el-input clearable type="number" v-model="catalogForm.assetsCarNumber" min="0" style="width:80px" size="small"></el-input>&nbsp;&nbsp;套&nbsp;&nbsp;
                </template>
                <el-checkbox label="其他资产" v-model="catalogForm.assetsOther" :true-label="1" :false-label="0"></el-checkbox>
                <template v-if="catalogForm.assetsOther">
                  <el-input clearable v-model="catalogForm.assetsOtherRemark" style="width:150px" size="small"></el-input>
                </template>
              </td>
              <td>
                <el-radio-group v-model="catalogForm.assetsCertificateDes">
                  <el-radio :label="1" >原件</el-radio>
                  <el-radio :label="2">复印件</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-input clearable type="number" v-model="catalogForm.assetsCertificatePage" min="0" size="small">></el-input>
              </td>
              <td>
                <el-input clearable v-model="catalogForm.assetsCertificateRemark" size="small">></el-input>
              </td>
            </tr>
            <tr>
              <td>8</td>
              <td>
                <el-checkbox v-model="catalogForm.hasIncomeProof" :true-label="1" :false-label="0"></el-checkbox>
              </td>
              <td>收入证明</td>
              <td>
                <el-radio-group v-model="catalogForm.incomeProofDes">
                  <el-radio :label="1" >原件</el-radio>
                  <el-radio :label="2">复印件</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-input clearable type="number" v-model="catalogForm.incomeProofPage" min="0" size="small"></el-input>
              </td>
              <td>
                <el-input clearable v-model="catalogForm.incomeProofRemark" size="small"></el-input>
              </td>
            </tr>
            <tr>
              <td>9</td>
              <td>
                <el-checkbox v-model="catalogForm.hasPurposeContact" :true-label="1" :false-label="0"></el-checkbox>
              </td>
              <td>用途合同</td>
              <td>
                <el-radio-group v-model="catalogForm.purposeContactDes">
                  <el-radio :label="1" >原件</el-radio>
                  <el-radio :label="2">复印件</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-input clearable type="number" v-model="catalogForm.purposeContactPage" min="0" size="small"></el-input>
              </td>
              <td>
                <el-input clearable v-model="catalogForm.purposeContactRemark" size="small"></el-input>
              </td>
            </tr>
            <!-- 抵押消费对应id为20,抵押经营对应id为21 -->
            <template v-if="loanVariety==21">
              <tr>
                <td>10</td>
                <td>
                  <el-checkbox v-model="catalogForm.hasBusinessLicense" :true-label="1" :false-label="0"></el-checkbox>
                </td>
                <td>营业执照（三证合一）</td>
                <td>
                  <el-radio-group v-model="catalogForm.businessLicenseDes">
                    <el-radio :label="1" >原件</el-radio>
                    <el-radio :label="2">复印件</el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input clearable type="number" v-model="catalogForm.businessLicensePage" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input clearable v-model="catalogForm.businessLicenseRemark" size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td>11</td>
                <td>
                  <el-checkbox v-model="catalogForm.hasLegalRepresentative" :true-label="1" :false-label="0"></el-checkbox>
                </td>
                <td>企业法定代表人身份证</td>
                <td>
                  <el-radio-group v-model="catalogForm.legalRepresentativeDes">
                    <el-radio :label="1" >原件</el-radio>
                    <el-radio :label="2">复印件</el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input clearable type="number" v-model="catalogForm.legalRepresentativePage" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input clearable v-model="catalogForm.legalRepresentativeRemark" size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td>12</td>
                <td>
                  <el-checkbox v-model="catalogForm.hasCompanyStatute" :true-label="1" :false-label="0"></el-checkbox>
                </td>
                <td>公司章程</td>
                <td>
                  <el-radio-group v-model="catalogForm.companyStatuteDes">
                    <el-radio :label="1" >原件</el-radio>
                    <el-radio :label="2">复印件</el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input clearable type="number" v-model="catalogForm.companyStatutePage" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input clearable v-model="catalogForm.companyStatuteRemark" size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td>13</td>
                <td>
                  <el-checkbox v-model="catalogForm.hasGrantDeed" :true-label="1" :false-label="0"></el-checkbox>
                </td>
                <td>经营地租赁合同或产权证明</td>
                <td>
                  <el-radio-group v-model="catalogForm.grantDeedDes">
                    <el-radio :label="1" >原件</el-radio>
                    <el-radio :label="2">复印件</el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input clearable type="number" v-model="catalogForm.grantDeedPage" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input clearable v-model="catalogForm.grantDeedRemark" size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td>14</td>
                <td>
                  <el-checkbox v-model="catalogForm.hasTradingContact" :true-label="1" :false-label="0"></el-checkbox>
                </td>
                <td>贸易合同</td>
                <td>
                  <el-radio-group v-model="catalogForm.tradingContactDes">
                    <el-radio :label="1" >原件</el-radio>
                    <el-radio :label="2">复印件</el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input clearable type="number" v-model="catalogForm.tradingContactPage" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input clearable v-model="catalogForm.tradingContactRemark" size="small"></el-input>
                </td>
              </tr>
            </template>
            <tr v-for="(item, index) in catalogForm.catalogOther" :key="item.id">
              <td v-if="loanVariety=='21'">{{14 + index + 1}}</td>
              <td v-else>{{9 + index + 1}}</td>
              <td></td>
              <td><el-input clearable v-model="item.content" size="small"></el-input></td>
              <td><el-input clearable v-model="item.description" size="small"></el-input></td>
              <td><el-input clearable type="number" v-model="item.page" min="0" size="small"></el-input></td>
              <td><el-input clearable v-model="item.remark" size="small" style="width:calc(100% - 100px)"></el-input>
              <el-button @click.prevent="removeContent(index)" type="danger" size="small" style="width:80px;">删除</el-button></td>
            </tr>
          </tbody>
        </table>
        <el-button type="info" @click="addContent()" style="margin: 20px 0 50px 200px;display:block;">添加资料内容</el-button>
        <!-- <el-form-item label=" ">
          <el-button type="primary" @click="saveCatalog()">保存</el-button>
          <el-button @click="resetForm('catalogForm')">重置</el-button>
        </el-form-item> -->
      </el-form>
    </div>
    <div class="form-wrapper" v-if="activeStep=='1'">
      <h3>报审</h3>
      <el-form :model="approveForm" ref="approveForm" label-width="200px" :rules="approveFormRules">
        <el-form-item label="上报审批时间" prop="time">
          <el-date-picker type="date" placeholder="选择日期" v-model="approveForm.time" value-format="timestamp"></el-date-picker>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="completeApproveHandler()">完成报审</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-wrapper" v-if="activeStep=='2'">
      <h3>确定审批状态</h3>
      <el-form :model="approveStatusForm" ref="approveStatusForm" label-width="200px" :rules="approveStatusFormRules">
        <el-form-item label="审批状态" prop="approveState">
          <el-radio-group v-model="approveStatusForm.approveState" :disabled="finishApproveStatus">
            <el-radio :label="1">已通过</el-radio>
            <el-radio :label="0">未通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="10">
            <template v-if="approveStatusForm.approveState == '1'">
              <el-form-item label="审批通过时间" prop="approveTime">
                <el-date-picker type="date" placeholder="选择日期" v-model="approveStatusForm.approveTime" value-format="timestamp" :disabled="finishApproveStatus"></el-date-picker>
              </el-form-item>
              <el-form-item label="金额" prop="amount">
                <el-input clearable v-model.number="approveStatusForm.amount" type="number" :disabled="finishApproveStatus"><template slot="append">元</template></el-input>
              </el-form-item>
              <el-form-item label="年限" prop="period">
                <el-input clearable v-model.number="approveStatusForm.period" type="number" :disabled="finishApproveStatus"><template slot="append">年</template></el-input>
              </el-form-item>
              <el-form-item label="利率" prop="rate">
                <el-input clearable v-model.number="approveStatusForm.rate" type="number" :disabled="finishApproveStatus"><template slot="append">%</template></el-input>
              </el-form-item>
              <el-form-item label="放款条件" prop="loanCondition">
                <el-select v-model="approveStatusForm.loanCondition" placeholder="请选择" :disabled="finishApproveStatus">
                  <el-option label="见抵押收件单放款" value="1"></el-option>
                  <el-option label="见他项权证放款" value="2"></el-option>
                  <el-option label="见担保函放款" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input clearable type="textarea" v-model="approveStatusForm.remark" :disabled="finishApproveStatus"></el-input>
              </el-form-item>
            </template>
            <template v-if="approveStatusForm.approveState == '0'">
              <el-form-item label="审批未通过时间" prop="approveTime">
                <el-date-picker type="date" placeholder="选择日期" v-model="approveStatusForm.approveTime" value-format="timestamp" :disabled="finishApproveStatus"></el-date-picker>
              </el-form-item>
              <el-form-item label="未通过原因" prop="failReason">
                <el-select v-model="approveStatusForm.failReason" placeholder="请选择" :disabled="finishApproveStatus">
                  <el-option label="银行拒贷" value="1"></el-option>
                  <el-option label="补充资料" value="2"></el-option>
                  <el-option label="其他" value="-1"></el-option>
                </el-select>
                <el-input clearable v-model="approveStatusForm.failReasonOther" placeholder="其他原因" v-if="approveStatusForm.failReason == '-1'" :disabled="finishApproveStatus"></el-input>
              </el-form-item>
              <el-form-item label="后续操作" prop="laterAction">
                <el-select v-model="approveStatusForm.laterAction" placeholder="请选择" :disabled="finishApproveStatus">
                  <el-option label="继续操作" :value="1"></el-option>
                  <el-option label="换行" :value="2"></el-option>
                  <el-option label="废单" :value="3"></el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-col>
        </el-row>
        <el-form-item label=" ">
          <el-button type="primary" @click="confirmApproveStatusHandler()" v-if="!finishApproveStatus">提交</el-button>
          <el-button type="info" v-else :disabled="finishApproveStatus">审批状态已确认</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-wrapper" v-if="activeStep=='3' && reportType == '1'">
      <h3>出报告</h3>
      <el-form :model="reportForm" ref="reportForm" label-width="200px" :rules="reportFormRules">
        <el-form-item label="完成时间" prop="time">
          <el-date-picker type="date" placeholder="选择日期" v-model="reportForm.time" value-format="timestamp"></el-date-picker>
        </el-form-item>
        <el-row>
          <el-col :span="10" v-for="(report, index) in  reportForm.reports" :key="report.id">
            <h3>房产 {{index + 1}} 报告内容</h3>
            <el-form-item>
              <el-button type="primary" @click="copyReport(index, 0)">复制第一份预评报告</el-button>
              <el-button type="primary" @click="copyReport(index, 1)" v-if="preReports[index].length>1">复制第二份预评报告</el-button>
            </el-form-item>
            <el-form-item label="权利人" :prop="'reports.' + index + '.reportObligee'" :rules="[{ required: true, message: '权利人不能为空' }]">
              <el-input clearable v-model="report.reportObligee"></el-input>
            </el-form-item>
            <el-form-item label="借款人" :prop="'reports.' + index + '.reportBorrower'" :rules="[{ required: true, message: '借款人不能为空' }]">
              <el-input clearable v-model="report.reportBorrower"></el-input>
            </el-form-item>
            <el-form-item label="座落" :prop="'reports.' + index + '.reportRepose'" :rules="[{ required: true, message: '座落不能为空' }]">
              <el-input clearable v-model="report.reportRepose"></el-input>
            </el-form-item>
            <el-form-item label="房龄" :prop="'reports.' + index + '.reportHouseAge'" :rules="[{ required: true, message: '房龄不能为空' }, { type: 'number', message: '房龄必须为数字值' }]">
              <el-input clearable v-model.number="report.reportHouseAge" type="number" min="0"><template slot="append">年</template></el-input>
            </el-form-item>
            <el-form-item label="面积" :prop="'reports.' + index + '.reportHouseArea'" :rules="[{ required: true, message: '面积不能为空' }, { type: 'number', message: '面积必须为数字值' }]">
              <el-input clearable v-model.number="report.reportHouseArea" type="number" min="0" @input="calcTotalPrice(report.reportHouseArea, report.reportHouseSingle, index)"><template slot="append">平米</template></el-input>
            </el-form-item>
            <el-form-item label="单价" :prop="'reports.' + index + '.reportHouseSingle'" :rules="[{ required: true, message: '单价不能为空' }, { type: 'number', message: '单价必须为数字值' }]">
              <el-input clearable v-model.number="report.reportHouseSingle" type="number" min="0" @input="calcTotalPrice(report.reportHouseArea, report.reportHouseSingle, index)"><template slot="append">元/平米</template></el-input>
            </el-form-item>
            <el-form-item label="总价" :prop="'reports.' + index + '.reportHouseTotal'">
              <el-input clearable v-model.number="report.reportHouseTotal" type="number" min="0" readonly><template slot="append">元</template></el-input>
            </el-form-item>
            <el-form-item label="拟贷款金额" :prop="'reports.' + index + '.reportLoanAmount'" :rules="[{ required: true, message: '拟贷款金额不能为空' }, { type: 'number', message: '拟贷款金额必须为数字值' }]">
              <el-input clearable v-model.number="report.reportLoanAmount" type="number" min="0"><template slot="append">元</template></el-input>
            </el-form-item>
            <el-form-item label="年限" :prop="'reports.' + index + '.reportLoanYear'" :rules="[{ required: true, message: '年限不能为空' }, { type: 'number', message: '年限必须为数字值' }]">
              <el-input clearable v-model.number="report.reportLoanYear" type="number" min="0"><template slot="append">年</template></el-input>
            </el-form-item>
            <el-form-item label="首套/两套" :prop="'reports.' + index + '.reportFirst'" :rules="[{ required: true, message: '请选择首套/两套' }]">
              <el-radio-group v-model="report.reportFirst"><el-radio :label="1">首套</el-radio><el-radio :label="2">两套</el-radio></el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" :loading="formLoading" @click="saveReport()">提交</el-button>
          <!-- <el-button @click="resetForm('reportForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="option">
      <el-button @click="activeStep--" v-if="activeStep > 0">上一步</el-button>
      <el-button type="primary" @click="nextStep()" v-if="activeStep < (reportType == '1' ? 3 : 2)">下一步</el-button>
    </div>
    <flow-complete-dialog
      :loanId="loanId"
      :loanStatus="loanStatus"
      :loanLastStatus="loanLastStatus"
      :dialogVisible="dialogVisible"
      :listPath="listPath"
      :nextPath="nextPath"
    ></flow-complete-dialog>
  </div>
</template>

<script>
// import moment from 'moment'
import { mapGetters } from 'vuex'
import {
  getTaskById,
  getChecklistById,
  getVisaById,
  getApproveById,
  saveCatalog,
  confirmCatalog,
  completeApprove,
  confirmApproveStatus,
  saveFormalReport,
  skipApprove
} from '@/api/mortgage'

export default {
  data () {
    const report = {
      reportObligee: null,
      reportBorrower: null,
      reportRepose: null,
      reportHouseAge: null,
      reportHouseArea: null,
      reportHouseSingle: null,
      reportHouseTotal: null,
      reportLoanAmount: null,
      reportLoanYear: null,
      reportFirst: null,
      reportType: 2,
      houseId: null
    }
    return {
      report: report, // 不可直接修改
      reportType: 0, // 报告类型，1表示预评，2表示正评
      preReports: [], // 预评
      catalogForm: null,
      approveForm: {
        time: null
      },
      approveStatusForm: {
        approveState: null,
        approveTime: null,
        amount: null,
        period: null,
        rate: null,
        loanCondition: null,
        remark: null,
        failReason: null,
        failReasonOther: null,
        laterAction: null
      },
      reportForm: {
        time: null,
        reports: []
      },
      catalogFormRules: {
        finishTime: [{ required: true, message: '完成时间不能为空' }],
        clientName: [{ required: true, message: '贷款人姓名不能为空' }],
        clerkName: [{ required: true, message: '接单人员姓名不能为空' }],
        loanAmount: [
          { required: true, message: '拟上报金额不能为空' },
          { type: 'integer', message: '拟上报金额必须为整数值' }
        ],
        clerkPhone: [
          { required: true, message: '接单人员电话不能为空' },
          { pattern: /^1[0-9]{10}$/, message: '手机号格式错误' }
        ]
      },
      approveFormRules: {
        time: [{ required: true, message: '上报审批时间不能为空' }]
      },
      approveStatusFormRules: {
        approveState: [{ required: true, message: '请选择审批状态' }],
        approveTime: [{ required: true, message: '时间不能为空' }],
        amount: [
          { required: true, message: '金额不能为空' },
          { type: 'integer', message: '金额必须为整数值' }
        ],
        period: [
          { required: true, message: '年限不能为空' },
          { type: 'number', message: '年限必须为数字值' }
        ],
        rate: [
          { required: true, message: '利率不能为空' },
          { type: 'number', message: '利率必须为数字值' }
        ],
        loanCondition: [{ required: true, message: '请选择放款条件' }],
        failReason: [{ required: true, message: '请选择未通过原因' }],
        laterAction: [{ required: true, message: '请选择后续操作' }]
      },
      reportFormRules: {
        time: [{ required: true, message: '完成时间不能为空' }]
      },
      finishApproveStatus: false,
      formLoading: false,
      loanId: '',
      loanStatus: '',
      loanLastStatus: '',
      dialogVisible: false,
      listPath: '/loan-mortgage/examine-approve',
      nextPath: '/loan-mortgage/mortgage',
      activeStep: 0,
      loanVariety: ''
    }
  },
  created () {
    this.loanLastStatus = this.$route.params.des
    this.reportType = parseInt(this.$route.params.reportType)
    getTaskById(this.$route.params.mortgageId).then(data => {
      if (data) {
        getChecklistById(data[0].id).then(data => {
          if (data) {
            this.loanVariety = data.loanVariety
          } else {
            this.$message({
              type: 'error',
              message: '获取借款品种信息失败'
            })
          }
        })
        getVisaById(data[2].id).then(data => {
          if (data) {
            this.catalogForm = data.catalog
          } else {
            this.$message({
              type: 'error',
              message: '获取资料目录表信息失败'
            })
          }
        })
      } else {
        this.$message({
          type: 'error',
          message: '获取流程信息失败'
        })
      }
    })
    getApproveById(this.$route.params.id).then(data => {
      if (data) {
        if (data.approve) {
          this.approveForm = JSON.parse(JSON.stringify(data.approve))
        }
        if (JSON.stringify(data.approveState) !== '{}') {
          this.finishApproveStatus = true
          this.approveStatusForm = JSON.parse(JSON.stringify(data.approveState))
          this.approveStatusForm.period = parseInt(this.approveStatusForm.period)
          this.approveStatusForm.rate = parseInt(this.approveStatusForm.rate)
        }
        this.preReports = data.reports
        this.preReports.forEach(house => {
          const report = JSON.parse(JSON.stringify(this.report))
          report.houseId = house[0].houseId
          this.reportForm.reports.push(report)
        })
      } else {
        this.$message({
          type: 'error',
          message: '获取审批流程数据失败'
        })
      }
    })
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    saveCatalog () {
      this.$refs['catalogForm'].validate((valid) => {
        if (valid) {
          saveCatalog(this.catalogForm).then(data => {
            if (data) {
              this.$message({
                type: 'success',
                message: '保存成功'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    addContent () {
      this.catalogForm.catalogOther.push({
        content: '',
        description: '',
        page: '',
        remark: ''
      })
    },
    removeContent (index) {
      this.$confirm('是否删除该行？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.catalogForm.catalogOther.splice(index, 1)
      }).catch(() => {})
    },
    nextStep () {
      if (this.activeStep === 0) {
        this.confirmCatalog().then(() => {
          this.$message({
            type: 'success',
            message: '确认资料目录表成功'
          })
          this.activeStep++
        }).catch((done) => {
          if (done) {
            this.$message({
              type: 'error',
              message: '确认资料目录表失败'
            })
          }
        })
      } else if (this.activeStep === 1) {
        this.completeApprove().then(() => {
          this.$message({
            type: 'success',
            message: '确认报审成功'
          })
          this.activeStep++
        }).catch((done) => {
          if (done) {
            this.$message({
              type: 'error',
              message: '确认报审失败'
            })
          }
        })
      } else if (this.activeStep === 2) {
        if (!this.finishApproveStatus) {
          this.confirmApproveStatus().then(() => {
            this.$message({
              type: 'success',
              message: '确定审批状态成功'
            })
            this.activeStep++
            console.log(this.reportForm)
          }).catch((done) => {
            if (done) {
              this.$message({
                type: 'error',
                message: '确定审批状态失败'
              })
            }
          })
        } else {
          this.activeStep++
          console.log(this.reportForm)
        }
      }
    },
    confirmCatalog () {
      return new Promise((resolve, reject) => {
        this.$refs['catalogForm'].validate((valid) => {
          if (valid) {
            this.$confirm('是否确定当前资料目录表已收齐？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              confirmCatalog(this.$route.params.id, this.catalogForm).then(data => {
                data ? resolve() : reject(true)
              })
            }).catch(() => { reject() })
          } else {
            reject()
          }
        })
      })
    },
    completeApprove () {
      return new Promise((resolve, reject) => {
        this.$refs['approveForm'].validate((valid) => {
          if (valid) {
            completeApprove(this.$route.params.id, this.approveForm.time).then(data => {
              data ? resolve() : reject(true)
            })
          } else {
            reject()
          }
        })
      })
    },
    completeApproveHandler () {
      this.completeApprove().then(() => {
        this.$message({
          type: 'success',
          message: '确认报审成功'
        })
      }).catch((done) => {
        if (done) {
          this.$message({
            type: 'error',
            message: '确认报审失败'
          })
        }
      })
    },
    confirmApproveStatus () {
      return new Promise((resolve, reject) => {
        this.$refs['approveStatusForm'].validate((valid) => {
          if (valid) {
            confirmApproveStatus(this.$route.params.id, this.approveStatusForm).then(data => {
              data ? resolve(data) : reject(true)
            })
          } else {
            reject()
          }
        })
      })
    },
    confirmApproveStatusHandler () {
      if (this.reportType === 1) {
        // 需要第四步出正评
        this.confirmApproveStatus().then(() => {
          this.finishApproveStatus = true
          this.$message({
            type: 'success',
            message: '确定审批状态成功'
          })
        }).catch((done) => {
          if (done) {
            this.$message({
              type: 'error',
              message: '确定审批状态失败'
            })
          }
        })
      } else {
        this.$confirm('请确认信息填写无误，是否提交？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'info',
            message: '正在处理...'
          })
          this.confirmApproveStatus().then((data) => {
            this.$message.closeAll()
            this.formLoading = false
            if (data) {
              skipApprove(this.$route.params.id).then(data => {
                this.loanId = data.rootId
                this.loanStatus = data.des
                this.dialogVisible = true
              })
            } else {
              this.$message({
                type: 'error',
                message: '确定审批状态失败'
              })
            }
          }).catch((done) => {
            if (done) {
              this.$message({
                type: 'error',
                message: '确定审批状态失败'
              })
            }
          })
        }).catch(() => {})
      }
    },
    saveReport () {
      this.$refs['reportForm'].validate((valid) => {
        if (valid) {
          this.$confirm('请确认信息填写无误，是否提交？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'info',
              message: '正在处理...'
            })
            saveFormalReport(this.$route.params.id, this.reportForm.time, this.reportForm.reports).then(data => {
              this.$message.closeAll()
              this.formLoading = false
              if (data) {
                this.loanId = data.rootId
                this.loanStatus = data.des
                this.dialogVisible = true
              } else {
                this.$message({
                  type: 'error',
                  message: '正评报告保存失败'
                })
              }
            })
          }).catch(() => {})
        } else {
          return false
        }
      })
    },
    calcTotalPrice (area, singlePrice, index) {
      if (area && singlePrice) {
        if (parseFloat(area).toString() !== 'NaN' && parseFloat(singlePrice).toString() !== 'NaN') {
          this.reportForm.reports[index].reportHouseTotal = area * singlePrice
        } else {
          this.reportForm.reports[index].reportHouseTotal = null
        }
      } else {
        this.reportForm.reports[index].reportHouseTotal = null
      }
    },
    copyReport (index1, index2) {
      // index1 正评索引，index2 预评索引
      this.reportForm.reports[index1].reportObligee = this.preReports[index1][index2].reportObligee
      this.reportForm.reports[index1].reportBorrower = this.preReports[index1][index2].reportBorrower
      this.reportForm.reports[index1].reportHouseAge = parseFloat(this.preReports[index1][index2].reportHouseAge)
      this.reportForm.reports[index1].reportHouseArea = this.preReports[index1][index2].reportHouseArea
      this.reportForm.reports[index1].reportHouseSingle = this.preReports[index1][index2].reportHouseSingle
      this.reportForm.reports[index1].reportHouseTotal = this.preReports[index1][index2].reportHouseTotal
      this.reportForm.reports[index1].reportLoanAmount = this.preReports[index1][index2].reportLoanAmount
      this.reportForm.reports[index1].reportLoanYear = parseFloat(this.preReports[index1][index2].reportLoanYear)
      this.reportForm.reports[index1].reportRepose = this.preReports[index1][index2].reportRepose
      this.reportForm.reports[index1].reportFirst = parseInt(this.preReports[index1][index2].reportFirst)
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
            width: 100px;
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
    .option {
      text-align: center;
      margin: 50px;
      button {
        width: 200px;
      }
    }
  }
</style>