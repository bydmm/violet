<template lang="jade">
  el-dialog(title="挂单交易", :visible.sync="dialogVisible", v-loading="submitting", width="90%", custom-class="order-dialog" center)
    el-form(:model="form", :rules="rules", ref="orderForm", label-width="80px", :disabled="!authed")
      el-form-item(label="方向")
        el-radio-group(v-model="form.action")
          el-radio-button(label="买入")
          el-radio-button(label="卖出")
      el-form-item(prop="amount" label="数量")
        el-input(v-model.number="form.amount", placeholder="100", type="number")
      el-form-item(prop="price" label="价格")
        el-input(v-model.number="form.price", placeholder="5", type="number")
      el-form-item(label="原因")
        el-input(v-model="form.reason", :placeholder="reasonSample")
    div(slot="footer" class="dialog-footer")
      el-button(type="primary", :disabled="!authed", @click="onSubmit") 提交
      el-button(@click="onCancel") 取消
</template>

<script>
import { postOrder } from '@/api/stock/'
import { CHANGE_ORDER_DIALOG_VISABLE, CLOSE_ORDER_DIALOG, RELOAD_ORDER_ACTIVITY, RELOAD_MY } from '@/store/stock/types'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'order-dialog',
  data() {
    var validatePrice = (rule, value, callback) => {
      let val = parseFloat(value).toFixed(2);
      if (val < 1) {
        callback(new Error('最低价格为1援力'));
      } else {
        callback();
      }
    };
    return {
      submitting: false,
      form: {
        action: '买入',
        price: 0,
        amount: 0,
        reason: '',
      },
      rules: {
        amount: [
          { type: "integer", required: true, message: '请输入整数', trigger: 'blur' },
          { type: "integer", min: 100, message: '最少交易100股', trigger: 'blur' }
        ],
        price: [
          { validator: validatePrice, trigger: 'blur' }
        ],
      }
    }
  },
  computed: {
    ...mapState({
      authed: state => state.user.authed,
      stock: state => state.stock,
    }),
    reasonSample () {
      if (this.form.action == '买入') {
        return `我永远喜欢${this.stock.name}`
      } else {
        return '抱歉，我有了新老婆'
      }
    },
    dialogVisible: {
      get () {
        return this.stock.orderDialog.dialogVisable
      },
      set (val) {
        this.changeDialogVisable(val)
      }
    },
  },
  methods: {
    ...mapMutations({
      changeDialogVisable: CHANGE_ORDER_DIALOG_VISABLE,
      closeDialog: CLOSE_ORDER_DIALOG,
    }),
    ...mapActions({
      reloadOrder: RELOAD_ORDER_ACTIVITY,
      reloadMyOrder: RELOAD_MY,
    }),
    onSubmit () {
      console.log(this.form);
      this.$refs['orderForm'].validate((valid) => {
        if (valid) {
          var amount = this.form.amount;
          if (this.form.action == '卖出') {
            amount = -amount;
          }
          this.submitting = true;
          let price = parseInt(this.form.price * 100);
          postOrder(this.stock.code, price, amount, { reason: this.form.reason })
            .then(res => {
              this.submitting = false
              if (res.error) {
                this.$message.error(res.msg)
              } else {
                this.reload()
                this.closeDialog()
              }
          }).catch(err => {
            this.submitting = true;
            this.$message.error(err.response.data)
          })
        }
      })
    },
    reload () {
      this.reloadOrder();
      this.reloadMyOrder();
    },
    onCancel () {
      this.closeDialog()
    },
  },
}
</script>

<style>
</style>
