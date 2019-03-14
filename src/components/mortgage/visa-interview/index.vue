<template>
  <div class="app-container">
    <el-steps :active="activeStep" align-center finish-status="success" class="form-wrapper">
      <el-step title="步骤1" description="填写资料目录表和个人贷款申请表"></el-step>
      <el-step title="步骤2" description="确定签约状态"></el-step>
    </el-steps>
    <el-collapse v-model="activeNames" v-if="activeStep=='0'">
      <el-collapse-item class="form-wrapper" name="1">
        <template slot="title"><h2>资料目录表</h2></template>
        <el-form :model="catalogForm" ref="catalogForm" label-width="200px" :rules="catalogFormRules" v-if="catalogForm" key="catalogForm">
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
                    <el-radio :label="1" >原件</el-radio>
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
          <el-form-item>
            <el-button type="primary" @click="saveCatalogHandler()">保存</el-button>
            <el-button @click="resetForm('catalogForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item class="form-wrapper" name="2">
        <template slot="title"><h2>个人贷款申请表</h2></template>
        <el-form :model="applicationForm" ref="applicationForm" label-width="200px" :rules="applicationFormRules" v-if="applicationForm" key="applicationForm">
          <el-form-item label="申请时间" prop="applicationTime">
            <el-date-picker type="date" placeholder="选择日期" v-model="applicationForm.applicationTime" value-format="timestamp"></el-date-picker>
          </el-form-item>
          <el-row>
            <el-col :span="10">
              <h3>申请人信息</h3>
              <el-form-item label="姓名" prop="proposerName">
                <el-input clearable v-model="applicationForm.proposerName"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="proposerGender">
                <el-radio-group v-model="applicationForm.proposerGender">
                  <el-radio :label="0">男</el-radio>
                  <el-radio :label="1">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="婚姻状态" prop="proposerMarriageState">
                <el-select v-model="applicationForm.proposerMarriageState" placeholder="请选择">
                  <el-option v-for="item in maritalStatus.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="家庭结构" prop="proposerFamily">
                <el-select v-model="applicationForm.proposerFamily" placeholder="请选择">
                  <el-option v-for="item in familyStructure.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="家庭人数" prop="proposerFamilyNum">
                <el-input clearable v-model.number="applicationForm.proposerFamilyNum" type="number" min="0"><template slot="append">人</template></el-input>
              </el-form-item>
              <el-form-item label="联系方式" prop="proposerPhone">
                <el-input clearable v-model="applicationForm.proposerPhone" placeholder="手机号码"></el-input>
              </el-form-item>
              <el-form-item prop="proposerWorkTele">
                <el-input clearable v-model="applicationForm.proposerWorkTele" placeholder="单位固定电话"></el-input>
              </el-form-item>
              <el-form-item prop="proposerHouseTele">
                <el-input clearable v-model="applicationForm.proposerHouseTele" placeholder="家庭固定电话"></el-input>
              </el-form-item>
              <el-form-item label="户籍类型" prop="proposerHouseholdType">
                <el-radio-group v-model="applicationForm.proposerHouseholdType">
                  <el-radio :label="0">本地</el-radio>
                  <el-radio :label="1">非本地</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="身份证号码" prop="proposerIdCard">
                <el-input clearable v-model="applicationForm.proposerIdCard" placeholder="二代居民身份证号码"></el-input>
              </el-form-item>
              <el-form-item label="居住情况" prop="proposerInhabitingInfo">
                <el-select v-model="applicationForm.proposerInhabitingInfo" placeholder="请选择">
                  <el-option v-for="item in livingSituation.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="居住地址" prop="proposerAddress">
                <el-input clearable v-model="applicationForm.proposerAddress"></el-input>
              </el-form-item>
              <el-form-item label="本地居住" prop="proposerLocalResident">
                <el-input clearable v-model="applicationForm.proposerLocalResident" type="number" min="0"><template slot="append">年</template></el-input>
              </el-form-item>
              <el-form-item label="住房情况" prop="proposerLodgingInfo">
                <el-select v-model="applicationForm.proposerLodgingInfo" placeholder="请选择">
                  <el-option v-for="item in localLiving1.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="贷款情况" prop="proposerLoanState">
                <el-select v-model="applicationForm.proposerLoanState" placeholder="请选择">
                  <el-option v-for="item in localLiving2.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="就业性质" prop="proposerJobType">
                <el-radio-group v-model="applicationForm.proposerJobType">
                  <el-radio :label="0">授薪</el-radio>
                  <el-radio :label="1">自雇</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="就业年限" prop="proposerWorkYear">
                <el-input clearable v-model="applicationForm.proposerWorkYear" placeholder="现单位工作/企业成立"><template slot="append">年</template></el-input>
              </el-form-item>
              <el-form-item label="月收入" prop="proposerIncomeMonth">
                <el-input clearable v-model="applicationForm.proposerIncomeMonth" placeholder="个人收入/企业销售收入"><template slot="append">元</template></el-input>
              </el-form-item>
              <template v-if="applicationForm.proposerJobType=='0'">
                <h3>工作单位</h3>
                <el-form-item label="工作单位" prop="proposerCompany">
                  <el-input clearable v-model="applicationForm.proposerCompany"></el-input>
                </el-form-item>
                <el-form-item label="单位地址" prop="proposerCompanyAddress">
                  <el-input clearable v-model="applicationForm.proposerCompanyAddress" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item label="单位性质" prop="proposerCompanyType">
                  <el-select v-model="applicationForm.proposerCompanyType" placeholder="请选择单位性质">
                    <el-option v-for="item in unitNature.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="职务名称" prop="proposerCompanyDuty">
                  <el-select v-model="applicationForm.proposerCompanyDuty" placeholder="请选择职务名称">
                    <el-option v-for="item in jobTitle.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </template>
              <template v-if="applicationForm.proposerJobType=='1'">
                <h3>经营企业</h3>
                <el-form-item label="经营主体" prop="proposerBusiness">
                  <el-input clearable v-model="applicationForm.proposerBusiness"></el-input>
                </el-form-item>
                <el-form-item label="经营场所" prop="proposerBusinessPlace">
                <el-radio-group v-model="applicationForm.proposerBusinessPlace">
                  <el-radio :label="0">自有</el-radio>
                  <el-radio :label="1">租赁</el-radio>
                </el-radio-group>
                </el-form-item>
                <el-form-item label="办公地址" prop="proposerBusinessAddress">
                  <el-input clearable v-model="applicationForm.proposerBusinessAddress"></el-input>
                </el-form-item>
                <el-form-item label="营业执照注册号" prop="proposerBusinessLicense">
                  <el-input clearable v-model="applicationForm.proposerBusinessLicense"></el-input>
                </el-form-item>
                <el-form-item label="贷款卡号" prop="proposerBusinessCard">
                  <el-input clearable v-model="applicationForm.proposerBusinessCard"></el-input>
                </el-form-item>
              </template>
              <el-form-item>
                <el-button type="primary" @click="saveFormHandler()">提交</el-button>
                <el-button @click="resetForm('applicationForm')">重置</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <h3>贷款申请情况</h3>
              <el-form-item label="申请金额" prop="loanAmount">
                <el-input clearable v-model.number="applicationForm.loanAmount" type="number" min="0"><template slot="append">元</template></el-input>
              </el-form-item>
              <el-form-item label="申请期限" prop="loanPeriod">
                <el-input clearable v-model.number="applicationForm.loanPeriod" type="number" min="0"><template slot="append">月</template></el-input>
              </el-form-item>
              <el-form-item label="申请授信方式" prop="loanCreditType">
                <el-radio-group v-model="applicationForm.loanCreditType">
                  <el-radio :label="0">抵押经营</el-radio>
                  <el-radio :label="1">抵押消费</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="借款用途" prop="loanPurpose">
                <el-input clearable v-model="applicationForm.loanPurpose"></el-input>
              </el-form-item>
              <el-form-item label="还款方式" prop="loanRepaymentType">
                <el-select v-model="applicationForm.loanRepaymentType" placeholder="请选择还款方式">
                  <el-option v-for="item in paymentMethod.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="其他" prop="loanOther">
                <el-input clearable type="textarea" v-model="applicationForm.loanOther"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <h3>配偶信息</h3>
              <el-form-item label="姓名" prop="proposerSpouseName">
                <el-input clearable v-model="applicationForm.proposerSpouseName"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="proposerSpousePhone">
                <el-input clearable v-model="applicationForm.proposerSpousePhone"></el-input>
              </el-form-item>
              <el-form-item label="证件种类" prop="proposerSpousePaperType">
                <el-select v-model="applicationForm.proposerSpousePaperType" placeholder="请选择证件种类">
                  <el-option v-for="item in credentialType.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="证件号码" prop="proposerSpousePaperId">
                <el-input clearable v-model="applicationForm.proposerSpousePaperId"></el-input>
              </el-form-item>
              <el-form-item label="是否作为共同申请人" prop="hasProposerSpouseTogether">
                <el-radio-group v-model="applicationForm.hasProposerSpouseTogether">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <h3>其他紧急联系人信息（不承担贷款相关责任）</h3>
              <el-form-item label="姓名" prop="loanContactName">
                <el-input clearable v-model="applicationForm.loanContactName"></el-input>
              </el-form-item>
              <el-form-item label="是您的" prop="loanContactRela">
                <el-select v-model="applicationForm.loanContactRela" placeholder="请选择关系">
                  <el-option v-for="item in isYour.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="手机号码" prop="loanContactPhone">
                <el-input clearable v-model="applicationForm.loanContactPhone"></el-input>
              </el-form-item>
              <el-form-item label="住宅电话" prop="loanContactTele">
                <el-input clearable v-model="applicationForm.loanContactTele"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <div class="form-wrapper" v-if="activeStep=='1'">
      <h3>确定面签状态</h3>
      <el-form :model="contractStatusForm" ref="contractStatusForm" label-width="200px" :rules="contractStatusFormRules" key="contractStatusForm">
        <el-form-item label="完成时间" prop="time">
          <el-date-picker type="date" placeholder="选择日期" v-model="contractStatusForm.time" value-format="timestamp" :disabled="finishStatus"></el-date-picker>
        </el-form-item>
         <el-form-item label="约定地点" prop="address">
          <el-select v-model="contractStatusForm.address" placeholder="请选择签约地点" :disabled="finishStatus">
            <el-option v-for="item in visaPlace.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="!finishStatus">
          <el-button type="primary" :loading="formLoading" @click="confirmVisaHandler()">提交</el-button>
          <el-button @click="resetForm('contractStatusForm')">重置</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="info" disabled>面签状态已确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="option">
      <el-button @click="activeStep--" v-if="activeStep > 0">上一步</el-button>
      <el-button type="primary" @click="activeStep++" v-if="activeStep < 1" :disabled="!(finishCatalog&&finishForm)">下一步</el-button>
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
import { mapGetters } from 'vuex'
import {
  getStaticIndexByKey,
  getVisaById,
  saveCatalog,
  updateCatalog,
  saveForm,
  updateForm,
  confirmVisa
} from '@/api/mortgage'

