<script>
import map from 'lodash/map'
import { Line, mixins } from 'vue-chartjs'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],
  data () {
    return {}
  },
  methods: {
  },
  mounted () {
    this.renderChart(this.chartData, this.options);
  }
}
</script>
