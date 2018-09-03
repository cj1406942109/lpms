<template>
  <div class="app-container">
    <div class="form-wrapper" v-if="false">
      <h2>约定签约时间</h2>
      <el-form :model="contractTimeForm" ref="contractTimeForm" label-width="200px" inline>
        <el-form-item label="约定时间" prop="datetime">
          <el-date-picker type="datetime" placeholder="选择日期和时间" v-model="contractTimeForm.datetime" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <br>
        <el-form-item label="约定地点" prop="place">
          <el-select v-model="contractTimeForm.place" placeholder="请选择签约地点">
            <el-option label="地点1" value="1"></el-option>
            <el-option label="地点2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <br>
        <el-form-item label=" ">
          <el-button type="primary" @click="submitForm('contractTimeForm')">提交</el-button>
          <el-button @click="resetForm('contractTimeForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <template v-if="formStep=='1'">
      <div class="form-wrapper">
        <h2>资料目录表</h2>
        <el-form :model="dataTableForm" ref="dataTableForm" label-width="200px" inline>
          <el-form-item label="完成时间" prop="finish_time">
            <el-date-picker type="datetime" placeholder="选择日期和时间" v-model="dataTableForm.finish_time"></el-date-picker>
          </el-form-item>
          <br>
          <el-form-item label="贷款人姓名" prop="client_name">
            <el-input v-model="dataTableForm.client_name" clearable></el-input>
          </el-form-item>
          <el-form-item label="贷款金额" prop="loan_amount">
            <el-input v-model="dataTableForm.loan_amount" clearable></el-input>
          </el-form-item>
          <br>
          <el-form-item label="接单人员姓名" prop="clerk_name">
            <el-input v-model="dataTableForm.clerk_name" clearable></el-input>
          </el-form-item>
          <el-form-item label="接单人员电话" prop="clerk_name">
            <el-input v-model="dataTableForm.clerk_phone" clearable></el-input>
          </el-form-item>
          <br>
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
                    <el-radio label="原件"></el-radio>
                    <el-radio label="复印件"></el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input type="number" v-model="dataTableForm.client_id_card_page" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input type="text" v-model="dataTableForm.client_id_card_remark" size="small"></el-input>
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
                    <el-radio label="原件"></el-radio>
                    <el-radio label="复印件"></el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input type="number" v-model="dataTableForm.client_account_page" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input type="text" v-model="dataTableForm.client_account_remark" size="small"></el-input>
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
                    <el-radio label="原件"></el-radio>
                    <el-radio label="复印件"></el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input type="number" v-model="dataTableForm.client_spouse_id_card_page" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input type="text" v-model="dataTableForm.client_spouse_id_card_remark" size="small"></el-input>
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
                    <el-radio label="原件"></el-radio>
                    <el-radio label="复印件"></el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input type="number" v-model="dataTableForm.client_spouse_account_page" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input type="text" v-model="dataTableForm.client_spouse_account_remark" size="small"></el-input>
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
                    <el-radio label="原件"></el-radio>
                    <el-radio label="复印件"></el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input type="number" v-model="dataTableForm.marriage_proof_page" min="0"  size="small"></el-input>
                </td>
                <td>
                  <el-input type="text" v-model="dataTableForm.marriage_proof_remark"  size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td>6</td>
                <td>
                  <el-checkbox v-model="dataTableForm.has_house_mortgage"></el-checkbox>
                </td>
                <td>抵押物房产两证：&nbsp;&nbsp;
                  <el-input type="number" v-model="dataTableForm.house_mortgage" min="0" style="width:80px" size="small"></el-input>&nbsp;&nbsp;套
                </td>
                <td>
                  <el-radio-group v-model="dataTableForm.house_mortgage_des">
                    <el-radio label="原件"></el-radio>
                    <el-radio label="复印件"></el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input type="number" v-model="dataTableForm.house_mortgage_page" min="0" size="small">></el-input>
                </td>
                <td>
                  <el-input type="text" v-model="dataTableForm.house_mortgage_remark" size="small">></el-input>
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
                    <el-input type="number" v-model="dataTableForm.assets_house_number" min="0" style="width:80px" size="small"></el-input>&nbsp;&nbsp;套&nbsp;&nbsp;
                  </template>
                  <el-checkbox label="车产证" v-model="dataTableForm.assets_car_certificate"></el-checkbox>
                  <template v-if="dataTableForm.assets_car_certificate">
                    <el-input type="number" v-model="dataTableForm.assets_car_number" min="0" style="width:80px" size="small"></el-input>&nbsp;&nbsp;套&nbsp;&nbsp;
                  </template>
                  <el-checkbox label="其他资产" v-model="dataTableForm.assets_other"></el-checkbox>
                  <template v-if="dataTableForm.assets_other">
                    <el-input type="text" v-model="dataTableForm.assets_other_remark" style="width:150px" size="small"></el-input>
                  </template>
                </td>
                <td>
                  <el-radio-group v-model="dataTableForm.assets_certificate_des">
                    <el-radio label="原件"></el-radio>
                    <el-radio label="复印件"></el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input type="number" v-model="dataTableForm.assets_certificate_page" min="0" size="small">></el-input>
                </td>
                <td>
                  <el-input type="text" v-model="dataTableForm.assets_certificate_remark" size="small">></el-input>
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
                    <el-radio label="原件"></el-radio>
                    <el-radio label="复印件"></el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input type="number" v-model="dataTableForm.income_proof_page" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input type="text" v-model="dataTableForm.income_proof_remark" size="small"></el-input>
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
                    <el-radio label="原件"></el-radio>
                    <el-radio label="复印件"></el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input type="number" v-model="dataTableForm.purpose_contact_page" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input type="text" v-model="dataTableForm.purpose_contact_remark" size="small"></el-input>
                </td>
              </tr>
              <template v-if="loanType=='抵押经营'">
              <tr>
                <td>10</td>
                <td>
                  <el-checkbox v-model="dataTableForm.has_business_license"></el-checkbox>
                </td>
                <td>营业执照（三证合一）</td>
                <td>
                  <el-radio-group v-model="dataTableForm.business_license_des">
                    <el-radio label="原件"></el-radio>
                    <el-radio label="复印件"></el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input type="number" v-model="dataTableForm.business_license_page" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input type="text" v-model="dataTableForm.business_license_remark" size="small"></el-input>
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
                    <el-radio label="原件"></el-radio>
                    <el-radio label="复印件"></el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input type="number" v-model="dataTableForm.legal_representative_page" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input type="text" v-model="dataTableForm.legal_representative_remark" size="small"></el-input>
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
                    <el-radio label="原件"></el-radio>
                    <el-radio label="复印件"></el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input type="number" v-model="dataTableForm.company_statute_page" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input type="text" v-model="dataTableForm.company_statute_remark" size="small"></el-input>
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
                    <el-radio label="原件"></el-radio>
                    <el-radio label="复印件"></el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input type="number" v-model="dataTableForm.grant_deed_page" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input type="text" v-model="dataTableForm.grant_deed_remark" size="small"></el-input>
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
                    <el-radio label="原件"></el-radio>
                    <el-radio label="复印件"></el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input type="number" v-model="dataTableForm.trading_contact_page" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input type="text" v-model="dataTableForm.trading_contact_remark" size="small"></el-input>
                </td>
              </tr>
              </template>
              <tr v-for="(item, index) in dataTableForm.mortgageCatalogOthers" :key="item.id">
                <td v-if="loanType=='抵押经营'">{{14 + index + 1}}</td>
                <td v-else>{{9 + index + 1}}</td>
                <td></td>
                <td><el-input type="text" v-model="item.content" size="small"></el-input></td>
                <td><el-input type="text" v-model="item.description" size="small"></el-input></td>
                <td><el-input type="number" v-model="item.page" min="0" size="small"></el-input></td>
                <td><el-input type="text" v-model="item.remark" size="small" style="width:calc(100% - 100px)"></el-input>
                <el-button @click.prevent="removeContent(item)" type="danger" size="small" style="width:80px;">删除</el-button></td>
              </tr>
            </tbody>
          </table>
          <el-button type="info" @click="addContent()" style="margin: 20px 0 50px 100px;display:block;">添加资料内容</el-button>
          <el-form-item label=" ">
            <el-button type="primary" @click="submitForm('contractStatusForm')">保存</el-button>
            <el-button @click="resetForm('contractStatusForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="form-wrapper">
        <h2>个人贷款申请表</h2>
        <el-form :model="loanApplicationForm" ref="loanApplicationForm" label-width="200px" inline>
          <el-form-item label="申请时间" prop="datetime">
            <el-date-picker type="datetime" placeholder="选择日期和时间" v-model="loanApplicationForm.application_time" readonly></el-date-picker>
          </el-form-item>
          <br>
          <h3>申请人信息</h3>
          <el-form-item label="姓名">
            <el-input v-model="loanApplicationForm.proposer_name" clearable></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="loanApplicationForm.proposer_gender">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <br>
          <el-form-item label="婚姻状态">
            <el-select v-model="loanApplicationForm.proposer_marriage_state" placeholder="请选择">
              <el-option label="未婚" value="未婚"></el-option>
              <el-option label="已婚" value="已婚"></el-option>
              <el-option label="离异" value="离异"></el-option>
              <el-option label="丧偶" value="丧偶"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="家庭结构">
            <el-select v-model="loanApplicationForm.proposer_family" placeholder="请选择">
              <el-option label="有未成年子女" value="有未成年子女"></el-option>
              <el-option label="有子女都成年" value="有子女都成年"></el-option>
              <el-option label="无子女" value="无子女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="家庭人数">
            <el-input v-model="loanApplicationForm.proposer_family_num" clearable type="number" min="0"><template slot="append">人</template></el-input>
          </el-form-item>
          <br>
          <el-form-item label="联系方式">
            <el-input style="width:200px;" v-model="loanApplicationForm.proposer_phone" clearable placeholder="手机号码"></el-input>
            <el-input style="width:200px;" v-model="loanApplicationForm.proposer_work_tele" clearable placeholder="单位固定电话"></el-input>
            <el-input style="width:200px;" v-model="loanApplicationForm.proposer_house_tele" clearable placeholder="家庭固定电话"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="户籍类型">
            <el-radio-group v-model="loanApplicationForm.proposer_household_type">
              <el-radio label="本地"></el-radio>
              <el-radio label="非本地"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="身份证号码">
            <el-input v-model="loanApplicationForm.proposer_id_card" clearable placeholder="二代身份证号码" style="width:300px;"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="居住情况">
            <el-input v-model="loanApplicationForm.proposer_inhabiting_info" clearable></el-input>
          </el-form-item>
          <el-form-item label="居住地址">
            <el-input v-model="loanApplicationForm.proposer_address" clearable style="width:300px;"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="本地居住">
            <el-input v-model="loanApplicationForm.proposer_local_resident" clearable style="width:150px;"><template slot="append">年</template></el-input>
            <el-select v-model="loanApplicationForm.proposer_lodging_info" placeholder="请选择住房情况">
              <el-option label="本地有住房" value="本地有住房"></el-option>
              <el-option label="异地自有住房" value="异地自有住房"></el-option>
              <el-option label="无自有住房" value="无自有住房"></el-option>
            </el-select>
            <el-select v-model="loanApplicationForm.proposer_loan_state" placeholder="请选择贷款情况">
              <el-option label="有贷款" value="有贷款"></el-option>
              <el-option label="无贷款" value="无贷款"></el-option>
            </el-select>
          </el-form-item>
          <br>
          <el-form-item label="就业性质">
            <el-radio-group v-model="loanApplicationForm.proposer_job_type">
              <el-radio label="授薪"></el-radio>
              <el-radio label="自雇"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="就业年限">
            <el-input v-model="loanApplicationForm.proposer_work_year" clearable placeholder="现单位工作/企业成立"><template slot="append">年</template></el-input>
          </el-form-item>
          <el-form-item label="月收入">
            <el-input v-model="loanApplicationForm.proposer_income_month" clearable placeholder="个人收入/企业销售收入"><template slot="append">元</template></el-input>
          </el-form-item>
          <h3>配偶信息</h3>
          <el-form-item label="姓名">
            <el-input v-model="loanApplicationForm.proposer_spouse_name" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="loanApplicationForm.proposer_spouse_phone" clearable></el-input>
          </el-form-item>
          <br>
          <el-form-item label="证件种类">
            <el-select v-model="loanApplicationForm.proposer_spouse_paper_type" placeholder="请选择证件种类">
              <el-option label="身份证" value="身份证"></el-option>
              <el-option label="临时身份证" value="临时身份证"></el-option>
              <el-option label="户口簿" value="户口簿"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input v-model="loanApplicationForm.proposer_spouse_paper_id" clearable></el-input>
          </el-form-item>
          <br>
          <el-form-item label="是否作为共同申请人">
            <el-radio-group v-model="loanApplicationForm.has_proposer_spouse_together">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="loanApplicationForm.proposer_job_type=='授薪'">
            <h3>工作单位</h3>
            <el-form-item label="工作单位">
              <el-input v-model="loanApplicationForm.proposer_company" clearable></el-input>
            </el-form-item>
            <el-form-item label="单位地址">
              <el-input v-model="loanApplicationForm.proposer_company_address" clearable style="width:400px;"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="单位性质">
              <el-select v-model="loanApplicationForm.proposer_company_type" placeholder="请选择单位性质">
                <el-option label="事业/机关" value="事业/机关"></el-option>
                <el-option label="国有" value="国有"></el-option>
                <el-option label="私营" value="私营"></el-option>
                <el-option label="股份" value="股份"></el-option>
                <el-option label="个体" value="个体"></el-option>
                <el-option label="军/警" value="军/警"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职务名称">
              <el-select v-model="loanApplicationForm.proposer_company_duty" placeholder="请选择职务名称">
                <el-option label="普通员工/科员" value="普通员工/科员"></el-option>
                <el-option label="科室负责人或科级" value="科室负责人或科级"></el-option>
                <el-option label="部门负责人或处级" value="部门负责人或处级"></el-option>
                <el-option label="单位负责人或局级以上" value="单位负责人或局级以上"></el-option>
              </el-select>
            </el-form-item>
          </template>
          <template v-if="loanApplicationForm.proposer_job_type=='自雇'">
            <h3>经营企业</h3>
            <el-form-item label="经营主体">
              <el-input v-model="loanApplicationForm.proposer_business_license" clearable></el-input>
            </el-form-item>
            <el-form-item label="经营场所">
            <el-radio-group v-model="loanApplicationForm.proposer_business_place">
              <el-radio label="自有"></el-radio>
              <el-radio label="租赁"></el-radio>
            </el-radio-group>
            </el-form-item>
            <br>
            <el-form-item label="办公地址">
              <el-input v-model="loanApplicationForm.proposer_business_address" clearable style="width:400px;"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="营业执照注册号">
              <el-input v-model="loanApplicationForm.proposer_business" clearable></el-input>
            </el-form-item>
            <el-form-item label="贷款卡号">
              <el-input v-model="loanApplicationForm.proposer_business_card" clearable></el-input>
            </el-form-item>
          </template>
          <h3>贷款申请情况</h3>
          <el-form-item label="申请金额">
            <el-input v-model="loanApplicationForm.loan_amount" clearable placeholder="人民币"><template slot="append">元</template></el-input>
          </el-form-item>
          <el-form-item label="申请期限">
            <el-input v-model="loanApplicationForm.loan_period" clearable type="number" min="0"><template slot="append">月</template></el-input>
          </el-form-item>
          <br>
          <el-form-item label="申请授信方式">
            <el-radio-group v-model="loanApplicationForm.loan_credit_type">
              <el-radio label="抵押经营"></el-radio>
              <el-radio label="抵押消费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="借款用途">
            <el-input v-model="loanApplicationForm.loan_purpose" clearable></el-input>
          </el-form-item>
          <br>
          <el-form-item label="还款方式">
            <el-select v-model="loanApplicationForm.loan_repayment_type" placeholder="请选择还款方式">
              <el-option label="按月付息到期还本" value="按月付息到期还本"></el-option>
              <el-option label="按月等额本息" value="按月等额本息"></el-option>
              <el-option label="按月等额本金" value="按月等额本金"></el-option>
            </el-select>
          </el-form-item>
          <br>
          <el-form-item label="其他">
            <el-input type="textarea" v-model="loanApplicationForm.loan_other" style="width:400px;"></el-input>
          </el-form-item>
          <br>
          <h3>其他紧急联系人信息（不承担贷款相关责任）</h3>
          <el-form-item label="姓名">
            <el-input v-model="loanApplicationForm.loan_contact_name" clearable></el-input>
          </el-form-item>
          <el-form-item label="是您的">
            <el-select v-model="loanApplicationForm.loan_contact_rela" placeholder="请选择关系">
              <el-option label="父母" value="父母"></el-option>
              <el-option label="子女" value="子女"></el-option>
              <el-option label="其他关系" value="其他关系"></el-option>
            </el-select>
          </el-form-item>
          <br>
          <el-form-item label="住宅电话">
            <el-input v-model="loanApplicationForm.loan_contact_tele" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="loanApplicationForm.loan_contact_phone" clearable></el-input>
          </el-form-item>
          <br>
          <el-form-item label=" ">
            <el-button type="primary" @click="submitForm('contractStatusForm')">提交</el-button>
            <el-button @click="resetForm('contractStatusForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="option">
        <el-button type="primary" @click="nextStep">提交并下一步</el-button>
      </div>
    </template>
    <div class="form-wrapper" v-if="formStep=='2'">
      <h2>确定面签状态</h2>
      <el-form :model="contractStatusForm" ref="contractStatusForm" label-width="200px" inline>
        <el-form-item label="完成时间">
          <el-date-picker type="datetime" placeholder="选择日期和时间" v-model="contractStatusForm.time"></el-date-picker>
        </el-form-item>
        <br>
         <el-form-item label="约定地点" prop="place">
          <el-select v-model="contractStatusForm.address" placeholder="请选择签约地点">
            <el-option label="地点1" value="地点1"></el-option>
            <el-option label="地点2" value="地点2"></el-option>
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
      <div slot="title"><i class="el-icon-success" style="color:#67C23A;font-size:22px;vertical-align:middle;margin-right:5px;"></i>接单成功</div>
      <div>贷款编号为：<a style="color:blue">{{loanNum}}</a></div>
      <div>贷款状态为：<a style="color:blue">正在面谈（等待填写面谈相关表格）</a></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkStatus">查看贷款状态</el-button>
        <el-button type="primary" @click="nextOperation">办理下一业务</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCheckList, saveVisaInterview } from '@/api/mortgage'

