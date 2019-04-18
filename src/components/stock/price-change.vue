<template lang="jade">
  span(:class="color") {{text}}
</template>

<script>
export default {
  name: 'price-change',
  props: ['price', 'priceDayOpen'],
  data() {
    return {}
  },
  computed: {
    ratio () {
      if (this.price == 0 || this.priceDayOpen == 0) {
        return 0.00;
      }
      return (((this.price - this.priceDayOpen) / this.priceDayOpen) * 100.0).toFixed(2);
    },
    symbol () {
      if (this.ratio >= 0) {
        return '+';
      }
      return '';
    },
    text () {
      return `${this.symbol}${this.ratio}%`
    },
    color () {
      if (this.ratio >= 0) {
        return 'cow';
      }
      return 'bear';
    }
  },
  methods: {
  },
}
</script>

<style scoped>
.cow {
  color: #F56C6C;
}
.bear {
  color: #67C23A;
}
</style>
