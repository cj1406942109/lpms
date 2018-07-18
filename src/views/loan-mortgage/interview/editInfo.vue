<template>
  <div class="app-container">
    <div class="form-wrapper">
      <!-- <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <h2>资料目录表</h2>
          </template>
          <div>
            <el-form :model="infoContentForm" ref="infoContentForm" label-width="200px" inline>
              <el-form-item label="完成时间" prop="finishDate">
                <el-date-picker type="date" placeholder="选择日期" v-model="infoContentForm.finishDate"></el-date-picker>
              </el-form-item>
              <br>
              <el-form-item label="贷款人姓名" prop="mortgagorName">
                <el-input v-model="infoContentForm.mortgagorName"></el-input>
              </el-form-item>
              <el-form-item label="接单人员姓名" prop="orderTakerName">
                <el-input v-model="infoContentForm.orderTakerName"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="贷款金额" prop="loanValue">
                <el-input v-model="infoContentForm.loanValue"></el-input>
              </el-form-item>
              <el-form-item label="接单人员电话" prop="orderTakerPhone">
                <el-input v-model="infoContentForm.orderTakerPhone"></el-input>
              </el-form-item>
              <br>
              <table class="mortgagor-info">
                <thead><tr><th width="50">序号</th><th>有/无</th><th>资料内容明细</th><th>说明</th><th width="80">页码</th><th>备注</th></tr></thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td><el-form-item><el-switch v-model="infoContentForm.mortgagorIDCard.have"></el-switch></el-form-item></td>
                    <td>借款人身份证</td>
                    <td><el-form-item><el-radio-group v-model="infoContentForm.mortgagorIDCard.illustration"><el-radio label="原件"></el-radio><el-radio label="复印件"></el-radio></el-radio-group></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.pageNo"></el-input></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.remark"></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td><el-form-item><el-switch v-model="infoContentForm.mortgagorIDCard.have"></el-switch></el-form-item></td>
                    <td>借款人户口：&nbsp;&nbsp;
                      <el-checkbox-group>
                        <el-checkbox label="首页"></el-checkbox>
                        <el-checkbox label="户主页"></el-checkbox>
                        <el-checkbox label="本人页"></el-checkbox>
                      </el-checkbox-group>
                    </td>
                    <td><el-form-item><el-radio-group v-model="infoContentForm.mortgagorIDCard.illustration"><el-radio label="原件"></el-radio><el-radio label="复印件"></el-radio></el-radio-group></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.pageNo"></el-input></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.remark"></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td><el-form-item><el-switch v-model="infoContentForm.mortgagorIDCard.have"></el-switch></el-form-item></td>
                    <td>借款人配偶身份证</td>
                    <td><el-form-item><el-radio-group v-model="infoContentForm.mortgagorIDCard.illustration"><el-radio label="原件"></el-radio><el-radio label="复印件"></el-radio></el-radio-group></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.pageNo"></el-input></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.remark"></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td><el-form-item><el-switch v-model="infoContentForm.mortgagorIDCard.have"></el-switch></el-form-item></td>
                    <td>借款人配偶户口：&nbsp;&nbsp;
                      <el-checkbox-group>
                        <el-checkbox label="首页"></el-checkbox>
                        <el-checkbox label="户主页"></el-checkbox>
                        <el-checkbox label="本人页"></el-checkbox>
                      </el-checkbox-group>
                    </td>
                    <td><el-form-item><el-radio-group v-model="infoContentForm.mortgagorIDCard.illustration"><el-radio label="原件"></el-radio><el-radio label="复印件"></el-radio></el-radio-group></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.pageNo"></el-input></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.remark"></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td><el-form-item><el-switch v-model="infoContentForm.mortgagorIDCard.have"></el-switch></el-form-item></td>
                    <td>婚姻证明：&nbsp;&nbsp;
                      <el-checkbox-group>
                        <el-checkbox label="结婚证"></el-checkbox>
                        <el-checkbox label="离婚证"></el-checkbox>
                        <el-checkbox label="离婚协议"></el-checkbox>
                      </el-checkbox-group>
                    </td>
                    <td><el-form-item><el-radio-group v-model="infoContentForm.mortgagorIDCard.illustration"><el-radio label="原件"></el-radio><el-radio label="复印件"></el-radio></el-radio-group></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.pageNo"></el-input></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.remark"></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td><el-form-item><el-switch v-model="infoContentForm.mortgagorIDCard.have"></el-switch></el-form-item></td>
                    <td>抵押物房产两证：&nbsp;&nbsp;
                      <el-input v-model="infoContentForm.mortgagorIDCard.pageNo" placeholder="套" style="inline-block;width:50px"></el-input>
                    </td>
                    <td><el-form-item><el-radio-group v-model="infoContentForm.mortgagorIDCard.illustration"><el-radio label="原件"></el-radio><el-radio label="复印件"></el-radio></el-radio-group></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.pageNo"></el-input></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.remark"></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td><el-form-item><el-switch v-model="infoContentForm.mortgagorIDCard.have"></el-switch></el-form-item></td>
                    <td>资产证明复印件：&nbsp;&nbsp;
                      <el-checkbox-group>
                        <el-checkbox label="房产证"></el-checkbox><el-input v-model="infoContentForm.mortgagorIDCard.pageNo" placeholder="套" style="inline-block;width:50px;margin:0 15px 0 5px;"></el-input>
                        <el-checkbox label="其他资产"></el-checkbox><el-input v-model="infoContentForm.mortgagorIDCard.pageNo" placeholder="套" style="inline-block;width:50px;margin:0 15px 0 5px;"></el-input>
                        <el-checkbox label="车产证"></el-checkbox><el-input v-model="infoContentForm.mortgagorIDCard.pageNo" placeholder="套" style="inline-block;width:50px;margin:0 15px 0 5px;"></el-input>
                      </el-checkbox-group>
                    </td>
                    <td><el-form-item><el-radio-group v-model="infoContentForm.mortgagorIDCard.illustration"><el-radio label="原件"></el-radio><el-radio label="复印件"></el-radio></el-radio-group></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.pageNo"></el-input></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.remark"></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td><el-form-item><el-switch v-model="infoContentForm.mortgagorIDCard.have"></el-switch></el-form-item></td>
                    <td>收入证明</td>
                    <td><el-form-item><el-radio-group v-model="infoContentForm.mortgagorIDCard.illustration"><el-radio label="原件"></el-radio><el-radio label="复印件"></el-radio></el-radio-group></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.pageNo"></el-input></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.remark"></el-input></el-form-item></td>
                  </tr>

                  <tr>
                    <td>9</td>
                    <td><el-form-item><el-switch v-model="infoContentForm.mortgagorIDCard.have"></el-switch></el-form-item></td>
                    <td>营业执照（三证合一）</td>
                    <td><el-form-item><el-radio-group v-model="infoContentForm.mortgagorIDCard.illustration"><el-radio label="原件"></el-radio><el-radio label="复印件"></el-radio></el-radio-group></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.pageNo"></el-input></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.remark"></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td><el-form-item><el-switch v-model="infoContentForm.mortgagorIDCard.have"></el-switch></el-form-item></td>
                    <td>企业法定代表人身份证</td>
                    <td><el-form-item><el-radio-group v-model="infoContentForm.mortgagorIDCard.illustration"><el-radio label="原件"></el-radio><el-radio label="复印件"></el-radio></el-radio-group></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.pageNo"></el-input></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.remark"></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td>11</td>
                    <td><el-form-item><el-switch v-model="infoContentForm.mortgagorIDCard.have"></el-switch></el-form-item></td>
                    <td>公司章程</td>
                    <td><el-form-item><el-radio-group v-model="infoContentForm.mortgagorIDCard.illustration"><el-radio label="原件"></el-radio><el-radio label="复印件"></el-radio></el-radio-group></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.pageNo"></el-input></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.remark"></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td>12</td>
                    <td><el-form-item><el-switch v-model="infoContentForm.mortgagorIDCard.have"></el-switch></el-form-item></td>
                    <td>经营地租赁合同或产权证明</td>
                    <td><el-form-item><el-radio-group v-model="infoContentForm.mortgagorIDCard.illustration"><el-radio label="原件"></el-radio><el-radio label="复印件"></el-radio></el-radio-group></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.pageNo"></el-input></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.remark"></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td>13</td>
                    <td><el-form-item><el-switch v-model="infoContentForm.mortgagorIDCard.have"></el-switch></el-form-item></td>
                    <td>贸易合同</td>
                    <td><el-form-item><el-radio-group v-model="infoContentForm.mortgagorIDCard.illustration"><el-radio label="原件"></el-radio><el-radio label="复印件"></el-radio></el-radio-group></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.pageNo"></el-input></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.remark"></el-input></el-form-item></td>
                  </tr>

                  <tr>
                    <td>14</td>
                    <td><el-form-item><el-switch v-model="infoContentForm.mortgagorIDCard.have"></el-switch></el-form-item></td>
                    <td>用途合同</td>
                    <td><el-form-item><el-radio-group v-model="infoContentForm.mortgagorIDCard.illustration"><el-radio label="原件"></el-radio><el-radio label="复印件"></el-radio></el-radio-group></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.pageNo"></el-input></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.remark"></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td>15</td>
                    <td><el-form-item><el-switch v-model="infoContentForm.mortgagorIDCard.have"></el-switch></el-form-item></td>
                    <td>其他：<el-input v-model="infoContentForm.mortgagorIDCard.pageNo" style="inline-block;width:auto;margin:0 15px 0 5px;"></el-input></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.pageNo"></el-input></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.pageNo"></el-input></el-form-item></td>
                    <td><el-form-item><el-input v-model="infoContentForm.mortgagorIDCard.remark"></el-input></el-form-item></td>
                  </tr>
                </tbody>
              </table>
              <br>
              <el-form-item label=" ">
                <el-button type="primary" @click="submitForm('infoContentForm')">提交</el-button>
                <el-button @click="resetForm('infoContentForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <h2>个人贷款申请表</h2>
          </template>
          <div>
            <el-form :model="loanApplyForm" ref="loanApplyForm" label-width="200px" inline>
              <el-form-item label="申请时间" prop="applyDate">
                <el-date-picker type="date" placeholder="选择日期" v-model="loanApplyForm.applyDate"></el-date-picker>
              </el-form-item>
              <h3>申请人信息</h3>
              <el-form-item label="姓名" prop="applicant.name">
                <el-input v-model="loanApplyForm.applicant.name"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="applicant.gender">
                <el-radio-group v-model="loanApplyForm.applicant.gender"><el-radio :label="0">男</el-radio><el-radio :label="1">女</el-radio></el-radio-group>
              </el-form-item>
              <br>
              <el-form-item label="婚姻状况" prop="applicant.maritalStatus">
                <el-select v-model="loanApplyForm.applicant.maritalStatus" placeholder="请选择婚姻状况">
                  <el-option label="未婚" value="1"></el-option>
                  <el-option label="已婚" value="2"></el-option>
                  <el-option label="离异" value="3"></el-option>
                  <el-option label="丧偶" value="4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="家庭结构" prop="applicant.familyStructure">
                <el-select v-model="loanApplyForm.applicant.familyStructure" placeholder="请选择家庭结构">
                  <el-option label="有未成年子女" value="1"></el-option>
                  <el-option label="有子女都成年" value="2"></el-option>
                  <el-option label="无子女" value="3"></el-option>
                </el-select>
                <el-input v-model="loanApplyForm.applicant.childrenNo" placeholder="人" style="width:50px"></el-input>
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input style="width:auto" placeholder="手机号码" v-model="loanApplyForm.applicant.cellphone"></el-input>
                <el-input style="width:auto" placeholder="单位固定电话" v-model="loanApplyForm.applicant.companyTel"></el-input>
                <el-input style="width:auto" placeholder="家庭固定电话" v-model="loanApplyForm.applicant.familyTel"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="户籍类型" prop="applicant.householdRegisterType">
                <el-radio-group v-model="loanApplyForm.applicant.householdRegisterType"><el-radio :label="1">本地</el-radio><el-radio :label="2">非本地</el-radio></el-radio-group>
              </el-form-item>
              <el-form-item label="身份证号" prop="applicant.IDCard">
                <el-input v-model="loanApplyForm.applicant.IDCard"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="居住情况" prop="applicant.livingCondition">
                <el-input v-model="loanApplyForm.applicant.livingCondition"></el-input>
              </el-form-item>
              <el-form-item label="居住地址" prop="applicant.livingAddress">
                <el-input v-model="loanApplyForm.applicant.livingAddress"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="本地居住" prop="applicant.localLiveing.period">
                <el-input v-model="loanApplyForm.applicant.localLiveing.period" placeholder="年" style="width:auto"></el-input>
                <el-select v-model="loanApplyForm.applicant.localLiveing.house" placeholder="请选择住房情况">
                  <el-option label="本地有住房" value="1"></el-option>
                  <el-option label="异地自有住房" value="2"></el-option>
                  <el-option label="无自有住房" value="3"></el-option>
                </el-select>
                <el-select v-model="loanApplyForm.applicant.localLiveing.loan" placeholder="请选择贷款情况">
                  <el-option label="有贷款" value="1"></el-option>
                  <el-option label="无贷款" value="2"></el-option>
                </el-select>
              </el-form-item>
              <br>
              <el-form-item label="就业性质" prop="applicant.employment.type">
                <el-select v-model="loanApplyForm.applicant.employment.type" placeholder="请选择就业性质">
                  <el-option label="授薪" value="1"></el-option>
                  <el-option label="自雇" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="就业年限" prop="applicant.employment.period">
                <el-input v-model="loanApplyForm.applicant.employment.period" placeholder="年"></el-input>
                <span>现单位工作/企业成立</span>
              </el-form-item>
              <br>
              <el-form-item label="月收入" prop="applicant.monthlyIncome">
                <el-input v-model="loanApplyForm.applicant.monthlyIncome" placeholder="元"></el-input>
                <span>个人收入/企业销售收入</span>
              </el-form-item>
              <h3>配偶信息</h3>
              <el-form-item label="姓名" prop="applicantSpouse.name">
                <el-input v-model="loanApplyForm.applicantSpouse.name"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="applicantSpouse.cellphone">
                <el-input v-model="loanApplyForm.applicantSpouse.cellphone"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="证件种类" prop="applicantSpouse.credentialType">
                <el-select v-model="loanApplyForm.applicantSpouse.credentialType" placeholder="请选择证件种类">
                  <el-option label="身份证" value="1"></el-option>
                  <el-option label="临时身份证" value="2"></el-option>
                  <el-option label="户口簿" value="3"></el-option>
                  <el-option label="其他" value="4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="证件号码" prop="applicantSpouse.identificationNo">
                <el-input v-model="loanApplyForm.applicantSpouse.identificationNo"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="是否作为共同申请人" prop="applicantSpouse.isJointApplicant">
                <el-radio-group v-model="loanApplyForm.applicantSpouse.isJointApplicant"><el-radio :label="1">是</el-radio><el-radio :label="2">否</el-radio></el-radio-group>
              </el-form-item>
              <h3>工作单位（授薪）</h3>
              <el-form-item label="工作单位" prop="company.name">
                <el-input v-model="loanApplyForm.company.name"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="单位地址" prop="company.address">
                <el-input v-model="loanApplyForm.company.address"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="单位性质" prop="company.type">
                <el-select v-model="loanApplyForm.company.type" placeholder="请选择单位性质">
                  <el-option label="事业/机关" value="1"></el-option>
                  <el-option label="国有" value="2"></el-option>
                  <el-option label="股份" value="3"></el-option>
                  <el-option label="私营" value="4"></el-option>
                  <el-option label="个体" value="5"></el-option>
                  <el-option label="军/警" value="6"></el-option>
                  <el-option label="其他" value="7"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职务名称" prop="company.jobTitle">
                <el-select v-model="loanApplyForm.company.jobTitle" placeholder="请选择职务名称">
                  <el-option label="普通员工/科员" value="1"></el-option>
                  <el-option label="科室负责人或科级" value="2"></el-option>
                  <el-option label="部门负责人或处级" value="3"></el-option>
                  <el-option label="单位负责人或局级以上" value="4"></el-option>
                </el-select>
              </el-form-item>
              <h3>经营企业（自雇）</h3>
              <el-form-item label="经营主体" prop="enterprise.subject">
                <el-input v-model="loanApplyForm.enterprise.subject"></el-input>
              </el-form-item>
              <el-form-item label="经营场所" prop="enterprise.place">
                <el-radio-group v-model="loanApplyForm.enterprise.place"><el-radio :label="1">自有</el-radio><el-radio :label="2">租赁</el-radio></el-radio-group>
              </el-form-item>
              <br>
              <el-form-item label="办公地址" prop="enterprise.address">
                <el-input v-model="loanApplyForm.enterprise.address"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="营业执照注册号" prop="enterprise.businessLicenseRegistrationNo">
                <el-input v-model="loanApplyForm.enterprise.businessLicenseRegistrationNo"></el-input>
              </el-form-item>
              <el-form-item label="贷款卡号" prop="enterprise.loadCardNo">
                <el-input v-model="loanApplyForm.enterprise.loadCardNo"></el-input>
              </el-form-item>
              <h3>借款申请情况</h3>
              <el-form-item label="申请金额" prop="loadApplyInfo.amount">
                <el-input v-model="loanApplyForm.loadApplyInfo.amount" placeholder="元"></el-input>
                <span>人民币</span>
              </el-form-item>
              <el-form-item label="申请期限" prop="loadApplyInfo.deadline">
                <el-input v-model="loanApplyForm.loadApplyInfo.deadline" placeholder="月"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="申请授信方式" prop="loadApplyInfo.creditWay">
                <el-radio-group v-model="loanApplyForm.loadApplyInfo.creditWay"><el-radio :label="1">抵押经营</el-radio><el-radio :label="2">抵押消费</el-radio></el-radio-group>
              </el-form-item>
              <el-form-item label="借款用途" prop="loadApplyInfo.loanUsage">
                <el-input v-model="loanApplyForm.loadApplyInfo.loanUsage"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="还款方式" prop="loadApplyInfo.repaymentMethod">
                <el-select v-model="loanApplyForm.loadApplyInfo.repaymentMethod" placeholder="请选择还款方式">
                  <el-option label="按月付息到期还本" value="1"></el-option>
                  <el-option label="按月等额本息" value="2"></el-option>
                  <el-option label="按月等额本金" value="3"></el-option>
                </el-select>
              </el-form-item>
              <br>
              <el-form-item label="其他备注事项" prop="loadApplyInfo.others">
                <el-input type="textarea" v-model="loanApplyForm.loadApplyInfo.others" :autosize="{ minRows: 2, maxRows: 4}" style="width: 500px"></el-input>
              </el-form-item>
              <h3>其他紧急联系人信息<span style="font-weight:normal">（不承担贷款相关责任）</span></h3>
              <el-form-item label="联系人姓名" prop="emergencyContact.name">
                <el-input v-model="loanApplyForm.emergencyContact.name"></el-input>
              </el-form-item>
              <el-form-item label="是您的" prop="emergencyContact.relation">
                <el-select v-model="loanApplyForm.emergencyContact.relation" placeholder="请选择关系">
                  <el-option label="父母" value="1"></el-option>
                  <el-option label="子女" value="2"></el-option>
                  <el-option label="其他关系" value="3"></el-option>
                </el-select>
              </el-form-item>
              <br>
              <el-form-item label="住宅电话">
                <el-input v-model="loanApplyForm.emergencyContact.familyTel.areaCode" style="width:100px" placeholder="区号"></el-input> ---
                <el-input v-model="loanApplyForm.emergencyContact.familyTel.number" style="width:auto" placeholder="号码"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="emergencyContact.cellphone">
                <el-input v-model="loanApplyForm.emergencyContact.cellphone"></el-input>
              </el-form-item>
              <br>
              <el-form-item label=" ">
                <el-button type="primary" @click="submitForm('loanApplyForm')">提交</el-button>
                <el-button @click="resetForm('loanApplyForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <h2>面谈建议</h2>
          </template>
          <div>
            <el-form :model="interviewSuggestionForm" ref="interviewSuggestionForm" label-width="200px" inline>
              <el-form-item label="申请时间" prop="finishDate">
                <el-date-picker type="date" placeholder="选择日期" v-model="interviewSuggestionForm.finishDate"></el-date-picker>
              </el-form-item>
              <br>
              <el-form-item label="拟申请机构" prop="nishenqingjigou">
                <el-input v-model="interviewSuggestionForm.nishenqingjigou"></el-input>
              </el-form-item>
              <el-form-item label="拟对接人" prop="nidujieren">
                <el-input v-model="interviewSuggestionForm.nidujieren"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="拟上报金额" prop="nishangbaojine">
                <el-input v-model="interviewSuggestionForm.nishangbaojine"></el-input>
              </el-form-item>
              <el-form-item label="拟上报期限" prop="nishangbaoqixian">
                <el-input v-model="interviewSuggestionForm.nishangbaoqixian"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="费率" prop="rate">
                <el-input v-model="interviewSuggestionForm.rate"></el-input>
              </el-form-item>
              <el-form-item label="客户还款方式" prop="clientRepaymentMethod">
                <el-select v-model="interviewSuggestionForm.clientRepaymentMethod" placeholder="请选择还款方式">
                  <el-option label="按月等额本息" value="1"></el-option>
                  <el-option label="按月等额本金" value="2"></el-option>
                  <el-option label="按月付息" value="3"></el-option>
                </el-select>
              </el-form-item>
              <br>
              <el-form-item label="客户用途">
                <el-select v-model="interviewSuggestionForm.clientUsage.way" placeholder="请选择方式">
                  <el-option label="客户自己提供" value="1"></el-option>
                  <el-option label="我公司提供" value="2"></el-option>
                </el-select>
                <el-input v-model="interviewSuggestionForm.clientUsage.detail" style="width:400px;"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="调查意见" prop="surveyOpinion">
                <el-input type="textarea" v-model="interviewSuggestionForm.surveyOpinion" :autosize="{ minRows: 2, maxRows: 4}" style="width: 500px;"></el-input>
              </el-form-item>
              <br>
              <el-form-item label=" ">
                <el-button type="primary" @click="submitForm('interviewSuggestionForm')">提交</el-button>
                <el-button @click="resetForm('interviewSuggestionForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse> -->
      <h2>面谈建议</h2>
      <div>
        <el-form :model="interviewSuggestionForm" ref="interviewSuggestionForm" label-width="200px" inline>
          <el-form-item label="完成时间" prop="finish_time">
            <el-date-picker type="date" placeholder="选择日期" v-model="interviewSuggestionForm.finish_time"></el-date-picker>
          </el-form-item>
          <br>
          <el-form-item label="拟申请机构" prop="proposed_institution">
            <el-input v-model="interviewSuggestionForm.proposed_institution"></el-input>
          </el-form-item>
          <el-form-item label="拟对接人" prop="proposed_clerk">
            <el-input v-model="interviewSuggestionForm.proposed_clerk"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="拟上报金额" prop="proposed_amount">
            <el-input v-model="interviewSuggestionForm.proposed_amount"></el-input>
          </el-form-item>
          <el-form-item label="拟签约时间" prop="proposed_time">
            <el-input v-model="interviewSuggestionForm.proposed_time"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="费率" prop="rate">
            <el-input v-model="interviewSuggestionForm.rate"></el-input>
          </el-form-item>
          <el-form-item label="客户还款方式" prop="repayment_type">
            <el-select v-model="interviewSuggestionForm.repayment_type" placeholder="请选择还款方式">
              <el-option label="按月等额本息" value="1"></el-option>
              <el-option label="按月等额本金" value="2"></el-option>
              <el-option label="按月付息" value="3"></el-option>
            </el-select>
          </el-form-item>
          <br>
          <el-form-item label="客户用途">
            <el-select v-model="interviewSuggestionForm.client_purpose_type" placeholder="请选择方式">
              <el-option label="客户自己提供" value="1"></el-option>
              <el-option label="我公司提供" value="2"></el-option>
            </el-select>
            <el-input v-model="interviewSuggestionForm.client_purpose" style="width:400px;"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="调查意见" prop="survey_opinion">
            <el-input type="textarea" v-model="interviewSuggestionForm.survey_opinion" :autosize="{ minRows: 2, maxRows: 4}" style="width: 500px;"></el-input>
          </el-form-item>
          <br>
          <el-form-item label=" ">
            <el-button type="danger" @click="wasteSheetOperation" :loading="formLoading">废单</el-button>
            <el-button type="primary" @click="submitForm('interviewSuggestionForm')" :loading="formLoading">提交</el-button>
            <el-button @click="resetForm('interviewSuggestionForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- <div class="option">
      <el-button type="primary" @click="finishInterview">完成面谈</el-button>
    </div> -->
    <el-dialog :visible.sync="dialogVisible" width="30%" center>
      <div slot="title"><i class="el-icon-success" style="color:#67C23A;font-size:22px;vertical-align:middle;margin-right:5px;"></i>接单成功</div>
      <div>贷款编号为：<a style="color:blue">{{loanNum}}</a></div>
      <div>贷款状态为：<a style="color:blue">正在面签（等待填写面签相关信息）</a></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkStatus">查看贷款状态</el-button>
        <el-button @click="returnList">返回面谈列表</el-button>
        <el-button type="primary" @click="nextOperation">办理下一业务</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { saveInterviewSuggestion, wasteSheet } from '@/api/mortgage'
