<template lang="jade">
el-card(class="box-card my-list")
  div.my-stock
    div.header 与我相关
  div.card-body
    div
      span 我持有
      span {{stockBalance}}
      span 股和
      span {{balance | pricelize}}
      span 点援力
    div.actions
      el-switch(
        v-model="collected",
        active-text="特别关注",
      )
  div.my-orders(v-if="orderList.length > 0")
    div.header 我的交易
    transition-group(name="list" tag="div" class="card-body")
      div(v-for="item in orderList", :key="item.id", class="text item")
        div.clearfix
          span(v-if="item.amount < 0")
            | 以{{item.price | pricelize}}援力的价格卖出
          span(v-if="item.amount > 0")
            | 以{{item.price | pricelize}}援力的价格买入
          span (
          span {{Math.abs(item.finished_amount)}}/{{Math.abs(item.amount)}}
          span )
          a(@click="cancelOrder(item)", class="cancel") (取消)
        template(v-if="item.detail.reason")
          blockquote(:class="quoteClass(item.amount)") 「{{ item.detail.reason }}」

</template>

<script>
import * as stockAPI from '@/api/stock/'
import ICountUp from 'vue-countup-v2';
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import { CODE, RELOAD_MY, RELOAD_ORDER_ACTIVITY, SELECT, DESELECT } from '@/store/stock/types'

export default {
  name: 'user-brief',
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      stockBalance: state => state.stock.my.stockBalance,
      selected: state => state.stock.my.selected,
      balance: state => state.user.balance,
      orderList: state => state.stock.my.orders,
    }),
    ...mapGetters({
      code: [CODE],
    }),
    collected: {
      get () {
        return this.selected;
      },
      set (val) {
        if (val) {
          this.select();
        } else {
          this.deselect();
        }
      }
    },
  },
  methods: {
    ...mapActions({
      loadData: RELOAD_MY,
      reloadActivity: RELOAD_ORDER_ACTIVITY,
      select: SELECT,
      deselect: DESELECT,
    }),
    quoteClass (amount) {
      if (amount > 0) {
        return ' buy';
      } else {
        return 'sale';
      }
    },
    cancelOrder (item) {
      stockAPI.postCancelOrder(item.id).then(res => {
        this.loadData();
        this.reloadActivity();
      }).catch(err => {
        this.loadData();
        this.reloadActivity();
        this.$message.error('取消挂单失败');
      });
    }
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
    ICountUp
  },
}
</script>

<style>
.my-list .el-card__body {
  padding: 0;
}
</style>

<style scoped>
.actions {
  margin-top: 10px;
}

.my-list {
  margin-bottom: 18px;
}
.my-list .header {
  padding: 18px 20px;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
}

.my-list .card-body {
  padding: 20px;
}

.my-orders .header {
  border-top: 1px solid #ebeef5;
}

.my-orders .item {
  font-size: 14px;
  margin-bottom: 10px;
}

.my-orders .item:last-child {
  margin-bottom: 0px;
}

.my-orders .item a {
  float: right;
  margin-left: 4px;
  color: #E6A23C;
  font-size: 14px;
  cursor: pointer;
}

.my-orders .item a:hover{
  color: #F56C6C;
}

.from-now {
  float: right;
  color: #aaa;
}

.my-order .item {
  margin-bottom: 10px;
}

.item-header {
  font-size: 14px;
}

.my-orders .button {
  padding: 4px 6px;
}

.my-orders blockquote {
  position: relative;
  padding: 6px 2px;
  margin: 8px 0 0px 0;
  color: #fff;
  font-size: 14px;
  background-color: #409EFF;
  border-radius: 2px;
}

.my-orders blockquote.sale {
  background-color: #67C23A;
}

.my-orders blockquote.sale::before {
  border-bottom: 6px solid #67C23A;
}

.my-orders blockquote.buy {
  background-color: #F56C6C;
}

.my-orders blockquote.buy::before {
  border-bottom: 6px solid #F56C6C;
}

.my-orders blockquote::before {
  position: absolute;
  top: -6px;
  left: 16px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  content: '';
}

.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}

.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>
