<template>
  <div class="app-container">
    <h2>{{showTable ? '查看贷款表格' : '查看贷款状态'}}</h2>
    <div class="option-wrapper">
      <el-button type="primary" @click="showTable = !showTable">{{showTable ? '状态全览' : '查看表格'}}</el-button>
      <el-button type="info" @click="returnList()">返回列表</el-button>
    </div>
    <ul v-if="orderStatus" class="basic-info">
      <li>贷款编号：<span>{{$route.params.orderId}}</span></li>
      <li>贷款类型：<span>{{loanType == '1' ? '抵押贷款' : '二手房贷款' }}</span></li>
      <li>客户姓名：<span>{{orderStatus[0].clientName}}</span></li>
      <li>手机号：<span>{{orderStatus[0].clientPhone}}</span></li>
    </ul>
    <div class="step-wrapper">
        <el-steps direction="vertical" :active="activeStep" finish-status="success" :align-center="true" v-if="!showTable" class="status-step">
          <el-step :title="item.des" v-for="item in orderStatus" :key="item.id">
            <div slot="description" class="step-desc">
                <ul v-if="item.createTime">
                  <li>开始时间：{{item.createTime | timeformat }}</li>
                  <li>结束时间：{{item.state === 'open' ? '' : item.updateTime | timeformat }}</li>
                  <template v-if="item.extra">
                    <li v-if="item.extra.catalogState"><el-tag :type="item.extra.catalogState.done ? 'success' : 'primary'">{{item.extra.catalogState.message}}</el-tag></li>
                    <li v-if="item.extra.formState"><el-tag :type="item.extra.formState.done ? 'success' : 'primary'">{{item.extra.formState.message}}</el-tag></li>
                    <li v-if="item.extra.visaState"><el-tag :type="item.extra.visaState.done ? 'success' : 'primary'">{{item.extra.visaState.message}}</el-tag></li>
                    <li v-if="item.extra.orderState"><el-tag :type="item.extra.orderState.done ? 'success' : 'primary'">{{item.extra.orderState.message}}</el-tag></li>
                    <li v-if="item.extra.reportState"><el-tag :type="item.extra.reportState.done ? 'success' : 'primary'">{{item.extra.reportState.message}}</el-tag></li>
                    <li v-if="item.extra.sendState"><el-tag :type="item.extra.sendState.done ? 'success' : 'primary'">{{item.extra.sendState.message}}</el-tag></li>
                    <li v-if="item.extra.approveState"><el-tag :type="item.extra.approveState.done ? 'success' : 'primary'">{{item.extra.approveState.message}}</el-tag></li>
                    <li v-if="item.extra.approveComment"><el-tag :type="item.extra.approveComment.done ? 'success' : 'primary'">{{item.extra.approveComment.message}}</el-tag></li>
                    <li v-if="item.extra.mortgageState"><el-tag :type="item.extra.mortgageState.done ? 'success' : 'primary'">{{item.extra.mortgageState.message}}</el-tag></li>
                    <li v-if="item.extra.guaranteeApprove"><el-tag :type="item.extra.guaranteeApprove.done ? 'success' : 'primary'">{{item.extra.guaranteeApprove.message}}</el-tag></li>
                    <li v-if="item.extra.guaranteePublish"><el-tag :type="item.extra.guaranteePublish.done ? 'success' : 'primary'">{{item.extra.guaranteePublish.message}}</el-tag></li>
                  </template>
                </ul>
                <template v-else>
                  未开始
                </template>
            </div>
          </el-step>
        </el-steps>
        <el-steps :active="activeStep" finish-status="success" :align-center="true" class="table-step" v-else>
          <el-step :title="item.des" v-for="(item, index) in orderStatus" :key="item.id" @click.native="showStep(item, index)" :class="currentStep == index ? 'current' : ''">
            <div slot="description">
                <template v-if="item.createTime">
                  {{item.createTime | timeformat }}
                </template>
                <template v-else>
                  未开始
                </template>
            </div>
          </el-step>
        </el-steps>
    </div>
    <div class="table-wrapper" v-if="showTable">
      <order-taking-m v-if="loanType == '1' && currentStep == '0'" :checklistId="currentFlow.id"/>
      <interview-m v-if="loanType == '1' && currentStep == '1'" :interviewId="currentFlow.id"/>
      <visa-interview-m v-if="loanType == '1' && currentStep == '2'" :visaId="currentFlow.id"/>
      <evaluate-order-m v-if="loanType == '1' && currentStep == '3'" :orderId="currentFlow.id"/>
      <examine-approve-m v-if="loanType == '1' && currentStep == '4'" :approveId="currentFlow.id"/>
      <mortgage-m v-if="loanType == '1' && currentStep == '5'" :mortgageId="currentFlow.id" :finishFlow="!(currentFlow.state == 'open')"/>
      <charge-m v-if="loanType == '1' && currentStep == '6'" :chargeId="currentFlow.id"/>
      <make-loan-m v-if="loanType == '1' && currentStep == '7'" :makeLoanId="currentFlow.id"/>

      <order-taking-h v-if="loanType == '2' && currentStep == '0'"></order-taking-h>
      <visa-interview-h v-if="loanType == '2' && currentStep == '1'"></visa-interview-h>
      <evaluate-order-h v-if="loanType == '2' && currentStep == '2'"></evaluate-order-h>
      <integrate-input-h v-if="loanType == '2' && currentStep == '3'"></integrate-input-h>
      <examine-approve-h v-if="loanType == '2' && currentStep == '4'"></examine-approve-h>
      <transfer-h v-if="loanType == '2' && currentStep == '5'"></transfer-h>
      <mortgage-h v-if="loanType == '2' && currentStep == '6'"></mortgage-h>
      <guarantee-h v-if="loanType == '2' && currentStep == '7'"></guarantee-h>
      <charge-h v-if="loanType == '2' && currentStep == '8'"></charge-h>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { getTaskById as getTaskMById } from '@/api/mortgage'
