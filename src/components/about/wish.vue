<template lang="jade">
el-card(class="box-card")
  div(slot="header")
    span 「许愿系统」
  div
    p 「许愿系统」说到底，就是通过献祭自己拥有的计算力来获得「股票」和「援力」的系统。
    p 本站认为，算力是比IP地址或者手机号更为公平的投票工具，所以本站使用算力作为衡量用户对角色喜爱程度的主要标准。
    p 想要使用「许愿系统」，有两种方法。
    p 最简单的一种是使用对应角色页面上的「许愿按钮」，你就可以获得这个角色的「股票」和「援力」了。
    p 一天之内你可以使用网页上的「许愿按钮」获得多达100次的奖励。
    p 在使用「许愿按钮」的时候，游览器会进行剧烈的计算，你可能会体验到一定程度的卡顿，这是正常现象。
    p 不过请放心，在你没有使用许愿按钮的时候，我们不会偷偷地在后台进行计算。
    p
      span 还有一种可以长期使用的「许愿系统」的方法，那就是使用「高速许愿工具」进行挂机许愿。
        a.el-button.el-button--text(href="https://github.com/bydmm/yuanlimm-cli", target="_blank") 下载「高速许愿工具」
    p 使用「高速许愿工具」你可以更加快速的获得许愿奖励。作为代价，你需要付出多得多的计算力来为你的角色充能。
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
