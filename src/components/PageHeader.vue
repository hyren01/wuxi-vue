<template>
  <v-layout row
            class="align-center layout px-4 pt-4 app--page-header">
    <div class="page-header-left">
      <h3 class="pr-3">{{breadcrumbs[breadcrumbs.length - 1].text}}</h3>
    </div>
    <!-- <v-breadcrumbs divider="-">
            <v-breadcrumbs-item>
                <v-icon larg>home</v-icon>
            </v-breadcrumbs-item>
            <v-breadcrumbs-item v-for="(item,key) in breadcrumbs"
                                :key="key">
                {{ item }}
            </v-breadcrumbs-item>
        </v-breadcrumbs> -->
    <v-breadcrumbs :items="breadcrumbs"
                   divider=">">
      <!-- <v-icon slot="divider">forward</v-icon> -->
      <template slot="item"
                slot-scope="props">
        <a v-if="props.item.home"
           :href="props.item.href"
           :class="[props.item.disabled && 'disabled','v-breadcrumbs__item']">
          <i aria-hidden="true"
             class="v-icon material-icons">home</i>
          <!-- <v-icon>home</v-icon> -->
        </a>
        <a v-else
           :href="props.item.href"
           :class="[props.item.disabled && 'disabled','v-breadcrumbs__item']">{{ props.item.text }}
        </a>
      </template>
    </v-breadcrumbs>
    <v-spacer></v-spacer>
    <div class="page-header-right">
      <v-btn icon>
        <v-icon class="text--secondary"
                @click="refresh">refresh</v-icon>
      </v-btn>
    </div>
  </v-layout>
</template>

<script>
import menu from '@/api/menu';
export default {
  data () {
    return {
      // title: ''
    };
  },
  computed: {
    breadcrumbs: function () {
      let breadcrumbs = [{
        text: '',
        disabled: false,
        href: 'javascript:void(0);',
        home: true
      }];
      menu.forEach(item => {
        if (item.items) {
          let child = item.items.find(i => {
            return i.component === this.$route.name;
          });
          if (child) {
            breadcrumbs.push({
              text: item.title,
              disabled: false,
              href: 'javascript:void(0);'
            });
            breadcrumbs.push({
              text: child.title,
              disabled: true,
              href: 'javascript:void(0);',
            });
          }
        } else {
          if (item.name === this.$route.name) {
            breadcrumbs.push({
              text: item.title,
              disabled: true,
              href: 'javascript:void(0);',
            })
          }
        }
      });
      return breadcrumbs;
    },
  },
  methods: {
    refresh () {
      this.$emit("routerRefreshEvent");
    }
  }
};
</script>

<style lang="stylus" scoped>
.disabled {
  color: grey;
  pointer-events: none;
}
</style>

