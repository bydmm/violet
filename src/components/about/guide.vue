<template lang="jade">
el-card(class="box-card")
  div(slot="header")
    span 简介
  div
    p 欢迎来到「援力满满 - 二次元交易所」
    p 本站的目的，是通过市值的方式，动态的展示不同虚拟人物的人气高低。
    p 你可能需要快速的游览下面的一些基础设定，来帮助你尽快的融入这个游戏。
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
