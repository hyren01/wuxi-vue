<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <!-- re目录 -->
      <v-flex sm12 md12 xl12>
        <v-widget title="字段信息">
          <div slot="widget-content">
            <!-- <v-layout row wrap >
              <v-flex sm6 md6 xl6 >
                <v-btn @click="checkBtn" color="warning">检测</v-btn>
                <v-btn @click="saveBtn" v-if="haveCheck && reId !== null && standardId !== null " color="info">保存</v-btn>
              </v-flex>
              <v-flex sm6 md6 xl6 >
                <v-combobox
                  v-model="reName"
                  :items="reList"
                  label="请选择"
                  @change="reChange"
                  
                ></v-combobox>
              </v-flex>
            </v-layout> -->
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
                <td class="text-xs-center">
                  <span
                    class="red--text"
                    v-if="reData.item.checkResult === '不符合'"
                    >{{ reData.item.fieldName }}</span
                  >
                  <span
                    class="yellow--text"
                    v-else-if="reData.item.checkResult === '相似'"
                    >{{ reData.item.fieldName }}</span
                  >
                  <span
                    class="green--text"
                    v-else-if="reData.item.checkResult === '符合'"
                    >{{ reData.item.fieldName }}</span
                  >
                  <span v-else>{{ reData.item.fieldName }}</span>
                </td>
                <td class="text-xs-center">
                  <span
                    class="red--text"
                    v-if="reData.item.checkResult === '不符合'"
                    >{{ reData.item.enName }}</span
                  >
                  <span
                    class="yellow--text"
                    v-else-if="reData.item.checkResult === '相似'"
                    >{{ reData.item.enName }}</span
                  >
                  <span
                    class="green--text"
                    v-else-if="reData.item.checkResult === '符合'"
                    >{{ reData.item.enName }}</span
                  >
                  <span v-else>{{ reData.item.enName }}</span>
                </td>
                <td class="text-xs-center">
                  <span
                    class="red--text"
                    v-if="reData.item.checkResult === '不符合'"
                    >{{ reData.item.fieldCode }}</span
                  >
                  <span
                    class="yellow--text"
                    v-else-if="reData.item.checkResult === '相似'"
                    >{{ reData.item.fieldCode }}</span
                  >
                  <span
                    class="green--text"
                    v-else-if="reData.item.checkResult === '符合'"
                    >{{ reData.item.fieldCode }}</span
                  >
                  <span v-else>{{ reData.item.fieldCode }}</span>
                </td>
                <td class="text-xs-center">
                  <span
                    class="red--text"
                    v-if="reData.item.checkResult === '不符合'"
                    >{{ reData.item.checkDate }}</span
                  >
                  <span
                    class="yellow--text"
                    v-else-if="reData.item.checkResult === '相似'"
                    >{{ reData.item.checkDate }}</span
                  >
                  <span
                    class="green--text"
                    v-else-if="reData.item.checkResult === '符合'"
                    >{{ reData.item.checkDate }}</span
                  >
                  <span v-else>{{ reData.item.checkDate }}</span>
                </td>
                <td class="text-xs-center">
                  <span
                    class="red--text"
                    v-if="reData.item.checkResult === '不符合'"
                    >{{ reData.item.checkResult }}</span
                  >
                  <span
                    class="yellow--text"
                    v-else-if="reData.item.checkResult === '相似'"
                    >{{ reData.item.checkResult }}</span
                  >
                  <span
                    class="green--text"
                    v-else-if="reData.item.checkResult === '符合'"
                    >{{ reData.item.checkResult }}</span
                  >
                  <span v-else>{{ (reData.item.checkResult = '未检测') }}</span>
                </td>
                <td class="text-xs-center">
                  <span
                    class="red--text"
                    v-if="reData.item.checkResult === '不符合'"
                    >{{ reData.item.std_cname }}</span
                  >
                  <span
                    class="yellow--text"
                    v-else-if="reData.item.checkResult === '相似'"
                    >{{ reData.item.std_cname }}</span
                  >
                  <span
                    class="green--text"
                    v-else-if="reData.item.checkResult === '符合'"
                    >{{ reData.item.std_cname }}</span
                  >
                  <span v-else>{{ (reData.item.std_cname = '未检测') }}</span>
                </td>
                <td class="text-xs-center">
                  <span
                    class="red--text"
                    v-if="reData.item.checkResult === '不符合'"
                    >{{ reData.item.relate_field_name }}</span
                  >
                  <span
                    class="yellow--text"
                    v-else-if="reData.item.checkResult === '相似'"
                    >{{ reData.item.relate_field_name }}</span
                  >
                  <span
                    class="green--text"
                    v-else-if="reData.item.checkResult === '符合'"
                    >{{ reData.item.relate_field_name }}</span
                  >
                  <span v-else>{{ (reData.item.checkResult = '未检测') }}</span>
                </td>
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
        value: 'fieldName',
        align: 'center',
      },
      {
        text: '英文名称',
        value: 'enName',
        align: 'center',
      },
      {
        text: '短名',
        value: 'fieldCode',
        align: 'center',
      },
      {
        text: '检测时间',
        value: 'checkDate',
        align: 'center',
      },
      {
        text: '检测结果',
        value: 'checkResult',
        align: 'center',
      },
      {
        text: '关联标准',
        value: 'standard',
        align: 'center',
      },
      {
        text: '关联标准字段',
        value: 'standard_field',
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
        .post('/checkmoudle/getCheckMoudleList?moudleId=' + moudleId)
        .then((res) => {
          if (res.data.resultCode === 'RESULT_SUCCESS') {
            let data = res.data.data
            this.reData = data
            for (let i = 0; i < this.reData.length; i++) {
              const element = this.reData[i]
            }
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
