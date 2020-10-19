<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <!-- mini statistic start -->
        <v-flex lg3 sm3 xs3>
          <mini-statistic icon="mdi-shape" :title="exist" sub-title="现有模型数" color="indigo"></mini-statistic>
        </v-flex>
        <v-flex lg3 sm3 xs3>
          <mini-statistic icon="mdi-shape" :title="detected" sub-title="已检测模型数" color="red"></mini-statistic>
        </v-flex>
        <v-flex lg3 sm3 xs3>
          <mini-statistic
            icon="mdi-shape"
            :title="standardModels"
            sub-title="现有标准模型数"
            color="light-blue"
          ></mini-statistic>
        </v-flex>
        <v-flex lg3 sm3 xs3>
          <mini-statistic
            icon="mdi-shape"
            :title="standardFields"
            sub-title="现有标准字段数"
            color="purple"
          ></mini-statistic>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex sm12 md4 xl3>
          <v-widget title="标准目录">
            <div slot="widget-content">
              <v-treeview
                style="cursor:pointer"
                v-model="newtree"
                :open.sync="open"
                :items="newfolderItems"
                activatable
                active-class="grey lighten-3 indigo--text"
                transition
              >
                <template v-slot:prepend="{ item, open }">
                  <v-icon v-if="item.children">
                    {{
                    open ? 'mdi-folder-open' : 'mdi-folder'
                    }}
                  </v-icon>
                  <v-icon v-else>mdi-folder-outline</v-icon>
                </template>
                <template v-slot:label="{ item }">
                  <div :title="item.name" @click="stdcatSelect(item)">{{ item.name }}</div>
                </template>
              </v-treeview>
            </div>
          </v-widget>
        </v-flex>
        <v-flex sm12 md8 xl9>
          <v-widget title="标准具体统计">
            <div slot="widget-content">
              <div slot="widget-content">
                <div class="layout">
                  <div class="ml-3 my-3">目录名称</div>
                  <v-spacer></v-spacer>
                  <div class="grey--text mr-3 my-3 text--darken-2">{{ everystdcat.name }}</div>
                </div>
                <v-divider></v-divider>
                <div class="layout">
                  <div class="ml-3 my-3">目录ID</div>
                  <v-spacer></v-spacer>
                  <div class="grey--text mr-3 my-3 text--darken-2">{{ everystdcat.id}}</div>
                </div>
                <v-divider></v-divider>

                <div class="layout">
                  <div class="ml-3 my-3">目录下标准模型数</div>
                  <v-spacer></v-spacer>
                  <div class="grey--text mr-3 my-3 text--darken-2">{{ everystdcat.stdmodelcount }}</div>
                </div>
                <v-divider></v-divider>
                <div class="layout">
                  <div class="ml-3 my-3">目录下标准字段数</div>
                  <v-spacer></v-spacer>
                  <div class="grey--text mr-3 my-3 text--darken-2">{{ everystdcat.stdfieldcount }}</div>
                </div>
                <v-divider></v-divider>
              </div>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>

      <!-- <v-layout row wrap>
        <v-flex sm12 md4 xl3>
          <v-widget title="模型目录">
            <div slot="widget-content">
              <v-treeview
                style="cursor:pointer"
                v-model="newtree"
                :open.sync="open"
                :items="newfolderItems"
                activatable
                active-class="grey lighten-3 indigo--text"
                transition
              >
                <template v-slot:prepend="{ item, open }">
                  <v-icon v-if="item.children">
                    {{
                    open ? 'mdi-folder-open' : 'mdi-folder'
                    }}
                  </v-icon>
                  <v-icon v-else>mdi-folder-outline</v-icon>
                </template>
                <template v-slot:label="{ item }">
                  <div :title="item.name" @click="modelcatSelect(item)">{{ item.name }}</div>
                </template>
              </v-treeview>
            </div>
          </v-widget>
        </v-flex>
        <v-flex sm12 md8 xl9>
          <v-widget title="模型具体统计">
            <div slot="widget-content">
              <div slot="widget-content">
                <div class="layout">
                  <div class="ml-3 my-3">目录名称</div>
                  <v-spacer></v-spacer>
                  <div class="grey--text mr-3 my-3 text--darken-2">{{ everymodelcat.name }}</div>
                </div>
                <v-divider></v-divider>
                <div class="layout">
                  <div class="ml-3 my-3">目录ID</div>
                  <v-spacer></v-spacer>
                  <div class="grey--text mr-3 my-3 text--darken-2">{{ everymodelcat.id}}</div>
                </div>
                <v-divider></v-divider>
                <div class="layout">
                  <div class="ml-3 my-3">目录下模型数</div>
                  <v-spacer></v-spacer>
                  <div class="grey--text mr-3 my-3 text--darken-2">{{ everymodelcat.modelcount }}</div>
                </div>
                <v-divider></v-divider>
                <div class="layout">
                  <div class="ml-3 my-3">目录下已检测模型数</div>
                  <v-spacer></v-spacer>
                  <div class="grey--text mr-3 my-3 text--darken-2">{{ everymodelcat.okmodelcount }}</div>
                </div>
                <v-divider></v-divider>
              </div>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>-->
    </v-container>
  </div>
