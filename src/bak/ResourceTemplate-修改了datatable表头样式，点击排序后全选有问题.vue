<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <v-flex sm12 md12>
          <v-widget title="全部资源模型">
            <div slot="widget-content">
              <v-card-title>
                <v-btn color="primary" @click.stop="modelDialogShow">
                  新增模型
                  <v-icon right>mdi-plus</v-icon>
                </v-btn>
                <v-dialog v-model="modelDialog" max-width="1450px">
                  <!-- <template v-slot:activator="{ on }"> -->
                  <!-- 上一行使用了解构，直接传入一个{on}来解构传入的参数 -->
                  <!-- 详见https://cn.vuejs.org/v2/guide/components-slots.html#结构插槽-Prop -->
                  <!-- <v-btn color="primary" -->
                  <!-- v-on="on">新增模型 -->
                  <!-- <v-icon right>add</v-icon> -->
                  <!-- </v-btn> -->
                  <!-- 上一行的v-on使用了对象语法 (2.4.0+) -->
                  <!-- 等价于v-on:click="on.click" -->
                  <!-- 例如<button v-on="{ mousedown: doThis, mouseup: doThat }"></button> -->
                  <!-- </template> -->
                  <v-stepper v-model="stepVal">
                    <v-stepper-header flat class="elevation-0">
                      <v-stepper-step :complete="stepVal > 1" step="1">建模步骤 1</v-stepper-step>
                      <v-divider></v-divider>
                      <v-stepper-step step="2">建模步骤 2</v-stepper-step>
                    </v-stepper-header>
                    <v-divider></v-divider>
                    <v-stepper-items>
                      <v-stepper-content step="1">
                        <div class="mb-2">
                          <span class="headline">{{ formTitle }}&nbsp;:&nbsp;填写模型基本信息</span>
                        </div>
                        <div style="margin-bottom:20px">
                          <v-form ref="form">
                            <v-container fluid>
                              <v-layout wrap row>
                                <v-flex md3>
                                  <v-text-field
                                    clearable
                                    :rules="[rules.required,rules.number_character]"
                                    v-model="editedItem.code"
                                    label="编码 *"
                                    hint="模型物化之后会使用“编码”作为表名"
                                  ></v-text-field>
                                </v-flex>
                                <v-flex md3>
                                  <v-text-field
                                    clearable
                                    :rules="[rules.required]"
                                    v-model="editedItem.enName"
                                    label="模型英文名称 *"
                                  ></v-text-field>
                                </v-flex>
                                <v-flex md3>
                                  <v-text-field
                                    clearable
                                    v-model="editedItem.cnName"
                                    label="模型中文名称"
                                  ></v-text-field>
                                </v-flex>
                                <v-flex md3>
                                  <v-text-field clearable v-model="editedItem.bmID" label="编目ID"></v-text-field>
                                </v-flex>
                                <v-flex md3>
                                  <v-layout wrap>
                                    <!-- <v-flex md12>
                                      <v-text-field append-outer-icon="add"
                                                    @click:append-outer="addModelType"
                                                    hint="点击“+”添加新类型并在下方选择"
                                                    clearable
                                                    v-model="typeItem"
                                                    label="添加模型类型"></v-text-field>
                                    </v-flex>-->
                                    <v-flex md12>
                                      <v-select
                                        :items="typeSelectItems"
                                        label="选择模型类型 *"
                                        :rules="[rules.required]"
                                        v-model="editedItem.type"
                                      ></v-select>
                                    </v-flex>
                                  </v-layout>
                                </v-flex>
                                <v-flex md9>
                                  <v-textarea
                                    clearable
                                    auto-grow
                                    label="备注"
                                    v-model="editedItem.protein"
                                  ></v-textarea>
                                </v-flex>
                              </v-layout>
                              <small>* 表示必填项</small>
                            </v-container>
                          </v-form>
                        </div>
                        <v-layout row wrap>
                          <v-btn color="primary" @click="next1">下一步</v-btn>
                          <v-spacer></v-spacer>
                          <v-btn flat @click="close">取消</v-btn>
                        </v-layout>
                      </v-stepper-content>
                      <v-stepper-content step="2">
                        <!-- <div style="margin-bottom:10px"> -->
                        <div class="mb-2">
                          <span class="headline">{{ formTitle }}&nbsp;:&nbsp;创建模型属性</span>
                        </div>
                        <vue-perfect-scrollbar
                          ref="scrollbar"
                          :settings="scrollSettings"
                          style="height:380px;margin-bottom:20px"
                        >
                          <v-card-title>
                            <v-btn @click="addProperty">
                              新增属性
                              <v-icon right>add</v-icon>
                            </v-btn>
                            <v-btn>
                              导入属性
                              <v-icon right>reply</v-icon>
                            </v-btn>
                            <v-btn color="default">
                              导入标准
                              <v-icon right>playlist_add</v-icon>
                            </v-btn>
                          </v-card-title>
                          <v-data-table
                            :headers="propertyHeaders"
                            :items="editedItem.property"
                            hide-actions
                            :pagination.sync="pagination2"
                          >
                            <template v-slot:items="props">
                              <td>
                                <v-icon small @click="deleteProperty(props.index)">delete</v-icon>
                              </td>
                              <td>
                                <v-edit-dialog lazy>
                                  {{ props.item.code }}
                                  <template v-slot:input>
                                    <v-text-field clearable v-model="props.item.code"></v-text-field>
                                  </template>
                                </v-edit-dialog>
                              </td>
                              <td>
                                <v-edit-dialog lazy>
                                  {{ props.item.enName }}
                                  <template v-slot:input>
                                    <v-text-field clearable v-model="props.item.enName"></v-text-field>
                                  </template>
                                </v-edit-dialog>
                              </td>
                              <td>
                                <v-edit-dialog lazy>
                                  {{ props.item.cnName }}
                                  <template v-slot:input>
                                    <v-text-field clearable v-model="props.item.cnName"></v-text-field>
                                  </template>
                                </v-edit-dialog>
                              </td>
                              <td style="width:30px">
                                <v-select
                                  :items="selectItems"
                                  v-model="props.item.secretLevel"
                                  small-chips
                                ></v-select>
                              </td>
                              <td>
                                <v-edit-dialog lazy>
                                  {{ props.item.definition }}
                                  <template v-slot:input>
                                    <v-text-field clearable v-model="props.item.definition"></v-text-field>
                                  </template>
                                </v-edit-dialog>
                              </td>
                              <td style="width:30px">
                                <v-select
                                  :items="selectItems2"
                                  v-model="props.item.type"
                                  small-chips
                                ></v-select>
                              </td>
                              <td>
                                <v-edit-dialog lazy>
                                  {{ props.item.length }}
                                  <template v-slot:input>
                                    <v-text-field clearable v-model="props.item.length"></v-text-field>
                                  </template>
                                </v-edit-dialog>
                              </td>
                              <td>
                                <v-edit-dialog lazy>
                                  {{ props.item.range }}
                                  <template v-slot:input>
                                    <v-text-field clearable v-model="props.item.range"></v-text-field>
                                  </template>
                                </v-edit-dialog>
                              </td>
                              <td>
                                <v-checkbox v-model="props.item.necessary" hide-details></v-checkbox>
                              </td>
                              <td>
                                <v-checkbox v-model="props.item.unique" hide-details></v-checkbox>
                              </td>
                              <td>
                                <v-edit-dialog lazy>
                                  {{ props.item.maxCount }}
                                  <template v-slot:input>
                                    <v-text-field clearable v-model="props.item.maxCount"></v-text-field>
                                  </template>
                                </v-edit-dialog>
                              </td>
                              <td>
                                <v-edit-dialog lazy>
                                  {{ props.item.remarks }}
                                  <template v-slot:input>
                                    <v-text-field clearable v-model="props.item.remarks"></v-text-field>
                                  </template>
                                </v-edit-dialog>
                              </td>
                            </template>
                          </v-data-table>
                          <v-divider></v-divider>
                          <small>* 表示必填项</small>
                        </vue-perfect-scrollbar>
                        <v-layout row wrap>
                          <v-btn color="primary" @click="stepVal = 1">上一步</v-btn>
                          <v-spacer></v-spacer>
                          <v-btn color="success" @click="finish">完成</v-btn>
                          <v-btn flat @click="close">取消</v-btn>
                        </v-layout>
                      </v-stepper-content>
                    </v-stepper-items>
                  </v-stepper>
                </v-dialog>
                <v-btn color="success">
                  模型导入
                  <v-icon right>mdi-shape-plus</v-icon>
                </v-btn>
                <v-btn color="info">
                  批量注册
                  <v-icon right>mdi-clipboard-check-outline</v-icon>
                </v-btn>
                <v-btn color="error" @click.stop="deleteDialogShow">
                  批量删除
                  <v-icon right>mdi-delete-forever</v-icon>
                </v-btn>
                <v-dialog v-model="deleteDialog" max-width="400">
                  <v-card>
                    <v-card-title class="headline error--text">确认批量删除</v-card-title>
                    <v-card-text>确定要删除这些模型吗？</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="grey" flat @click="deleteDialog = false">取消</v-btn>
                      <v-btn color="error" flat @click="deleteMutipleItem">删除</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                v-model="selected"
                :headers="headers"
                :items="tableData"
                :pagination.sync="pagination"
                select-all
                item-key="code"
                :search="search"
              >
                <template v-slot:headers="props1">
                  <tr>
                    <th class="px-3">
                      <v-checkbox
                        :input-value="props1.all"
                        :indeterminate="props1.indeterminate"
                        primary
                        hide-details
                        @click.stop="toggleAll(props1.all,props1.indeterminate)"
                      ></v-checkbox>
                    </th>
                    <th
                      v-for="header in props1.headers"
                      :key="header.text"
                      :class="['column sortable px-1 text-xs-left',pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                      @click="changeSort(header.value,header.sortable)"
                    >
                      {{ header.text }}
                      <v-icon small>arrow_upward</v-icon>
                    </th>
                  </tr>
                </template>
                <template v-slot:items="props">
                  <td class="px-3">
                    <v-checkbox v-model="props.selected" primary hide-details label=" "></v-checkbox>
                  </td>
                  <td class="px-1">{{ props.item.code }}</td>
                  <!-- <td>{{ props.item.enName }}</td> -->
                  <td class="px-1">{{ props.item.cnName }}</td>
                  <!-- <td>{{ props.item.bmID }}</td> -->
                  <td class="px-1">{{ props.item.type }}</td>
                  <td class="px-1">{{ props.item.creator }}</td>
                  <td class="px-1">{{ props.item.createTime }}</td>
                  <td class="px-1">{{ props.item.updateTime }}</td>
                  <!-- <td>{{ props.item.remarks }}</td> -->
                  <td class="px-1">{{ props.item.state }}</td>
                  <!-- <td class="text-xs-right">{{ props.item.protein }}</td> -->
                  <!-- <td class="justify-center layout px-0"> -->
                  <td class="px-1" nowrap>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon
                          small
                          class="mr-1"
                          color="primary"
                          @click="editItem(props.item,props.index)"
                          v-on="on"
                        >mdi-pencil</v-icon>
                      </template>
                      <span>编辑</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon
                          small
                          class="mr-1"
                          color="error"
                          @click="deleteItem(props.index)"
                          v-on="on"
                        >mdi-delete</v-icon>
                      </template>
                      <span>删除</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon small class="mr-1" color="success" v-on="on">mdi-clipboard-text</v-icon>
                      </template>
                      <span>注册</span>
                    </v-tooltip>
                  </td>
                </template>
                <template v-slot:no-data>
                  <v-btn color="primary" @click="initialize">Reset</v-btn>
                </template>
                <!-- 修改datatable的下标 -->
                <!-- <template v-slot:pageText="props">
                  Lignes {{ props.pageStart+1000 }} - {{ props.pageStop+1000 }} de {{ props.itemsLength }}
                </template>-->
              </v-data-table>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import VWidget from "@/components/VWidget";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  name: "resource-template",
  components: {
    VWidget,
    VuePerfectScrollbar
  },
  data() {
    return {
      search: "",
      pagination: {
        // descending: boolean,
        // page: 2,
        rowsPerPage: 10, // -1 for All
        sortBy: null
        // sortBy: "updateTime",
        // totalItems: 10,
      },
      click: 0,
      pagination2: {
        // descending: boolean,
        // page: 2,
        rowsPerPage: -1, // -1 for All
        sortBy: null
        // totalItems: 10,
      },
      selected: [],
      modelDialog: false,
      deleteDialog: false,
      headers: [
        { text: "编码", value: "code" },
        // {
        //   text: "模型英文名",
        //   // align: "left",    //middle，right
        //   // sortable: false,
        //   value: "enName"
        // },
        { text: "模型中文名", value: "cnName" },
        // { text: "编目ID", value: "bmID" },
        { text: "模型类型", value: "type" },
        { text: "创建者", value: "creator" },
        { text: "创建时间", value: "createTime" },
        { text: "更新时间", value: "updateTime" },
        { text: "执行状态", value: "state" },
        // { text: "备注", value: "remarks" },
        { text: "操作", sortable: false }
      ],
      tableData: [],
      editOrNew: -1, //-1表示新增
      editedItem: {
        code: "",
        enName: "",
        cnName: "",
        bmID: "",
        type: "",
        creator: "",
        createTime: "",
        updateTime: "",
        remarks: "",
        state: "",
        property: []
      },
      stepVal: 1,
      rules: {
        required: value => !!value || "该项不能为空！",
        counter: value => value.length <= 20 || "最多20个字符",
        number_character: v => {
          // const pattern = /^[0-9a-zA-Z_]{1,}$/
          const pattern = /^[a-zA-Z]([_a-zA-Z0-9]{1,63})$/;
          return (
            pattern.test(v) || "由字母、数字和下划线组成，字母开头，2-64个字符"
          );
        }
        // email: value => {
        //     const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        //     return pattern.test(value) || "Invalid e-mail."
        // }
      },
      // from1validate: true    //可以在v-form上面绑定value value为true表示表单验证正确
      typeSelectItems: [],
      typeItem: "",
      snackbar: {
        show: false,
        text: "",
        color: ""
      },
      scrollSettings: {
        maxScrollbarLength: 160
      },
      // property: [],
      propertyHeaders: [
        {
          text: "操作",
          // align: "left",
          sortable: false,
          value: "actions"
        },
        { text: "编码 *", value: "code" },
        { text: "英文名 *", value: "enName" },
        { text: "中文名", value: "cnName" },
        { text: "密级", value: "secretLevel" },
        { text: "定义", value: "definition" },
        { text: "元数据类型 *", value: "type" },
        { text: "长度 *", value: "length" },
        { text: "值域", value: "range" },
        { text: "是否必填", value: "necessary" },
        { text: "是否唯一", value: "unique" },
        { text: "最大出现次数", value: "maxCount" },
        { text: "备注", value: "remarks" }
      ],
      defaultProperty: {
        code: "null",
        enName: "null",
        cnName: "null",
        secretLevel: "公开",
        definition: "null",
        type: "字符串",
        length: 0,
        range: 0,
        necessary: false,
        unique: false,
        maxCount: 1,
        remarks: "null"
      },
      selectItems: ["公开", "秘密", "机密", "绝密"],
      selectItems2: ["字符串", "整数", "单精度", "双精度", "日期", "对象"],
      selectMap: new Map()
    };
  },
  computed: {
    formTitle() {
      return this.editOrNew === -1 ? "新增模型" : "修改模型";
    }
  },
  watch: {
    modelDialog(val) {
      if (!val) {
        this.stepVal = 1;
      }
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    changeSort(column, sortable) {
      if (!(sortable === false)) {
        if (this.pagination.sortBy === column) {
          if (this.click === 1) {
            this.pagination.descending = !this.pagination.descending;
            this.click = 2;
          } else {
            this.pagination.sortBy = null;
          }
        } else {
          this.click = 1;
          this.pagination.sortBy = column;
          this.pagination.descending = false;
        }
      }
    },
    toggleAll(all, indeterminate) {
      // console.log(all + ' || ' + indeterminate);
      let tmpArray = this.tableData.slice(
        (this.pagination.page - 1) * this.pagination.rowsPerPage,
        this.pagination.page * this.pagination.rowsPerPage
      );
      if (all) {
        for (let a of tmpArray) {
          this.selected.splice(
            this.selected.findIndex(v => {
              return v.code === a.code;
            }),
            1
          );
        }
      } else {
        if (indeterminate) {
          console.log(all + " || " + indeterminate);
          // console.log(tmpArray);
          for (let a of tmpArray) {
            if (
              this.selected.findIndex(v => {
                return v.code === a.code;
              }) === -1
            ) {
              this.selected.push(a);
            }
          }
        } else {
          this.selected.push(...tmpArray);
        }
      }
      // let tmpArray = this.tableData.slice((this.pagination.page - 1) * this.pagination.rowsPerPage, this.pagination.page * this.pagination.rowsPerPage);
      // if (this.selected.length) this.selected = [];
      // else this.selected = this.tableData.slice();   //服务器分页使用这行代码选中全部
      // else {
      // console.log(this.props1);
      // consoleWarn(this.props1);
      // this.selected.push(...tmpArray);
      // }
    },
    deleteDialogShow() {
      if (this.selected.length === 0) this.deleteDialog = false;
      else this.deleteDialog = true;
    },
    modelDialogShow() {
      this.editOrNew = -1;

      this.modelDialog = true;
    },
    deleteMutipleItem() {
      let index;
      for (let value of this.selected) {
        index = this.tableData.indexOf(value);
        this.tableData.splice(index, 1);
        // console.log(value);
      }
      this.deleteDialog = false;
      this.showSnackbar("批量删除模型成功", "success");
    },
    initialize() {
      // console.log('this.tableData1');
      this.typeSelectItems = ["表模型", "实时数据模型", "原始数据模型"];
      // this.axios.get('/ywsjglprj/model/0/getAllModelsExceptFmbByCategoryId')
      this.tableData = new Array();
      const _this = this;
      this.axios
        .get("/ywsjglprj/model/getAllModelInfoInner")
        .then(function(response) {
          // console.log(response);
          // console.log(response.data.resultCode);
          if (response.data.resultCode === "RESULT_SUCCESS") {
            // console.log('response.data.resultCode');
            for (let v of response.data.data) {
              _this.tableData.push(
                new Object({
                  enName: v.code,
                  cnName: v.name,
                  code: v.code,
                  bmID: v.bmid,
                  type: v.type,
                  creator: v.createPerson,
                  createTime: v.createTime,
                  updateTime: v.updateTime,
                  remarks: v.description,
                  state: v.registerStatus
                })
              );
            }
            // console.log('this.tableData2');
          } else {
            _this.showSnackbar(
              "200OK，内部服务错误" + response.data.resultCode,
              "error"
            );
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    editItem(item, index) {
      this.editOrNew = index;
      // console.log(index);
      this.editedItem = Object.assign({}, item);
      this.modelDialog = true;
    },
    // deleteItem (item) {
    //     const index = this.tableData.indexOf(item);
    //     confirm("Are you sure you want to delete this item?") && this.tableData.splice(index, 1);
    // },
    deleteItem(index) {
      this.tableData.splice(index, 1);
    },
    deleteProperty(index) {
      this.editedItem.property.splice(index, 1);
    },
    close() {
      this.modelDialog = false;
      // setTimeout(() => {
      //     this.editedItem = Object.assign({}, this.defaultItem);
      //     this.editOrNew = -1;
      // }, 300)
    },
    // save () {
    // if (this.editOrNew > -1) {
    //     Object.assign(this.tableData[this.editOrNew], this.editedItem);
    // } else {
    //     this.tableData.push(this.editedItem);
    // }
    // this.close();
    // },
    finish() {
      let tmpArray = new Array();
      for (let v of this.editedItem.property) {
        tmpArray.push(v.code);
      }
      let l1 = Array.from(new Set(tmpArray)).length;
      // console.log(l1);
      if (l1 === this.editedItem.property.length) {
        if (this.editOrNew > -1) {
          Object.assign(this.tableData[this.editOrNew], this.editedItem);
          this.showSnackbar("修改模型成功", "success");
        } else {
          if (
            this.tableData.find(v => {
              return v.code === this.editedItem.code;
            })
          ) {
            this.showSnackbar("新增模型失败，模型编码重复", "error");
          } else {
            this.tableData.unshift(this.editedItem);
            this.showSnackbar("新增模型成功", "success");
          }
        }
        this.close();
      } else {
        this.showSnackbar("模型属性编码重复，请修改", "warning");
      }
    },
    next1() {
      if (this.$refs.form.validate())
        //检测输入是否正确
        this.stepVal = 2;
      else this.stepVal = 1;
    },
    // addModelType () {
    //   if (typeof this.typeItem != "undefined" && this.typeItem != null && this.typeItem != "")
    //     this.typeSelectItems.push(this.typeItem);
    //   this.showSnackbar("添加新模型类型成功", "success");
    // },
    showSnackbar(text, color) {
      this.snackbar = {
        show: true,
        text: text,
        color: color
      };
      this.$emit("showSnackbar", this.snackbar);
      // console.log(this.snackbar);
    },
    addProperty() {
      this.editedItem.property.unshift(Object.assign({}, this.defaultProperty));
    }
  }
};
</script>

<style lang="stylus" scoped></style>
