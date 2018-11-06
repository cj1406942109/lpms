<template>
  <div class="app-container">
    <template v-if="formStep=='1'">
      <el-collapse>
        <el-collapse-item class="form-wrapper">
          <template slot="title"><h2>资料目录表</h2></template>
          <el-form :model="dataTableForm" ref="dataTableForm" label-width="200px" :rules="dataTableRules">
            <el-row>
              <el-col :span="10">
                <el-form-item label="完成时间" prop="finish_time">
                  <el-date-picker type="date" placeholder="选择日期" v-model="dataTableForm.finish_time" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="贷款人姓名" prop="client_name">
                  <el-input clearable v-model="dataTableForm.client_name"></el-input>
                </el-form-item>
                <el-form-item label="贷款金额" prop="loan_amount">
                  <el-input clearable v-model.number="dataTableForm.loan_amount" type="number"><template slot="append">元</template></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="接单人员姓名" prop="clerk_name">
                  <el-input clearable v-model="dataTableForm.clerk_name"></el-input>
                </el-form-item>
                <el-form-item label="接单人员电话" prop="clerk_phone">
                  <el-input clearable v-model="dataTableForm.clerk_phone"></el-input>
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
                    <el-checkbox v-model="dataTableForm.has_client_id_card"></el-checkbox>
                  </td>
                  <td>借款人身份证</td>
                  <td>
                    <el-radio-group v-model="dataTableForm.client_id_card_des">
                      <el-radio :label="0" >原件</el-radio>
                      <el-radio :label="1">复印件</el-radio>
                    </el-radio-group>
                  </td>
                  <td>
                    <el-input clearable type="number" v-model="dataTableForm.client_id_card_page" min="0" size="small"></el-input>
                  </td>
                  <td>
                    <el-input clearable type="text" v-model="dataTableForm.client_id_card_remark" size="small"></el-input>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <el-checkbox v-model="dataTableForm.has_client_account"></el-checkbox>
                  </td>
                  <td>借款人户口：&nbsp;&nbsp;
                    <el-checkbox label="首页" v-model="dataTableForm.client_account_home"></el-checkbox>
                    <el-checkbox label="户主页" v-model="dataTableForm.client_account_household"></el-checkbox>
                    <el-checkbox label="本人页" v-model="dataTableForm.client_account_myself"></el-checkbox>
                  </td>
                  <td>
                    <el-radio-group v-model="dataTableForm.client_account_des">
                      <el-radio :label="0" >原件</el-radio>
                      <el-radio :label="1">复印件</el-radio>
                    </el-radio-group>
                  </td>
                  <td>
                    <el-input clearable type="number" v-model="dataTableForm.client_account_page" min="0" size="small"></el-input>
                  </td>
                  <td>
                    <el-input clearable type="text" v-model="dataTableForm.client_account_remark" size="small"></el-input>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>
                    <el-checkbox v-model="dataTableForm.has_client_spouse_id_card"></el-checkbox>
                  </td>
                  <td>借款人配偶身份证</td>
                  <td>
                    <el-radio-group v-model="dataTableForm.client_spouse_id_card_des">
                      <el-radio :label="0" >原件</el-radio>
                      <el-radio :label="1">复印件</el-radio>
                    </el-radio-group>
                  </td>
                  <td>
                    <el-input clearable type="number" v-model="dataTableForm.client_spouse_id_card_page" min="0" size="small"></el-input>
                  </td>
                  <td>
                    <el-input clearable type="text" v-model="dataTableForm.client_spouse_id_card_remark" size="small"></el-input>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>
                    <el-checkbox v-model="dataTableForm.has_client_spouse_account"></el-checkbox>
                  </td>
                  <td>借款人配偶户口：&nbsp;&nbsp;
                    <el-checkbox label="首页" v-model="dataTableForm.client_spouse_account_home"></el-checkbox>
                    <el-checkbox label="户主页" v-model="dataTableForm.client_spouse_account_household"></el-checkbox>
                    <el-checkbox label="本人页" v-model="dataTableForm.client_spouse_account_myself"></el-checkbox>
                  </td>
                  <td>
                    <el-radio-group v-model="dataTableForm.client_spouse_account_des">
                      <el-radio :label="0" >原件</el-radio>
                      <el-radio :label="1">复印件</el-radio>
                    </el-radio-group>
                  </td>
                  <td>
                    <el-input clearable type="number" v-model="dataTableForm.client_spouse_account_page" min="0" size="small"></el-input>
                  </td>
                  <td>
                    <el-input clearable type="text" v-model="dataTableForm.client_spouse_account_remark" size="small"></el-input>
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>
                    <el-checkbox v-model="dataTableForm.has_marriage_proof"></el-checkbox>
                  </td>
                  <td>婚姻证明：&nbsp;&nbsp;
                    <el-checkbox label="结婚证" v-model="dataTableForm.marriage_certificate"></el-checkbox>
                    <el-checkbox label="离婚证" v-model="dataTableForm.divorce_certificate"></el-checkbox>
                    <el-checkbox label="离婚协议" v-model="dataTableForm.divorce_agreement"></el-checkbox>
                  </td>
                  <td>
                    <el-radio-group v-model="dataTableForm.marriage_proof_des">
                      <el-radio :label="0" >原件</el-radio>
                      <el-radio :label="1">复印件</el-radio>
                    </el-radio-group>
                  </td>
                  <td>
                    <el-input clearable type="number" v-model="dataTableForm.marriage_proof_page" min="0"  size="small"></el-input>
                  </td>
                  <td>
                    <el-input clearable type="text" v-model="dataTableForm.marriage_proof_remark"  size="small"></el-input>
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>
                    <el-checkbox v-model="dataTableForm.has_house_mortgage"></el-checkbox>
                  </td>
                  <td>抵押物房产两证：&nbsp;&nbsp;
                    <el-input clearable type="number" v-model="dataTableForm.house_mortgage" min="0" style="width:80px" size="small"></el-input>&nbsp;&nbsp;套
                  </td>
                  <td>
                    <el-radio-group v-model="dataTableForm.house_mortgage_des">
                      <el-radio :label="0" >原件</el-radio>
                      <el-radio :label="1">复印件</el-radio>
                    </el-radio-group>
                  </td>
                  <td>
                    <el-input clearable type="number" v-model="dataTableForm.house_mortgage_page" min="0" size="small">></el-input>
                  </td>
                  <td>
                    <el-input clearable type="text" v-model="dataTableForm.house_mortgage_remark" size="small">></el-input>
                  </td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>
                    <el-checkbox v-model="dataTableForm.has_assets_certificate"></el-checkbox>
                  </td>
                  <td>资产证件复印件：&nbsp;&nbsp;
                    <el-checkbox label="房产证" v-model="dataTableForm.assets_house_certificate"></el-checkbox>
                    <template v-if="dataTableForm.assets_house_certificate">
                      <el-input clearable type="number" v-model="dataTableForm.assets_house_number" min="0" style="width:80px" size="small"></el-input>&nbsp;&nbsp;套&nbsp;&nbsp;
                    </template>
                    <el-checkbox label="车产证" v-model="dataTableForm.assets_car_certificate"></el-checkbox>
                    <template v-if="dataTableForm.assets_car_certificate">
                      <el-input clearable type="number" v-model="dataTableForm.assets_car_number" min="0" style="width:80px" size="small"></el-input>&nbsp;&nbsp;套&nbsp;&nbsp;
                    </template>
                    <el-checkbox label="其他资产" v-model="dataTableForm.assets_other"></el-checkbox>
                    <template v-if="dataTableForm.assets_other">
                      <el-input clearable type="text" v-model="dataTableForm.assets_other_remark" style="width:150px" size="small"></el-input>
                    </template>
                  </td>
                  <td>
                    <el-radio-group v-model="dataTableForm.assets_certificate_des">
                      <el-radio :label="0" >原件</el-radio>
                      <el-radio :label="1">复印件</el-radio>
                    </el-radio-group>
                  </td>
                  <td>
                    <el-input clearable type="number" v-model="dataTableForm.assets_certificate_page" min="0" size="small">></el-input>
                  </td>
                  <td>
                    <el-input clearable type="text" v-model="dataTableForm.assets_certificate_remark" size="small">></el-input>
                  </td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>
                    <el-checkbox v-model="dataTableForm.has_income_proof"></el-checkbox>
                  </td>
                  <td>收入证明</td>
                  <td>
                    <el-radio-group v-model="dataTableForm.income_proof_des">
                      <el-radio :label="0" >原件</el-radio>
                      <el-radio :label="1">复印件</el-radio>
                    </el-radio-group>
                  </td>
                  <td>
                    <el-input clearable type="number" v-model="dataTableForm.income_proof_page" min="0" size="small"></el-input>
                  </td>
                  <td>
                    <el-input clearable type="text" v-model="dataTableForm.income_proof_remark" size="small"></el-input>
                  </td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>
                    <el-checkbox v-model="dataTableForm.has_purpose_contact"></el-checkbox>
                  </td>
                  <td>用途合同</td>
                  <td>
                    <el-radio-group v-model="dataTableForm.purpose_contact_des">
                      <el-radio :label="0" >原件</el-radio>
                      <el-radio :label="1">复印件</el-radio>
                    </el-radio-group>
                  </td>
                  <td>
                    <el-input clearable type="number" v-model="dataTableForm.purpose_contact_page" min="0" size="small"></el-input>
                  </td>
                  <td>
                    <el-input clearable type="text" v-model="dataTableForm.purpose_contact_remark" size="small"></el-input>
                  </td>
                </tr>
                <!-- 抵押消费对应id为20,抵押经营对应id为21 -->
                <template v-if="loanType==21">
                  <tr>
                    <td>10</td>
                    <td>
                      <el-checkbox v-model="dataTableForm.has_business_license"></el-checkbox>
                    </td>
                    <td>营业执照（三证合一）</td>
                    <td>
                      <el-radio-group v-model="dataTableForm.business_license_des">
                        <el-radio :label="0" >原件</el-radio>
                        <el-radio :label="1">复印件</el-radio>
                      </el-radio-group>
                    </td>
                    <td>
                      <el-input clearable type="number" v-model="dataTableForm.business_license_page" min="0" size="small"></el-input>
                    </td>
                    <td>
                      <el-input clearable type="text" v-model="dataTableForm.business_license_remark" size="small"></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td>11</td>
                    <td>
                      <el-checkbox v-model="dataTableForm.has_legal_representative"></el-checkbox>
                    </td>
                    <td>企业法定代表人身份证</td>
                    <td>
                      <el-radio-group v-model="dataTableForm.legal_representative_des">
                        <el-radio :label="0" >原件</el-radio>
                        <el-radio :label="1">复印件</el-radio>
                      </el-radio-group>
                    </td>
                    <td>
                      <el-input clearable type="number" v-model="dataTableForm.legal_representative_page" min="0" size="small"></el-input>
                    </td>
                    <td>
                      <el-input clearable type="text" v-model="dataTableForm.legal_representative_remark" size="small"></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td>12</td>
                    <td>
                      <el-checkbox v-model="dataTableForm.has_company_statute"></el-checkbox>
                    </td>
                    <td>公司章程</td>
                    <td>
                      <el-radio-group v-model="dataTableForm.company_statute_des">
                        <el-radio :label="0" >原件</el-radio>
                        <el-radio :label="1">复印件</el-radio>
                      </el-radio-group>
                    </td>
                    <td>
                      <el-input clearable type="number" v-model="dataTableForm.company_statute_page" min="0" size="small"></el-input>
                    </td>
                    <td>
                      <el-input clearable type="text" v-model="dataTableForm.company_statute_remark" size="small"></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td>13</td>
                    <td>
                      <el-checkbox v-model="dataTableForm.has_grant_deed"></el-checkbox>
                    </td>
                    <td>经营地租赁合同或产权证明</td>
                    <td>
                      <el-radio-group v-model="dataTableForm.grant_deed_des">
                        <el-radio :label="0" >原件</el-radio>
                        <el-radio :label="1">复印件</el-radio>
                      </el-radio-group>
                    </td>
                    <td>
                      <el-input clearable type="number" v-model="dataTableForm.grant_deed_page" min="0" size="small"></el-input>
                    </td>
                    <td>
                      <el-input clearable type="text" v-model="dataTableForm.grant_deed_remark" size="small"></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td>14</td>
                    <td>
                      <el-checkbox v-model="dataTableForm.has_trading_contact"></el-checkbox>
                    </td>
                    <td>贸易合同</td>
                    <td>
                      <el-radio-group v-model="dataTableForm.trading_contact_des">
                        <el-radio :label="0" >原件</el-radio>
                        <el-radio :label="1">复印件</el-radio>
                      </el-radio-group>
                    </td>
                    <td>
                      <el-input clearable type="number" v-model="dataTableForm.trading_contact_page" min="0" size="small"></el-input>
                    </td>
                    <td>
                      <el-input clearable type="text" v-model="dataTableForm.trading_contact_remark" size="small"></el-input>
                    </td>
                  </tr>
                </template>
                <tr v-for="(item, index) in dataTableForm.mortgageCatalogOthers" :key="item.id">
                  <td v-if="loanType=='21'">{{14 + index + 1}}</td>
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
              <el-button @click="resetForm('dataTableForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item class="form-wrapper">
          <template slot="title"><h2>个人贷款申请表</h2></template>
          <el-form :model="loanApplicationForm" ref="loanApplicationForm" label-width="200px">
            <el-form-item label="申请时间" prop="application_time">
              <el-date-picker type="date" placeholder="选择日期" v-model="loanApplicationForm.application_time" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <h3>申请人信息</h3>
                <el-form-item label="姓名">
                  <el-input clearable v-model="loanApplicationForm.proposer_name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                  <el-radio-group v-model="loanApplicationForm.proposer_gender">
                    <el-radio :label="0">男</el-radio>
                    <el-radio :label="1">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="婚姻状态">
                  <el-select v-model="loanApplicationForm.proposer_marriage_state" placeholder="请选择">
                    <el-option v-for="item in maritalStatus.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="家庭结构">
                  <el-select v-model="loanApplicationForm.proposer_family" placeholder="请选择">
                    <el-option v-for="item in familyStructure.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="家庭人数">
                  <el-input clearable v-model="loanApplicationForm.proposer_family_num" type="number" min="0"><template slot="append">人</template></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                  <el-input clearable v-model="loanApplicationForm.proposer_phone" placeholder="手机号码"></el-input>
                  <el-input clearable v-model="loanApplicationForm.proposer_work_tele" placeholder="单位固定电话"></el-input>
                  <el-input clearable v-model="loanApplicationForm.proposer_house_tele" placeholder="家庭固定电话"></el-input>
                </el-form-item>
                <el-form-item label="户籍类型">
                  <el-radio-group v-model="loanApplicationForm.proposer_household_type">
                    <el-radio :label="0">本地</el-radio>
                    <el-radio :label="1">非本地</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="身份证号码">
                  <el-input clearable v-model="loanApplicationForm.proposer_id_card" placeholder="二代居民身份证号码" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="居住情况">
                  <el-input clearable v-model="loanApplicationForm.proposer_inhabiting_info"></el-input>
                </el-form-item>
                <el-form-item label="居住地址">
                  <el-input clearable v-model="loanApplicationForm.proposer_address" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="本地居住">
                  <el-input clearable v-model="loanApplicationForm.proposer_local_resident" style="width:150px;"><template slot="append">年</template></el-input>
                  <el-select v-model="loanApplicationForm.proposer_lodging_info" placeholder="请选择住房情况">
                    <el-option v-for="item in localLiving1.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                  </el-select>
                  <el-select v-model="loanApplicationForm.proposer_loan_state" placeholder="请选择贷款情况">
                    <el-option v-for="item in localLiving2.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="就业性质">
                  <el-radio-group v-model="loanApplicationForm.proposer_job_type">
                    <el-radio :label="0">授薪</el-radio>
                    <el-radio :label="1">自雇</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="就业年限">
                  <el-input clearable v-model="loanApplicationForm.proposer_work_year" placeholder="现单位工作/企业成立"><template slot="append">年</template></el-input>
                </el-form-item>
                <el-form-item label="月收入">
                  <el-input clearable v-model="loanApplicationForm.proposer_income_month" placeholder="个人收入/企业销售收入"><template slot="append">元</template></el-input>
                </el-form-item>
                <template v-if="loanApplicationForm.proposer_job_type=='0'">
                  <h3>工作单位</h3>
                  <el-form-item label="工作单位">
                    <el-input clearable v-model="loanApplicationForm.proposer_company"></el-input>
                  </el-form-item>
                  <el-form-item label="单位地址">
                    <el-input clearable v-model="loanApplicationForm.proposer_company_address" style="width:400px;"></el-input>
                  </el-form-item>
                  <el-form-item label="单位性质">
                    <el-select v-model="loanApplicationForm.proposer_company_type" placeholder="请选择单位性质">
                      <el-option v-for="item in unitNature.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="职务名称">
                    <el-select v-model="loanApplicationForm.proposer_company_duty" placeholder="请选择职务名称">
                      <el-option v-for="item in jobTitle.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </template>
                <template v-if="loanApplicationForm.proposer_job_type=='1'">
                  <h3>经营企业</h3>
                  <el-form-item label="经营主体">
                    <el-input clearable v-model="loanApplicationForm.proposer_business_license"></el-input>
                  </el-form-item>
                  <el-form-item label="经营场所">
                  <el-radio-group v-model="loanApplicationForm.proposer_business_place">
                    <el-radio label="自有"></el-radio>
                    <el-radio label="租赁"></el-radio>
                  </el-radio-group>
                  </el-form-item>
                  <el-form-item label="办公地址">
                    <el-input clearable v-model="loanApplicationForm.proposer_business_address" style="width:400px;"></el-input>
                  </el-form-item>
                  <el-form-item label="营业执照注册号">
                    <el-input clearable v-model="loanApplicationForm.proposer_business"></el-input>
                  </el-form-item>
                  <el-form-item label="贷款卡号">
                    <el-input clearable v-model="loanApplicationForm.proposer_business_card"></el-input>
                  </el-form-item>
                </template>
                <el-form-item label=" ">
                  <el-button type="primary" @click="saveForm()">提交</el-button>
                  <el-button @click="resetForm('loanApplicationForm')">重置</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <h3>贷款申请情况</h3>
                <el-form-item label="申请金额">
                  <el-input clearable v-model="loanApplicationForm.loan_amount" placeholder="人民币"><template slot="append">元</template></el-input>
                </el-form-item>
                <el-form-item label="申请期限">
                  <el-input clearable v-model="loanApplicationForm.loan_period" type="number" min="0"><template slot="append">月</template></el-input>
                </el-form-item>
                <el-form-item label="申请授信方式">
                  <el-radio-group v-model="loanApplicationForm.loan_credit_type">
                    <el-radio :label="0">抵押经营</el-radio>
                    <el-radio :label="1">抵押消费</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="借款用途">
                  <el-input clearable v-model="loanApplicationForm.loan_purpose"></el-input>
                </el-form-item>
                <el-form-item label="还款方式">
                  <el-select v-model="loanApplicationForm.loan_repayment_type" placeholder="请选择还款方式">
                    <el-option v-for="item in paymentMethod.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="其他">
                  <el-input clearable type="textarea" v-model="loanApplicationForm.loan_other" style="width:400px;"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <h3>配偶信息</h3>
                <el-form-item label="姓名">
                  <el-input clearable v-model="loanApplicationForm.proposer_spouse_name"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                  <el-input clearable v-model="loanApplicationForm.proposer_spouse_phone"></el-input>
                </el-form-item>
                <el-form-item label="证件种类">
                  <el-select v-model="loanApplicationForm.proposer_spouse_paper_type" placeholder="请选择证件种类">
                    <el-option v-for="item in credentialType.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="证件号码">
                  <el-input clearable v-model="loanApplicationForm.proposer_spouse_paper_id"></el-input>
                </el-form-item>
                <el-form-item label="是否作为共同申请人">
                  <el-radio-group v-model="loanApplicationForm.has_proposer_spouse_together">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <h3>其他紧急联系人信息（不承担贷款相关责任）</h3>
                <el-form-item label="姓名">
                  <el-input clearable v-model="loanApplicationForm.loan_contact_name"></el-input>
                </el-form-item>
                <el-form-item label="是您的">
                  <el-select v-model="loanApplicationForm.loan_contact_rela" placeholder="请选择关系">
                    <el-option v-for="item in isYour.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="住宅电话">
                  <el-input clearable v-model="loanApplicationForm.loan_contact_tele"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                  <el-input clearable v-model="loanApplicationForm.loan_contact_phone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
      <div class="option">
        <el-button type="primary" @click="nextStep()">提交并下一步</el-button>
      </div>
    </template>
    <div class="form-wrapper" v-if="formStep=='2'">
      <h2>确定面签状态</h2>
      <el-form :model="contractStatusForm" ref="contractStatusForm" label-width="200px" inline>
        <el-form-item label="完成时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="contractStatusForm.time" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <br>
         <el-form-item label="约定地点" prop="place">
          <el-select v-model="contractStatusForm.address" placeholder="请选择签约地点">
            <el-option label="地点1" :value="0"></el-option>
            <el-option label="地点2" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label=" ">
          <el-button type="primary" :loading="formLoading" @click="finishVisaInterview">提交</el-button>
          <el-button @click="resetForm('contractStatusForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog :visible.sync="dialogVisible" width="30%" center>
      <div slot="title"><i class="el-icon-success" style="color:#67C23A;font-size:22px;vertical-align:middle;margin-right:5px;"></i>面签成功</div>
      <div>贷款编号为：<a style="color:blue">{{loanNum}}</a></div>
      <div>贷款状态为：<a style="color:blue">正在评估下单（等待填写正在评估下单相关表格）</a></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkStatus">查看贷款状态</el-button>
        <el-button @click="returnList">返回面谈列表</el-button>
        <el-button type="primary" @click="nextOperation">办理下一业务</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { getStaticIndexByKey, getCheckList, checkVisaStatus, getVisaInterviewCatalog, getVisaInterviewForm, saveVisaInterviewCatalog, saveVisaInterviewForm, saveVisaInterview } from '@/api/mortgage'

