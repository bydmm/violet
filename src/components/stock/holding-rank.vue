<template lang="jade">
div
  el-card(v-if="currentDanna", class="box-card current-danna")
    div(slot="header" class="clearfix header")
      span 现任老公
    div.item
      span {{ currentDanna.user }}持有
      el-tooltip.hold(:content="currentDanna.shareholding_ratio + '%'" placement="right")
        span {{ currentDanna.balance }}
      span 股
      template(v-if="currentDanna.cheer_word")
        span(class="from-now") ({{ currentDanna.created_at | moment("from", "now", true) }})
      template(v-if="currentDanna.cheer_word")
        blockquote 「{{ currentDanna.cheer_word }}」

  el-card(class="box-card holding-rank")
    div(slot="header" class="clearfix header")
      span 候补排位
    transition-group(name="list" tag="div")
      div(v-for="item in holdingRank", :key="item.id", class="text item")
        span {{ item.user }}持有
        el-tooltip.hold(:content="item.shareholding_ratio + '%'" placement="right")
          span {{ item.balance }}
        span 股
        template(v-if="item.cheer_word")
          blockquote 「{{ item.cheer_word }}」
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import { CODE, RELOAD_HOLDING_RANK } from '@/store/stock/types'

export default {
  name: 'holding-rank',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      currentDanna: state => state.stock.currentDanna,
      holdingRank: state => state.stock.holdingRank.list,
    }),
    ...mapGetters({
      code: [CODE],
    }),
  },
  methods: {
    ...mapActions({
      loadData: RELOAD_HOLDING_RANK,
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

<style scope>
.current-danna {
    margin-bottom: 18px;
}

.hold {
  color: #606266;
  background-color: #F2F6FC;
  cursor: pointer;
}

.item {
  font-size: 14px;
}

.holding-rank {
  margin-bottom: 18px;
}

.holding-rank .item:last-child {
  margin-bottom: 0px;
}

.holding-rank .item {
  margin-bottom: 10px;
}

blockquote {
  position: relative;
  padding: 6px 2px;
  margin: 8px 0 0px 0;
  color: #fff;
  font-size: 14px;
  background-color: #409EFF;
  border-radius: 2px;
}

blockquote::before {
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

.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}

.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
</style>