export default {
  data () {
    return {
      activeNames: ['1'],
      // 资料目录表
      infoContentForm: {
        finishDate: '',
        mortgagorName: '',
        orderTakerName: '',
        loanValue: '',
        orderTakerPhone: '',
        mortgagorIDCard: {
          have: '',
          illustration: '',
          pageNo: '',
          ramark: ''
        }
      },
      // 贷款申请表
      loanApplyForm: {
        applyDate: '',
        applicant: {
          name: '',
          gender: '',
          maritalStatus: '',
          familyStructure: '',
          childrenNo: '',
          cellphone: '',
          companyTel: '',
          familyTel: '',
          householdRegisterType: '',
          IDCard: '',
          livingCondition: '',
          livingAddress: '',
          localLiveing: {
            period: '',
            houseStatus: '',
            loanStatus: ''
          },
          employment: {
            type: '',
            period: ''
          },
          monthlyIncome: ''
        },
        applicantSpouse: {
          name: '',
          cellphone: '',
          credentialType: '',
          identificationNo: '',
          isJointApplicant: ''
        },
        // 工作单位（授薪）
        company: {
          name: '',
          address: '',
          type: '',
          jobTitle: ''
        },
        // 经营企业（自雇）
        enterprise: {
          subject: '',
          place: '',
          address: '',
          businessLicenseRegistrationNo: '',
          loadCardNo: ''
        },
        loadApplyInfo: {
          amount: '',
          deadline: '',
          creditWay: '',
          loanUsage: '',
          repaymentMethod: '',
          others: ''
        },
        emergencyContact: {
          name: '',
          relation: '',
          familyTel: {
            areaCode: '',
            number: ''
          },
          cellphone: ''
        }
      },
      // 面谈建议表
      interviewSuggestionForm: {
        finish_time: '',
        proposed_institution: '',
        proposed_clerk: '',
        proposed_amount: '',
        proposed_time: '',
        rate: '',
        repayment_type: '',
        client_purpose_type: '',
        client_purpose: '',
        survey_opinion: ''
      },
      loanNum: '',
      dialogVisible: false,
      formLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'account'
    ])
  },
  methods: {
    finishInterview () {
      const h = this.$createElement
      // h(param1, param2, param3)
      // @param1: 一个 HTML 标签，组件设置，或一个函数 {String | Object | Function}
      //    必须 Return 上述其中一个, 如'div'
      // @param2: {Object}, 一个对应属性的数据对象
      // @param3: 内部节点
      this.$msgbox({
        type: 'success',
        center: true,
        title: '面谈完成',
        message: h('p', null, [
          '贷款编号为：',
          h('span', { style: 'color: blue' }, ['145245415']),
          h('br', null, []),
          '目前贷款状态为：',
          h('span', { style: 'color: blue' }, ['正在面签（等待填写面签相关信息）']),
          h('br', null, []),
          h('el-button', { style: 'margin-top: 20px', on: { click: this.checkStatus }}, '查看贷款状态'),
          h('el-button', { style: 'margin-top: 20px', on: { click: this.returnList }}, '返回面谈列表'),
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
      this.$router.push({ path: '/loan-mortgage/interview' })
    },
    nextOperation () {
      this.$msgbox.close()
      this.$router.push({ path: '/loan-mortgage/visa-interview' })
    },
    wasteSheetOperation () {
      this.$confirm('是否进行废单操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.formLoading = true
        this.$message({
          type: 'info',
          message: '正在处理...'
        })
        wasteSheet(JSON.stringify(Date()), this.$route.params.taskId, this.account.id).then(response => {
          this.formLoading = false
          if (response.data.status === 1) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
          } else {
            this.$message({
              showClose: true,
              message: '操作失败，请稍候重试！',
              type: 'error'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否提交面谈建议?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.formLoading = true
            this.$message({
              type: 'info',
              message: '正在处理...'
            })
            saveInterviewSuggestion(JSON.stringify(this.interviewSuggestionForm), this.$route.params.taskId, this.account.id).then(response => {
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
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
      padding: 20px;
      background-color: #fff;
      margin-bottom: 20px;
    // .el-collapse {
    //   .el-collapse-item {
    //     padding: 20px;
    //     background-color: #fff;
    //     margin-bottom: 20px;
    //     .el-collapse-item__header h2 {
    //       margin: 0;
    //     }
    //     .el-table {
    //       margin: 20px;
    //     }
    //     h3 {
    //       padding-left: 50px;
    //     }
    //     .el-form-item span {
    //       color: #aaa;
    //     }
    //     .mortgagor-info {
    //       // width: 100%;
    //       margin-left: 200px;
    //       text-align:center;
    //       border: 1px solid #ebeef5;
    //       .el-form-item {
    //         margin: 0;
    //       }
    //       .el-checkbox-group {
    //         display: inline-block;
    //       }
    //       tbody {
    //         tr {
    //           td {
    //             vertical-align: middle;
    //             border-top: 1px solid #ebeef5;
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
  }
  .option {
    text-align: center;
    margin: 50px;
    button {
      width: 200px;
    }
  }
</style>

