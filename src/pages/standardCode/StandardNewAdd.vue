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
            <v-icon class="text--secondary" @click="back">mdi-arrow-left</v-icon>
          </v-btn>
        </div>
      </v-flex>
      <v-flex sm12 md4 xl3>
        <v-widget title="标准信息">
          <div slot="widget-content">
            <vue-perfect-scrollbar :settings="scrollSettings" style="max-height:400px">
              <v-expansion-panel popout>
                <v-expansion-panel-content v-for="(item, i) in tableData1" :key="i">
                  <template v-slot:header>
                    <div>{{ item.name }}</div>
                  </template>
                  <v-card>
                    <div class="layout">
                      <div class="ml-4 my-3 font-weight-Regular">标准中文名</div>
                      <v-spacer></v-spacer>
                      <div class="grey--text mr-4 my-3 text--darken-2">{{ item.name }}</div>
                    </div>
                    <v-divider></v-divider>
                    <div class="layout">
                      <div class="ml-4 my-3 font-weight-Regular">标准英文名</div>
                      <v-spacer></v-spacer>
                      <div class="grey--text mr-4 my-3 text--darken-2">{{ item.enName }}</div>
                    </div>
                    <v-divider></v-divider>
                    <div class="layout">
                      <div class="ml-4 my-3 font-weight-Regular">定义</div>
                      <v-spacer></v-spacer>
                      <div class="grey--text mr-4 my-3 text--darken-2">{{ item.description }}</div>
                    </div>
                    <v-divider></v-divider>
                    <div class="layout">
                      <div class="ml-4 my-3 font-weight-Regular">创建者</div>
                      <v-spacer></v-spacer>
                      <div class="grey--text mr-4 my-3 text--darken-2">{{ item.createPerson }}</div>
                    </div>
                    <v-divider></v-divider>
                    <div class="layout">
                      <div class="ml-4 my-3 font-weight-Regular">创建时间</div>
                      <v-spacer></v-spacer>
                      <div class="grey--text mr-4 my-3 text--darken-2">{{ item.createTime }}</div>
                    </div>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" flat @click="preview(item.id)">查看</v-btn>
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
                        <tr :active="props.selected" @click="props.selected = !props.selected">
                          <td>
                            <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
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
                      <v-flex sm6 md6 xl6></v-flex>
                      <v-flex sm6 md6 xl6>
                        <v-btn color="success" style="float:right" @click="handlesave()">确定</v-btn>
                        <v-btn flat @click="handlecancel" style="float:right">取消</v-btn>
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
                                <v-icon>mdi-file-eye-outline</v-icon>
                              </v-btn>
                            </template>
                            <span>查看</span>
                          </v-tooltip>
                        </td>
                      </template>
                    </v-data-table>
                    <v-layout row wrap>
                      <v-flex sm6 md6 xl6></v-flex>
                      <v-flex sm6 md6 xl6>
                        <v-btn flat @click="handlecancel1" style="float:right">取消</v-btn>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-widget>
              </v-dialog>
              <v-form ref="form" lazy-validation class="formStyle">
                <v-text-field
                  :rules="[rules.codetableCname]"
                  v-model="codetableCname"
                  label="码表中文名 *"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-text-field
                  :rules="[rules.codetableEname]"
                  v-model="codetableEname"
                  label="码表英文名 *"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-text-field v-model="remarks" label="备注"></v-text-field>
              </v-form>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="addProperty">新增码值</v-btn>
              <v-btn color="primary" @click.stop="saveCodeBtn">保存</v-btn>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="tableData"
              :search="search"
              :pagination.sync="pagination"
            >
              <template v-slot:headers="props1">
                <tr>
                  <th
                    v-for="header in props1.headers"
                    :key="header.text"
                    :class="[
                      'column sortable px-4 text-xs-left',
                      pagination2.descending ? 'desc' : 'asc',
                      header.value === pagination2.sortBy ? 'active' : '',
                    ]"
                    @click="changeSort(header.value, header.sortable)"
                  >
                    {{ header.text }}
                    <v-icon small>arrow_upward</v-icon>
                  </th>
                </tr>
              </template>
              <template v-slot:items="tableData">
                <td class="px-4">{{ tableData.index + 1 }}</td>
                <td class="px-4">
                  <v-edit-dialog lazy>
                    {{ tableData.item.codeCname }}
                    <template v-slot:input>
                      <v-text-field clearable v-model="tableData.item.codeCname"></v-text-field>
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
                </td>-->
                <td class="px-4">
                  <v-edit-dialog lazy>
                    {{ tableData.item.codeValue }}
                    <template v-slot:input>
                      <v-text-field clearable v-model="tableData.item.codeValue"></v-text-field>
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
            </v-data-table>
          </div>
        </v-widget>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import VWidget from "@/components/VWidget";
