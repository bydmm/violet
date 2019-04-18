<template lang="jade">
div
  el-card(class="box-card deal-list")
    div(slot="header")
      span 总览
    div
      div.group
        span 资产规模：
        ICountUp(
          :startVal="countUp.startVal",
          :endVal="capital | pricelize",
          :decimals="countUp.decimals",
          :duration="countUp.duration",
          :options="countUp.options")
        span 援力
      div.group
        span 现金流：
        ICountUp(
          :startVal="countUp.startVal",
          :endVal="coin_balance | pricelize",
          :decimals="countUp.decimals",
          :duration="countUp.duration",
          :options="countUp.options")
        span 援力
      div.address 钱包地址: {{address}}
  el-card(class="box-card deal-detail")
    div(slot="header")
      span 明细
    el-row.holds(:gutter="20")
      el-col(
        :lg="8",
        :md="12",
        :sm="12",
        v-for="item in stocks",
        :key="item.code",
        class="text item")
        span 持有
        router-link(:to="{name: 'stock', params: { code: item.code }}") {{item.name}}
        span {{item.shareholding_ratio}}%
        div.value
          ICountUp(
            :startVal="countUp.startVal",
            :endVal="item.balance",
            :decimals="countUp.decimals",
            :duration="countUp.duration",
            :options="countUp.options")
          span 股
          span 净值
          ICountUp(
            :startVal="countUp.startVal",
            :endVal="item.balance * item.price | pricelize",
            :decimals="countUp.decimals",
            :duration="countUp.duration",
            :options="countUp.options")
          span 援力

</template>

<script>
import ICountUp from 'vue-countup-v2';
import * as userAPI from '@/api/user/'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'index',
  data: function() {
    return {
      capital: 0,
      coin_balance: 0,
      stocks: [],
      countUp: {
        startVal: 0,
        decimals: 0,
        duration: 1,
        options: {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
        }
      }
    }
  },
  methods: {
    load () {
      userAPI.getProfile().then(res => {
        this.capital = res.capital;
        this.coin_balance = res.coin_balance;
        this.stocks = res.stocks;
      })
    }
  },
  computed: {
    ...mapState({
      address: state => state.user.address,
    }),
  },
  beforeMount: function () {
    this.load();
  },
  components: {
    ICountUp
  },
}
</script>

<style scope>
.deal-detail {
    margin-top: 20px;
}

.address {
  word-break:break-all;
}

.group {
  margin-bottom: 10px;
}

.item {
  margin-bottom: 10px;
}

.value {
  font-size: 14px;
  color: #606266;
}

.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}

.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
</style>