export default {
  name: 'sign-contract',
  data () {
    return {
      contractStatusForm: {
        time: '',
        address: ''
      },
      dataTableForm: {
        finish_time: null,
        client_name: null,
        loan_amount: null,
        clerk_name: null,
        clerk_phone: null,
        has_client_id_card: null,
        client_id_card_des: null,
        client_id_card_page: null,
        client_id_card_remark: null,
        has_client_account: null,
        client_account_home: null,
        client_account_household: null,
        client_account_myself: null,
        client_account_des: null,
        client_account_page: null,
        client_account_remark: null,
        has_client_spouse_id_card: null,
        client_spouse_id_card_des: null,
        client_spouse_id_card_page: null,
        client_spouse_id_card_remark: null,
        has_client_spouse_account: null,
        client_spouse_account_home: null,
        client_spouse_account_household: null,
        client_spouse_account_myself: null,
        client_spouse_account_des: null,
        client_spouse_account_page: null,
        client_spouse_account_remark: null,
        has_marriage_proof: null,
        marriage_certificate: null,
        divorce_certificate: null,
        divorce_agreement: null,
        marriage_proof_des: null,
        marriage_proof_page: null,
        marriage_proof_remark: null,
        has_house_mortgage: null,
        house_mortgage: null,
        house_mortgage_des: null,
        house_mortgage_page: null,
        house_mortgage_remark: null,
        has_assets_certificate: null,
        assets_house_certificate: null,
        assets_house_number: null,
        assets_other: null,
        assets_other_remark: null,
        assets_car_certificate: null,
        assets_car_number: null,
        assets_certificate_des: null,
        assets_certificate_page: null,
        assets_certificate_remark: null,
        has_income_proof: null,
        income_proof_des: null,
        income_proof_page: null,
        income_proof_remark: null,
        has_business_license: null,
        business_license_des: null,
        business_license_page: null,
        business_license_remark: null,
        has_legal_representative: null,
        legal_representative_des: null,
        legal_representative_page: null,
        legal_representative_remark: null,
        has_company_statute: null,
        company_statute_des: null,
        company_statute_page: null,
        company_statute_remark: null,
        has_grant_deed: null,
        grant_deed_des: null,
        grant_deed_page: null,
        grant_deed_remark: null,
        has_trading_contact: null,
        trading_contact_des: null,
        trading_contact_page: null,
        trading_contact_remark: null,
        has_purpose_contact: null,
        purpose_contact_des: null,
        purpose_contact_page: null,
        purpose_contact_remark: null,
        mortgageCatalogOthers: []
      },
      loanApplicationForm: {
        application_time: null,
        proposer_name: null,
        proposer_gender: null,
        proposer_marriage_state: null,
        proposer_family: null,
        proposer_family_num: null,
        proposer_phone: null,
        proposer_work_tele: null,
        proposer_house_tele: null,
        proposer_household_type: null,
        proposer_id_card: null,
        proposer_inhabiting_info: null,
        proposer_address: null,
        proposer_local_resident: null,
        proposer_lodging_info: null,
        proposer_loan_state: null,
        proposer_job_type: null,
        proposer_work_year: null,
        proposer_income_month: null,
        proposer_spouse_name: null,
        proposer_spouse_phone: null,
        proposer_spouse_paper_type: null,
        proposer_spouse_paper_id: null,
        has_proposer_spouse_together: null,
        proposer_company: null,
        proposer_company_address: null,
        proposer_company_type: null,
        proposer_company_duty: null,
        proposer_business_license: null,
        proposer_business_address: null,
        proposer_business: null,
        proposer_business_card: null,
        loan_amount: null,
        loan_period: null,
        loan_credit_type: null,
        loan_purpose: null,
        loan_repayment_type: null,
        loan_other: null,
        loan_contact_name: null,
        loan_contact_rela: null,
        loan_contact_tele: null,
        loan_contact_phone: null
      },
      dataTableRules: {
        loan_amount: [
          { type: 'integer', message: '贷款金额必须为整数值' }
        ],
        clerk_phone: [
          { pattern: /^1[0-9]{10}$/, message: '手机号格式错误', trigger: 'blur' }
        ]
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      formStep: 1,
      activeNames: ['1'],
      formLoading: false,
      dialogVisible: false,
      loanType: '',
      loanNum: '',
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
      }
    }
  },
  computed: {
    ...mapGetters([
      'user_id'
    ])
  },
  created () {
    getCheckList(this.$route.params.checklistId).then(response => {
      this.loanType = response.data.data.loan_type
    })
    this.getFormData()

    this.getStaticIndex(this.maritalStatus)
    this.getStaticIndex(this.familyStructure)
    this.getStaticIndex(this.localLiving1)
    this.getStaticIndex(this.localLiving2)
    this.getStaticIndex(this.credentialType)
    this.getStaticIndex(this.unitNature)
    this.getStaticIndex(this.jobTitle)
    this.getStaticIndex(this.paymentMethod)
    this.getStaticIndex(this.isYour)
  },
  methods: {
    getFormData () {
      checkVisaStatus(this.$route.params.loanId).then(response => {
        if (response.data.status) {
          const catalogId = response.data.data.catalogId
          const formId = response.data.data.formId
          if (catalogId) {
            getVisaInterviewCatalog(catalogId).then(response => {
              console.log(response)
              if (response.data.status) {
                this.dataTableForm = response.data.data
                this.dataTableForm.loan_amount = parseInt(this.dataTableForm.loan_amount)
                if (this.dataTableForm.finish_time) {
                  this.dataTableForm.finish_time = moment(this.dataTableForm.finish_time).format('YYYY-MM-DD')
                }
              }
            })
          }
          if (formId) {
            getVisaInterviewForm(formId).then(response => {
              console.log(response)
              if (response.data.status) {
                this.loanApplicationForm = response.data.data
                if (this.loanApplicationForm.application_time) {
                  this.loanApplicationForm.application_time = moment(this.loanApplicationForm.application_time).format('YYYY-MM-DD')
                }
              }
            })
          }
        }
      })
    },
    saveCatalog () {
      this.$refs['dataTableForm'].validate((valid) => {
        if (valid) {
          saveVisaInterviewCatalog(JSON.stringify(this.dataTableForm), this.$route.params.taskId, this.user_id).then(response => {
            if (response.data.status) {
              this.$message({
                type: 'success',
                message: '资料目录表保存成功'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    saveForm () {
      this.$refs['loanApplicationForm'].validate((valid) => {
        if (valid) {
          saveVisaInterviewForm(JSON.stringify(this.loanApplicationForm), this.$route.params.taskId).then(response => {
            if (response.data.status) {
              this.$message({
                type: 'success',
                message: '个人贷款申请表保存成功'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      console.log(formName)
      this.$refs[formName].resetFields()
    },
    addContent () {
      this.dataTableForm.mortgageCatalogOthers.push({
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
        const index = this.dataTableForm.mortgageCatalogOthers.indexOf(item)
        if (index !== -1) {
          this.dataTableForm.mortgageCatalogOthers.splice(index, 1)
        }
      }).catch(() => {})
    },
    nextStep () {
      this.saveCatalog()
      this.saveForm()
      this.formStep++
    },
    finishVisaInterview () {
      this.$confirm('请确认信息填写无误，是否提交？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'info',
          message: '正在处理...'
        })
        this.formLoading = true
        saveVisaInterview(this.contractStatusForm.time, this.contractStatusForm.address, this.$route.params.taskId).then(response => {
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
    checkStatus () {
      this.dialogVisible = false
      this.$router.push({ path: `/loan-management/order/status/${this.loanNum}` })
    },
    returnList () {
      this.dialogVisible = false
      this.$router.push({ path: '/loan-mortgage/visa-interview' })
    },
    nextOperation () {
      this.dialogVisible = false
      this.$router.push({ path: '/loan-mortgage/evaluate-order' })
    },
    getStaticIndex (staticIndex) {
      getStaticIndexByKey(staticIndex.key).then(response => {
        if (response.data.status) {
          staticIndex.value = response.data.data[staticIndex.key]
        } else {
          this.$message({
            showClose: true,
            message: '获取静态索引失败，请检查网络！',
            type: 'error'
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
    .option {
      text-align: center;
      margin: 50px;
      button {
        width: 200px;
      }
    }
  }
</style>
