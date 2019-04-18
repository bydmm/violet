<template lang="jade">
  el-dialog(:title="title", :visible.sync="dialogVisible", class="love-dialog", width="350px", center)
    el-tooltip(
      class="item"
      effect="dark"
      content="老是失败的话，换个姿势试试"
      placement="right"
    )
      el-input(v-model="cheerWord", :placeholder="foreverLove", :disabled="!couldWish")
    div(slot="footer" class="dialog-footer" v-if="couldWish")
      el-button-group(v-show="needTest")
        geetest(ref="geetest", @success="testSuccess")
      el-button-group(v-if="!needTest")
        el-button(
          type="primary",
          @click="makeWishs(1)",
          :loading="working"
        ) 许愿
    div(slot="footer" class="dialog-footer" v-if="!couldWish")
      el-alert(
        title="今日许愿次数耗尽，每天0点重置次数",
        type="warning",
        :closable="false",
      )
</template>

<script>
import bigInt from "big-integer"
import sample from 'lodash/sample'
import map from 'lodash/map'
import forge from 'node-forge'
import * as stockAPI from '@/api/stock/'
import geetest from '@/components/util/geetest'
import { hidalao } from '@/util/antidalao'
import { CHANGE_LOVE_DIALOG_VISABLE, CLOSE_LOVE_DIALOG } from '@/store/stock/types'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'love-dialog',
  data() {
    return {
      buttonType: 'danger',
      buttonIco: 'el-icon-star-on',
      working: false,
      cheerWord: '',
      title: '许愿',
      buttonMsg: '一次',
      times: 1,
      roundTimes: 15000,
      hard: 13,
      needTest: true,
      geetestResult: {},
    }
  },
  computed: {
    ...mapState({
      stock: state => state.stock,
      wish_count: state => state.user.wish_count,
      wish_limit: state => state.user.wish_limit,
    }),
    couldwish_count () {
      return this.wish_limit - this.wish_count;
    },
    couldWish () {
      return this.couldwish_count > 0;
    },
    foreverLove () {
      return `我永远喜欢${this.stock.name}`
    },
    dialogVisible: {
      get () {
        return this.stock.loveDialog.dialogVisable
      },
      set (val) {
        if (val == false) {
          this.times = 0;
          this.hard = 0;
        }
        this.changeDialogVisable(val)
      }
    },
  },
  methods: {
    ...mapMutations({
      changeDialogVisable: CHANGE_LOVE_DIALOG_VISABLE,
      closeDialog: CLOSE_LOVE_DIALOG,
    }),
    testSuccess(geetestResult) {
      this.geetestResult = geetestResult;
      this.needTest = false;
      if(!hidalao()){
        this.makeWishs(1);
      }
    },
    reTest() {
      this.$refs.geetest.reset();
      this.needTest = true;
    },
    wish () {
      return new Promise((resolve, reject) => {
        this.workingMessage();
        this.proofOfLove().then(lovePower => {
          stockAPI.postLove(this.stock.code, this.cheerWord, lovePower, this.geetestResult).then(res => {
            if (res.success) {
              this.hard  = res.hard;
              resolve(res);
            } else {
              this.$message.error(res.msg);
              this.hard  = res.hard;
              reject(err);
            }
          }).catch(err => {
            reject(err);
          });
        }).catch(err => {
          reject(err);
        });
      });
    },
    makeWishs (time) {
      this.times = time;
      this.makeWish();
    },
    makeWish () {
      if (this.working) {
        return;
      }
      this.working = true;
      this.wish().then((res) => {
        this.$emit('success');
        this.successMessage(res.type, res.amount);
      }).catch(err => {
        this.failedMessage();
      }).finally(() => {
        this.working = false;
        this.reTest();
      });
    },
    otherRound () {
      this.times -= 1;
      if (this.dialogVisible && this.times > 1) {
        console.log(`当前动态难度: ${this.hard}, 剩余次数: ${this.times}`);
        setTimeout(() => {
          this.makeWish();
        }, 100);
      }
    },
    proofOfLove() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          var from = this.$moment().unix();
          for (var i = 0; i < this.roundTimes; i++) {
            var unixTime = this.$moment().startOf('minute').unix();
            var code = this.stock.code;
            var cheer_word = this.cheerWord;
            var lovePower = parseInt(Math.random() * 99999999999);
            var rawData = `${cheer_word}${lovePower}${unixTime}${code}`
            var rawOre = this.sha512(rawData);
            if (parseInt(rawOre.slice(-this.hard)) == 0) {
              resolve(lovePower);
              break;
            }
          }
          reject();
        }, 50);
      });
    },
    sha512 (rawData) {
      var md = forge.md.sha512.create();
      md.update(forge.util.encodeUtf8(rawData));
      var hex = md.digest().toHex();
      var bin = bigInt(hex, 16).toString(2)
      return bin;
    },
    workingMessage () {
      this.buttonMsg = sample([
        '许愿中...',
      ]);
      this.title = sample([
        '少女祈祷中...',
        '摸了摸了...',
        '正在寻找旗鼓相当的对手',
        '好累啊...',
      ]);
    },
    titleWithType(type, amount) {
      var msg = '成功';
      if (type == 'coin') {
        msg = `获得了${amount / 100}点援力`;
      }
      if (type == 'stock') {
        msg = `许愿成功，获得${amount}股`;
      }
      return msg;
    },
    successMessage (type, amount) {
      this.buttonIco = 'el-icon-check',
      this.buttonType = 'success';
      this.buttonMsg = '许愿成功';
      this.title = this.titleWithType(type, amount);
      setTimeout(() => {
        this.$message.success(`今日许愿${this.wish_count}，剩余${this.couldwish_count}次`);
      }, 500);
    },
    failedMessage () {
      this.buttonIco = 'el-icon-refresh',
      this.buttonType = 'warning';
      this.buttonMsg = '再试一次';
      this.title = '届不到，届不到';
    }
  },
  components: {
    'geetest': geetest,
  },
}
</script>

<style>
.love-dialog .el-dialog__body {
  padding-bottom: 10px;
  padding-top: 10px;
}
</style>

<style scoped>
.wish-limit {
  font-size: 14px;
  text-align: center;
}
</style>
