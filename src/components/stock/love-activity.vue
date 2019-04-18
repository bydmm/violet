<template lang="jade">
el-card(class="box-card lover-list")
  div(slot="header")
    span 应援动态
  transition-group(name="list" tag="div")
    div(v-for="item in loverList", :key="item.id", class="text item")
      span {{ item.user.nick_name }}抽到了{{ item.amount }}股
      span(class="from-now") ({{ item.created_at | moment("from", "now") }})
      template(v-if="item.detail.cheer_word")
        blockquote 「{{ item.detail.cheer_word }}」
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import { CODE, RELOAD_LOVE_ACTIVITY } from '@/store/stock/types'

export default {
  name: 'love-activity',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      loverList: state => state.stock.loveActivity.list,
    }),
    ...mapGetters({
      code: [CODE],
    }),
  },
  methods: {
    ...mapActions({
      loadData: RELOAD_LOVE_ACTIVITY,
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
.lover-list {
  margin-bottom: 18px;
}

.lover-list .item:last-child {
  margin-bottom: 0px;
}

.lover-list .item {
  margin-bottom: 10px;
  font-size: 14px;
}

.lover-list blockquote {
  position: relative;
  padding: 6px 2px;
  margin: 8px 0 0px 0;
  color: #fff;
  font-size: 14px;
  background-color: #409EFF;
  border-radius: 2px;
}

.lover-list blockquote::before {
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
