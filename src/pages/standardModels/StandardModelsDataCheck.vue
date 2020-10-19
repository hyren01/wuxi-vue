<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12 md12 xl12>
        <v-widget title="字段信息">
          <div slot="widget-content">
            <!-- 数据table -->
            <v-layout row wrap>
              <v-flex sm12 md12 x12>
                <v-icon @click="backBtn" color="info" style="margin-left:1120px"
                  >mdi-arrow-left</v-icon
                >
              </v-flex>
            </v-layout>
            <v-data-table
              :headers="reHeaders"
              :items="reData"
              class="elevation-1"
              hide-actions
            >
              <template v-slot:items="reData">
                <td class="text-xs-center">{{ reData.item.name }}</td>
                <td class="text-xs-center">{{ reData.item.enName }}</td>
              </template>
            </v-data-table>
          </div>
        </v-widget>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import VWidget from '@/components/VWidget'
import qs from 'qs'
export default {
  name: 'standar-detection',
  components: {
    VWidget,
  },
  data: () => ({
    reHeaders: [
      {
        text: '字段名称',
        value: 'name',
        align: 'center',
      },
      {
        text: '检测结果',
        value: 'enName',
        align: 'center',
      },
    ],
    reData: []
  }),
  methods: {
    // 查询检测历史
    getList() {
      let data = this.$route.params.data
      console.log(data);
      if(data && data.length){
        this.reData = data.map(item => {
          item.enName = '为空数：' + item.nullNum + ', 字段长度大于：' + item.overLenNum + ', 码值不符合：' + item.notInCodeNum 
          return item
        })
      }
    },
    backBtn() {
      this.$router.go(-1)
    },
  },
  computed: {},
  mounted() {
    this.getList()
  },
}
</script>

<style></style>
