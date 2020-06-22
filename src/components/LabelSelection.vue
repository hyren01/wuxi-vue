<template>
  <div class="pa-2">
    <div v-for="(item1,index1) in labelArray"
         :key="item1.id"
         style="border-bottom:#BDBDBD 1px dashed"
         class="pa-1">
      <span>
        <v-chip label
                color="white"
                small
                disabled
                class="grey--text text--darken-2 font-weight-bold">{{item1.list_name}}</v-chip>
      </span>
      <span>
        <v-chip v-for="(item2) in labelArray[index1].list_items"
                :key="item2.id"
                @mouseenter="chipMouseOver(item2)"
                @mouseleave="chipMouseOut(item2)"
                @click="clickThip(item2)"
                label
                small
                :selected="item2.selected"
                :color="item2.chipBgColor"
                :text-color="item2.textColor">{{item2.name}}</v-chip>
        <!-- :class="{ 'elevation-0': item2.selected }" -->
      </span>
    </div>
    <div class="pa-1">
      <span>
        <v-chip label
                color="white"
                small
                disabled
                class="grey--text text--darken-2 font-weight-bold">已选标签</v-chip>
      </span>
      <span v-if="labelSelected.length===0">
        <v-chip label
                color="white"
                small
                disabled
                class="grey--text">暂时没有选择标签</v-chip>
      </span>
      <span v-else>
        <v-chip v-for="(item3) in labelSelected"
                :key="item3.id"
                @input="clickThip2(item3)"
                label
                color="deep-orange"
                small
                text-color="white"
                selected
                close>{{item3.name}}</v-chip>
      </span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

const findLabel = (labelArray, label) => {
  for (let v1 of labelArray) {
    for (let v2 of v1.list_items) {
      if (v2.id === label.id) {
        // console.log('find');
        // console.log(v2,label);
        return v2;
      }
    }
  }
};

export default {
  name: "label-selection",
  //https://cn.vuejs.org/v2/guide/components-custom-events.html#自定义组件的-v-model
  //这里不需要，因为传过来的Array只是一个引用，子组件修改了数组的内容，父组件数组的内容也就修改了，是引用的同一个数组
  // model: {
  //   prop: 'labelSelected',
  //   event: 'click'
  // },
  //v-on:click="$emit('click', $event.target.labelSelected)"
  props: {
    labelArray: {
      type: Array,
      required: true
    },
    labelSelected: {
      type: Array,
      required: true
    },
  },
  data () {
    return {
      // chipShow: []
    }
  },
  created () {
    this.initialize();    //初始化工作实际最后是在watch：labelArray的变化里面完成的，这里只有在调试热加载的时候才会单独调用
    // console.log('this.labelArray.length ： ' + this.labelArray.length);
  },
  watch: {
    labelArray (val) {
      // console.log('watch labelArray');
      this.initialize();
    }
  },
  computed: {
    // chipIndex () {
    //   return 0;
    // },

  },
  methods: {
    // toggleFilter (state) {
    //   this.$emit('toggle', state)
    // },
    // clearAllCompleted () {
    //   this.$emit('clearAllCompleted')
    // },
    initialize () {
      // console.log('this.labelArray.length ： ' + this.labelArray.length);
      for (let v1 of this.labelArray) {
        for (let v2 of v1.list_items) {
          // v2.chipBgColor = 'white';
          Vue.set(v2, 'chipBgColor', 'white');
          Vue.set(v2, 'textColor', 'indigo');
          Vue.set(v2, 'selected', false);
        }
      }
      for (let i = 0; i < this.labelSelected.length; i++) {
        let a = findLabel(this.labelArray, this.labelSelected[i]);
        // console.log(a);
        if (a) {
          // console.log('a finded');
          a.selected = true;
          a.chipBgColor = 'deep-orange';
          a.textColor = 'white';
          this.labelSelected[i] = a;
        }
      }
    },
    chipMouseOver (item) {
      if (!item.selected) {
        item.chipBgColor = 'grey lighten-2';
        item.textColor = 'deep-orange';
      }
    },
    chipMouseOut (item) {
      if (!item.selected) {
        item.chipBgColor = 'white';
        item.textColor = 'indigo';
      }
    },
    clickThip (item) {
      if (item.selected) {
        item.selected = false;
        item.chipBgColor = 'white';
        item.textColor = 'indigo';
        let index = this.labelSelected.indexOf(item);
        this.labelSelected.splice(index, 1);
      } else {
        item.selected = true;
        item.chipBgColor = 'deep-orange';
        item.textColor = 'white';
        // console.log('click true');
        this.labelSelected.push(item);
      }
      // console.log('click');
    },
    clickThip2 (item) {
      // console.log(item);
      let index = this.labelSelected.indexOf(item);
      this.labelSelected.splice(index, 1);
      item.selected = false;
      item.chipBgColor = 'white';
      item.textColor = 'indigo';
      // console.log(this.labelSelected);
      // let a = findLabel(this.labelArray, item);
      // console.log(a);
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>