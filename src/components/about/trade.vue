<template lang="jade">
el-card(class="box-card")
  div(slot="header")
    span 「交易系统」
  div
    p 「援力满满 - 二次元交易所」最重要的功能自然是「交易」。
    p 你可以喜欢就买，不喜欢就卖，这是一种玩法。当然你也可以很投机的去预测人物人气未来的走向，很投机的去持有，或者提早卖出一些股票。
    p 交易撮合的规则是这样：
    p
      span 先寻找「出价最高」的「买单」，然后从寻找可用的「卖单」，然后「卖单」挂单的顺序依次成交，成交价格是按照
      b 「买家的价格」
      span 成交。
    p 这里和真实的股市有个重要的不同点，本站是按照买家的价格成交的，这样就避免了卖家使用低价卖单砸盘的情况。
    p 看好这只股的股东需要用「比较高的买价护盘」，而另一方需要足够多的股票才能完成砸盘操作，在这个实质上是个投票系统的交易市场上是比较合理的。
</template>

<script>
export default {
  name: 'index',
  data: function() {
    return {}
  }
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
