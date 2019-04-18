<template lang="jade">
  div.header
    el-menu(
      router
      :default-active="activeIndex"
      mode="horizontal")
      el-menu-item(index="/") 援力满满（Beta)
      el-menu-item(index="/rank") 援力排行
      el-menu-item(index="/about") 帮助与玩法
      el-menu-item(index="/notice") 运营公告
      el-submenu(index="2")
        template(slot="title") {{ nick_name || '用户中心' }}
        el-menu-item(index="", v-on:click="openLoginDialog", v-if="!authed") 登录
        el-menu-item(index="", v-on:click="openRegisterDialog", v-if="!authed") 注册
        el-menu-item(index="/profile", v-if="authed") 资产列表
        el-menu-item(index="/user/orders", v-if="authed") 挂单列表
        el-menu-item(index="/deals", v-if="authed") 交易列表
        el-menu-item(index="", v-on:click="logout", v-if="authed") 登出
    login-dialog
    register-dialog
</template>

<script>
import store from '@/store/'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import { OPEN_LOGIN_DIALOG } from '@/store/userLoginDialog/types'
import { OPEN_REGISTER_DIALOG } from '@/store/userRegisterDialog/types'
import { USER_LOGOUT } from '@/store/user/types'
import loginDialog from '@/components/user/login'
import registerDialog from '@/components/user/register'

export default {
  data() {
    return {
      activeIndex: '1',
    }
  },
  methods: {
    ...mapMutations({
      openLoginDialog: OPEN_LOGIN_DIALOG,
      openRegisterDialog: OPEN_REGISTER_DIALOG,
    }),
    ...mapActions({
      logout: USER_LOGOUT,
    }),
  },
  computed: {
    ...mapState({
      authed: state => state.user.authed,
      nick_name: state => state.user.nick_name,
    }),
  },
  components: {
    'login-dialog': loginDialog,
    'register-dialog': registerDialog,
  }
}
</script>

<style scoped>
.header {
  margin-top: 14px;
  margin-bottom: 14px;
}
</style>
