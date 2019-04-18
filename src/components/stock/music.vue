<template lang="jade">
el-card(class="box-card music-list" v-show="musicLink")
  div(slot="header" class="clearfix header")
    span 角色音乐
  div
    span {{link}}
    iframe(
      frameborder="no",
      border="0",
      marginwidth="0",
      marginheight="0",
      width=320,
      height=86,
      :src="musicLink")
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      link: '',
    }
  },
  computed: {
    ...mapState({
      musicLink: state => state.stock.musicLink,
    }),
  },
}
</script>

<style>
.music-list .el-card__body {
  padding: 10px 20px 8px 18px;
}
</style>

<style scoped>
.music-list {
  margin-bottom: 18px;
}

iframe {
  position: relative;
  left: -10px;
}
</style>
