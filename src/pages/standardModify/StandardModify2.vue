<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <!-- 详细信息模态框 -->
      <v-dialog v-model="modelDialog2" max-width="1450px">
        <v-widget title="详细信息">
          <div slot="widget-content">
            <v-data-table
              :headers="headers1"
              :items="reData3"
              class="elevation-1"
              :pagination.sync="pagination"
            >
              <template v-slot:items="reData3">
                <td>
                  {{ reData3.item.code }}
                </td>
                <td>
                  {{ reData3.item.enName }}
                </td>
                <td>
                  {{ reData3.item.name }}
                </td>
                <td>
                  {{ reData3.item.defination }}
                </td>
                <td>
                  {{ reData3.item.type }}
                </td>
                <td>
                  {{ reData3.item.maxsize }}
                </td>
                <td>
                  {{ reData3.item.range }}
                </td>
                <td>
                  <v-checkbox
                    true-value="O"
                    false-value="o"
                    v-model="reData3.item.required"
                    hide-details
                    readonly
                  ></v-checkbox>
                </td>
                <td>
                  {{ reData3.item.maxContains }}
                </td>
                <td>
                  {{ reData3.item.comments }}
                </td>
              </template>
            </v-data-table>
            <v-layout row wrap>
              <v-flex sm6 md6 xl6> </v-flex>
              <v-flex sm6 md6 xl6>
                <v-btn flat @click="handlecancel3" style="float:right"
                  >返回</v-btn
                >
              </v-flex>
            </v-layout>
          </div>
        </v-widget>
      </v-dialog>
      <v-flex md12 class="align-center layout px-4 pt-4">
        <div class="page-header-left">
          <h3 class="pr-3">{{ $route.query.code }}</h3>
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
      <v-flex sm10 md3 xl3>
        <v-widget title="基本信息">
          <div slot="widget-content">
            <div class="layout">
              <div class="ml-3 my-2 font-weight-Regular">短名</div>
              <v-spacer></v-spacer>
              <div class="grey--text mr-3 my-2 text--darken-2">
                {{ modelInfo.code }}
              </div>
            </div>
            <v-divider></v-divider>
            <div class="layout">
              <div class="ml-3 my-2">英文名</div>
              <v-spacer></v-spacer>
              <div class="grey--text mr-3 my-2 text--darken-2">
                {{ modelInfo.enName }}
              </div>
            </div>
            <v-divider></v-divider>
            <div class="layout">
              <div class="ml-3 my-2">中文名</div>
              <v-spacer></v-spacer>
              <div class="grey--text mr-3 my-2 text--darken-2">
                {{ modelInfo.name }}
              </div>
            </div>
            <v-divider></v-divider>
            <div class="layout">
              <div class="ml-3 my-2">编目ID</div>
              <v-spacer></v-spacer>
              <div class="grey--text mr-3 my-2 text--darken-2">
                {{ modelInfo.categoryId }}
              </div>
            </div>
            <v-divider></v-divider>
            <v-divider></v-divider>
            <div class="layout">
              <div class="ml-3 my-2">创建人</div>
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
            <div class="layout">
              <div class="ml-3 my-2">更新人</div>
              <v-spacer></v-spacer>
              <div class="grey--text mr-3 my-2 text--darken-2">
                {{ modelInfo.updatePerson }}
              </div>
            </div>
            <v-divider></v-divider>
            <div class="layout">
              <div class="ml-3 my-2">更新时间</div>
              <v-spacer></v-spacer>
              <div class="grey--text mr-3 my-2 text--darken-2">
                {{ modelInfo.updateTime }}
              </div>
            </div>
            <v-divider></v-divider>
            <div class="layout">
              <div class="ml-3 my-2">版本</div>
              <v-spacer></v-spacer>
              <div class="grey--text mr-3 my-2 text--darken-2">
                {{ modelInfo.version }}
              </div>
            </div>
          </div>
        </v-widget>
      </v-flex>
      <v-flex sm14 md9 xl9>
        <v-alert
          color="white"
          icon="info"
          :value="true"
          class="ma-0 elevation-1 black--text"
        >
          <h4>详细信息</h4>
          <div>{{ modelInfo.description }}</div>
        </v-alert>

        <v-card>
          <v-card-text>
            <!-- 不是复用型表格 -->
            <v-data-table
              :headers="headers1"
              :items="tableData1"
              :pagination.sync="pagination1"
              v-if="
                this.modelInfo.standardField &&
                  this.modelInfo.standardField.length != 0
              "
              hide-actions
            >
              <template v-slot:headers="props1">
                <tr>
                  <th
                    v-for="header in props1.headers"
                    :key="header.text"
                    :class="[
                      'column sortable px-1 text-xs-left',
                      pagination1.descending ? 'desc' : 'asc',
                      header.value === pagination1.sortBy ? 'active' : '',
                    ]"
                    @click="
                      changeSort(header.value, header.sortable, pagination1)
                    "
                  >
                    {{ header.text }}
                    <v-icon small>arrow_upward</v-icon>
                  </th>
                </tr>
              </template>
              <template v-slot:items="props">
                <td class="px-1">{{ props.item.code }}</td>
                <td class="px-1">{{ props.item.enName }}</td>
                <td class="px-1">{{ props.item.name }}</td>
                <td class="px-1">{{ props.item.defination }}</td>
                <td class="px-1">{{ props.item.type }}</td>
                <td class="px-1">{{ props.item.maxsize }}</td>
                <td class="px-1">{{ props.item.range }}</td>
                <td class="px-1">
                  <v-checkbox
                    true-value="O"
                    false-value="o"
                    v-model="props.item.required"
                    hide-details
                    readonly
                  ></v-checkbox>
                </td>
                <td class="px-1">{{ props.item.maxContains }}</td>
                <td class="px-1">{{ props.item.comments }}</td>
              </template>
            </v-data-table>
            <!-- 复用型表格 要有操作 -->
            <v-data-table
              :headers="headers2"
              :items="reData2"
              class="elevation-1"
              :pagination.sync="pagination"
              v-if="
                this.modelInfo.standardField &&
                  this.modelInfo.standardField.length == 0
              "
            >
              <template v-slot:items="reData2">
                <td>
                  {{ reData2.item.objCname }}
                </td>
                <td>
                  {{ reData2.item.objEname }}
                </td>
                <td>
                  {{ reData2.item.shortName }}
                </td>
                <td>
                  {{ reData2.item.objDefined }}
                </td>
                <td>
                  {{ reData2.item.remark }}
                </td>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        flat
                        icon
                        class="ma-0"
                        color="info"
                        v-on="on"
                        @click="preview2(reData2.item)"
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
          </v-card-text>
        </v-card>
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
    modelInfo: {},
    obj: {},
    headers2: [
      { text: '字段中文名', value: 'objCname' },
      { text: '字段英文名', value: 'objEname' },
      { text: 'code', value: 'shortName' },
      { text: '定义', value: 'objDefined' },
      { text: '备注', value: 'text' },
      { text: '操作', value: 'way' },
    ],
    headers1: [
      { text: '短名 *', value: 'code' },
      { text: '英文名', value: 'enName' },
      { text: '中文名', value: 'name' },
      { text: '定义', value: 'defination' },
      { text: '元数据类型 *', value: 'type' },
      { text: '长度 *', value: 'maxsize' },
      { text: '值域', value: 'range' },
      { text: '是否必填', value: 'required' },
      { text: '最大出现次数', value: 'maxContains' },
      { text: '备注', value: 'comments' },
    ],
    pagination1: {
      rowsPerPage: -1, // -1 for All
      sortBy: null,
    },
    tableData1: [],
    reData3: [],
    modelDialog2: false,
  }),

  created() {
    this.initialize()
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
    handlecancel3() {
      this.modelDialog2 = false
    },
    preview2(dd) {
      this.modelDialog2 = true
      this.reData3 = dd.standardField
    },
    initialize() {
      let no = this.$route.query.no
      let id = this.$route.query.id
      this.$nohttps
        .post(
          '/newstandard/getStandardById?stdId=' +
            id +
            '&batchNo=' +
            no +
            '&version'
        )
        .then((res) => {
          // console.log(res.data.data)
          this.modelInfo = res.data.data[0]
          if (res.data.data[0].standardField == 0) {
            // console.log(res.data.data[0].standardObject)
            this.reData2 = res.data.data[0].standardObject
          } else {
            this.tableData1 = res.data.data[0].standardField
          }
        })
        .catch((error) => {
          // console.log(error)
        })
    },
    back() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped></style>
