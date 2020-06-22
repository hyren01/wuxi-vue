<template>
  <div id="appRoot">
    <template>
      <!-- v-if="Authorization" -->
      <v-app id="inspire" v-if="!$route.meta.public" class="app">
        <!-- app-drawer是左侧边栏和logo -->
        <app-drawer class="app--drawer"></app-drawer>
        <!-- app-toolbar是右侧顶部导航条 -->
        <app-toolbar class="app--toolbar"></app-toolbar>
        <v-content>
          <!-- Page Header 面包屑导航-->
          <page-header v-if="$route.meta.breadcrumb" @routerRefreshEvent="routerRefresh"></page-header>
          <!-- <div class="page-wrapper"> -->
          <div :class="$route.meta.breadcrumb ? 'page-wrapper' : 'page-wrapper2'">
            <router-view
              @showSnackbar="snackbarShow"
              :key="routerKey"
              v-if="!this.$route.meta.keepAlive"
            />
            <keep-alive>
              <router-view v-if="this.$route.meta.keepAlive" />
            </keep-alive>
          </div>
          <!-- App Footer 右侧底部footer-->
          <v-footer height="auto" class="white pa-3 app--footer">
            <span class="caption">wangkai Design &copy; 2018-2019</span>
            <v-spacer></v-spacer>
            <span class="caption mr-1">江南计算技术研究所</span>
          </v-footer>
        </v-content>
        <v-btn
          small
          fab
          dark
          falt
          fixed
          top="top"
          right="right"
          class="setting-fab"
          color="red"
          @click="openThemeSettings"
        >
          <v-icon>settings</v-icon>
        </v-btn>
        <v-navigation-drawer
          class="setting-drawer"
          temporary
          right
          v-model="rightDrawer"
          hide-overlay
          fixed
        >
          <theme-settings></theme-settings>
        </v-navigation-drawer>
      </v-app>
      <template v-else>
        <transition>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </template>
    </template>
    <v-snackbar
      class="mt-3"
      :timeout="3000"
      top
      :color="snackbar.color"
      v-model="snackbar.show"
      multi-line
    >
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import AppDrawer from "@/components/AppDrawer";
import AppToolbar from "@/components/AppToolbar";
import PageHeader from "@/components/PageHeader";
import ThemeSettings from "@/components/ThemeSettings";
import Login from "@/components/Login.vue";
// import Snackbar from 'vuejs-snackbar';
import Vuex from "vuex";

export default {
  name: "App",
  components: {
    AppDrawer,
    AppToolbar,
    PageHeader,
    ThemeSettings,
  },
  data() {
    return {
      rightDrawer: false,
      snackbar: {
        show: false,
        text: "",
        color: ""
      },
      snackbarColors: {
        open: "#4CAF50",
        info: "#2196F3",
        error: "#FF5252",
        warn: "#FB8C00"
      },
      // snackbarClass: '',
      routerKey: 1
    };
  },
  computed: {
    Authorization() {
      return this.$store.getters.Authorization;
    },
    ...Vuex.mapGetters(["routerList"])
  },
  created() {
    window.getApp = this; //保存App对象，就是Vue实例（var vm=new Vue()），window.getApp===App===this

    Date.prototype.format = function(fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return fmt;
    };
  },
  mounted() {
    window.addEventListener("unload", this.saveState);
  },
  methods: {
    openThemeSettings() {
      this.$vuetify.goTo(0);
      this.rightDrawer = !this.rightDrawer;
    },
    snackbarShow(data) {
      this.snackbar = data;
    },
    routerRefresh() {
      this.routerKey = new Date().getTime();
      console.log("refresh2");
    },
    saveState() {
      sessionStorage.setItem("state", JSON.stringify(this.$store.state));
    }
  }
};
</script>

<style lang="stylus" scoped>
.setting-fab {
  top: 50% !important;
  right: 0;
  border-radius: 0;
}

.page-wrapper {
  min-height: calc(100vh - 50px - 64px - 84px);
  // min-height: calc(100vh - 64px - 50px - 81px);
}

.page-wrapper2 {
  min-height: calc(100vh - 50px - 64px);
  // min-height: calc(100vh - 64px - 50px - 81px);
}
</style>
