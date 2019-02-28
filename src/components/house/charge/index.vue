<template>
  <div class="app-container">
    <div class="form-wrapper">
      <h2>确定收费状态</h2>
      <el-form
        :model="chargeForm"
        ref="chargeForm"
        label-width="200px"
        :rules="chargeFormRules"
        inline
      >
        <el-form-item label="费用 A 收费状态" prop="isA">
          <el-radio-group v-model="chargeForm.isA" :disabled="finishCharge">
            <el-radio label="1">已收</el-radio>
            <el-radio label="0">未收</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-card v-if="chargeForm.isA == '1'">
          <el-row>
            <el-col :span="12">
              <el-form-item label="回款时间" prop="timeA">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="chargeForm.timeA"
                  value-format="timestamp"
                  :disabled="finishCharge"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="回款类型">
                <el-input :disabled="finishCharge"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="回款金额">
                <el-input :disabled="finishCharge">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="转账银行">
                <el-input :disabled="finishCharge"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="转账人">
                <el-input :disabled="finishCharge"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <br>
        <el-form-item label="费用 B 收费状态" prop="isB">
          <el-radio-group v-model="chargeForm.isB" :disabled="finishCharge">
            <el-radio label="1">已收</el-radio>
            <el-radio label="0">未收</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="收费 B 收费时间" prop="timeB" v-if="chargeForm.isB == '1'">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="chargeForm.timeB"
            value-format="timestamp"
            :disabled="finishCharge"
          ></el-date-picker>
        </el-form-item>-->
        <el-card v-if="chargeForm.isB == '1'">
          <el-row>
            <el-col :span="12">
              <el-form-item label="回款时间" prop="timeB">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="chargeForm.timeB"
                  value-format="timestamp"
                  :disabled="finishCharge"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="回款类型">
                <el-input :disabled="finishCharge"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="回款金额">
                <el-input :disabled="finishCharge">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="转账银行">
                <el-input :disabled="finishCharge"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="转账人">
                <el-input :disabled="finishCharge"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <br>
        <el-form-item label="费用 C 收费状态" prop="isC">
          <el-radio-group v-model="chargeForm.isC" :disabled="finishCharge">
            <el-radio label="1">已收</el-radio>
            <el-radio label="0">未收</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="收费 C 收费时间" prop="timeC" v-if="chargeForm.isC == '1'">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="chargeForm.timeC"
            value-format="timestamp"
            :disabled="finishCharge"
          ></el-date-picker>
        </el-form-item>-->
        <el-card v-if="chargeForm.isC == '1'">
          <el-row>
            <el-col :span="12">
              <el-form-item label="回款时间" prop="timeC">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="chargeForm.timeC"
                  value-format="timestamp"
                  :disabled="finishCharge"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="回款类型">
                <el-input :disabled="finishCharge"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="回款金额">
                <el-input :disabled="finishCharge">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="转账银行">
                <el-input :disabled="finishCharge"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="转账人">
                <el-input :disabled="finishCharge"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <br>
        <el-form-item label=" ">
          <el-button type="info" disabled v-if="finishCharge">已收费</el-button>
          <el-button type="primary" :loading="formLoading" @click="confirmCharge" v-else>提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <flow-complete-dialog
      :loanId="loanId"
      :loanStatus="loanStatus"
      :loanLastStatus="loanLastStatus"
      :dialogVisible="dialogVisible"
      :showNextButton="false"
      :listPath="listPath"
      :nextPath="nextPath"
    ></flow-complete-dialog>
  </div>
</template>

<script>
import { confirmCharge, getChargeById } from '@/api/house'
export default {
  data () {
    return {
      chargeForm: {
        isA: null,
        timeA: null,
        isB: null,
        timeB: null,
        isC: null,
        timeC: null
      },
      chargeFormRules: {
        isA: [{ required: true, message: '请选择费用A收费状态' }],
        isB: [{ required: true, message: '请选择费用B收费状态' }],
        isC: [{ required: true, message: '请选择费用C收费状态' }],
        timeA: [{ required: true, message: '费用A收费时间不能为空' }],
        timeB: [{ required: true, message: '费用A收费时间不能为空' }],
        timeC: [{ required: true, message: '费用A收费时间不能为空' }]
      },
      formLoading: false,
      loanId: '',
      loanStatus: '',
      loanLastStatus: '',
      finishCharge: false,
      dialogVisible: false,
      listPath: '/house/charge',
      nextPath: ''
    }
  },
  created () {
    this.loanLastStatus = this.currentFlow
    getChargeById(this.chargeId).then(({ data }) => {
      if (data) {
        this.finishCharge = data.chargeState.done
        if (this.finishCharge) {
          this.chargeForm = JSON.parse(JSON.stringify(data.charge))
        }
      } else {
        this.$message({
          type: 'error',
          message: '获取收费信息失败'
        })
      }
    })
  },
  props: {
    chargeId: '',
    showFlowDialog: {
      default: false
    },
    currentFlow: ''
  },
  methods: {
    confirmCharge () {
      this.$refs['chargeForm'].validate((valid) => {
        if (valid) {
          this.$confirm('请确认信息填写无误，是否提交？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.formLoading = true
            // FIXME: 后台应该做类型转换处理的地方
            this.chargeForm.timeA = this.chargeForm.timeA ? this.chargeForm.timeA : 0
            this.chargeForm.timeB = this.chargeForm.timeB ? this.chargeForm.timeB : 0
            this.chargeForm.timeC = this.chargeForm.timeC ? this.chargeForm.timeC : 0
            if (this.showFlowDialog) {
              this.$message({
                type: 'info',
                message: '正在处理...'
              })
              confirmCharge(this.chargeId, this.chargeForm).then(({ data }) => {
                this.$message.closeAll()
                this.formLoading = false
                if (data) {
                  this.finishCharge = true
                  this.loanId = data.rootId
                  this.loanStatus = data.des
                  this.dialogVisible = true
                } else {
                  this.$message({
                    type: 'error',
                    message: '确定收费状态失败'
                  })
                }
              })
            } else {
              confirmCharge(this.chargeId, this.chargeForm).then(({ data }) => {
                this.formLoading = false
                if (data) {
                  this.finishCharge = true
                  this.$message({
                    type: 'success',
                    message: '确定收费状态成功'
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: '确定收费状态失败'
                  })
                }
              })
            }
          }).catch(() => { })
        } else {
          return false
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
