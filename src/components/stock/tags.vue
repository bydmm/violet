<template lang="jade">
el-card(class="box-card stock-tags")
  div(slot="header" class="clearfix header")
    span 标签
  div.body
    el-tag.stock-tag(v-for="tag in tags", :key="tag", class="tag" size="medium")
      span {{tag}}
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'holding-rank',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      tags: state => state.stock.tags,
    }),
  },
}
</script>

<style>
.stock-tag {
  margin-bottom: 8px;
}

.stock-tags .body .el-tag+.el-tag {
  margin-left: 0;
}

.stock-tags .body .el-tag {
  margin-right: 10px;
}

.stock-tags .body .el-tag:last-child {
  margin-right: 0px;
}

.stock-tags {
  margin-bottom: 18px;
}

.stock-tags .el-tag+.el-tag {
  margin-left: 10px;
}
</style>
