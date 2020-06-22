<template>
  <v-container grid-list-xl fluid>
    <!-- 详细信息模态框 -->
    <v-dialog v-model="modelDialog2" max-width="1450px">
      <v-widget title="详细信息">
        <div slot="widget-content">
          <v-card-title>
            <v-btn color="primary" @click.stop="addProperty2">
              新增标准
              <v-icon right>mdi-plus</v-icon>
            </v-btn>
          </v-card-title>
          <v-data-table
            :headers="headers1"
            :items="reData3"
            class="elevation-1"
            :pagination.sync="pagination"
          >
            <template v-slot:items="reData3">
              <td>
                <v-edit-dialog lazy>
                  {{ reData3.item.code }}
                  <template v-slot:input>
                    <v-text-field
                      clearable
                      v-model="reData3.item.code"
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-edit-dialog lazy>
                  {{ reData3.item.enName }}
                  <template v-slot:input>
                    <v-text-field
                      clearable
                      v-model="reData3.item.enName"
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-edit-dialog lazy>
                  {{ reData3.item.name }}
                  <template v-slot:input>
                    <v-text-field
                      clearable
                      v-model="reData3.item.name"
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-edit-dialog lazy>
                  {{ reData3.item.defination }}
                  <template v-slot:input>
                    <v-text-field
                      clearable
                      v-model="reData3.item.defination"
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-edit-dialog lazy>
                  {{ reData3.item.type }}
                  <template v-slot:input>
                    <v-text-field
                      clearable
                      v-model="reData3.item.type"
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-edit-dialog lazy>
                  {{ reData3.item.maxsize }}
                  <template v-slot:input>
                    <v-text-field
                      clearable
                      v-model="reData3.item.maxsize"
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-edit-dialog lazy>
                  {{ reData3.item.range }}
                  <template v-slot:input>
                    <v-text-field
                      clearable
                      v-model="reData3.item.range"
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-checkbox
                  true-value="O"
                  false-value="o"
                  v-model="reData3.item.required"
                  hide-details
                ></v-checkbox>
              </td>
              <td>
                <v-edit-dialog lazy>
                  {{ reData3.item.maxContains }}
                  <template v-slot:input>
                    <v-text-field
                      clearable
                      v-model="reData3.item.maxContains"
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-edit-dialog lazy>
                  {{ reData3.item.comments }}
                  <template v-slot:input>
                    <v-text-field
                      clearable
                      v-model="reData3.item.comments"
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-icon small @click="deleteProperty2(reData3.index)"
                  >delete</v-icon
                >
              </td>
            </template>
          </v-data-table>
          <v-layout row wrap>
            <v-flex sm6 md6 xl6> </v-flex>
            <v-flex sm6 md6 xl6>
              <v-btn color="success" @click="handlecancel3" style="float:right"
                >确定</v-btn
              >
            </v-flex>
          </v-layout>
        </div>
      </v-widget>
    </v-dialog>
    <v-layout row wrap>
      <v-flex md12 class="align-center layout px-4 pt-4">
        <div class="page-header-left">
          <h3 class="pr-3">{{ $route.query.code }}</h3>
        </div>
        <v-spacer></v-spacer>
        <div class="page-header-right">
          <v-btn color="success" @click="finish($route.query.id, modelInfo)"
            >保存</v-btn
          >
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
              <div class="ml-3 my-2 font-weight-Regular">短名</div>
              <v-spacer></v-spacer>
              <div class="grey--text mr-3 my-2 text--darken-2">
                <v-edit-dialog lazy>
                  {{ modelInfo.code }}
                  <template v-slot:input>
                    <v-text-field
                      clearable
                      v-model="modelInfo.code"
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </div>
            </div>
            <v-divider></v-divider>
            <div class="layout">
              <div class="ml-3 my-2">英文名</div>
              <v-spacer></v-spacer>
              <div class="grey--text mr-3 my-2 text--darken-2">
                <v-edit-dialog lazy>
                  {{ modelInfo.enName }}
                  <template v-slot:input>
                    <v-text-field
                      clearable
                      v-model="modelInfo.enName"
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </div>
            </div>
            <v-divider></v-divider>
            <div class="layout">
              <div class="ml-3 my-2">中文名</div>
              <v-spacer></v-spacer>
              <div class="grey--text mr-3 my-2 text--darken-2">
                <v-edit-dialog lazy>
                  {{ modelInfo.name }}
                  <template v-slot:input>
                    <v-text-field
                      clearable
                      v-model="modelInfo.name"
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </div>
            </div>
            <v-divider></v-divider>
            <div class="layout">
              <div class="ml-3 my-2">编目ID</div>
              <v-spacer></v-spacer>
              <div class="grey--text mr-3 my-2 text--darken-2">
                <v-edit-dialog lazy>
                  {{ modelInfo.categoryId }}
                  <template v-slot:input>
                    <v-text-field
                      clearable
                      v-model="modelInfo.categoryId"
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </div>
            </div>
            <v-divider></v-divider>
            <v-divider></v-divider>
            <div class="layout">
              <div class="ml-3 my-2">创建人</div>
              <v-spacer></v-spacer>
              <div class="grey--text mr-3 my-2 text--darken-2">
                <v-edit-dialog lazy>
                  {{ modelInfo.createPerson }}
                  <template v-slot:input>
                    <v-text-field
                      clearable
                      v-model="modelInfo.createPerson"
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
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
                <v-edit-dialog lazy>
                  {{ modelInfo.updatePerson }}
                  <template v-slot:input>
                    <v-text-field
                      clearable
                      v-model="modelInfo.updatePerson"
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
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
      <v-flex sm12 md8 xl9>
        <v-alert
          color="white"
          icon="info"
          :value="true"
          class="ma-0 elevation-1 black--text"
        >
          <div>
            <h4 style="float:left">详细信息</h4>
            <v-btn
              color="primary"
              style="float:right"
              v-if="
                this.modelInfo.standardField &&
                  this.modelInfo.standardField.length != 0
              "
              @click="addProperty"
              >新增标准</v-btn
            >
          </div>
        </v-alert>
        <v-card>
          <v-card-text>
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
                  <v-edit-dialog lazy>
                    {{ reData2.item.objCname }}
                    <template v-slot:input>
                      <v-text-field
                        clearable
                        v-model="reData2.item.objCname"
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                </td>
                <td>
                  <v-edit-dialog lazy>
                    {{ reData2.item.objEname }}
                    <template v-slot:input>
                      <v-text-field
                        clearable
                        v-model="reData2.item.objEname"
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                </td>
                <td>
                  <v-edit-dialog lazy>
                    {{ reData2.item.shortName }}
                    <template v-slot:input>
                      <v-text-field
                        clearable
                        v-model="reData2.item.shortName"
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                </td>
                <td>
                  <v-edit-dialog lazy>
                    {{ reData2.item.objDefined }}
                    <template v-slot:input>
                      <v-text-field
                        clearable
                        v-model="reData2.item.objDefined"
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                </td>
                <td>
                  <v-edit-dialog lazy>
                    {{ reData2.item.remark }}
                    <template v-slot:input>
                      <v-text-field
                        clearable
                        v-model="reData2.item.remark"
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
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
            <!-- 不是复用性表格 -->
            <v-data-table
              :headers="headers1"
              :items="tableData1"
              v-if="
                this.modelInfo.standardField &&
                  this.modelInfo.standardField.length != 0
              "
              :pagination.sync="pagination1"
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
                <td class="px-1">
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
                <td class="px-1">
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
                <td class="px-1">
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
                <td class="px-1">
                  <v-edit-dialog lazy>
                    {{ props.item.defination }}
                    <template v-slot:input>
                      <v-text-field
                        clearable
                        v-model="props.item.defination"
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                </td>
                <td class="px-1">
                  <v-select
                    :items="selectItems2"
                    v-model="props.item.type"
                    small-chips
                  ></v-select>
                  <!-- <v-edit-dialog lazy>
                    {{props.item.type}}
                    <template v-slot:input>
                      <v-text-field clearable
                                    v-model="props.item.type"></v-text-field>
                    </template>
                  </v-edit-dialog> -->
                </td>
                <td class="px-1">
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
                <td class="px-1">
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
                <td class="px-1">
                  <v-checkbox
                    true-value="O"
                    false-value="o"
                    v-model="props.item.required"
                    hide-details
                  ></v-checkbox>
                </td>

                <td class="px-1">
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
                <td class="px-1">
                  <v-edit-dialog lazy>
                    {{ props.item.comments }}
                    <template v-slot:input>
                      <v-text-field
                        clearable
                        v-model="props.item.comments"
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                </td>
                <!-- 操作 -->
                <td class="px-1">
                  <v-icon small @click="deleteProperty(props.index)"
                    >delete</v-icon
                  >
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
import qs from 'qs'

