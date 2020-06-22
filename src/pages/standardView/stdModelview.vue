<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex md12 class="align-center layout px-4 pt-4">
        <div class="page-header-left">
          <h3 class="pr-3">标准信息</h3>
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
        <v-widget title="基本信息">
          <div slot="widget-content">
            <div class="layout">
              <div class="ml-3 my-2 font-weight-Regular">标准中文名</div>
              <v-spacer></v-spacer>
              <div class="grey--text mr-3 my-2 text--darken-2">
                {{ modelInfo.name }}
              </div>
            </div>
            <v-divider></v-divider>
            <div class="layout">
              <div class="ml-3 my-2">标准英文名</div>
              <v-spacer></v-spacer>
              <div class="grey--text mr-3 my-2 text--darken-2">
                {{ modelInfo.enName }}
              </div>
            </div>
            <v-divider></v-divider>
            <div class="layout">
              <div class="ml-3 my-2">定义</div>
              <v-spacer></v-spacer>
              <div class="grey--text mr-3 my-2 text--darken-2">
                {{ modelInfo.description }}
              </div>
            </div>
            <v-divider></v-divider>
            <div class="layout">
              <div class="ml-3 my-2">创建者</div>
              <v-spacer></v-spacer>
              <div class="grey--text mr-3 my-2 text--darken-2">
                {{ modelInfo.createPerson }}
              </div>
            </div>
            <v-divider></v-divider>
            <div class="layout">
              <div class="ml-3 my-2">创建时间</div>
              <v-spacer></v-spacer>
              <div class="grey--text mr-3 my-2 text--darken-2">
                {{ modelInfo.createTime }}
              </div>
            </div>
            <v-divider></v-divider>
          </div>
        </v-widget>

        <!-- <v-data-iterator
      :items="items"
    >
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>Protein:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.protein }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Sodium:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.sodium }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Calcium:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.calcium }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Iron:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.iron }}</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
 -->
      </v-flex>
      <v-flex sm12 md8 xl9>
        <v-alert
          color="white"
          icon="info"
          :value="true"
          class="ma-0 elevation-1 black--text"
        >
          <h4>详细信息</h4>
        </v-alert>
        <v-card>
          <v-card-text>
            <v-data-table
              v-model="selected"
              :headers="headers1"
              :items="tableData1"
              :pagination.sync="pagination"
              select-all
              item-key="id"
              class="elevation-1"
            >
              <template v-slot:headers="props">
                <tr>
                  <th>
                    <v-checkbox
                      :input-value="props.all"
                      :indeterminate="props.indeterminate"
                      primary
                      hide-details
                      @click.stop="toggleAll"
                    ></v-checkbox>
                  </th>
                  <th
                    v-for="header in props.headers"
                    :key="header.text"
                    :class="[
                      'column sortable',
                      pagination.descending ? 'desc' : 'asc',
                      header.value === pagination.sortBy ? 'active' : '',
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
                      :input-value="props.selected"
                      primary
                      hide-details
                    ></v-checkbox>
                  </td>
                  <td>{{ props.index + 1 }}</td>
                  <td>
                    <v-edit-dialog lazy>
                      {{ props.item.name }}
                      <template v-slot:input>
                        <v-text-field
                          clearable
                          v-model="props.item.name"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </td>
                  <td>
                    <v-edit-dialog lazy>
                      {{ props.item.enName }}
                      <template v-slot:input>
                        <v-text-field
                          clearable
                          v-model="props.item.enName"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </td>
                  <td>
                    <v-edit-dialog lazy>
                      {{ props.item.code }}
                      <template v-slot:input>
                        <v-text-field
                          clearable
                          v-model="props.item.code"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </td>
                  <td>
                    <v-edit-dialog lazy>
                      {{ props.item.type }}
                      <template v-slot:input>
                        <v-text-field
                          clearable
                          v-model="props.item.type"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </td>
                  <td>
                    <v-edit-dialog lazy>
                      {{ props.item.maxsize }}
                      <template v-slot:input>
                        <v-text-field
                          clearable
                          v-model="props.item.maxsize"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </td>
                  <td>
                    <v-edit-dialog lazy>
                      {{ props.item.range }}
                      <template v-slot:input>
                        <v-text-field
                          clearable
                          v-model="props.item.range"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </td>
                  <td>
                    <v-edit-dialog lazy>
                      {{ props.item.maxContains }}
                      <template v-slot:input>
                        <v-text-field
                          clearable
                          v-model="props.item.maxContains"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </td>
                </tr>
              </template>
            </v-data-table>
            <!-- <v-data-table :headers="headers1"
                              :items="tableData1"
                              :pagination.sync="pagination1"
                              hide-actions>
                  <template v-slot:headers="props1">
                    <tr>
                      <th>
                        <v-checkbox
                          :input-value="props.all"
                          :indeterminate="props.indeterminate"
                          primary
                          hide-details
                          @click.stop="toggleAll"
                        ></v-checkbox>
                      </th>
                      <th v-for="header in props1.headers"
                          :key="header.text"
                          :class="['column sortable px-1 text-xs-left',pagination1.descending ? 'desc' : 'asc', header.value === pagination1.sortBy ? 'active' : '']"
                           @click="changeSort(header.value,header.sortable,pagination1)"
                          >
                        {{ header.text }}
                        <v-icon small>arrow_upward</v-icon>
                      </th>
                    </tr>
                  </template>
                  <template v-slot:items="props">
                    <tr :active="props.selected" @click="props.selected = !props.selected">
                    <td class="px-5">
                        <v-checkbox
                          :input-value="props.selected"
                          primary
                          hide-details
                        ></v-checkbox>
                    </td>
                    <td>{{ props.index+1 }}</td>
                    <td>
                        <v-edit-dialog lazy>
                        {{ props.item.name }}
                        <template v-slot:input>
                            <v-text-field clearable
                            v-model="props.item.name"></v-text-field>
                        </template>
                        </v-edit-dialog>
                    </td>
                    <td>
                        <v-edit-dialog lazy>
                        {{ props.item.enName }}
                        <template v-slot:input>
                            <v-text-field clearable
                            v-model="props.item.enName"></v-text-field>
                        </template>
                        </v-edit-dialog>
                    </td>
                    <td>
                        <v-edit-dialog lazy>
                        {{ props.item.code }}
                        <template v-slot:input>
                            <v-text-field clearable
                            v-model="props.item.code"></v-text-field>
                        </template>
                        </v-edit-dialog>
                    </td>
                    <td>
                        <v-edit-dialog lazy>
                        {{ props.item.type }}
                        <template v-slot:input>
                            <v-text-field clearable
                            v-model="props.item.type"></v-text-field>
                        </template>
                        </v-edit-dialog>
                    </td>
                    <td>
                        <v-edit-dialog lazy>
                        {{ props.item.maxsize }}
                        <template v-slot:input>
                            <v-text-field clearable
                            v-model="props.item.maxsize"></v-text-field>
                        </template>
                        </v-edit-dialog>
                    </td>
                    <td>
                        <v-edit-dialog lazy>
                        {{ props.item.range }}
                        <template v-slot:input>
                            <v-text-field clearable
                            v-model="props.item.range"></v-text-field>
                        </template>
                        </v-edit-dialog>
                    </td>
                    <td>
                        <v-edit-dialog lazy>
                        {{ props.item.maxContains }}
                        <template v-slot:input>
                            <v-text-field clearable
                            v-model="props.item.maxContains"></v-text-field>
                        </template>
                        </v-edit-dialog>
                    </td>
                    </tr>
                  </template>
                </v-data-table> -->
            <!-- <v-divider></v-divider> -->
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex sm6 md6 xl6>
        <v-btn color="primary" style="margin-left:1100px" @click="handlesave()"
          >确定</v-btn
        >
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import VWidget from '@/components/VWidget'

