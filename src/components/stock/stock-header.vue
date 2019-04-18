<template lang="jade">
div(class="stock-top")
  love-dialog(@success="loveSuccess")
  el-card(:body-style="{ padding: '0px' }")
    video-avatar.image.hidden-md-and-up(:poster="avatar", :src="videoLink")
    div(style="padding: 14px;")
      div.top
        span.stock-name {{ name }}
        span.stock-code {{code}}
        el-tooltip(
          class="item"
          effect="dark"
          content="为她/他加油，就有机会抽取一定数量的萌股哦"
          placement="top"
        )
          el-button(
            :disabled="!authed",
            type="danger",
            icon="el-icon-star-on",
            size="mini",
            class="button",
            @click="openLoveDialog",
            plain,
            round
          ) 许愿
      div(class="bottom")
        el-row(:gutter="20")
          el-col(:lg="12", :md="12")
            div(class="price-value")
              span {{price | pricelize}}
              price-change(class="price-change", :price="price", :priceDayOpen="priceDayOpen")
          el-col.values(:lg="6", :md="6")
            div(class="market-value")
              span 总市值:&nbsp;
              ICountUp(
                :startVal="startVal",
                :endVal="marketValue",
                :decimals="decimals",
                :duration="duration",
                :options="options"
              )
            div(class="total-share")
              span 总股份:&nbsp;
              ICountUp(
                :startVal="startVal",
                :endVal="totalShare",
                :decimals="decimals",
                :duration="duration",
                :options="options"
              )
</template>

<script>
import ICountUp from 'vue-countup-v2';
import store from '@/store/'
import { hidalao } from '@/util/antidalao'
import videoAvatar from '@/components/stock/video-avatar'
import loveDialog from '@/components/stock/love-dialog'
import priceChange from '@/components/stock/price-change'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import { OPEN_LOVE_DIALOG } from '@/store/stock/types'
import { CODE, RELOAD, RELOAD_MY, RELOAD_LOVE_ACTIVITY } from '@/store/stock/types'

export default {
  name: 'stock-header',
  data() {
    return {
      startVal: 0,
      decimals: 0,
      duration: 1,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      }
    }
  },
  computed: {
    ...mapState({
      name: state => state.stock.name,
      avatar: state => state.stock.avatar,
      videoLink: state => state.stock.videoLink,
      price: state => state.stock.price,
      priceDayOpen: state => state.stock.priceDayOpen,
      totalShare: state => state.stock.totalShare,
      authed: state => state.user.authed,
    }),
    ...mapGetters({
      code: [CODE],
    }),
    marketValue () {
      return this.totalShare * this.price / 100
    }
  },
  methods: {
    ...mapMutations({
      openDialog: OPEN_LOVE_DIALOG,
    }),
    ...mapActions({
      reloadLoveActivity: RELOAD_LOVE_ACTIVITY,
      reloadMy: RELOAD_MY,
      loadData: RELOAD,
    }),
    openLoveDialog () {
      if (!hidalao()) {
        this.openDialog();
      }
    },
    loveSuccess () {
      this.reloadMy();
      this.reloadLoveActivity();
    },
  },
  watch: {
    code () {
      this.loadData()
    }
  },
  mounted () {
    this.loadData()
  },
  components: {
    'love-dialog': loveDialog,
    'price-change': priceChange,
    'video-avatar': videoAvatar,
    ICountUp
  },
}
</script>

<style scoped>
.stock-name {

}

.stock-code {
  margin-left: 6px;
  font-size: 12px;
  color: #C0C4CC;
}

.price-change {
  margin-left: 10px;
  font-size: 18px;
}

.price-value {
  margin: 10px 0 0 0;
  font-size: 40px;
  line-height: normal;
  transition: color .2s ease-out;
}

@media screen and (max-width: 768px) {
  .values .market-value {
    margin-top: 16px;
    font-size: 16px;
    line-height: normal;
  }

  .values .total-share {
    margin-top: 8px;
    font-size: 16px;
    line-height: normal;
  }
}

.market-value {
  margin-top: 20px;
  font-size: 14px;
  line-height: 14px;
}

.total-share {
  margin-top: 8px;
  font-size: 14px;
  line-height: 14px;
}

.stock-top {
  margin-bottom: 18px;
}

.top span {
  line-height: 28px;
}

.bottom {
  margin-top: 4px;
  line-height: 12px;
}

.button {
  float: right;
}

.image {
  display: block;
  height: 200px;
  background-size: cover;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>