</template>

<script>
// import API from '@/api';
import MiniStatistic from "@/components/widgets/MiniStatistic";
// import colors from 'vuetify/es5/util/colors';
import barExample from "@/api/barExample.js";
import pieExample from "@/api/pieExample.js";
import { databaseLocation } from "@/api/dictionary.js";

import VWidget from "@/components/VWidget";
import Util from "@/api/utilForDirectoryModification";
// import TreeSelect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
// import VuePerfectScrollbar from "vue-perfect-scrollbar";
import qs from "qs";
// import Upload from "@/components/image-upload";
import { toTreeData, dealChildren } from "@/plugins/tools";

// 引入 ECharts 主模块
let echarts = require("echarts/lib/echarts");
// 引入柱状图、饼图、线图
require("echarts/lib/chart/bar");
// require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

//可视化echarts在浏览器窗口大小变化时自适应改变大小
+(function() {
  const throttle = function(type, name, obj) {
    obj = obj || window;
    let running = false;
    let func = function() {
      if (running) {
        return;
      }
      running = true;
      requestAnimationFrame(function() {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };
  /* init - you can init any event */
  // throttle('resize', 'optimizedResize');
})();

export default {
  components: {
    MiniStatistic,
    VWidget
    // TreeSelect,
    // VuePerfectScrollbar,
    // Upload
  },
  data: () => ({
    exist: "",
    detected: "",
    standardModels: "",
    standardFields: "",
    newtree: [],
    open: [],
    newfolderItems: [],
    everystdcat: {
      name: "",
      id: "",
      // modelcount: "",
      // okmodelcount: "",
      stdmodelcount: "",
      stdfieldcount: ""
    },
    everymodelcat: {
      name: "",
      id: "",
      modelcount: "",
      okmodelcount: ""
      // stdmodelcount: "",
      // stdfieldcount: ""
    }

    // chartInstance: null,
    // chartInstance1: null,
    // chartInstance2: null,
    // chartInstance3: null,
  }),
  computed: {},
  //执行顺序是先created()然后mounted()
  created() {
    // console.log('created');
    this.initialize();
    this.getCategory();
  },
  mounted() {
    // console.log('mounted');
    this.resizeCharts();
    const _this = this;
    let menu = [
      { name: "exist", url: "/statist/existModels" },
      { name: "detected", url: "/statist/detectedModels" },
      { name: "standardModels", url: "/statist/standardModels" },
      { name: "standardFields", url: "/statist/standardFields" }
    ];
    menu.forEach(item => {
      this.$nohttps
        .get(item.url)
        .then(res => {
          let number = String(res.data.data[0]);
          this[item.name] = number;
        })
        .catch(function(error) {
          _this.showSnackbar(error, "error");
        });
    });
    this.drawBar1();
  },

  beforeDestroy() {
    this.clean();
  },
  methods: {
    getCategory() {
      const attr = {
        id: "id",
        parentId: "parentId",
        name: "name"
      };
      this.$nohttps
        .post("/category/getAllCategory")
        .then(response => {
          const data = JSON.parse(JSON.stringify(response.data.data)).sort(
            (a, b) => a.pxh - b.pxh
          );
          console.log(data);
          this.newfolderItems = toTreeData(data, attr);
          console.log(this.newfolderItems);
        })
        .catch(function(error) {});
    },
    stdcatSelect(item) {
      this.everystdcat.name = item.name;
      this.everystdcat.id = item.id;
      this.everystdcat.stdmodelcount = "loading...";
      this.everystdcat.stdfieldcount = "loading...";
      this.standardModelsByCategoryId(item.id);
      this.standardFieldsByCategoryId(item.id);
    },
    standardModelsByCategoryId(id) {
      var data = {
        categoryid: id
      };
      this.$nohttps
        .post("/statist/standardModelsByCategoryId", data)
        .then(response => {
          debugger;
          this.everystdcat.stdmodelcount = response.data.data[0];
        })
        .catch(function(error) {});
    },
    standardFieldsByCategoryId(id) {
      var data = {
        categoryid: id
      };
      this.$nohttps
        .post("/statist/standardFieldsByCategoryId", data)
        .then(response => {
          debugger;
          this.everystdcat.stdfieldcount = response.data.data[0];
        })
        .catch(function(error) {});
    },
    showSnackbar(text, color) {
      this.snackbar = {
        show: true,
        text: text,
        color: color
      };
      this.$emit("showSnackbar", this.snackbar);
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
      window.addEventListener("optimizedResize", e => {
        setTimeout(_ => {
          //echarts.init返回几个Instance就必须在这里写几个Instance，才能自动调整大小
          // this.chartInstance.resize();
          // this.chartInstance2.resize();
        }, 100);
      });
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
    }
  }
};
</script>
