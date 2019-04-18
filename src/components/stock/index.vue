<template lang="jade">
  div
    el-row(:gutter="20")
      el-col(:lg="16")
        stock-header
        trend-activity
        user-brief(v-if="authed")
        order-activity
        deal-activity
      el-col(:lg="8")
        music
        tags
        love-activity
        holding-rank
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import * as stockAPI from '@/api/stock/'
import userBrief from '@/components/stock/user-brief'
import stockHeader from '@/components/stock/stock-header'
import loveActivity from '@/components/stock/love-activity'
import orderActivity from '@/components/stock/order-activity'
import dealActivity from '@/components/stock/deal-activity'
import trendActivity from '@/components/stock/trend-activity'
import holdingRank from '@/components/stock/holding-rank'
import tags from '@/components/stock/tags'
import music from '@/components/stock/music'

import { CHANGE, CLEAR } from '@/store/stock/types'

export default {
  name: 'stock',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      authed: state => state.user.authed,
      stock: state => state.stock,
    }),
  },
  methods: {
    ...mapMutations({
      changeStock: CHANGE,
      clear: CLEAR,
    }),
  },
  components: {
    'stock-header': stockHeader,
    'order-activity': orderActivity,
    'love-activity': loveActivity,
    'user-brief': userBrief,
    'deal-activity': dealActivity,
    'trend-activity': trendActivity,
    'holding-rank': holdingRank,
    'music': music,
    tags,
  },
  metaInfo () {
    return {
      title: `${this.stock.name} - 二次元虚拟人物交易所 - 援力满满`,
      meta: [
        { name: 'description', content: '官方发布最新运营消息的地方。' }
      ]
    }
  },
  beforeMount: function () {
    this.changeStock({ code: this.$route.params.code })
  },
  beforeDestroy () {
    this.clear()
  },
}
</script>

<style scoped>
</style>
