<template lang="jade">
  div
    el-pagination(
      layout="prev, pager, next, jumper",
      :total="count",
      :page-size="pageSize",
      @current-change="handleCurrentChange"
    )
    el-table.table-list(:data="deals" stripe)
      el-table-column(
        width="100",
        prop="id"
        label="交易ID"
      )
      el-table-column(
        width="180",
        prop="created_at",
        label="时间",
        :formatter="dateFormat"
      )
      el-table-column(
        width="80",
        label="挂单ID"
      )
        template(slot-scope="scope")
          template(v-if="scope.row.type == 'StockTransaction'")
            template(v-if="scope.row.payer.id == userID")
              span {{scope.row.sale_order_id}}
            template(v-if="scope.row.payee.id == userID")
              span {{scope.row.buy_order_id}}
          template(v-if="scope.row.type == 'CoinTransaction'")
            template(v-if="scope.row.payer.id == userID")
              span {{scope.row.buy_order_id}}
            template(v-if="scope.row.payee.id == userID")
              span {{scope.row.sale_order_id}}
      el-table-column(
        width="80",
        label="类型"
      )
        template(slot-scope="scope")
          template(v-if="scope.row.type == 'StockTransaction'")
            span 股票
          template(v-if="scope.row.type == 'CoinTransaction'")
            span 援力
      el-table-column(
        width="120",
        label="援力变化"
      )
        template(slot-scope="scope")
          template(v-if="scope.row.type == 'CoinTransaction'")
            template(v-if="scope.row.payer.id == userID")
              span -
            template(v-if="scope.row.payee.id == userID")
              span +
            span {{scope.row.amount | pricelize}}
      el-table-column(
        width="120",
        label="股票变化"
      )
        template(slot-scope="scope")
          template(v-if="scope.row.type == 'StockTransaction'")
            template(v-if="scope.row.payer.id == userID")
              span -{{scope.row.amount}}
            template(v-if="scope.row.payee.id == userID")
              span {{scope.row.amount}}
      el-table-column(
        label="详情",
      )
        template(slot-scope="scope")
          template(v-if="scope.row.type == 'StockTransaction'")
            span 我
            template(v-if="scope.row.payer.id == userID")
              span 出售了
            template(v-if="scope.row.payee.id == userID")
              span 从「{{scope.row.payer.name}}」手上
              span 买入了
            span {{scope.row.amount}}
            span 股
            router-link.stock-link(:to="{name: 'stock', params: { code: scope.row.code }}") {{scope.row.stock}}
            template(v-if="scope.row.payer.id == userID")
              span 给「{{scope.row.payee.name}}」
          template(v-if="scope.row.type == 'CoinTransaction'")
            span 我
            template(v-if="scope.row.payer.id == userID")
              span 支付了
            template(v-if="scope.row.payee.id == userID")
              span 得到了
              span 「{{scope.row.payer.name}}」
              span 支付的
            span {{scope.row.amount | pricelize}}
            span 援力
            template(v-if="scope.row.payer.id == userID")
              span 给「{{scope.row.payee.name}}」
    el-pagination(
      layout="prev, pager, next, jumper",
      :total="count",
      :page-size="pageSize",
      @current-change="handleCurrentChange"
    )
</template>

<!-- {
"id": 1621412,
"amount": 100,
"price": 5000,
"type": "StockTransaction",
"pay_type": "trade",
"payer": {
    "id": 263,
    "name": "bydmm"
},
"payee": {
    "id": 466,
    "name": "英梨梨权益保护协会"
},
"buy_order_id": 19448,
"sale_order_id": 19503,
"stock": "泽村·斯宾塞·英梨梨",
"code": "ERIRI",
"created_at": "Fri, 08 Jun 2018 10:32:09 +0800"
} -->

<script>
import * as userAPI from '@/api/user/'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'index',
  data: function() {
    return {
      deals: [],
      count: 0,
      page: 1,
      pageSize: 100,
    }
  },
  computed: {
    ...mapState({
      userID: state => state.user.id,
    }),
  },
  methods: {
    dateFormat(row, column, cellValue, index) {
      return this.$moment(cellValue).format('YYYY-MM-DD HH:mm:ss');;
    },
    handleCurrentChange(val) {
      this.page = val;
      this.load();
    },
    load () {
      userAPI.getDeals(this.page).then(res => {
        this.deals = res.data;
        this.count = res.count;
      })
    }
  },
  filters: {
    me(user, myID) {
      if (user.id == myID) {
        return '我'
      } else {
        return user.name
      }
    }
  },
  beforeMount: function () {
    this.load();
  },
}
</script>

<style scope>
.table-list {
  margin: 10px 0;
}
.stock-link {
  color: #409EFF;
}
.stock-link:hover{
  color: #409EFF;
  font-weight: bold;
}
</style>
