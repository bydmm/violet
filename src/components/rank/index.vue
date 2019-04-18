<template lang="jade">
el-card(class="box-card rank-list")
  div(slot="header")
    span 援力50
  transition-group(name="list" tag="div")
    div(v-for="rank in ranks", :key="rank.user", class="text item")
      b {{rank.user}}
      span :&nbsp
      ICountUp(
        :startVal="countUp.startVal",
        :endVal="rank.capital | pricelize",
        :decimals="countUp.decimals",
        :duration="countUp.duration",
        :options="countUp.options")
      span 援力
      div.lover 老婆(暂定): {{rank.stock}}
</template>

<script>
import ICountUp from 'vue-countup-v2';
import * as rankAPI from '@/api/rank/'

export default {
  name: 'index',
  data: function() {
    return {
      ranks: [],
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
      rankAPI.getRank().then(res => {
        this.ranks = res.data;
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

<style scope>
.group {
  margin-bottom: 10px;
}

.item {
  margin-bottom: 10px;
}

.lover {
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
