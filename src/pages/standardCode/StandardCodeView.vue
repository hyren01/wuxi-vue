<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex md12 class="align-center layout px-4 pt-4">
        <div class="page-header-left">
          <h3 class="pr-3">{{ this.hTitle }}</h3>
        </div>
        <v-spacer></v-spacer>
        <div class="page-header-right">
          <v-btn icon>
            <v-icon class="text--secondary" @click="back"
              >mdi-arrow-left</v-icon
            >
          </v-btn>
        </div>
      </v-flex>
      <v-flex sm12 md4 xl3>
        <v-widget title="标准信息">
          <div slot="widget-content">
            <vue-perfect-scrollbar
              :settings="scrollSettings"
              style="max-height:400px"
            >
              <v-expansion-panel popout>
                <v-expansion-panel-content
                  v-for="(item, i) in tableData1"
                  :key="i"
                >
                  <template v-slot:header>
                    <div>{{ item.name }}</div>
                  </template>
                  <v-card>
                    <div class="layout">
                      <div class="ml-4 my-3 font-weight-Regular">
                        标准中文名
                      </div>
                      <v-spacer></v-spacer>
                      <div class="grey--text mr-4 my-3 text--darken-2">
                        {{ item.name }}
                      </div>
                    </div>
                    <v-divider></v-divider>
                    <div class="layout">
                      <div class="ml-4 my-3 font-weight-Regular">
                        标准英文名
                      </div>
                      <v-spacer></v-spacer>
                      <div class="grey--text mr-4 my-3 text--darken-2">
                        {{ item.enName }}
                      </div>
                    </div>
                    <v-divider></v-divider>
                    <div class="layout">
                      <div class="ml-4 my-3 font-weight-Regular">定义</div>
                      <v-spacer></v-spacer>
                      <div class="grey--text mr-4 my-3 text--darken-2">
                        {{ item.description }}
                      </div>
                    </div>
                    <v-divider></v-divider>
                    <div class="layout">
                      <div class="ml-4 my-3 font-weight-Regular">创建者</div>
                      <v-spacer></v-spacer>
                      <div class="grey--text mr-4 my-3 text--darken-2">
                        {{ item.createPerson }}
                      </div>
                    </div>
                    <v-divider></v-divider>
                    <div class="layout">
                      <div class="ml-4 my-3 font-weight-Regular">创建时间</div>
                      <v-spacer></v-spacer>
                      <div class="grey--text mr-4 my-3 text--darken-2">
                        {{ item.createTime }}
                      </div>
                    </div>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" flat @click="preview(item.id)"
                        >查看</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </vue-perfect-scrollbar>
          </div>
        </v-widget>
      </v-flex>
      <v-flex sm8 md8 x8>
        <v-widget title="码表信息">
          <div slot="widget-content">
            <v-card-title>
              <v-dialog v-model="modelDialog" max-width="1000px">
                <v-widget title="编辑">
                  <div slot="widget-content">
                    <v-data-table
                      :headers="headers3"
                      :items="reData2"
                      v-model="selected"
                      class="elevation-1"
                      :pagination.sync="pagination"
                      hide-actions
                    >
                      <template v-slot:headers="props">
                        <tr>
                          <th>
                            <v-checkbox
                              :input-value="props.all"
                              :indeterminate="props.indeterminate"
                              primary
                              hide-details
                              readonly
                            ></v-checkbox>
                          </th>
                          <th
                            v-for="header in props.headers"
                            :key="header.text"
                            :class="[
                              'column sortable',
                              pagination.descending ? 'desc' : 'asc',
                              header.value === pagination.sortBy
                                ? 'active'
                                : '',
                            ]"
                            @click="changeSort(header.value)"
                          >
                            <!-- <v-icon small>arrow_upward</v-icon> -->
                            {{ header.text }}
                          </th>
                        </tr>
                      </template>
                      <template v-slot:items="props">
                        <tr
                          :active="props.selected"
                          @click="props.selected = !props.selected"
                        >
                          <td>
                            <v-checkbox
                              true-value="pick"
                              false-value="nopick"
                              primary
                              v-model="props.item.check"
                              hide-details
                              readonly
                            ></v-checkbox>
                          </td>
                          <td>{{ props.index + 1 }}</td>
                          <td>{{ props.item.name }}</td>
                          <td>{{ props.item.enName }}</td>
                          <td>{{ props.item.code }}</td>
                          <td>{{ props.item.type }}</td>
                          <td>{{ props.item.maxsize }}</td>
                          <td>{{ props.item.range }}</td>
                          <td>{{ props.item.maxContains }}</td>
                        </tr>
                      </template>
                    </v-data-table>
                    <v-layout row wrap>
                      <v-flex sm6 md6 xl6> </v-flex>
                      <v-flex sm6 md6 xl6>
                        <v-btn
                          color="success"
                          style="float:right"
                          @click="handlesave()"
                          >确定</v-btn
                        >
                      </v-flex>
                    </v-layout>
                  </div>
                </v-widget>
              </v-dialog>
              <v-dialog v-model="modelDialog2" max-width="1000px">
                <v-widget title="编辑">
                  <div slot="widget-content">
                    <v-data-table
                      :headers="headers2"
                      :items="reData3"
                      class="elevation-1"
                      :pagination.sync="pagination"
                      hide-actions
                    >
                      <template v-slot:items="reData3">
                        <td>{{ reData3.item.objCname }}</td>
                        <td>{{ reData3.item.objEname }}</td>
                        <td>{{ reData3.item.shortName }}</td>
                        <td>{{ reData3.item.objDataType }}</td>
                        <td>{{ reData3.item.objDefined }}</td>
                        <td>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                flat
                                icon
                                class="ma-0"
                                color="info"
                                v-on="on"
                                @click="preview2(reData3.item.standardField)"
                              >
                                <!-- console.log(res.data.data[0].objfields[0].fields) -->
                                <v-icon>mdi-file-eye-outline</v-icon>
                              </v-btn>
                            </template>
                            <span>查看</span>
                          </v-tooltip>
                        </td>
                      </template>
                    </v-data-table>
                    <v-layout row wrap>
                      <v-flex sm6 md6 xl6> </v-flex>
                      <v-flex sm6 md6 xl6>
                        <v-btn flat @click="handlecancel1" style="float:right"
                          >取消</v-btn
                        >
                      </v-flex>
                    </v-layout>
                  </div>
                </v-widget>
              </v-dialog>
              <v-text-field
                v-model="codetableCname"
                label="码表中文名"
                disabled
                required
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="codetableEname"
                label="码表英文名"
                disabled
                required
              ></v-text-field>

              <v-spacer></v-spacer>
              <v-text-field
                v-model="remarks"
                label="备注"
                disabled
                required
              ></v-text-field>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="tableData"
              :search="search"
              :pagination.sync="pagination"
            >
              <template v-slot:items="tableData">
                <td>{{ tableData.index + 1 }}</td>
                <td>{{ tableData.item.codeCname }}</td>
                <!-- <td>{{ tableData.item.codeEname }}</td> -->
                <td>{{ tableData.item.codeValue }}</td>
              </template>
              <template v-slot:no-results>
                <v-alert :value="true" color="error" icon="warning">
                   "{{ search }}" 找不到匹配的值.
                </v-alert>
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
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
export default {
  name: 'stdmodel-info',
  components: {
    VWidget,
    VuePerfectScrollbar,
  },
  data: () => ({
    modelInfo: {},
    codetableCname: '',
    codetableEname: '',
    remarks: '',
    fieldId: '',
    modelDialog: false,
    modelDialog2: false,
    selected: [],
    scrollSettings: {
      maxScrollbarLength: 80,
    },
    headers: [
      { text: '序号', value: 'no' },
      { text: '代码中文名', value: 'codeCname' },
      // { text: '代码英文名', value: 'codeEname' },
      { text: '代码值', value: 'codeValue' },
    ],
    headers1: [
      { text: '序号', value: 'no' },
      { text: '标准中文名', value: 'name' },
      { text: '标准英文名', value: 'enName' },
      { text: '定义', value: 'description' },
      { text: '创建者', value: 'createPerson' },
      { text: '创建时间', value: 'createTime' },
      { text: '操作', value: 'remark' },
    ],
    headers2: [
      { text: '字段中文名', value: 'objCname' },
      { text: '字段英文名', value: 'objEname' },
      { text: '短名', value: 'shortName' },
      { text: '数据类型', value: 'objDataType' },
      { text: '定义', value: 'objDefined' },
      { text: '操作', value: 'remark' },
    ],
    headers3: [
      { text: '序号', value: 'no' },
      { text: '中文名称', value: 'name' },
      { text: '英文名称', value: 'enName' },
      { text: '短名', value: 'code' },
      { text: '数据类型', value: 'type' },
      { text: '长度', value: 'maxsize' },
      { text: '值域', value: 'range' },
      { text: '最大出现次数', value: 'maxContains' },
    ],
    pagination: {
      rowsPerPage: -1,
      sortBy: null,
    },
    tableData: [],
    tableData1: [],
    reData2: [],
    reData3: [],
    search: null,
    fieldCodeList: [],
    hTitle: '',
    defaultProperty: {
      no: 1,
      id: '',
      codeCname: '',
      // codeEname: '',
      codeValue: '',
    },
  }),
  mounted() {
    this.getData()
    this.detailedInfo()
  },
  methods: {
    changeSort(column, sortable, tmp_pagination) {
      if (!(sortable === false)) {
        if (tmp_pagination.sortBy === column) {
          if (this.changeSortNum === 1) {
            tmp_pagination.descending = !tmp_pagination.descending
            this.changeSortNum = 2
          } else {
            tmp_pagination.sortBy = null
          }
        } else {
          this.changeSortNum = 1
          tmp_pagination.sortBy = column
          tmp_pagination.descending = false
        }
      }
    },
    showSnackbar(text, color) {
      this.snackbar = {
        show: true,
        text: text,
        color: color,
      }
      this.$emit('showSnackbar', this.snackbar)
    },
    detailedInfo() {
      this.$nohttps
        .get('/newstandard/getStandard')
        .then((res) => {
          let data = res.data.data
          this.tableData1 = [...data]
        })
        .catch((err) => {
          // this.showSnackbar('REST服务失败', 'error')
        })
    },
    getData() {
      /* this.codetableEname = this.$route.query.codetableEname;
      this.codetableCname = this.$route.query.codetableCname; */
      this.hTitle = this.$route.query.hTitle
      let codeName = this.$route.query.codeName
      let isAuth = this.$route.query.isAuth
      let batchNo = this.$route.query.batchNo
      let obj = {}
      obj.codeName = codeName
      obj.isAuth = isAuth
      obj.batchNo = batchNo
      this.$https
        .post('/codeinfo/getCodeInfoByName', qs.stringify(obj), {
          headers: { Authorization: sessionStorage.getItem('Authorization') },
        })
        .then((res) => {
          let data = res.data.data[0].codeInfoList
          this.fieldId = res.data.data[0].fieldId
          this.tableData = [...data]
          this.codetableEname = data[0].codetableEname
          this.codetableCname = data[0].codetableCname
          this.remarks = data[0].remark
        })
        .catch((err) => {
          // this.showSnackbar('REST服务失败', 'error')
        })
    },
    preview(stdId) {
      let version = ''
      let batchNo = ''
      let id = stdId
      this.$nohttps
        .post(
          '/newstandard/getStandardById?stdId=' +
            id +
            '&version=' +
            version +
            '&batchNo=' +
            batchNo
        )
        .then((res) => {
          // console.log(res.data.data[0])
          // this.obj = res.data.data[0]
          // console.log(JSON.stringify(res.data.data[0]));
          if (res.data.resultCode === 'RESULT_SUCCESS') {
            if (res.data.data[0].standardObject.length != 0) {
              let data = res.data.data[0].standardObject
              this.reData3 = [...data]
              this.modelDialog2 = true
            } else {
              let data = res.data.data[0].standardField
              this.reData2 = [...data]
              this.modelDialog = true
              this.reData2.forEach((item) => {
                for (var i = 0; i < this.fieldId.length; i++) {
                  if (item.id == this.fieldId[i]) {
                    item.check = 'pick'
                    break
                  } else {
                    item.check = 'nopick'
                  }
                }
              })
            }
          } else {
            this.showSnackbar(res.data.message, 'error')
          }
        })
        .catch((err) => {
          this.showSnackbar('REST服务失败', 'error')
        })
    },
    preview2(item) {
      this.modelDialog2 = false
      this.modelDialog = true
      this.reData2 = item
      this.reData2.forEach((pItem) => {
        for (var i = 0; i < this.fieldId.length; i++) {
          if (pItem.id == this.fieldId[i]) {
            pItem.check = 'pick'
            break
          } else {
            pItem.check = 'nopick'
          }
        }
      })
    },
    handlesave() {
      this.modelDialog = false
    },
    handlecancel1() {
      this.modelDialog2 = false
    },
    back() {
      this.$router.go(-1)
    },
  },
}
</script>
<style scoped></style>
