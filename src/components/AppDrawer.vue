<template>
  <v-navigation-drawer
    id="appDrawer"
    :mini-variant.sync="mini"
    fixed
    :dark="$vuetify.dark"
    app
    v-model="drawer"
    width="260"
  >
    <v-toolbar color="primary darken-1" dark>
      <!-- img标签的相对路径引用将会被webpack处理，根据图片文件大小有可能会被打包成base64放入js中 -->
      <!-- <img src="../assets/logo3.png"
                 height="36"
      alt="Vue Material Admin Template">-->
      <img :src="require('../assets/logo.svg')" height="36" alt="Vue Material Admin Template" />
      <!-- <v-icon>home</v-icon> -->
      <v-toolbar-title class="ml-0 pl-3">
        <span class="hidden-sm-and-down">数据标准管理</span>
      </v-toolbar-title>
    </v-toolbar>
    <vue-perfect-scrollbar class="drawer-menu--scroll" :settings="scrollSettings">
      <v-list dense expand>
        <template v-for="(item) in menuList">
          <!--group with subitems 以下包含2级菜单。传入的json数据结构中，items数组、header、divider不可以同时出现-->
          <v-list-group
            v-if="item.items"
            :key="item.path"
            :prepend-icon="item.icon"
            no-action="no-action"
          >
            <v-list-tile slot="activator" ripple="ripple">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <template v-for="(subItem, i) in item.items">
              <!--child item 在例子代码中还有sub group，可以用同样的方式支持3级子菜单，这里只有2级菜单-->
              <!-- target指定为_blank表示在新窗口打开 -->
              <!-- :to="genChildTarget(item, subItem)" 暂时取消 -->
              <v-list-tile
                :key="i"
                :to="subItem.path"
                rel="noopener"
                exact
              >
                <v-list-tile-content>
                  <v-list-tile-title>
                    <span>{{ subItem.title }}</span>
                  </v-list-tile-title>
                </v-list-tile-content>
                <!-- v-list-tile-action 效果是添加菜单名字后的图标，这里没有使用 -->
                <!-- <v-list-tile-action v-if="subItem.action">
                                    <v-icon :class="[subItem.actionClass || 'success--text']">{{ subItem.action }}</v-icon>
                </v-list-tile-action>-->
              </v-list-tile>
            </template>
          </v-list-group>
          <!-- <v-subheader v-else-if="item.header" :key="i">{{ item.header }}</v-subheader>
          <v-divider v-else-if="item.divider" :key="i"></v-divider>-->
          <!--top-level link 以下是1级菜单-->
          <!-- <a> 标签的 rel 属性用于指定当前文档与被链接文档的关系。Google 使用 "nofollow"，用于指定 Google 搜索引擎不要跟踪链接。 -->
          <v-list-tile
            v-else
            :to="item.path"
            rel="noopener"
            :key="item.path"
            exact
          >
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            <!-- v-list-tile-action 效果是添加菜单名字后的图标，这里没有使用 -->
            <!-- <v-list-tile-action v-if="item.subAction">
                            <v-icon class="success--text">{{ item.subAction }}</v-icon>
            </v-list-tile-action>-->
          </v-list-tile>
        </template>
      </v-list>
    </vue-perfect-scrollbar>
  </v-navigation-drawer>
</template>
<script>
import menu from "@/api/menu"; // 左侧菜单数据输入
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import Vuex from "vuex";
export default {
  name: "app-drawer",
  components: {
    VuePerfectScrollbar
  },
  props: {
    // expanded: {
    //     type: Boolean,
    //     default: true
    // },
  },
  data: () => ({
    mini: false,
    drawer: true, // 控制左侧导航可见性
    menus: menu, // 左侧菜单数据输入
    scrollSettings: {
      maxScrollbarLength: 160
    }
  }),
  computed: {
    // computeLogo () {
    //   //动态引用方式需要将m.png图片放入public文件夹，
    //   //静态文件src引用直接写<img src="../../static/m.png>"
    //   return `${process.env.BASE_URL}img/m.png`;
    // }
    ...Vuex.mapGetters(["menuList"])
  },
  created() {
    //切换左侧菜单的隐藏状态，处理自定义的菜单隐藏事件APP_DRAWER_TOGGLED
    window.getApp.$on("APP_DRAWER_TOGGLED", () => {
      this.drawer = !this.drawer;
    });
  },
  mounted() {
    // console.log('菜单列表', this.menuList)
  },
  methods: {
    genChildTarget(item, subItem) {
      //从菜单的json数组中创建vue-router的linkto对象
      if (subItem.href) return;
      if (subItem.component) {
        return {
          name: subItem.component
        };
      }
      return { name: `${item.group}/${subItem.name}` };
    }
  }
};
</script>


<style lang="stylus">
#appDrawer {
  overflow: hidden;

  .drawer-menu--scroll {
    height: calc(100vh - 48px);
    overflow: auto;
  }
}
</style>