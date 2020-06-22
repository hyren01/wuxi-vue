<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <!-- re目录 -->
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
                <td class="text-xs-center">{{ reData.item.code }}</td>
                <td class="text-xs-center">{{ reData.item.comments }}</td>
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
    allReList: [],
    allStandardList: [],
    reList: [],
    standardList: [],
    reName: null,
    reId: null,
    standardName: null,
    standardId: null,
    // tables
    pagination: {}, //不分页
    reHeaders: [
      {
        text: '中文名称',
        value: 'name',
        align: 'center',
      },
      {
        text: '英文名称',
        value: 'enName',
        align: 'center',
      },
      {
        text: '短名',
        value: 'code',
        align: 'center',
      },
      {
        text: '备注',
        value: 'comments',
        align: 'center',
      },
    ],
    // tables
    reData: [],
    standardData: [],
    haveCheck: false,
    toSaveData: [],
  }),
  methods: {
    // 查询检测历史
    getHistory() {
      let moudleId = this.$route.query.moudleId
      console.log(moudleId)
      this.$nohttps
        .post('/checkmoudle/getMoudleField?moudleId=' + moudleId)
        .then((res) => {
          if (res.data.resultCode === 'RESULT_SUCCESS') {
            let data = res.data.data
            this.reData = [...data]
          } else {
            this.showSnackbar(res.data.message, 'error')
          }
        })
        .catch((err) => {
          this.showSnackbar('REST服务失败', 'error')
        })
    },
    showSnackbar(text, color) {
      this.snackbar = {
        show: true,
        text: text,
        color: color,
      }
      this.$emit('showSnackbar', this.snackbar)
    },
    backBtn() {
      this.$router.go(-1)
    },
  },
  computed: {},
  mounted() {
    this.getHistory()
  },
}
</script>

<style></style>