export default {
  name: 'stdmodel-info2',
  components: {
    VWidget,
  },
  data: () => ({
    reData3: [],
    modelInfo: {},
    obj: {},
    selectItems2: ['字符串', '整数', '单精度', '双精度'],
    headers1: [
      { text: '短名 *', value: 'code' },
      { text: '英文名', value: 'enName' },
      { text: '中文名', value: 'name' },
      { text: '定义', value: 'definition' },
      { text: '元数据类型 *', value: 'type' },
      { text: '长度 *', value: 'maxsize' },
      { text: '值域', value: 'range' },
      { text: '是否必填', value: 'required' },
      { text: '最大出现次数', value: 'maxContains' },
      { text: '备注', value: 'comments' },
      { text: '操作', value: 'comments' },
    ],
    pagination1: {
      rowsPerPage: -1, // -1 for All
      sortBy: null,
    },
    pagination: {
      rowsPerPage: -1, // -1 for All
      sortBy: null,
    },
    tableData1: [],
    headers2: [
      { text: '字段中文名', value: 'objCname' },
      { text: '字段英文名', value: 'objEname' },
      { text: 'code', value: 'shortName' },
      { text: '定义', value: 'objDefined' },
      { text: '备注', value: 'text' },
      { text: '操作', value: 'way' },
    ],
    reData2: [],
    modelDialog2: false,
    defaultProperty: {
      code: '',
      enName: '',
      name: '',
      defination: '',
      type: '',
      maxsize: '',
      range: '',
      required: 'o',
      maxContains: '',
      comments: '',
    },
  }),
  mounted() {
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
    addProperty() {
      this.tableData1.push(Object.assign({}, this.defaultProperty))
    },
    addProperty2() {
      this.reData3.push(Object.assign({}, this.defaultProperty))
    },
    deleteProperty(index) {
      this.tableData1.splice(index, 1)
    },
    deleteProperty2(index) {
      this.reData3.splice(index, 1)
    },
    handlecancel3() {
      this.modelDialog2 = false
    },
    deleteMutipleItem() {
      let index = this.singleDeleteIndex
      this.reData.splice(index, 1)
      // this.deleteDialog = false;
    },
    preview2(dd) {
      // console.log(dd)
      this.modelDialog2 = true
      // console.log(dd.standardField)
      this.reData3 = dd.standardField
    },
    showSnackbar(text, color) {
      this.snackbar = {
        show: true,
        text: text,
        color: color,
      }
      this.$emit('showSnackbar', this.snackbar)
    },
    // 修改方法
    finish() {
      let batchNo = this.$route.query.batchNo
      // console.log(batchNo)
      // console.log(this.modelInfo.standardField)
      // console.log(this.reData2)
      // console.log(this.tableData1)
      let data = new Object({
        code: this.modelInfo.code, //标准短名
        name: this.modelInfo.name, //标准中文名称
        // enName: this.modelInfo.enName,
        description: this.modelInfo.description, //标准定义
        id: this.modelInfo.id,
        dataSource: '自定义', //数据源
        categoryId: '0', //挂载目录ID
        standardField: [],
        standardObject: [],
        batchNo: batchNo,
      })
      for (let a of this.modelInfo.standardField) {
        data.standardField.push(
          new Object({
            enName: a.enName, //字段英文名称       1
            code: a.code, //字段短名
            id: a.id,
            name: a.name, //字段中文名        1
            moudleId: a.moudleId,
            required: a.required, //字段是否必须
            maxsize: a.maxsize, //字段长度
            type: a.type, //字段类型          1
            range: a.range, //字段范围          1
            defination: a.defination, //字段定义          1
            maxContains: a.maxCount, //字段最大出现次数   1
            comments: a.comments, //字段备注
          })
        )
      }
      // console.log(data);
      // console.log(this.obj[0]);
      this.$nohttps
        .post('/newstandard/saveStandard?', this.obj[0])
        .then((res) => {
          // console.log(res.data.data);
          if (res.data.message === '获取信息成功') {
            this.showSnackbar('修改成功,待审核', 'success')
            this.$router.go(-1)
          }
        })
        .catch((error) => {
          // console.log(error)
        })
    },
    initialize() {
      // console.log(this.$route.query.item);
      let id = this.$route.query.id
      let batchNo = this.$route.query.batchNo

      this.$https
        .post(
          // '/stdglprj/newstandard/getStandardById?stdId=' + id
          // + '&version&batchNo'
          '/newstandard/getStandardById',
          qs.stringify({
            stdId: id,
            version: '',
            batchNo: batchNo,
          })
        )
        .then((res) => {
          // console.log(res.data.data)
          this.obj = res.data.data
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
