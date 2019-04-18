<template lang="jade">
div.order-list
  div.header(:class="type") {{title}}
  transition-group(name="list" tag="div")
    div(v-for="item in list", :key="item.id", class="text item")
      el-row(:gutter="10")
        el-col(:span="16")
          span(v-if="item.amount < 0")
            | {{item.user.nick_name}}想用{{item.price | pricelize}}援力每股的单价，卖出{{Math.abs(item.amount)}}
          span(v-if="item.amount > 0")
            | {{item.user.nick_name}}想以{{item.price | pricelize}}援力每股的单价，买入{{item.amount}}
          span(v-if="item.status == 'success'")
            | (成交)
          span(v-if="item.status != 'success'")
            | （{{Math.abs(item.finished_amount)}}）

        el-col(:span="8")
          span(class="from-now") ({{ item.created_at | moment("from", "now") }})
      template(v-if="item.detail.reason")
        blockquote(:class="quoteClass(item.amount)") 「{{ item.detail.reason }}」
</template>

<script>
export default {
  name: 'holding-rank',
  props: ['list', 'type'],
  data() {
    return {}
  },
  computed: {
    title () {
      if (this.type == 'sale') {
        return '卖方'
      } else {
        return '买方'
      }
    },
  },
  methods: {
    quoteClass (amount) {
      if (amount > 0) {
        return ' buy';
      } else {
        return 'sale';
      }
    },
  },
}
</script>

<style scope>
.buy {
  color: #F56C6C;
}

.sale {
  color: #67C23A;
}

.from-now {
  float: right;
  color: #aaa;
}

.order-list:first-child {
  border-bottom: 1px solid #ebeef5;
}

.order-list {
  padding: 0 0 20px 0;
}

.order-list .header {
  padding: 10px 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
  font-size: 14px;
}

.order-list .item {
  padding: 0px 20px;
  margin-bottom: 10px;
  font-size: 14px;
}

.order-list .item:last-child {
  margin-bottom: 0px;
}

.order-list blockquote {
  position: relative;
  padding: 6px 2px;
  margin: 8px 0 0px 0;
  color: #fff;
  font-size: 14px;
  background-color: #409EFF;
  border-radius: 2px;
}

.order-list blockquote.sale {
  background-color: #67C23A;
}

.order-list blockquote.sale::before {
  border-bottom: 6px solid #67C23A;
}

.order-list blockquote.buy {
  background-color: #F56C6C;
}

.order-list blockquote.buy::before {
  border-bottom: 6px solid #F56C6C;
}

.order-list blockquote::before {
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