import { getTaskById as getTaskHById } from '@/api/house'

import OrderTakingM from '@/components/mortgage/order-taking'
import InterviewM from '@/components/mortgage/interview'
import VisaInterviewM from '@/components/mortgage/visa-interview'
import EvaluateOrderM from '@/components/mortgage/evaluate-order'
import ExamineApproveM from '@/components/mortgage/examine-approve'
import MortgageM from '@/components/mortgage/mortgage'
import ChargeM from '@/components/mortgage/charge'
import MakeLoanM from '@/components/mortgage/make-loans'

import OrderTakingH from '@/views/loan-house/order-taking'
import VisaInterviewH from '@/views/loan-house/visa-interview/editInfo'
import EvaluateOrderH from '@/views/loan-house/evaluate-order/editInfo'
import IntegrateInputH from '@/views/loan-house/integrate-input/editInfo'
import ExamineApproveH from '@/views/loan-house/examine-approve/editInfo'
import TransferH from '@/views/loan-house/transfer/editInfo'
import MortgageH from '@/views/loan-house/mortgage/editInfo'
import GuaranteeH from '@/views/loan-house/guarantee/editInfo'
import ChargeH from '@/views/loan-house/charge/editInfo'

export default {
  data () {
    return {
      orderStatus: null,
      loanType: '',
      moment,
      activeStep: 0,
      showTable: false,
      currentStep: 0,
      currentFlow: '',
      stepList: [
        [
          { des: '接单', description: '未完成' },
          { des: '面谈', description: '未完成' },
          { des: '面签', description: '未完成' },
          { des: '评估下单', description: '未完成' },
          { des: '审批', description: '未完成' },
          { des: '抵押', description: '未完成' },
          { des: '收费', description: '未完成' },
          { des: '放款', description: '未完成' }
        ],
        [
          { des: '接单', description: '未完成' },
          { des: '面谈', description: '未完成' },
          { des: '评估下单', description: '未完成' },
          { des: '整件输机', description: '未完成' },
          { des: '审批', description: '未完成' },
          { des: '过户', description: '未完成' },
          { des: '抵押', description: '未完成' },
          { des: '收费', description: '未完成' },
          { des: '放款', description: '未完成' }
        ]
      ]
    }
  },
  components: {
    OrderTakingM,
    InterviewM,
    VisaInterviewM,
    EvaluateOrderM,
    ExamineApproveM,
    MortgageM,
    ChargeM,
    MakeLoanM,

    OrderTakingH,
    VisaInterviewH,
    EvaluateOrderH,
    IntegrateInputH,
    ExamineApproveH,
    TransferH,
    MortgageH,
    GuaranteeH,
    ChargeH
  },
  filters: {
    timeformat: function (value) {
      if (!value) return '未结束'
      return moment(value).format('YYYY-MM-DD')
    }
  },
  created () {
    this.loanType = parseInt(this.$route.params.orderId.substring(0, 1))
    const getOrderById = this.loanType === 1 ? getTaskMById : getTaskHById
    getOrderById(this.$route.params.orderId).then(data => {
      if (data) {
        this.orderStatus = data
        if (this.orderStatus[data.length - 1].state === 'finish') {
          this.activeStep = this.orderStatus.length
        } else {
          this.activeStep = this.orderStatus.length - 1
        }
        this.orderStatus = this.orderStatus.concat(this.stepList[this.loanType - 1].splice(this.orderStatus.length))
        this.currentFlow = this.orderStatus[0]
      } else {
        this.$message({
          type: 'error',
          message: '订单数据获取失败'
        })
      }
    })
  },
  methods: {
    returnList () {
      this.$router.push({ path: '/loan-management/order' })
    },
    showStep (item, index) {
      if (index <= this.activeStep) {
        this.currentStep = index
        this.currentFlow = item
        console.log(this.currentFlow)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    padding: 20px;
    background-color: #fff;
    .option-wrapper {
      margin: -55px 0 20px;
      text-align: right;
    }
    .basic-info {
      margin: 0;
      padding: 10px;
      border-radius: 5px;
      line-height: 40px;
      list-style: none;
      display: flex;
      justify-content: flex-start;
      background: #eee;
      li {
        line-height: 40px;
        margin-right: 20px;
        span {
          color: #409eff;
        }
      }
    }
    .step-wrapper {
      margin: 20px 0;
      .status-step {
        margin-left: 50px;
        .step-desc {
          margin-left: 50px;
          height: 50px;
          ul {
            list-style: none;
            padding: 0;
            display: flex;
            li {
              margin-right: 20px;
              line-height: 32px;
              height: 32px;
            }
          }
        }
      }
      .table-step {
        .el-step {
          border: 1px solid transparent;
          padding: 5px;
          cursor: pointer;
        }
        & .current {
          border-radius: 5px;
          border: 1px solid #409EFF;
          background-color: rgba(238, 238, 238, 0.404);
        }
      }
    }
    .table-wrapper {
      border-radius: 5px;
      border: 1px solid #eee;
    }
  }
</style>