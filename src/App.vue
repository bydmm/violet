<template lang="jade">
  div.main(id="app")
    main-nav
    router-view
</template>

<script>
import mainNav from '@/components/main-nav'

export default {
  name: 'App',
  metaInfo: {
    title: '援力满满 - 二次元虚拟人物交易所 - 7乘24小时永不休止的萌战',
    meta: [
      { name: 'description', content: '用爱充能，然后交易起来吧！' }
    ]
  },
  components: {
    'main-nav': mainNav,
  }
}
</script>

<style>
.main {
  margin: 0 auto;
  padding: 0 20px 20px 20px;
  max-width: 1208px;
}
.footer {
  height: auto;
  text-align: center;
  font-size: 12px;
  color: #ccc;
}
body {
  margin: 0;
  padding: 0;
  /* font-family: "Lucida Grande", Lucida Sans Unicode, Hiragino Sans GB, WenQuanYi Micro Hei, Verdana, Aril, sans-serif; */
  background-color: #e2e2e2;
}
a {
  color: #303133;
  font-weight: 500;
  text-decoration: none;
}
</style>
