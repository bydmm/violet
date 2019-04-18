<template lang="jade">
  div(:id="geetestID")
</template>

<script>
import gtInit from '@/assets/gt.js';
import { getGeeTestRegister } from '@/api/user/'

export default {
  name: 'login',
  data() {
    return {
      geetestID: `geetest-${parseInt(Math.random() * 10000000)}`,
      captchaObj: {}
    }
  },
  methods: {
    geeInit() {
      let self = this;
      getGeeTestRegister().then(res => {
        // 调用 initGeetest 进行初始化
        // 参数1：配置参数
        // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
        window.initGeetest({
            // 以下 4 个配置参数为必须，不能缺少
            gt: res.gt,
            challenge: res.challenge,
            offline: !res.success, // 表示用户后台检测极验服务器是否宕机
            new_captcha: res.new_captcha, // 用于宕机时表示是新验证码的宕机
            product: "float", // 产品形式，包括：float，popup
            width: "300px"
            // 更多配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
        }, captchaObj => {
            // 这里可以调用验证实例 captchaObj 的实例方法
            self.captchaObj = captchaObj;
            self.captchaObj.appendTo(`#${this.geetestID}`); // 同时插入三个input表单时，geetest_challenge, geetest_validate, geetest_seccode
            captchaObj.onSuccess( () => {
              this.$emit('success', captchaObj.getValidate());
            })
        })
      }).catch(err => {

      })
    },
    reset () {
      this.captchaObj.reset();
    },
    getValidate () {
      return this.captchaObj.getValidate();
    }
  },
  mounted () {
    this.geeInit()
  },
}
</script>
