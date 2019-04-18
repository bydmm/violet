<template lang="jade">
el-card(class="box-card")
  div(slot="header")
    span 「目的」
  div
    p 建立本站的目的，是以虚拟股票交易的形式去选出萌王。其目的和萌战类似，都是为了选出 ACG 中最有人气的人物。
    p 早在 2011 年，肥宅社区就有人声称自己满仓「小圆股」的说法。这是喜欢魔法少女小圆中鹿目圆香的粉丝，对自己喜欢这一角色的另类表达。
    p 比这更早的之前，就已经有针对好莱坞明星的虚拟交易市场。HSX - Hollywood Stock Exchange.，粉丝通过买卖交易明星的虚拟股票来表现明星的人气涨跌。
    p 引入了股票这一概念后，肥宅社区也因此出现了了许多和股票有关的概念，比如满仓雪菜，清仓东马，甚至 015 跌停之类的说法。
    p 对一个可有可无的产品而言，本不需要用这么大力气去干这件事。但是这个项目对我还有一些特殊的意义。
    p 八年之前，我就曾经用 PHP 坑次坑次的实现过一个非常简陋的二次元股票交易市场，卖萌网。
    p 卖萌网是为了找到一份编程的工作而特意设置的一个练手项目，当时从学 HTML+CSS 到 PHP+MYSQL 大概花了两个月。那是一个爆丑的界面，以及更为丑陋的 MVC 不分，SQL 写在 html 里的 PHP 代码。
    p 好在主要目的还是实现了，当时利用这个项目作为敲门砖，带着代码和线上演示入职了一家公司正式进入了这个行业。
    p 这么多年过去了，但是中间总隐隐的感觉和虚拟交易市场这个项目有一些缘分，经常有再次认认真真的以更高完成度的实现这个项目的念头。
    p 今年没耐住这个念头，最终还是再用 VUE+ELE+RAILS+SIDKIQ 的方式把这个项目再次实现了一次。
    p Beta 阶段，注册会赠送一些股票和援力方便测试，正式上线后只能通过许愿获得股票和援力。
    p 无论是反映 bug，有兴趣合作，单纯想玩，灌水，还是想上新股都可以加群：774800449
    p
      span 本站是由爱好者建立的，非盈利的粉丝站，如果有侵犯到您的版权，请联系
      a(href="mailto:miku@maimoe.com") 站长
      span 处理。
    p
      span 鄂ICP备12016882号
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
