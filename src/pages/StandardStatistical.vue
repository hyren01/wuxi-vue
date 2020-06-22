<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <!-- mini statistic start -->
        <v-flex lg3 sm3 xs3>
          <mini-statistic
            icon="mdi-shape"
            :title="exist"
            sub-title="现有模型数"
            color="indigo"
          >
          </mini-statistic>
        </v-flex>
        <v-flex lg3 sm3 xs3>
          <mini-statistic
            icon="mdi-shape"
            :title="detected"
            sub-title="已检测模型数"
            color="red"
          >
          </mini-statistic>
        </v-flex>
        <v-flex lg3 sm3 xs3>
          <mini-statistic
            icon="mdi-shape"
            :title="standardModels"
            sub-title="现有标准模型数"
            color="light-blue"
          >
          </mini-statistic>
        </v-flex>
        <v-flex lg3 sm3 xs3>
          <mini-statistic
            icon="mdi-shape"
            :title="standardFields"
            sub-title="现有标准字段数"
            color="purple"
          >
          </mini-statistic>
        </v-flex>
        <!-- mini statistic  end -->
        <!-- <v-layout row wrap justify-center>
                <v-flex lg6
                  sm6
                  xs6>
            <v-widget title="标准数量统计"
                      content-bg="white">
              <div slot="widget-content">
                <div id="echarts-bar1"
                    style="height:400px;width:100%"></div>
              </div>
            </v-widget>
          </v-flex>
          <v-flex lg6
                  sm6
                  xs6>
            <v-widget title="码表数量统计"
                      content-bg="white">
              <div slot="widget-content">
                <div id="echarts-bar2"
                    style="height:400px;width:100%">1111</div>
              </div>
            </v-widget>
          </v-flex>
          <v-flex lg6
                  sm6
                  xs6>
            <v-widget title="检测数量统计"
                      content-bg="white">
              <div slot="widget-content">
                <div id="echarts-bar3"
                    style="height:400px;width:100%">1111</div>
              </div>
            </v-widget>
          </v-flex>
          <v-flex lg6
                  sm6
                  xs6>
            <v-widget title="导入文档数量统计"
                      content-bg="white">
              <div slot="widget-content">
                <div id="echarts-bar4"
                    style="height:400px;width:100%">1111</div>
              </div>
            </v-widget>
          </v-flex>
        </v-layout> -->
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// import API from '@/api';
import MiniStatistic from '@/components/widgets/MiniStatistic'
// import colors from 'vuetify/es5/util/colors';
import barExample from '@/api/barExample.js'
import pieExample from '@/api/pieExample.js'
import { databaseLocation } from '@/api/dictionary.js'

// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts')
// 引入柱状图、饼图、线图
require('echarts/lib/chart/bar')
// require("echarts/lib/chart/line");
require('echarts/lib/chart/pie')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

//可视化echarts在浏览器窗口大小变化时自适应改变大小
;+(function() {
  const throttle = function(type, name, obj) {
    obj = obj || window
    let running = false
    let func = function() {
      if (running) {
        return
      }
      running = true
      requestAnimationFrame(function() {
        obj.dispatchEvent(new CustomEvent(name))
        running = false
      })
    }
    obj.addEventListener(type, func)
  }
  /* init - you can init any event */
  // throttle('resize', 'optimizedResize');
})()

export default {
  components: {
    MiniStatistic,
  },
  data: () => ({
    exist: '',
    detected: '',
    standardModels: '',
    standardFields: '',
    // chartInstance: null,
    // chartInstance1: null,
    // chartInstance2: null,
    // chartInstance3: null,
  }),
  computed: {},
  //执行顺序是先created()然后mounted()
  created() {
    // console.log('created');
    this.initialize()
  },
  mounted() {
    // console.log('mounted');
    this.resizeCharts()
    const _this = this
    let menu = [
      { name: 'exist', url: '/statist/existModels' },
      { name: 'detected', url: '/statist/detectedModels' },
      { name: 'standardModels', url: '/statist/standardModels' },
      { name: 'standardFields', url: '/statist/standardFields' },
    ]
    menu.forEach((item) => {
      this.$nohttps
        .get(item.url)
        .then((res) => {
          let number = String(res.data.data[0])
          this[item.name] = number
        })
        .catch(function(error) {
          _this.showSnackbar(error, 'error')
        })
    })
    this.drawBar1()
  },
  beforeDestroy() {
    this.clean()
  },
  methods: {
    showSnackbar(text, color) {
      this.snackbar = {
        show: true,
        text: text,
        color: color,
      }
      this.$emit('showSnackbar', this.snackbar)
    },
    initialize() {},
    //可视化echarts在浏览器窗口大小变化时自适应改变大小的清理函数
    clean() {
      // window.removeEventListener('resize', this.chartInstance.resize);
      // this.chartInstance.clear();
      // this.chartInstance2.clear();
    },
    //可视化echarts在浏览器窗口大小变化时自适应改变大小
    resizeCharts() {
      window.addEventListener('optimizedResize', (e) => {
        setTimeout((_) => {
          //echarts.init返回几个Instance就必须在这里写几个Instance，才能自动调整大小
          // this.chartInstance.resize();
          // this.chartInstance2.resize();
        }, 100)
      })
    },
    drawBar1() {
      // 基于准备好的dom，初始化echarts实例
      /* this.chartInstance = echarts.init(document.getElementById('echarts-bar1'));
      this.chartInstance1 = echarts.init(document.getElementById('echarts-bar2'));
      this.chartInstance2 = echarts.init(document.getElementById('echarts-bar3'));
      this.chartInstance3 = echarts.init(document.getElementById('echarts-bar4')); */
      // let option2 = JSON.parse(json);
      // 绘制图表
      // console.log(barExample);
      /*     this.chartInstance.setOption(barExample);
      this.chartInstance1.setOption(barExample);
      this.chartInstance2.setOption(barExample);
      this.chartInstance3.setOption(barExample); */
    },
    drawPie1() {
      // 基于准备好的dom，初始化echarts实例
      /* this.chartInstance2 = echarts.init(document.getElementById('echarts-pie1'));
      // let option2 = JSON.parse(json);
      // 绘制图表
      this.chartInstance2.setOption(pieExample); */
    },
  },
}
</script>
