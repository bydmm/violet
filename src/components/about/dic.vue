<template lang="jade">
el-card(class="box-card")
  div(slot="header")
    span 「援力满满」速查词典
  div
    p.word
      b 「援力」
      span 是本站唯一指定货币。伴随着角色被「许愿系统」充能后产生的一种神秘力量。你可以使用这种力量去和其他玩家交易。
    p.word
      b 「股票」
      span 是「许愿系统」向粉丝发放一种可转凭证，拥有这种凭证的多少，象征着你对这个角色的贡献的多少。你可以使用「援力」买入，也可以卖出这种凭证。
    p.word
      b 「许愿系统」
      span 粉丝通过「许愿系统」向自己喜欢的角色传达爱意。在这个过程中，「许愿系统」会自动向粉丝发放「股票」和「援力」奖励
    p.word
      b 「交易系统」
      span 由于「股票」具有可以转让的特性，粉丝们可以通过「援力满满 - 二次元交易所」提供的交易功能互相交易自己喜欢的角色。
    p.word
      b 「喊话」
      span 「许愿」和「交易」的时候可以附加一句话作为「喊话」。你可以用来表达你的态度，或者回应别人的「喊话」，请尽量使用。
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
