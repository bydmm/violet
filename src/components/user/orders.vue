<template lang="jade">
  div
    el-pagination(
      layout="prev, pager, next, jumper",
      :total="count",
      :page-size="pageSize",
      @current-change="handleCurrentChange"
    )
    el-table.table-list(:data="items" stripe)
      el-table-column(
        width="100",
        prop="id"
        label="订单号"
      )
      el-table-column(
        width="100",
        prop="status",
        label="状态",
      )
        template(slot-scope="scope")
          el-tag(:type="tagType(scope.row.status)")
            span {{scope.row.status | orderStatus}}
      el-table-column(
        width="200",
        prop="stock"
        label="对象"
      )
        template(slot-scope="scope")
          router-link.stock-link(:to="{name: 'stock', params: { code: scope.row.code }}") {{scope.row.stock}}
      el-table-column(
        width="100",
        prop="price",
        label="价格",
      )
        template(slot-scope="scope")
          span {{scope.row.price | pricelize}}
      el-table-column(
        width="100",
        prop="amount",
        label="数量",
      )
      el-table-column(
        width="100",
        prop="finished_amount",
        label="完成数量",
      )
      el-table-column(
        prop="created_at",
        label="下单时间",
        :formatter="dateFormat"
      )
      el-table-column(
        fixed="right"
        label="操作"
        width="100"
      )
        template(slot-scope="scope")
          el-button(
            v-if="scope.row.status == 'padding'",
            @click="cancel(scope.row.id)",
            type="text",
            size="small"
          ) 撤单
    el-pagination(
      layout="prev, pager, next, jumper",
      :total="count",
      :page-size="pageSize",
      @current-change="handleCurrentChange"
    )
</template>

<!--
{
    "id": 19510,
    "price": 100,
    "amount": -100,
    "detail": {
        "reason": ""
    },
    "code": "VIOLET",
    "stock": "薇尔莉特·伊芙加登",
    "finished_amount": 0,
    "status": "padding",
    "created_at": "Sun, 17 Jun 2018 12:43:06 +0800"
}
-->

<script>
import * as userAPI from '@/api/user/'
import * as stockAPI from '@/api/stock/'

export default {
  name: 'index',
  data: function() {
    return {
      items: [],
      count: 0,
      page: 1,
      pageSize: 20,
    }
  },
  methods: {
    pricelize(row, column, cellValue, index) {
      return (parseFloat(cellValue) / 100.0).toFixed(2);
    },
    dateFormat(row, column, cellValue, index) {
      return this.$moment(cellValue).format('YYYY-MM-DD HH:mm:ss');;
    },
    handleCurrentChange(val) {
      this.page = val;
      this.loadData();
    },
    tagType(status) {
      if (status == 'success') {
        return 'success';
      } else if (status == 'cancel') {
        return 'warning';
      } else {
        return '';
      }
    },
    cancel(id) {
      stockAPI.postCancelOrder(id).then(res => {
        this.loadData();
      }).catch(err => {
        this.loadData();
        this.$message.error('取消挂单失败');
      });
    },
    loadData () {
      userAPI.getOrderList('', '', this.page).then(res => {
        this.items = res.data;
        this.count = res.count;
      })
    }
  },
  beforeMount: function () {
    this.loadData();
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
