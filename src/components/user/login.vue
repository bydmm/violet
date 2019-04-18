<template lang="jade">
  el-dialog(
    title="登录",
    :visible.sync="dialogVisible",
    v-loading="submitting",
    custom-class="login-dialog",
    width="350px" ,
    @close="onClose",
    center)
    el-form(:model="form", :rules="rules", ref="userLoginForm", :disabled="authed")
      el-form-item(prop="name")
        el-input(v-model="form.name", placeholder="账号")
      el-form-item(prop="password")
        el-input(type="password" v-model="form.password", placeholder="密码")
      geetest(ref="geetest")
    div(slot="footer" class="dialog-footer")
      el-button(type="primary", :disabled="authed", @click="onSubmit") 登录
      el-button(@click="onCancel") 取消
</template>

<script>
import geetest from '@/components/util/geetest'
import { loginPost } from '@/api/user/'
import store from '@/store/'
import { CHANGE_LOGIN_DIALOG_VISABLE, CLOSE_LOGIN_DIALOG } from '@/store/userLoginDialog/types'
import { USER_LOGIN, CHECK_LOGIN } from '@/store/user/types'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'login',
  data() {
    return {
      submitting: false,
      form: {
        name: '',
        password: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, message: '用户名最小5个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度为6到20个字符', trigger: 'blur' }
        ],
      }
    }
  },
  computed: {
    ...mapState({
      authed: state => state.user.authed,
    }),
    dialogVisible: {
      get () {
        return store.state.userLoginDialog.dialogVisable
      },
      set (val) {
        this.changeDialogVisable(val)
      }
    },
  },
  methods: {
    ...mapMutations({
      changeDialogVisable: CHANGE_LOGIN_DIALOG_VISABLE,
      closeDialog: CLOSE_LOGIN_DIALOG,
      userLogin: USER_LOGIN,
    }),
    ...mapActions({
      loadUser: CHECK_LOGIN,
    }),
    onSubmit () {
      var result = this.$refs.geetest.getValidate();
      if (typeof(result) != 'object' || result == null || result.geetest_challenge == '') {
        this.$refs.geetest.reset()
        this.$message.error('请完成验证');
        return
      }
      this.$refs['userLoginForm'].validate((valid) => {
        if (valid) {
          this.submitting = true;
          var postData = {
            name: this.form.name,
            password: this.form.password,
            geetest_challenge: result.geetest_challenge,
            geetest_seccode: result.geetest_seccode,
            geetest_validate: result.geetest_validate,
          }
          loginPost(postData).then(res => {
            this.submitting = false
            if (res.error) {
              this.$message.error(res.msg)
            } else {
              this.userLogin({ id: res.id, token: res.token })
              this.loadUser()
              this.closeDialog()
            }
          }).catch(err => {
            console.log(err)
            this.submitting = true;
            this.$message.error(err.response.data)
          })
        }
      })
    },
    onCancel () {
      this.closeDialog()
    },
    onClose () {
      this.$refs.geetest.reset()
    },
  },
  components: {
    'geetest': geetest,
  },

}
</script>

<style>
.login-dialog .el-dialog__body {
  padding-bottom: 0;
}
</style>