export default {
  name: 'sign-contract',
  data () {
    return {
      contractTimeForm: {
        datetime: '',
        place: ''
      },
      contractStatusForm: {
        time: '',
        address: ''
      },
      dataTableForm: {
        finish_time: '',
        client_name: '',
        loan_amount: '',
        clerk_name: '',
        clerk_phone: '',
        has_client_id_card: '',
        client_id_card_des: '',
        client_id_card_page: '',
        client_id_card_remark: '',
        has_client_account: '',
        client_account_home: '',
        client_account_household: '',
        client_account_myself: '',
        client_account_des: '',
        client_account_page: '',
        client_account_remark: '',
        has_client_spouse_id_card: '',
        client_spouse_id_card_des: '',
        client_spouse_id_card_page: '',
        client_spouse_id_card_remark: '',
        has_client_spouse_account: '',
        client_spouse_account_home: '',
        client_spouse_account_household: '',
        client_spouse_account_myself: '',
        client_spouse_account_des: '',
        client_spouse_account_page: '',
        client_spouse_account_remark: '',
        has_marriage_proof: '',
        marriage_certificate: '',
        divorce_certificate: '',
        divorce_agreement: '',
        marriage_proof_des: '',
        marriage_proof_page: '',
        marriage_proof_remark: '',
        has_house_mortgage: '',
        house_mortgage: '',
        house_mortgage_des: '',
        house_mortgage_page: '',
        house_mortgage_remark: '',
        has_assets_certificate: '',
        assets_house_certificate: '',
        assets_house_number: '',
        assets_other: '',
        assets_other_remark: '',
        assets_car_certificate: '',
        assets_car_number: '',
        assets_certificate_des: '',
        assets_certificate_page: '',
        assets_certificate_remark: '',
        has_income_proof: '',
        income_proof_des: 0,
        income_proof_page: '',
        income_proof_remark: '',
        has_business_license: '',
        business_license_des: '',
        business_license_page: '',
        business_license_remark: '',
        has_legal_representative: '',
        legal_representative_des: '',
        legal_representative_page: '',
        legal_representative_remark: '',
        has_company_statute: '',
        company_statute_des: '',
        company_statute_page: '',
        company_statute_remark: '',
        has_grant_deed: '',
        grant_deed_des: '',
        grant_deed_page: '',
        grant_deed_remark: '',
        has_trading_contact: '',
        trading_contact_des: '',
        trading_contact_page: '',
        trading_contact_remark: '',
        has_purpose_contact: '',
        purpose_contact_des: '',
        purpose_contact_page: '',
        purpose_contact_remark: '',
        mortgageCatalogOthers: []
      },
      loanApplicationForm: {
        application_time: '',
        proposer_name: '',
        proposer_gender: '',
        proposer_marriage_state: '',
        proposer_family: '',
        proposer_family_num: '',
        proposer_phone: '',
        proposer_work_tele: '',
        proposer_house_tele: '',
        proposer_household_type: '',
        proposer_id_card: '',
        proposer_inhabiting_info: '',
        proposer_address: '',
        proposer_local_resident: '',
        proposer_lodging_info: '',
        proposer_loan_state: '',
        proposer_job_type: '',
        proposer_work_year: '',
        proposer_income_month: '',
        proposer_spouse_name: '',
        proposer_spouse_phone: '',
        proposer_spouse_paper_type: '',
        proposer_spouse_paper_id: '',
        has_proposer_spouse_together: '',
        proposer_company: '',
        proposer_company_address: '',
        proposer_company_type: '',
        proposer_company_duty: '',
        proposer_business_license: '',
        proposer_business_address: '',
        proposer_business: '',
        proposer_business_card: '',
        loan_amount: '',
        loan_period: '',
        loan_credit_type: '',
        loan_purpose: '',
        loan_repayment_type: '',
        loan_other: '',
        loan_contact_name: '',
        loan_contact_rela: '',
        loan_contact_tele: '',
        loan_contact_phone: ''
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      formStep: 1,
      formLoading: false,
      dialogVisible: false,
      loanType: ''
    }
  },
  computed: {
    ...mapGetters([
      'user_id'
    ])
  },
  created () {
    getCheckList(this.$route.params.checklistId).then(response => {
      // console.log(response)
      this.loanType = response.data.data.loan_type
    })
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('success')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
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
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    nextStep () {
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
      this.dialogVisible = false
    },
    checkStatus () {
      this.$msgbox.close()
    },
    returnList () {
      this.$msgbox.close()
      this.$router.push({ path: '/loan-mortgage/visa-interview' })
    },
    nextOperation () {
      this.$msgbox.close()
      this.$router.push({ path: '/loan-mortgage/evaluate-order' })
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
      table {
        border: 1px solid #ccc;
        margin-left:100px;
        width:calc(100% - 200px);
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
      h3 {
        color: #666;
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