export default {
  name: 'stdmodel-info',
  components: {
    VWidget,
  },
  data: () => ({
    version: '',
    stdId: '',
    dee: {},
    selected: [],
    /* items: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: '14%',
        iron: '1%',
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        sodium: 129,
        calcium: '8%',
        iron: '1%',
      },
    ], */
    modelInfo: {},
    headers1: [
      { text: '序号', value: 'no' },
      { text: '中文名称', value: 'name' },
      { text: '英文名称', value: 'enName' },
      { text: '短名', value: 'code' },
      { text: '数据类型', value: 'type' },
      { text: '长度', value: 'maxsize' },
      { text: '值域', value: 'range' },
      { text: '最大出现次数', value: 'maxContains' },
    ],

    pagination1: {
      rowsPerPage: -1, // -1 for All
      sortBy: null,
    },
    tableData1: [],
  }),
  created() {
    this.initialize()
    this.getData()
    this.getStandard()
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
    initialize() {
      const _this = this
      // console.log(this.$route.query.model_id);
      this.axios
        .get('/stdglprj/standard/getStandardInfo/' + this.$route.query.model_id)
        .then(function(response) {
          // console.log(response);
          if (response.data.resultCode === 'RESULT_SUCCESS') {
            // console.log(response.data.data);
            _this.modelInfo = response.data.data[0]
            _this.tableData1 = response.data.data[0].fields
          } else {
            _this.showSnackbar(
              '200OK，数据服务内部错误：' + response.data.message,
              'error'
            )
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getData() {
      this.modelInfo = this.$route.query.dataSource
      console.log(this.modelInfo, '===')
      this.stdId = this.$route.query.stdId
      this.version = this.$route.query.version
      this.dee = this.$route.query.dee
    },
    getStandard() {
      let id = this.stdId
      let version = ''
      let batchNo = ''
      console.log(id, version)
      this.axios
        .post(
          'http://192.168.3.142:8080/stdglprj/newstandard/getStandardById?stdId=' +
            id +
            '&version=' +
            version +
            '&batchNo=' +
            batchNo
        )
        .then((res) => {
          let data = res.data.data[0].standardField
          this.tableData1 = [...data]
          console.log(data, '----')
        })
        .catch((err) => {
          this.showSnackbar('REST服务失败', 'error')
        })
    },
    toggleAll() {
      if (this.selected.length) this.selected = []
      else this.selected = this.tableData1.slice()
    },
    handlesave() {
      let fieldCodeList = []
      this.selected.forEach((item) => {
        for (let key in item) {
          var obj = {}
          if (key == 'id') {
            var obj1 = {}
            obj1.fieldId = item[key]
          }
          obj = Object.assign({}, obj1)
          fieldCodeList.push(obj)
        }
      })
      var result = []
      var obje = {}
      for (var i = 0; i < fieldCodeList.length; i++) {
        if (!obje[fieldCodeList[i].fieldId]) {
          result.push(fieldCodeList[i])
          obje[fieldCodeList[i].fieldId] = true
        }
      }
      // console.log(result);
      this.$router.push({
        name: 'standard-addorupdate',
        query: {
          fieldCodeList: result,
          dee: this.dee,
        },
      })
      // this.$router.go(-2,{params:{aa: 11}});
    },
    back() {
      // this.$emit("routerRefreshEvent");
      // console.log('refresh');
      this.$router.go(-1)
      // console.log(this.$route.query);
    },
  },
}
</script>

<style scoped></style>
