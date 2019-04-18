<template lang="jade">
  el-dialog(
    title="注册",
    :visible.sync="dialogVisible",
    v-loading="submitting",
    custom-class="login-dialog",
    width="350px",
    @close="onClose",
    center)
    el-form(:model="form", :rules="rules", ref="userRegisterForm", :disabled="authed")
      el-form-item(prop="name")
        el-input(v-model="form.name", placeholder="账号")
      el-form-item(prop="nick_name")
        el-input(v-model="form.nick_name", placeholder="昵称")
      el-form-item(prop="password")
        el-input(type="password" v-model="form.password", placeholder="密码")
      el-form-item(prop="password_confirmation")
        el-input(type="password" v-model="form.password_confirmation", placeholder="密码")
      geetest(ref="geetest")
    div(slot="footer" class="dialog-footer")
      el-button(type="primary", :disabled="authed", @click="onSubmit") 注册
      el-button(@click="onCancel") 取消
</template>

<script>
import geetest from '@/components/util/geetest'
import { registerPost, getGeeTestRegister } from '@/api/user/'
import store from '@/store/'
import { CHANGE_REGISTER_DIALOG_VISABLE, CLOSE_REGISTER_DIALOG } from '@/store/userRegisterDialog/types'
import { USER_LOGIN, CHECK_LOGIN } from '@/store/user/types'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'login',
  data() {
    var validateConfirmation = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      submitting: false,
      form: {
        name: '',
        nick_name: '',
        password: '',
        password_confirmation: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, message: '用户名最小5个字符', trigger: 'blur' }
        ],
        nick_name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, message: '用户名最小2个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度为6到20个字符', trigger: 'blur' }
        ],
        password_confirmation: [
          { validator: validateConfirmation, trigger: 'blur' }
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
        return store.state.userRegisterDialog.dialogVisable
      },
      set (val) {
        this.changeDialogVisable(val)
      }
    },
  },
  methods: {
    ...mapMutations({
      changeDialogVisable: CHANGE_REGISTER_DIALOG_VISABLE,
      closeDialog: CLOSE_REGISTER_DIALOG,
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
      console.log(result)
      this.$refs['userRegisterForm'].validate((valid) => {
        if (valid) {
          this.submitting = true;
          var postData = {
            name: this.form.name,
            nick_name: this.form.nick_name,
            password: this.form.password,
            password_confirmation: this.form.password_confirmation,
            geetest_challenge: result.geetest_challenge,
            geetest_seccode: result.geetest_seccode,
            geetest_validate: result.geetest_validate,
          }
          registerPost(postData).then(res => {
            this.submitting = false
            if (res.error) {
              this.$message.error(res.msg)
              this.$refs.geetest.reset()
            } else {
              this.userLogin({ id: res.id, token: res.token })
              this.loadUser()
              this.closeDialog()
            }
          }).catch(err => {
            this.submitting = false;
            this.$message.error(err.response.data)
            this.$refs.geetest.reset()
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
