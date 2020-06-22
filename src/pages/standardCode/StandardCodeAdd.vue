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
                              @click.stop="toggleAll"
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
                              v-model="props.item.check"
                              primary
                              hide-details
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
                        <v-btn flat @click="handlecancel" style="float:right"
                          >取消</v-btn
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
              <v-dialog v-model="modelDialog3" max-width="1000px">
                <v-widget title="编辑">
                  <div slot="widget-content">
                    <v-data-table
                      :headers="headers3"
                      :items="reData4"
                      v-model="selectedes"
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
                              @click.stop="toggleAll1"
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
                              v-model="props.item.check"
                              primary
                              hide-details
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
                          @click="handlesave1()"
                          >确定</v-btn
                        >
                        <v-btn flat @click="handlecancel2" style="float:right"
                          >取消</v-btn
                        >
                      </v-flex>
                    </v-layout>
                  </div>
                </v-widget>
              </v-dialog>
              <v-form ref="form" lazy-validation class="formStyle">
                <v-text-field :rules="[rules.codetableCname]" v-model="codetableCname" label="码表中文名 *"></v-text-field>
                <v-spacer></v-spacer>
                <v-text-field :rules="[rules.codetableEname]" v-model="codetableEname" label="码表英文名 *" disabled></v-text-field>
                <v-spacer></v-spacer>
                <v-text-field v-model="remarks" label="备注"></v-text-field>
              </v-form>
              <!-- <v-text-field
                v-model="codetableCname"
                label="码表中文名"
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
              ></v-text-field> -->
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="addProperty">
                新增码值
              </v-btn>
              <v-btn color="primary" @click.stop="saveCodeBtn">
                保存
              </v-btn>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="tableData"
              :search="search"
              :pagination.sync="pagination"
            >
              <template v-slot:items="tableData">
                <td class="px-4">{{ tableData.index + 1 }}</td>
                <td class="px-4">
                  <v-edit-dialog lazy>
                    {{ tableData.item.codeCname }}
                    <template v-slot:input>
                      <v-text-field
                        clearable
                        v-model="tableData.item.codeCname"
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                </td>
                <!-- <td class="px-4">
                  <v-edit-dialog lazy>
                    {{ tableData.item.codeEname }}
                    <template v-slot:input>
                      <v-text-field clearable
                                    
                                    v-model="tableData.item.codeEname"></v-text-field>
                    </template>
                  </v-edit-dialog>
                </td> -->
                <td class="px-4">
                  <v-edit-dialog lazy>
                    {{ tableData.item.codeValue }}
                    <template v-slot:input>
                      <v-text-field
                        clearable
                        v-model="tableData.item.codeValue"
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                </td>
                <td class="px-4">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        flat
                        icon
                        class="ma-0"
                        color="error"
                        v-on="on"
                        @click="deleteProperty(tableData.index)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                    <span>删除</span>
                  </v-tooltip>
                </td>
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
    modelDialog3: false,
    selected: [],
    selectedes: [],
    tempdata2: [],
    tempdata3: [],
    cc: [],
    dd: [],
    scrollSettings: {
      maxScrollbarLength: 80,
    },
    rules: {
      codetableCname: value => /^[\u4e00-\u9fa5]+$/.test(value) || "请填写中文",
      codetableEname: value => (/^[A-Za-z0-9\_]+$/.test(value) &&　value.length <= 20) || "请填写不多于20个字符的英文或数字或下划线",
    },
    headers: [
      { text: '序号', value: 'no' },
      { text: '代码中文名', value: 'codeCname' },
      // { text: '代码英文名', value: 'codeEname' },
      { text: '代码值', value: 'codeValue' },
      { text: '操作', value: 'remark' },
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
    reData4: [],
    objId: [],
    objsId: [],
    search: null,
    batchNo: '',
    fieldCodeList: [],
    hTitle: '',
    dataType: '',
    datas: '',
    defaultProperty: {
      no: 1,
      id: '',
      codeCname: '',
      // codeEname: '',
      codeValue: '',
    },
  }),
  created() {
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
    toggleAll() {
      if (this.selected.length) {
        this.reData2.forEach((item) => {
          item.check = 'nopick'
        })
        this.selected = []
      } else {
        this.reData2.forEach((item) => {
          item.check = 'pick'
        })
        this.selected = this.reData2.slice()
      }
    },
    toggleAll1() {
      if (this.selectedes.length) {
        this.reData4.forEach((item) => {
          item.check = 'nopick'
        })
        this.selectedes = []
      } else {
        this.reData4.forEach((item) => {
          item.check = 'pick'
        })
        this.selectedes = this.reData4.slice()
      }
    },
    detailedInfo() {
      this.$nohttps
        .get('/newstandard/getStandard?categoryId')
        .then((res) => {
          if (res.data.code == 'RESULT_ERROR') {
            // this.showSnackbar(res.data.message, 'error')
          } else {
            let data = res.data.data
            this.tableData1 = [...data]
          }
        })
        .catch((err) => {
          // this.showSnackbar('REST服务失败', 'error')
        })
    },
    getData() {
      this.hTitle = this.$route.query.hTitle
      let codeName = this.$route.query.codeName
      let isAuth = this.$route.query.isAuth
      let batchNo = this.$route.query.batchNo
      let dataes = this.$route.query.dataes
      this.batchNo = batchNo
      this.dataType = this.$route.query.dataType
      let obj = {}
      obj.codeName = codeName
      obj.isAuth = isAuth
      obj.batchNo = batchNo
      let data = dataes[0].codeInfoList
      this.fieldId = dataes[0].fieldId
      this.tableData = [...data]
      this.datas = data[0].dataType ? data[0].dataType : ''
      this.codetableEname = data[0].codetableEname
      this.codetableCname = data[0].codetableCname
      this.remarks = data[0].remark
      this.tableData.forEach((item) => {
        this.remarks = item.remark
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
              this.modelDialog2 = true
              if (this.tempdata3.length != 0) {
                this.reData4 = this.tempdata3
              } else {
                this.reData3 = [...data]
              }
            } else {
              let data = res.data.data[0].standardField
              this.modelDialog = true
              if (this.tempdata2.length != 0) {
                this.reData2 = this.tempdata2
              } else {
                this.reData2 = [...data]
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
      this.modelDialog3 = true
      this.reData4 = item
      this.reData4.forEach((item) => {
        for (var i = 0; i < this.fieldId.length; i++) {
          if (item.id == this.fieldId[i]) {
            item.check = 'pick'
            break
          } else {
            item.check = 'nopick'
          }
        }
      })
    },
    handlesave1() {
      this.modelDialog3 = false
      if (this.dd.length != 0) {
        let bb = this.reData4.filter((item) => {
          return item.check == 'pick'
        })
        this.dd = this.dd.concat(bb)
      } else {
        this.dd = this.reData4.filter((item) => {
          return item.check == 'pick'
        })
      }
      // console.log(this.dd);

      let arr = []
      this.tempdata3 = this.reData4
      this.dd.forEach((item) => {
        for (let key in item) {
          var obj11 = {}
          if (key == 'id') {
            var obj1 = {}
            obj1.fieldId = item[key]
          }
          obj11 = Object.assign({}, obj1)
          arr.push(obj11)
        }
      })
      function deteleObject(obj) {
        var uniques = []
        var stringify = {}
        for (var i = 0; i < obj.length; i++) {
          var keys = Object.keys(obj[i])
          keys.sort(function(a, b) {
            return Number(a) - Number(b)
          })
          var str = ''
          for (var j = 0; j < keys.length; j++) {
            str += JSON.stringify(keys[j])
            str += JSON.stringify(obj[i][keys[j]])
          }
          if (!stringify.hasOwnProperty(str)) {
            uniques.push(obj[i])
            stringify[str] = true
          }
        }
        uniques = uniques
        return uniques
      }
      let arrs = deteleObject(arr)
      this.objsId = arrs
      // console.log(arrs);
    },
    handlesave() {
      this.modelDialog = false
      let arr = []
      this.cc = this.reData2.filter((item) => {
        return item.check == 'pick'
      })
      this.tempdata2 = this.reData2
      this.cc.forEach((item) => {
        for (let key in item) {
          var obj = {}
          if (key == 'id') {
            var obj1 = {}
            obj1.fieldId = item[key]
          }
          obj = Object.assign({}, obj1)
          arr.push(obj)
        }
      })
      function deteleObject(obj) {
        var uniques = []
        var stringify = {}
        for (var i = 0; i < obj.length; i++) {
          var keys = Object.keys(obj[i])
          keys.sort(function(a, b) {
            return Number(a) - Number(b)
          })
          var str = ''
          for (var j = 0; j < keys.length; j++) {
            str += JSON.stringify(keys[j])
            str += JSON.stringify(obj[i][keys[j]])
          }
          if (!stringify.hasOwnProperty(str)) {
            uniques.push(obj[i])
            stringify[str] = true
          }
        }
        uniques = uniques
        return uniques
      }
      let arrs = deteleObject(arr)
      this.objId = arrs
      /* let objes = {};
      console.log(arrs,'+++');
      this.fieldId.forEach((item)=>{
        for(let key in item){
          var objs = {};
          objs.fieldId = item
        }
        objes = Object.assign({}, objs);
        arrs.push(objes)
      }) */
      // console.log(arrs);
      // this.fieldCodeList = arrs;
    },
    handlecancel() {
      this.modelDialog = false
      /* if (this.reData3) {
        this.modelDialog2 = true;
      } */
    },
    handlecancel1() {
      this.modelDialog2 = false
    },
    handlecancel2() {
      this.modelDialog3 = false
      this.modelDialog2 = true
    },
    saveCodeBtn() {
      if (!this.$refs.form.validate()) {
        return;
      }
      let arr = []
      this.tableData.forEach((item) => {
        // /* if (item.codeCname == '' || item.codeEname == '' || item.codeValue == '' || this.codetableCname == '' || this.codetableEname == '') {
        //   this.showSnackbar("请输入完整信息", "error");
        // } else { */
        console.log(item)
        arr.push(item)
      })

      arr.forEach((item) => {
        item.codetableCname = this.codetableCname
        item.codetableEname = this.codetableEname
        item.remark = this.remarks
        item.dataType = this.datas
        item.createTime = ''
        item.updateTime = ''
      })
      let obj = {}
      obj.codeInfoList = arr
      obj.fieldCodeList = this.objId.concat(this.objsId)
      console.log(JSON.stringify(obj))
      this.$nohttps
        .post('/codeinfo/saveCodeInfo?isadd=1&batchNo=' + this.batchNo, obj)
        .then((res) => {
          if (res.data.resultCode === 'RESULT_SUCCESS') {
            this.showSnackbar(res.data.message, 'success')
            this.$router.push({
              name: 'standard-code',
            })
          } else {
            this.showSnackbar(res.data.message, 'error')
          }
        })
        .catch((err) => {
          this.showSnackbar('REST服务失败', 'error')
        })
    },
    addProperty() {
      this.tableData.push(Object.assign({}, this.defaultProperty))
    },
    deleteProperty(index) {
      this.tableData.splice(index, 1)
    },
    back() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped>
.formStyle{
  display: flex;
}
.spacer{
    width: 20px
  }
</style>