export default {
  data () {
    return {
      contractStatusForm: {
        time: '',
        address: ''
      },
      finishStatus: false,
      // catalogForm: {
      //   finishTime: null,
      //   clientName: null,
      //   loanAmount: null,
      //   clerkName: null,
      //   clerkPhone: null,
      //   hasClientIdCard: null,
      //   clientIdCardDes: null,
      //   clientIdCardPage: null,
      //   clientIdCardRemark: null,
      //   hasClientAccount: null,
      //   clientAccountHome: null,
      //   clientAccountHousehold: null,
      //   clientAccountMyself: null,
      //   clientAccountDes: null,
      //   clientAccountPage: null,
      //   clientAccountRemark: null,
      //   hasClientSpouseIdCard: null,
      //   clientSpouseIdCardDes: null,
      //   clientSpouseIdCardPage: null,
      //   clientSpouseIdCardRemark: null,
      //   hasClientSpouseAccount: null,
      //   clientSpouseAccountHome: null,
      //   clientSpouseAccountHousehold: null,
      //   clientSpouseAccountMyself: null,
      //   clientSpouseAccountDes: null,
      //   clientSpouseAccountPage: null,
      //   clientSpouseAccountRemark: null,
      //   hasMarriageProof: null,
      //   marriageCertificate: null,
      //   divorceCertificate: null,
      //   divorceAgreement: null,
      //   marriageProofDes: null,
      //   marriageProofPage: null,
      //   marriageProofRemark: null,
      //   hasHouseMortgage: null,
      //   houseMortgage: null,
      //   houseMortgageDes: null,
      //   houseMortgagePage: null,
      //   houseMortgageRemark: null,
      //   hasAssetsCertificate: null,
      //   assetsHouseCertificate: null,
      //   assetsHouseNumber: null,
      //   assetsOther: null,
      //   assetsOtherRemark: null,
      //   assetsCarCertificate: null,
      //   assetsCarNumber: null,
      //   assetsCertificateDes: null,
      //   assetsCertificatePage: null,
      //   assetsCertificateRemark: null,
      //   hasIncomeProof: null,
      //   incomeProofDes: null,
      //   incomeProofPage: null,
      //   incomeProofRemark: null,
      //   hasBusinessLicense: null,
      //   businessLicenseDes: null,
      //   businessLicensePage: null,
      //   businessLicenseRemark: null,
      //   hasLegalRepresentative: null,
      //   legalRepresentativeDes: null,
      //   legalRepresentativePage: null,
      //   legalRepresentativeRemark: null,
      //   hasCompanyStatute: null,
      //   companyStatuteDes: null,
      //   companyStatutePage: null,
      //   companyStatuteRemark: null,
      //   hasGrantDeed: null,
      //   grantDeedDes: null,
      //   grantDeedPage: null,
      //   grantDeedRemark: null,
      //   hasTradingContact: null,
      //   tradingContactDes: null,
      //   tradingContactPage: null,
      //   tradingContactRemark: null,
      //   hasPurposeContact: null,
      //   purposeContactDes: null,
      //   purposeContactPage: null,
      //   purposeContactRemark: null,
      //   catalogOther: []
      // },
      catalogForm: null,
      finishCatalog: false,
      // applicationForm: {
      //   applicationTime: null,
      //   proposerName: null,
      //   proposerGender: null,
      //   proposerMarriageState: null,
      //   proposerFamily: null,
      //   proposerFamilyNum: null,
      //   proposerPhone: null,
      //   proposerWorkTele: null,
      //   proposerHouseTele: null,
      //   proposerHouseholdType: null,
      //   proposerIdCard: null,
      //   proposerInhabitingInfo: null,
      //   proposerAddress: null,
      //   proposerLocalResident: null,
      //   proposerLodgingInfo: null,
      //   proposerLoanState: null,
      //   proposerJobType: null,
      //   proposerWorkYear: null,
      //   proposerIncomeMonth: null,
      //   proposerSpouseName: null,
      //   proposerSpousePhone: null,
      //   proposerSpousePaperType: null,
      //   proposerSpousePaperId: null,
      //   hasProposerSpouseTogether: null,
      //   proposerCompany: null,
      //   proposerCompanyAddress: null,
      //   proposerCompanyType: null,
      //   proposerCompanyDuty: null,
      //   proposerBusinessLicense: null,
      //   proposerBusinessPlace: null,
      //   proposerBusinessAddress: null,
      //   proposerBusiness: null,
      //   proposerBusinessCard: null,
      //   loanAmount: null,
      //   loanPeriod: null,
      //   loanCreditType: null,
      //   loanPurpose: null,
      //   loanRepaymentType: null,
      //   loanOther: null,
      //   loanContactName: null,
      //   loanContactRela: null,
      //   loanContactTele: null,
      //   loanContactPhone: null
      // },
      applicationForm: null,
      finishForm: false,
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
      applicationFormRules: {
        applicationTime: [{ required: true, message: '申请时间不能为空' }],
        proposerName: [{ required: true, message: '姓名不能为空' }],
        proposerGender: [{ required: true, message: '请选择性别' }],
        proposerMarriageState: [{ required: true, message: '请选择婚姻状况' }],
        proposerFamily: [{ required: true, message: '请选择家庭结构' }],
        proposerFamilyNum: [
          { required: true, message: '家庭人数不能为空' },
          { type: 'integer', message: '家庭人数必须为整数值' }
        ],
        proposerPhone: [
          { required: true, message: '手机号码不能为空' },
          { pattern: /^1[0-9]{10}$/, message: '手机号格式错误' }
        ],
        proposerHouseholdType: [{ required: true, message: '请选择户籍类型' }],
        proposerIdCard: [
          { required: true, message: '身份证号码不能为空' },
          { pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/, message: '身份证号码格式错误' }
        ],
        proposerInhabitingInfo: [{ required: true, message: '居住情况不能为空' }],
        proposerAddress: [{ required: true, message: '居住地址不能为空' }],
        proposerLocalResident: [{ required: true, message: '居住年限不能为空' }],
        proposerLodgingInfo: [{ required: true, message: '请选择住房情况' }],
        proposerLoanState: [{ required: true, message: '请选择贷款情况' }],
        proposerJobType: [{ required: true, message: '请选择就业性质' }],
        proposerWorkYear: [{ required: true, message: '就业年限不能为空' }],
        proposerIncomeMonth: [{ required: true, message: '月收入不能为空' }],
        proposerSpouseName: [{ required: true, message: '姓名不能为空' }],
        proposerSpousePhone: [
          { required: true, message: '手机号码不能为空' },
          { pattern: /^1[0-9]{10}$/, message: '手机号格式错误' }
        ],
        proposerSpousePaperType: [{ required: true, message: '请选择证件种类' }],
        proposerSpousePaperId: [{ required: true, message: '证件号码不能为空' }],
        hasProposerSpouseTogether: [{ required: true, message: '请选择是否作为共同申请人' }],
        proposerCompany: [{ required: true, message: '工作单位不能为空' }],
        proposerCompanyAddress: [{ required: true, message: '单位地址不能为空' }],
        proposerCompanyType: [{ required: true, message: '请选择单位性质' }],
        proposerCompanyDuty: [{ required: true, message: '请选择职务名称' }],
        proposerBusinessLicense: [{ required: true, message: '营业执照注册号不能为空' }],
        proposerBusinessPlace: [{ required: true, message: '请选择经营场所' }],
        proposerBusinessAddress: [{ required: true, message: '办公地址不能为空' }],
        proposerBusiness: [{ required: true, message: '经营主体不能为空' }],
        proposerBusinessCard: [{ required: true, message: '贷款卡号不能为空' }],
        loanAmount: [
          { required: true, message: '申请金额不能为空' },
          { type: 'integer', message: '申请金额必须为整数值' }
        ],
        loanPeriod: [
          { required: true, message: '申请期限不能为空' },
          { type: 'integer', message: '申请期限必须为整数值' }
        ],
        loanCreditType: [{ required: true, message: '请选择申请授信方式' }],
        loanPurpose: [{ required: true, message: '贷款用途不能为空' }],
        loanRepaymentType: [{ required: true, message: '请选择还款方式' }],
        loanContactName: [{ required: true, message: '姓名不能为空' }],
        loanContactRela: [{ required: true, message: '请选择与您的关系' }],
        loanContactPhone: [
          { required: true, message: '手机号码不能为空' },
          { pattern: /^1[0-9]{10}$/, message: '手机号格式错误' }
        ]
      },
      contractStatusFormRules: {
        time: [{ required: true, message: '完成时间不能为空' }],
        address: [{ required: true, message: '请选择约定地点' }]
      },
      formLoading: false,
      loanId: '',
      loanStatus: '',
      loanLastStatus: '',
      dialogVisible: false,
      listPath: '/loan-mortgage/visa-interview',
      nextPath: '/loan-mortgage/evaluate-order',
      activeStep: 0,
      activeNames: ['1'],
      loanVariety: '',
      maritalStatus: {
        key: 'mortgagevisamaritalstatus',
        value: []
      },
      familyStructure: {
        key: 'mortgagevisafamilystructure',
        value: []
      },
      localLiving1: {
        key: 'mortgagevisalocalliving1',
        value: []
      },
      localLiving2: {
        key: 'mortgagevisalocalliving2',
        value: []
      },
      credentialType: {
        key: 'mortgagevisacredentialtype',
        value: []
      },
      unitNature: {
        key: 'mortgagevisaunitnature',
        value: []
      },
      jobTitle: {
        key: 'mortgagevisajobtitle',
        value: []
      },
      paymentMethod: {
        key: 'mortgagevisarepaymentmethod',
        value: []
      },
      isYour: {
        key: 'mortgagevisaisyour',
        value: []
      },
      visaPlace: {
        key: 'mortgageviewplace',
        value: []
      },
      livingSituation: {
        key: 'livingSituation',
        value: []
      }
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  props: {
    visaId: '',
    showFlowDialog: {
      default: false
    },
    currentFlow: ''
  },
  created () {
    this.loanLastStatus = this.currentFlow
    getVisaById(this.visaId).then(({ data }) => {
      this.finishCatalog = data.catalogState.done
      this.finishForm = data.formState.done
      this.finishStatus = data.visaState.done
      if (data) {
        this.loanVariety = data.loanVariety
        this.catalogForm = JSON.parse(JSON.stringify(data.catalog))
        this.applicationForm = JSON.parse(JSON.stringify(data.form))
        this.contractStatusForm = JSON.parse(JSON.stringify(data.visa))
        this.applicationForm.loanPeriod = this.applicationForm.loanPeriod ? parseInt(this.applicationForm.loanPeriod) : null
        this.contractStatusForm.address = this.contractStatusForm.address ? parseInt(this.contractStatusForm.address) : null
      } else {
        this.$message({
          type: 'error',
          message: '表单数据获取失败'
        })
      }
    })
    this.getStaticIndex(this.maritalStatus)
    this.getStaticIndex(this.familyStructure)
    this.getStaticIndex(this.localLiving1)
    this.getStaticIndex(this.localLiving2)
    this.getStaticIndex(this.credentialType)
    this.getStaticIndex(this.unitNature)
    this.getStaticIndex(this.jobTitle)
    this.getStaticIndex(this.paymentMethod)
    this.getStaticIndex(this.isYour)
    this.getStaticIndex(this.visaPlace)
    this.getStaticIndex(this.livingSituation)
  },
  methods: {
    saveCatalogHandler () {
      this.$refs['catalogForm'].validate((valid) => {
        if (valid) {
          const saveMethod = this.finishCatalog ? updateCatalog : saveCatalog
          saveMethod(this.catalogForm).then(({ data }) => {
            if (data) {
              this.finishCatalog = true
              this.$message({
                type: 'success',
                message: '资料目录表保存成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: '资料目录表保存失败'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    saveFormHandler () {
      this.$refs['applicationForm'].validate((valid) => {
        if (valid) {
          const saveMethod = this.finishForm ? updateForm : saveForm
          saveMethod(this.applicationForm).then(({ data }) => {
            if (data) {
              this.finishForm = true
              this.$message({
                type: 'success',
                message: '个人贷款申请表保存成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: '个人贷款申请表保存失败'
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
      // 第一次拿到时为null
      if (!this.catalogForm.catalogOther) {
        this.catalogForm.catalogOther = []
      }
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
    confirmVisaHandler () {
      this.$refs['contractStatusForm'].validate((valid) => {
        if (valid) {
          if (this.showFlowDialog) {
            this.$confirm('请确认信息填写无误，是否提交？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.formLoading = true
              this.$message({
                type: 'info',
                message: '正在处理...'
              })
              confirmVisa(this.visaId, this.contractStatusForm.time, this.contractStatusForm.address).then(({ data }) => {
                this.$message.closeAll()
                this.formLoading = false
                if (data) {
                  this.finishStatus = true
                  this.loanId = data.rootId
                  this.loanStatus = data.des
                  this.dialogVisible = true
                } else {
                  this.$message({
                    type: 'error',
                    message: '确定面签状态失败'
                  })
                }
              })
            }).catch(() => {})
          } else {
            this.formLoading = true
            confirmVisa(this.visaId, this.contractStatusForm.time, this.contractStatusForm.address).then(({ data }) => {
              this.formLoading = false
              if (data) {
                this.finishStatus = true
                this.$message({
                  type: 'success',
                  message: '确定面签状态成功'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '确定面签状态失败'
                })
              }
            })
          }
        } else {
          return false
        }
      })
    },
    getStaticIndex (staticIndex) {
      getStaticIndexByKey(staticIndex.key).then(({ data }) => {
        if (data) {
          staticIndex.value = data[staticIndex.key]
        } else {
          this.$message({
            type: 'error',
            message: '静态索引获取失败'
          })
        }
      })
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
