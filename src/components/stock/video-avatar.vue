<template lang="jade">
div.avatar(
  :style="style",
  @mouseover="mouseover",
  @mouseout="mouseout")
  video.image(
    v-if="show",
    playsinline,
    muted,
    loop,
    preload="metadata",
    :autoplay="autoplay",
    :src="src",
    ref="video",
  )
</template>

<script>
export default {
  name: 'video-avatar',
  props: ['poster', 'src'],
  data() {
    return {
      show: false,
      autoplay: true,
    }
  },
  methods: {
    mouseover() {
      this.show = true;
      this.$nextTick( () => {
        this.$refs.video.play();
      });
    },
    mouseout() {
      this.show = false;
    },
  },
  computed: {
    cover () {
      return `${this.src}?x-oss-process=video/snapshot,t_0,f_jpg`
    },
    style () {
      return `background-image:url(${this.cover})`
    },
  }
}
</script>

<style scoped>
.avatar {
  height: 200px;
  background-position: center;
  background-size: cover;
  overflow: hidden;
}

.image {
  display: block;
  width: 100%;
  height: 200px;
}

video {
  object-fit: cover;
  object-position: center;
}
</style>
