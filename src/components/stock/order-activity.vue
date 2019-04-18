<template lang="jade">
div
  order-dialog
  el-card(class="box-card order-activity")
    div(slot="header" class="clearfix header")
      span 交易动态
      el-tooltip(
        class="item"
        effect="dark"
        content="设定你想买入和卖出的价格，系统会自动为你寻找合适的交易对象"
        placement="top"
      )
        el-button(
          :disabled="!authed",
          type="primary",
          icon="el-icon-goods",
          size="mini",
          class="button",
          @click="openOrderDialog",
          plain,
          round
        ) 买卖股份
    div
      order-item(type="buy", :list="buyList")
      order-item(type="sale", :list="saleList")
</template>

<script>
import orderDialog from '@/components/stock/order-dialog'
import orderItem from '@/components/stock/order-item'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import { CODE, RELOAD_ORDER_ACTIVITY } from '@/store/stock/types'
import { OPEN_ORDER_DIALOG } from '@/store/stock/types'

export default {
  name: 'order-activity',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      buyList: state => state.stock.orderActivity.buyList,
      saleList: state => state.stock.orderActivity.saleList,
      authed: state => state.user.authed,
    }),
    ...mapGetters({
      code: [CODE],
    }),
  },
  methods: {
    ...mapMutations({
      openDialog: OPEN_ORDER_DIALOG,
    }),
    ...mapActions({
      loadData: RELOAD_ORDER_ACTIVITY,
    }),
    openOrderDialog () {
      this.openDialog();
    },
  },
  watch: {
    code () {
      this.loadData()
    }
  },
  mounted () {
    this.loadData()
  },
  components: {
    'order-item': orderItem,
    'order-dialog': orderDialog,
  },
}
</script>

<style>
.order-activity .el-card__body {
  padding: 0;
}
</style>

<style scoped>
.order-activity {
  margin-bottom: 18px;
}

.order-activity .header span{
  line-height: 30px;
}

.order-activity .header .button {
  float: right;
  margin-bottom: 0;
}
</style>
