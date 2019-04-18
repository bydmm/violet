<template lang="jade">
div
  guide
  dic
  wish
  trade
  reason
</template>

<script>
import guide from '@/components/about/guide'
import wish from '@/components/about/wish'
import trade from '@/components/about/trade'
import reason from '@/components/about/reason'
import dic from '@/components/about/dic'

export default {
  name: 'index',
  data: function() {
    return { visible: false }
  },
  metaInfo: {
    title: '帮助与玩法 - 二次元虚拟人物交易所 - 援力满满',
    meta: [
      { name: 'description', content: '你可能需要快速的游览下面的一些基础设定，来帮助你尽快的融入这个游戏。' }
    ]
  },
  components: {
    guide,
    wish,
    trade,
    reason,
    dic,
  },
}
</script>

<style scoped>
</style>
