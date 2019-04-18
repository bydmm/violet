<template lang="jade">
div
  status
  el-card(class="box-card")
    div(slot="header")
      span 2018年6月24日运营公告
    div
      p 新增了现任老公功能
      ul
        li 每日凌晨5点检查一次
        li 如果第一名发生了变换，现任老公会发生变换
  el-card(class="box-card")
    div(slot="header")
      span 2018年6月20日运营公告
    div
      p 新增了按照卖出价格排序的「低价出让」
      p 成交顺序修改
      ul
        li 按照买单价格成交，方便护盘
        li 高价买单先成交，方便护盘
        li
          span 高价买单寻找可用范围内的卖单，然后按照卖单的
          b 挂单顺序
          span 成交
  el-card(class="box-card")
    div(slot="header")
      span 2018年6月19日运营公告
    div
      p 新增了按照买入价格排序的「高价收购」
      p 把许愿公示栏移到了运营公告
  el-card(class="box-card")
    div(slot="header")
      span 2018年6月18日运营公告
    div
      p 大幅放宽了交易限制
      ul
        li 总体挂单数量不再限制
        li 单个股票的挂单数量改到每个股票可以挂6单
      p 首页新增了多种排序
      ul
        li 新增自选股功能，可以在股票详情页选择，然后在首页快速寻找
        li 新增市值排序功能
      p 调整了排行的更新时间
      ul
        li 援力排行从3个小时一次调整到10分钟一次
        li 其他大部分排行都改成了10分钟一次
  el-card(class="box-card")
    div(slot="header")
      span 2018年6月17日运营公告
    div
      p 现在可以更为方便的查询历史交易记录了
      ul
        li 新增挂单列表
        li 修改交易列表
  el-card(class="box-card")
    div(slot="header")
      span 2018年6月15日运营公告
    div
      p 援力白皮书公开，请注意：https://github.com/bydmm/yuanlimm-cli/blob/master/white_paper.md
      p 援力榜不再包括援力现金。
  el-card(class="box-card")
    div(slot="header")
      span 2018年6月12日运营公告
    div
      p 「许愿系统」重大变更。
      ul
        li 网页许愿收益得到极大加强。
        li 网页许愿不再与挂机软件共享许愿次数
        li 网页每日可以许愿100次。
        li 网页许愿取消多次许愿功能，且每次都要输入验证码。
</template>

<script>
import status from '@/components/notice/status'

export default {
  name: 'index',
  data: function() {
    return { visible: false }
  },
  metaInfo: {
    title: '运营公告 - 二次元虚拟人物交易所 - 援力满满',
    meta: [
      { name: 'description', content: '官方发布最新运营消息的地方。' }
    ]
  },
  components: {
    status
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
ul {
  margin-bottom: 0;
}
</style>
