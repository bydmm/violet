<template lang="jade">
el-card(class="box-card deal-list")
  div(slot="header")
    span 成交记录
  transition-group(name="list" tag="div")
    div(v-for="item in dealList", :key="item.id", class="text item")
      span 以{{item.price | pricelize}}成交{{item.amount}}股
      span(class="from-now") ({{ item.created_at | moment("from", "now") }})
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import { CODE, RELOAD_DEAL_ACTIVITY } from '@/store/stock/types'

export default {
  name: 'love-activity',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      dealList: state => state.stock.dealActivity.list,
    }),
    ...mapGetters({
      code: [CODE],
    }),
  },
  methods: {
    ...mapActions({
      loadData: RELOAD_DEAL_ACTIVITY,
    }),
  },
  watch: {
    code () {
      this.loadData()
    }
  },
  mounted () {
    this.loadData()
  },
}
</script>

<style scoped>
.deal-list {
  margin-bottom: 18px;
}

.deal-list .item {
  margin-bottom: 10px;
  font-size: 14px;
}

.deal-list .item:last-child {
  margin-bottom: 0px;
}

.deal-list blockquote {
  position: relative;
  padding: 6px 2px;
  margin: 8px 0 0px 0;
  color: #fff;
  font-size: 14px;
  background-color: #409EFF;
  border-radius: 2px;
}

.deal-list blockquote::before {
  position: absolute;
  top: -6px;
  left: 16px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #409EFF;
  content: '';
}

.from-now {
  float: right;
  color: #aaa;
}

.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}

.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
</style>
