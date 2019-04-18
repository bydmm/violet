<template lang="jade">
  div
    el-row.keyword(:gutter="20")
      el-col.sort-types(
        :lg="18",
        :md="12",
        :sm="12",
        :xs="24",
      )
        el-radio-group(v-model="sortType")
          el-radio-button(
            v-for="type in sortTypes",
            :label="type.label",
            :key="type.label",
          ) {{type.title}}
      el-col(
        :lg="6",
        :md="12",
        :sm="12",
        :xs="24",
      )
        div.search
          el-input(
            v-model="keyword",
            placeholder="搜索",
            :disabled="busy",
            @keyup.enter.native="search")
    el-row(:gutter="20")
      transition-group(name="list" tag="div")
        el-col(
          :lg="6",
          :md="12",
          :sm="12",
          v-for="(stock, index) in stocks",
          :key="stock.code")
          el-card(class="stock-item")
            video-avatar(:poster="stock.avatar", :src="stock.video_link")
            div(class="stock-body")
              span {{ stock.name }}
              div(class="bottom clearfix")
                span(class="price") {{stock.price | pricelize}}
                price-change(class="price-change", :price="stock.price", :priceDayOpen="stock.price_day_open")
                el-button(type="text",class="button", @click="goDetail(stock)") 查看详情
    infinite-loading(@infinite="infiniteHandler")
      span(slot="no-more") 你的老婆还没有上？ QQ群：774800449
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import * as stockAPI from '@/api/stock/'
import videoAvatar from '@/components/stock/video-avatar'
import priceChange from '@/components/stock/price-change'

export default {
  name: 'index',
  data: function() {
    return {
      count: 0,
      stocks: [],
      busy: false,
      page: 1,
      keyword: '',
      cllect: false,
      sortType: 'hot',
      sortTypes: [
        {
          title: '热门排序',
          label: 'hot'
        },
        {
          title: '市值排序',
          label: 'marketValue'
        },
        {
          title: '高价收购',
          label: 'buyPrice'
        },
        {
          title: '低价出让',
          label: 'salePrice'
        },
        {
          title: '特别关注',
          label: 'selected'
        },
      ],
    }
  },
  computed: {
    scrollDisabled () {
      // console.log(this.count, this.stocks.length, this.busy);
      return this.count <= this.stocks.length || this.busy
    },
    title () {
      for (var i = 0; i < this.sortTypes.length; i++) {
        if (this.sortTypes[i].label == this.sortType) {
          return this.sortTypes[i].title;
        }
      }
    }
  },
  methods: {
    goDetail (stock) {
      this.$router.push({name: 'stock', params: { code: stock.code }})
    },
    infiniteHandler ($state) {
      stockAPI.getList(this.sortType, this.keyword, this.page).then(res => {
        this.stocks = this.stocks.concat(res.data);
        this.count = res.count;
        this.page += 1;
        $state.loaded();
        if (this.count <= this.stocks.length) {
          $state.complete();
        }
      })
    },
    load () {
      this.busy = true;
      this.page = 1;
      stockAPI.getList(this.sortType, this.keyword, this.page).then(res => {
        this.stocks = res.data
        this.count = res.count;
        this.busy = false;
        this.page += 1;
      })
    },
    search () {
      this.load()
    }
  },
  watch: {
    sortType: function (val) {
      this.load()
    }
  },
  beforeMount: function () {
    // this.load();
  },
  components: {
    'video-avatar': videoAvatar,
    'price-change': priceChange,
    InfiniteLoading,
  },
  metaInfo () {
    return {
      title: `${this.title} - 二次元虚拟人物交易所 - 援力满满`,
      meta: [
        { name: 'description', content: '交易所首页，呈现各种老婆的地方' }
      ]
    }
  },
}
</script>

<style>
.stock-item .el-card__body {
  padding: 0;
}
.infinite-status-prompt {
  padding: 0 !important;
  margin: 10px 0 10px 0;
}
</style>

<style scoped>
.keyword {
  margin-bottom: 14px;
}

.stock-item {
  margin-bottom: 20px;
}

.stock-body {
  padding: 14px;
}

.price {
  font-size: 14px;
  line-height: 17px;
}

.price-change {
  margin-left: 10px;
  font-size: 14px;
  line-height: 17px;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}

.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
}

@media screen and (max-width: 768px) {
  .image {
    height: 200px;
  }
  .sort-types {
    margin-bottom: 14px;
  }
}
</style>
