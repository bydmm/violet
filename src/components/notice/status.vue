<template lang="jade">
el-card(class="box-card")
  div(slot="header")
    span 「许愿系统」公示栏
  div
    p
      span 当前难度：{{hard}}
    p
      span 单次许愿成功需要：
      ICountUp(
        :startVal="countUp.startVal",
        :endVal="needHash",
        :decimals="countUp.decimals",
        :duration="countUp.duration",
        :options="countUp.options")
      span 次计算
    p
      span 全局算力：
      ICountUp(
        :startVal="countUp.startVal",
        :endVal="systemHashSpeed",
        :decimals="countUp.decimals",
        :duration="countUp.duration",
        :options="countUp.options")
      span &nbsp;Hash/s
</template>

<script>
import ICountUp from 'vue-countup-v2';
import * as statusAPI from '@/api/status/'

export default {
  name: 'index',
  data: function() {
    return {
      hard: 0,
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
  computed: {
    needHash () {
      return 2 ** this.hard;
    },
    systemHashSpeed () {
      return (this.needHash / 0.6).toFixed(0);
    }
  },
  methods: {
    load () {
      statusAPI.getHard().then(res => {
        this.hard = res.hard;
      })
    }
  },
  beforeMount: function () {
    this.load();
  },
  components: {
    ICountUp
  },
}
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}
p:first-child {
  margin-top: 0;
}
p:last-child {
  margin-bottom: 0;
}
</style>
