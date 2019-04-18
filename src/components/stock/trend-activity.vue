<template lang="jade">
el-card(class="box-card trend-activity")
  div(slot="header")
    span 行情走势
  div
    el-radio-group(v-model="chartType" size="mini")
      el-radio-button(label="hour_close") 按小时
      el-radio-button(label="day_close") 按天
    k-line(:chartData="chartData", :options="chartOptions", :height="300")
</template>

<script>
import kLine from '@/components/stock/k-line'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import {
  CODE, TREND_DATA, TREND_LABELS, TREND_LABEL_FOR_TYPE,
  RELOAD_TREND_ACTIVITY, CHANGE_TREND_ACTIVITY ,
  TREND_TYPE, TREND_LIMIT
} from '@/store/stock/types'

export default {
  name: 'trend-activity',
  data() {
    return {
    }
  },
  computed: {
    ...mapState({}),
    ...mapGetters({
      code: [CODE],
      labels: [TREND_LABELS],
      trendData: [TREND_DATA],
      labelForType: [TREND_LABEL_FOR_TYPE],
      type: [TREND_TYPE],
      limit: [TREND_LIMIT],
    }),
    chartType: {
      get () {
        return this.type;
      },
      set (val) {
        this.changeTrend({type: val});
      }
    },
    chartOptions () {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
  				yAxes: [{
  					ticks: {
  						min: 0,
  					}
  				}]
  			}
      }
    },
    chartData () {
      return {
        labels: this.labels,
        datasets: [
          {
            type: 'line',
            label: this.labelForType,
            borderColor: '#409EFF',
            backgroundColor: 'rgb(237, 246, 254)',
            data: this.trendData,
            lineTension: 0
          }
        ]
      }
    },
  },
  methods: {
    ...mapActions({
      loadData: RELOAD_TREND_ACTIVITY,
    }),
    ...mapMutations({
      changeTrend: CHANGE_TREND_ACTIVITY,
    }),
  },
  watch: {
    code () {
      this.loadData()
    },
    type () {
      this.loadData()
    },
    limit () {
      this.loadData()
    },
  },
  mounted () {
    this.loadData()
  },
  components: {
    'k-line': kLine,
  },
}
</script>

<style scoped>
.trend-activity {
  margin-bottom: 18px;
}
</style>