import qs from "qs";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  name: "stdmodel-info",
  components: {
    VWidget,
    VuePerfectScrollbar
  },
  data: () => ({
    modelInfo: {},
    codetableCname: "",
    codetableEname: "",
    remarks: "",
    modelDialog: false,
    modelDialog2: false,
    selected: [],
    scrollSettings: {
      maxScrollbarLength: 80
    },
    headers: [
      { text: "序号", value: "no" },
      { text: "代码中文名", value: "codeCname" },
      // { text: '代码英文名', value: 'codeEname' },
      { text: "代码值", value: "codeValue" },
      { text: "操作", value: "remark" }
    ],
    headers1: [
      { text: "序号", value: "no" },
      { text: "标准中文名", value: "name" },
      { text: "标准英文名", value: "enName" },
      { text: "定义", value: "description" },
      { text: "创建者", value: "createPerson" },
      { text: "创建时间", value: "createTime" },
      { text: "操作", value: "remark" }
    ],
    headers2: [
      { text: "字段中文名", value: "objCname" },
      { text: "字段英文名", value: "objEname" },
      { text: "短名", value: "shortName" },
      { text: "数据类型", value: "objDataType" },
      { text: "定义", value: "objDefined" },
      { text: "操作", value: "remark" }
    ],
    headers3: [
      { text: "序号", value: "no" },
      { text: "中文名称", value: "name" },
      { text: "英文名称", value: "enName" },
      { text: "短名", value: "code" },
      { text: "数据类型", value: "type" },
      { text: "长度", value: "maxsize" },
      { text: "值域", value: "range" },
      { text: "最大出现次数", value: "maxContains" }
    ],
    pagination: {
      rowsPerPage: -1,
      sortBy: null
    },
    pagination2: {
      rowsPerPage: -1, // -1 for All
      sortBy: null
    },
    tableData: [],
    tableData1: [],
    rules: {
      codetableCname: value => /^[A-Za-z0-9\_\u4e00-\u9fa5]+$/.test(value) || "请填写中文",
      codetableEname: value =>
        /^[A-Za-z0-9\_]+$/.test(value) || "请填写英文或数字或下划线"
    },
    reData2: [],
    reData3: [],
    changeSortNum: 0,
    search: null,
    fieldCodeList: [],
    hTitle: "新增码表",
    defaultProperty: {
      no: "",
      id: "",
      codeCname: "",
      // codeEname: '',
      codeValue: ""
    }
  }),
  created() {
    // this.initialize();
    this.detailedInfo();
  },
  methods: {
    /* changeSort (column, sortable, tmp_pagination) {
      if (!(sortable === false)) {
        if (tmp_pagination.sortBy === column) {
          if (this.changeSortNum === 1) {
            tmp_pagination.descending = !tmp_pagination.descending
            this.changeSortNum = 2;
          } else {
            tmp_pagination.sortBy = null;
          }
        } else {
          this.changeSortNum = 1;
          tmp_pagination.sortBy = column;
          tmp_pagination.descending = false;
        }
      }
    }, */
    changeSort(column, sortable) {
      if (!(sortable === false)) {
        if (this.pagination2.sortBy === column) {
          if (this.changeSortNum === 1) {
            this.pagination2.descending = !this.pagination2.descending;
            this.changeSortNum = 2;
          } else {
            this.pagination2.sortBy = null;
          }
        } else {
          this.changeSortNum = 1;
          this.pagination2.sortBy = column;
          this.pagination2.descending = false;
        }
      }
    },
    showSnackbar(text, color) {
      this.snackbar = {
        show: true,
        text: text,
        color: color
      };
      this.$emit("showSnackbar", this.snackbar);
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.reData2.slice();
    },
    detailedInfo() {
      this.$nohttps
        .get("/newstandard/getStandard?categoryId")
        .then(res => {
          let data = res.data.data;
          this.tableData1 = [...data];
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    preview(stdId) {
      let version = "";
      let batchNo = "";
      let id = stdId;
      this.$nohttps
        .post(
          "/newstandard/getStandardById?stdId=" +
            id +
            "&version=" +
            version +
            "&batchNo=" +
            batchNo
        )
        .then(res => {
          if (res.data.resultCode === "RESULT_SUCCESS") {
            if (res.data.data[0].standardObject.length != 0) {
              let data = res.data.data[0].standardObject;
              this.reData3 = [...data];
              this.modelDialog2 = true;
            } else {
              let data = res.data.data[0].standardField;
              this.reData2 = [...data];
              this.modelDialog = true;
            }
          } else {
            this.showSnackbar(res.data.message, "error");
          }
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    preview2(item) {
      this.modelDialog2 = false;
      this.modelDialog = true;
      this.reData2 = item;
    },
    handlesave() {
      this.modelDialog = false;
      let arr = [];
      this.selected.forEach(item => {
        for (let key in item) {
          var obj = {};
          if (key == "id") {
            var obj1 = {};
            obj1.fieldId = item[key];
          }
          obj = Object.assign({}, obj1);
          arr.push(obj);
        }
      });
      var result = [];
      var obje = {};
      for (var i = 0; i < arr.length; i++) {
        if (!obje[arr[i].fieldId]) {
          result.push(arr[i]);
          obje[arr[i].fieldId] = true;
        }
      }
      this.fieldCodeList = result;
    },
    handlecancel() {
      this.modelDialog = false;
      /* if (this.reData3) {
        this.modelDialog2 = true;
      } */
    },
    handlecancel1() {
      this.modelDialog2 = false;
    },
    testEnglish(name) {
      const reg = /^[A-Za-z0-9\_]+$/;
      return reg.test(name);
    },
    testChinese(name) {
      const regs = /[A-Za-z0-9\_\u4E00-\u9FA5\\s]+/;
      return regs.test(name);
    },
    testnull(name) {
      if (
        name === "null" ||
        name === null ||
        name === "" ||
        name === undefined ||
        name === "undefined"
      ) {
        return false;
      }
      return true;
    },
    saveCodeBtn() {
      console.log(this.tableData);
      if (!this.$refs.form.validate() || this.tableData.length == 0) {
        this.showSnackbar("请先填写表单", "warning");
        return;
      }
      for (var i = 0; i < this.tableData.length; i++) {
        var item = this.tableData[i];
        if (!this.testnull(item.codeCname)) {
          this.showSnackbar("代码中文名不能为空", "error");
          return;
        }
        if (!this.testnull(item.codeValue)) {
          this.showSnackbar("代码值不能为空", "error");
          return;
        }
        if (!this.testChinese(item.codeCname)) {
          this.showSnackbar("代码中文名请输入中文", "error");
          return;
        }
      }
      let arr = [];
      let obj = {};
      this.tableData.forEach(item => {
        arr.push(item);
      });
      arr.forEach(item => {
        item.codetableCname = this.codetableCname;
        item.codetableEname = this.codetableEname;
        item.remark = this.remarks;
        item.dataType = "1";
      });
      obj.codeInfoList = arr;
      obj.fieldCodeList = this.fieldCodeList;
      if (!this.testChinese(this.tableData[0].codetableCname)) {
        this.showSnackbar("码表中文名请输入中文", "error");
        return;
      } else if (!this.testEnglish(this.tableData[0].codetableEname)) {
        this.showSnackbar("码表英文名请输入英文", "error");
        return;
      } else {
        this.$nohttps
          .post("/codeinfo/saveCodeInfo?isadd=0&batchNo", obj)
          .then(res => {
            if (res.data.resultCode === "RESULT_SUCCESS") {
              this.showSnackbar(res.data.message, "success");
              this.$router.push({
                name: "standard-code"
              });
            } else {
              this.showSnackbar(res.data.message, "error");
            }
          })
          .catch(err => {
            this.showSnackbar("REST服务失败", "error");
          });
      }
    },
    addProperty() {
      this.tableData.push(Object.assign({}, this.defaultProperty));
    },
    deleteProperty(index) {
      this.tableData.splice(index, 1);
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.formStyle {
  display: flex;
}
.spacer {
  width: 20px;
}
</style>
