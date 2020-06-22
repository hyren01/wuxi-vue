<template>
  <v-toolbar color="primary" fixed dark app>
    <v-toolbar-side-icon @click.stop="handleDrawerToggle"></v-toolbar-side-icon>
    <!-- hide-details属性使得v-text-field在toolbar居中 -->
    <!-- <v-text-field flat
                      solo-inverted
                      append-icon="search"
                      label="数据资源全文检索"
                      hide-details
                      single-line>
    </v-text-field>-->
    <!-- <v-text-field flat
                      solo-inverted
                      prepend-icon="search"
                      label="Search"
                      class="hidden-sm-and-down">
    </v-text-field>-->
    <v-spacer></v-spacer>
    <!-- <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat
                   href="mailto:wangkai198420022@163.com">
                联系我
            </v-btn>
    </v-toolbar-items>-->
    <!-- <v-btn icon
               href="https://github.com/tookit/vue-material-admin">
            <v-icon>favorite</v-icon>
    </v-btn>-->
    <!-- <v-btn icon
           @click="handleFullScreen()">
      <v-icon>fullscreen</v-icon>
    </v-btn>-->
    <!-- <v-menu offset-y
                origin="center center"
                class="elelvation-1"
                :nudge-bottom="14"
                transition="scale-transition">
            <v-btn icon
                   flat
                   slot="activator">
                <v-badge color="red"
                         overlap>
                    <span slot="badge">3</span>
                    <v-icon medium>notifications</v-icon>
                </v-badge>
            </v-btn>
            <notification-list></notification-list>
    </v-menu>-->
    <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
      <v-btn icon large flat slot="activator">
        <v-avatar size="30px">
          <img src="../assets/user.jpg" alt="user" />
        </v-avatar>
      </v-btn>
      <v-list class="pa-0">
        <v-list-tile
          v-for="(item,index) in items"
          :to="!item.href ? { name: item.name } : null"
          :href="item.href"
          @click="item.click"
          ripple="ripple"
          :disabled="item.disabled"
          :target="item.target"
          rel="noopener"
          :key="index"
        >
          <v-list-tile-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script>
// import NotificationList from '@/components/NotificationList';
import Util from "@/api/utilForAppToolbar";
import Vuex from "vuex";
export default {
  name: "app-toolbar",
  components: {
    // NotificationList,
  },
  data: () => ({
    temp: null,
    items: [
      /* {
        icon: 'account_circle',
        href: '#',
        title: 'Profile',
        click: () => {
          // console.log(e);
        }
      },
      {
        icon: 'settings',
        href: '#',
        title: 'Settings',
        click: () => {
          // console.log(e);
        }
      }, */
      {
        icon: "mdi-logout-variant",
        href: "/",
        title: "Logout",
        click: () => {
          // window.getApp.$emit('APP_LOGOUT');
          /* window.getApp.$router.push({
              name:'/',
          }) */
        }
      }
    ]
  }),
  created() {
    this.funMant();
  },
  computed: {
    // toolbarColor () {
    //     return this.$vuetify.options.extra.mainNav;
    // }
    // ...Vuex.mapGetters(['mant']),
  },
  methods: {
    ...Vuex.mapMutations(["changeLogin"]),
    handleDrawerToggle() {
      window.getApp.$emit("APP_DRAWER_TOGGLED");
    },
    handleFullScreen() {
      Util.toggleFullScreen();
    },
    funMant() {
      this.items[0].click = () => {
        this.changeLogin({ Authorization: "" });
        sessionStorage.clear();
        this.$router.push('/')
        /* sessionStorage.removeItem('Authorization')
        sessionStorage.removeItem('type') */
      };
    }
  }
};
</script>

<style lang="stylus" scoped>



          



                              



                    



                   



                   



                                                                                    



                                                       



                          



                                   



                                          



                                    



                                  



                                  



                       



                     



            



                     



                             



                      



                                  



         



                     



                             



                                                    



                       



                                                         



                       



                    



                          



                   



                                                                   



                                     



                



                   



                                           



                                       



                



                        



                                      



                                    



                                  



                                              



                       



                       



                                    



                                    



                                 



                                               



                                                         



                          



                    



                                                   



                 



                        



                                      



                                  



                                              



                       



                        



                       



                                    



                                      



                                                 



                                              



                           



                    



                                 



                                                          



                                                                          



                                              



                                                



                                            



                                                      



                                                  



                                           



                                          



                                                         



                                                        



                                         



                                         



                                                                               



                                          



                              



                     



                 



                



           



        



                                                             



                              



                



                        



                 



                        



      



                  



                



             



                                       



                          



                                 



                              



                                      



                 



              



             



                                 



                          



                                  



                              



                                      



                 



              



             



                                        



                          



                                



                              



                                                         



                 



             



          



       



               



                            



                                                          



            



      



              



                               



                                                      



          



                             



                                    



         



     



  



         







                            



          



                              



                    



                   



                   



                                                  



                      



                                                                                    



                                                       



                          



                                   



                                          



                                    



                                  



                                  



                       



                             



                                                    



                       



                                                         



                       



                    



                          



                   



                                                                   



                                     



                



                   



                                           



                                       



                



                        



                                      



                                    



                                  



                                              



                       



                       



                                    



                                    



                                 



                                               



                                                         



                          



                    



                                                   



                 



                        



                                      



                                  



                                              



                       



                        



                       



                                    



                                      



                                                 



                                              



                           



                    



                                 



                                                          



                                                                          



                                              



                                                



                                            



                                                      



                                                  



                                           



                                          



                                                         



                                                        



                                         



                                         



                                                                               



                                          



                              



                     



                 



                



           



        



                                                             



                              



                



                        



                 



                        



      



                  



                



             



                                       



                          



                                 



                              



                                      



                 



              



             



                                 



                          



                                  



                              



                                      



                 



              



             



                                        



                          



                                



                              



                                                         



                 



             



          



       



               



                            



                                                          



            



      



              



                               



                                                      



          



                             



                                    



         



     



  



         







                            



// .boder-radius {



//     -webkit-border-radius: 0px; // 适配以webkit为核心的浏览器(chrome、safari等)



//     -moz-border-radius: 0px; // 适配firefox浏览器



//     -ms-border-radius: 0px; // 适配IE浏览器



//     -o-border-radius: 0px; // 适配opera浏览器



//     border-radius: 0px; // 适配所有浏览器(需要放在最后面，类似于if..else if..else..)



// }







// * {



//     -webkit-border-radius: 0 !important;



//     -moz-border-radius: 0 !important;



//     border-radius: 0 !important;



// }



</style>
