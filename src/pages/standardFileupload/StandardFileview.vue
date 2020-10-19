//编辑页面
<template>
  <v-container grid-list-xl fluid>
    <!-- 标准信息模态框 -->
    <v-dialog v-model="modelDialog" max-width="1000px">
      <v-widget title="编辑">
        <div slot="widget-content">
          <v-data-table
            :headers="headers2"
            :items="reData2"
            class="elevation-1"
            :pagination.sync="pagination"
          >
            <template v-slot:items="reData2">
              <td>
                <v-edit-dialog lazy>
                  {{ reData2.item.cname }}
                  <template v-slot:input>
                    <v-text-field clearable v-model="reData2.item.cname"></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-edit-dialog lazy>
                  {{ reData2.item.ename }}
                  <template v-slot:input>
                    <v-text-field clearable v-model="reData2.item.ename"></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-edit-dialog lazy>
                  {{ reData2.item.code }}
                  <template v-slot:input>
                    <v-text-field clearable v-model="reData2.item.code"></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-edit-dialog lazy>
                  {{ reData2.item.defined }}
                  <template v-slot:input>
                    <v-text-field clearable v-model="reData2.item.defined"></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>

              <td>
                <v-edit-dialog lazy>
                  {{ reData2.item.remark }}
                  <template v-slot:input>
                    <v-text-field clearable v-model="reData2.item.remark"></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td v-if="reData2.item.fields">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      flat
                      icon
                      class="ma-0"
                      color="info"
                      v-on="on"
                      @click="preview2(reData2.item.fields, reData2.item)"
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
            <v-flex sm6 md6 xl6></v-flex>
            <v-flex sm6 md6 xl6>
              <v-btn color="success" style="float:right" @click="handlesave()">保存</v-btn>
              <v-btn flat @click="handlecancel" style="float:right">取消</v-btn>
            </v-flex>
          </v-layout>
        </div>
      </v-widget>
    </v-dialog>
    <!-- 详细信息模态框 -->
    <v-dialog v-model="modelDialog2" max-width="1450px">
      <v-widget title="详细信息">
        <div slot="widget-content">
          <v-data-table
            :headers="headers3"
            :items="reData3"
            class="elevation-1"
            :pagination.sync="pagination1"
          >
            <template v-slot:items="reData3">
              <td>{{ reData3.index + 1 }}</td>
              <td>
                <v-edit-dialog lazy>
                  {{ reData3.item.cname }}
                  <template v-slot:input>
                    <v-text-field clearable v-model="reData3.item.cname"></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-edit-dialog lazy>
                  {{ reData3.item.ename }}
                  <template v-slot:input>
                    <v-text-field clearable v-model="reData3.item.ename"></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-edit-dialog lazy>
                  {{ reData3.item.code }}
                  <template v-slot:input>
                    <v-text-field clearable v-model="reData3.item.code"></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-edit-dialog lazy>
                  {{ reData3.item.definded }}
                  <template v-slot:input>
                    <v-text-field clearable v-model="reData3.item.definded"></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-edit-dialog lazy>
                  {{ reData3.item.datatype }}
                  <template v-slot:input>
                    <v-text-field clearable v-model="reData3.item.datatype"></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-edit-dialog lazy>
                  {{ reData3.item.field_range }}
                  <template v-slot:input>
                    <v-text-field clearable v-model="reData3.item.field_range"></v-text-field>
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
                    <v-text-field clearable v-model="reData3.item.maxContains"></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-edit-dialog lazy>
                  {{ reData3.item.comments }}
                  <template v-slot:input>
                    <v-text-field clearable v-model="reData3.item.comments"></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
            </template>
          </v-data-table>
          <v-layout row wrap>
            <v-flex sm6 md6 xl6></v-flex>
            <v-flex sm6 md6 xl6>
              <v-btn color="success" @click="handlecancel2" style="float:right">确定</v-btn>
              <v-btn flat @click="handlecancel3" style="float:right">返回</v-btn>
            </v-flex>
          </v-layout>
        </div>
      </v-widget>
    </v-dialog>
    <!-- 非对象类型模态框 -->
    <v-dialog v-model="modelDialog3" max-width="1450px">
      <v-widget title="详细信息">
        <div slot="widget-content">
          <v-data-table
            :headers="headers3"
            :items="reData4"
            class="elevation-1"
            :pagination.sync="pagination2"
          >
            <template v-slot:items="reData4">
              <td>{{ reData4.index + 1 }}</td>
              <td>
                <v-edit-dialog lazy>
                  {{ reData4.item.cname }}
                  <template v-slot:input>
                    <v-text-field clearable v-model="reData4.item.cname"></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-edit-dialog lazy>
                  {{ reData4.item.ename }}
                  <template v-slot:input>
                    <v-text-field clearable v-model="reData4.item.ename"></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-edit-dialog lazy>
                  {{ reData4.item.code }}
                  <template v-slot:input>
                    <v-text-field clearable v-model="reData4.item.code"></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-edit-dialog lazy>
                  {{ reData4.item.definded }}
                  <template v-slot:input>
                    <v-text-field clearable v-model="reData4.item.definded"></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td style="width:30px" class="px-1">
                <v-edit-dialog lazy>
                  {{ reData4.item.datatype }}
                  <template v-slot:input>
                    <v-text-field clearable v-model="reData4.item.datatype"></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-edit-dialog lazy>
                  {{ reData4.item.field_range }}
                  <template v-slot:input>
                    <v-text-field clearable v-model="reData4.item.field_range"></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-checkbox
                  true-value="O"
                  false-value="o"
                  v-model="reData4.item.required"
                  hide-details
                ></v-checkbox>
              </td>
              <td>
                <v-edit-dialog lazy>
                  {{ reData4.item.maxContains }}
                  <template v-slot:input>
                    <v-text-field clearable v-model="reData4.item.maxContains"></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-edit-dialog lazy>
                  {{ reData4.item.comments }}
                  <template v-slot:input>
                    <v-text-field clearable v-model="reData4.item.comments"></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
            </template>
          </v-data-table>
          <v-layout row wrap>
            <v-flex sm6 md6 xl6></v-flex>
            <v-flex sm6 md6 xl6>
              <v-btn color="success" :loading="loading" @click="saves" style="float:right">保存</v-btn>
              <v-btn flat @click="backs" style="float:right">返回</v-btn>
            </v-flex>
          </v-layout>
        </div>
      </v-widget>
    </v-dialog>
    <!-- 标准信息删除按钮模态框 -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline error--text">
          {{
          deleteTitle
          }}
        </v-card-title>
        <v-card-text>{{ deleteText }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" flat @click="deleteDialog = false">取消</v-btn>
          <v-btn color="error" flat @click="deleteMutipleItem">删除</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 码表信息删除按钮模态框 -->
    <v-dialog v-model="deleteDialog1" max-width="400">
      <v-card>
        <v-card-title class="headline error--text">
          {{
          deleteTitle1
          }}
        </v-card-title>
        <v-card-text>{{ deleteText1 }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" flat @click="deleteDialog1 = false">取消</v-btn>
          <v-btn color="error" flat @click="deleteMutipleItem1">删除</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 页面 -->
    <v-layout row wrap>
      <v-layout row wrap>
        <v-flex sm6 md6 xl6></v-flex>
        <v-flex sm6 md6 xl6>
          <v-btn @click="savemessageBtn" color="success" style="float:right">保存</v-btn>
          <v-btn flat @click="cancel" style="float:right">取消</v-btn>
        </v-flex>
      </v-layout>
      <v-flex sm12 md12 xl12>
        <!-- 标准信息 -->
        <v-widget title="标准信息">
          <div slot="widget-content">
            <!-- 数据table -->
            <v-data-table
              :headers="headers"
              :items="reData"
              class="elevation-1"
              :pagination.sync="pagination3"
            >
              <template v-slot:items="reData">
                <td>{{ reData.index + 1 }}</td>
                <td>
                  <v-edit-dialog lazy>
                    {{ reData.item.code }}
                    <template v-slot:input>
                      <v-text-field clearable :rules="[rules.code]" v-model="reData.item.code"></v-text-field>
                    </template>
                  </v-edit-dialog>
                </td>
                <td>
                  <v-edit-dialog lazy>
                    {{ reData.item.cname }}
                    <template v-slot:input>
                      <v-text-field clearable :rules="[rules.cnName]" v-model="reData.item.cname"></v-text-field>
                    </template>
                  </v-edit-dialog>
                </td>
                <td>
                  <v-edit-dialog lazy>
                    {{ reData.item.ename }}
                    <template v-slot:input>
                      <v-text-field clearable :rules="[rules.enName]" v-model="reData.item.ename"></v-text-field>
                    </template>
                  </v-edit-dialog>
                </td>
                <td>{{ reData.item.create_time }}</td>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        flat
                        icon
                        class="ma-0"
                        color="info"
                        v-on="on"
                        @click="preview(reData.item.std_id)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>编辑</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        flat
                        icon
                        class="ma-0"
                        color="error"
                        v-on="on"
                        @click.stop="
                          deleteDialogShow(
                            '确认删除',
                            '确实要删除此文件吗？',
                            reData.index,
                            reData.item
                          )
                        "
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
      <!-- 码表信息↓ -->
      <v-flex sm12 md12 xl12>
        <v-widget title="码表信息">
          <div slot="widget-content">
            <!-- 数据table -->
            <v-data-table
              :headers="reHeaders"
              :items="standardData"
              class="elevation-1"
              :pagination.sync="pagination4"
            >
              <template v-slot:items="standardData">
                <td>{{ standardData.index + 1 }}</td>
                <td>
                  <v-edit-dialog lazy>
                    {{ standardData.item.codetable_cname }}
                    <template v-slot:input>
                      <v-text-field
                        clearable
                        :rules="[rules.required]"
                        v-model="standardData.item.codetable_cname"
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                </td>
                <td>
                  <v-edit-dialog lazy>
                    {{ standardData.item.codetable_ename }}
                    <template v-slot:input>
                      <v-text-field
                        clearable
                        :rules="[rules.required]"
                        v-model="standardData.item.codetable_ename"
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                </td>
                <td>
                  <v-edit-dialog lazy>
                    {{ standardData.item.code_cname }}
                    <template v-slot:input>
                      <v-text-field
                        clearable
                        :rules="[rules.required]"
                        v-model="standardData.item.code_cname"
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                </td>
                <td>
                  <v-edit-dialog lazy>
                    {{ standardData.item.code_value }}
                    <template v-slot:input>
                      <v-text-field
                        clearable
                        :rules="[rules.required]"
                        v-model="standardData.item.code_value"
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                </td>
                <td>{{ standardData.item.create_time }}</td>
                <td>
                  <v-edit-dialog lazy>
                    {{ standardData.item.remark }}
                    <template v-slot:input>
                      <v-text-field clearable v-model="standardData.item.remark"></v-text-field>
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
                        color="error"
                        v-on="on"
                        @click.stop="
                          deleteDialogShow1(
                            '确认删除',
                            '确实要删除此文件吗？',
                            standardData.index,
                            standardData.item
                          )
                        "
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
export default {
  name: "standar-detection",
  components: {
    VWidget
  },
  data: () => ({
    // rules: {
    //   required: (value) => !!value || '该项不能为空！',
    //   counter: (value) => value.length <= 20 || '最多20个字符',
    // },
    allReList: [],
    allStandardList: [],
    standardList: [],
    reName: null,
    reId: null,
    standardName: null,
    standardId: null,
    modelDialog: false,
    modelDialog2: false,
    deleteText: "",
    deleteText1: "",
    deleteTitle: "",
    deleteTitle1: "",
    modelData: {},
    pagination: {
      rowsPerPage: 10, // -1 for All
      sortBy: null
    }, //不分页
    pagination1: {
      rowsPerPage: 10, // -1 for All
      sortBy: null
    },
    pagination2: {
      rowsPerPage: 10, // -1 for All
      sortBy: null
    },
    pagination3: {
      rowsPerPage: 10, // -1 for All
      sortBy: null
    },
    pagination4: {
      rowsPerPage: 10, // -1 for All
      sortBy: null
    },
    rowsPerPage: [5, 10, 20, { text: "全部", value: -1 }],
    // 标准信息表格头
    headers: [
      { text: "序号", value: "index" },
      { text: "短名 *", value: "code" },
      { text: "标准中文名 *", value: "cname" },
      { text: "标准英文名 *", value: "ename" },
      // { text: '上传人', value: 'creator' },
      { text: "上传日期", value: "creator_time" },
      { text: "操作", value: "way2" }
    ],
    //码表信息表格头
    reHeaders: [
      { text: "序号", value: "" },
      { text: "码表中文名 *", value: "codetable_cname" },
      { text: "码表英文名 *", value: "codetable_ename" },
      { text: "码值内容 *", value: "code_cname" },
      //{ text: '码值英文名 *', value: 'code_ename' },
      { text: "代码值 *", value: "code_value" },
      // { text: '创建人', value: 'creator' },
      { text: "创建时间", value: "create_time" },
      { text: "备注", value: "remark" },
      { text: "操作", value: "way3" }
    ],
    headers2: [
      { text: "字段中文名 *", value: "cname" },
      { text: "字段英文名 *", value: "ename" },
      { text: "code *", value: "code" },
      { text: "定义", value: "defined" },
      { text: "备注", value: "text" },
      { text: "操作", value: "way" }
    ],
    //详细信息头
    headers3: [
      { text: "序号", value: "index" },
      { text: "中文名称 *", value: "cname" },
      { text: "英文名称 *", value: "ename" },
      { text: "短名 *", value: "code" },
      { text: "定义", value: "person" },
      { text: "数据类型", value: "maxsize" },
      { text: "值域", value: "range" },
      { text: "约束条件", value: "required" },
      { text: "最大出现次数", value: "maxContains" },
      { text: "备注", value: "comments" }
    ],
    // tables
    reData: [],
    obj: {},
    reData2: [],
    reData3: [],
    reData4: [],
    //码表信息表格
    standardData: [],
    modelDialog3: false,
    deleteDialog: false,
    deleteDialog1: false,
    deleteItem: "",
    deleteID: "",
    loading: false,
    rules: {
      required: value => !!value || "该项不能为空！",
      counter: value => value.length <= 20 || "最多20个字符",
      cnName: value => /^[A-Za-z0-9\_\u4e00-\u9fa5]+$/.test(value) || "请填写中文",
      enName: value =>
        /^[A-Za-z0-9\_]+$/.test(value) || "请填写英文或数字或下划线",
      code: value =>
        /^[A-Za-z0-9\_]+$/.test(value) || "请填写英文或数字或下划线"
    }
  }),
  methods: {
    saves() {
      this.loading = true;
      // console.log(this.obj.fields)
      if (
        this.obj.fields.some(
          v => v.code === "" || v.ename === "" || v.cname === ""
        )
      ) {
        this.showSnackbar("有必填字段未填", "error");
      } else {
        let res = this.$https.post("/docmodel/savestd/", this.obj);
        this.showSnackbar("保存成功", "success");
        this.modelDialog3 = false;
      }
      this.loading = false;
    },
    backs() {
      this.modelDialog3 = false;
    },
    showSnackbar(text, color) {
      this.snackbar = {
        show: true,
        text: text,
        color: color
      };
      this.$emit("showSnackbar", this.snackbar);
    },
    // 标准删除按钮
    deleteDialogShow(deleteTitle, deleteText, index, item) {
      console.log(item.std_id);
      this.deleteTitle = deleteTitle;
      this.deleteText = deleteText;
      this.deleteID = item.std_id;
      this.deleteDialog = true;
    },
    // 码表删除按钮
    deleteDialogShow1(deleteTitle, deleteText, index, item) {
      console.log(index);
      this.deleteItem = item.codetable_ename;
      this.deleteTitle1 = deleteTitle;
      this.deleteText1 = deleteText;
      this.deleteDialog1 = true;
    },
    //标准删除模态框里的删除按钮
    deleteMutipleItem() {
      this.reData = this.reData.filter(item => item.std_id != this.deleteID);
      this.deleteDialog = false;
    },
    //码表删除模态框里的删除按钮
    deleteMutipleItem1() {
      let index = this.singleDeleteIndex1;
      this.standardData = this.standardData.filter(
        item => item.codetable_ename != this.deleteItem
      );
      this.deleteDialog1 = false;
    },
    // 模态框取消按钮
    handlecancel() {
      this.modelDialog = false;
    },
    handlecancel2() {
      this.modelDialog2 = false;
      this.modelDialog = true;
    },
    handlecancel3() {
      this.modelDialog2 = false;
      this.modelDialog = true;
    },
    //复用性保存按钮  确定
    handlesave() {
      // console.log(this.obj.objfields)
      if (
        this.obj.objfields.some(
          v =>
            v.code === "" ||
            v.ename === "" ||
            v.cname === "" ||
            v.fields.some(
              v => v.code === "" || v.ename === "" || v.cname === ""
            )
        )
      ) {
        this.showSnackbar("有必填字段未填", "error");
      } else {
        let res = this.$https.post("/docmodel/savestd/", this.obj);
        this.showSnackbar("保存成功", "success");
        this.modelDialog = false;
      }
    },
    // 查看信息
    async getReList() {
      let id = this.$route.query.id;
      let res = await this.$nohttps.get("/docmodel/editfile/" + id);
      console.log(res);
      let data = res.data.data[0].std_mess;
      let data2 = res.data.data[0].codeinfo_mess;
      this.reData = [...data];
      this.standardData = [...data2];
    },
    // 取消按钮
    close() {
      this.modelDialog = false;
      this.modelData = {};
    },
    testnull(name) {
      if (
        name == "null" ||
        name == null ||
        name == "" ||
        name == undefined ||
        name == "undefined"
      ) {
        return false;
      }
      return true;
    },
    testEnglish(name) {
      const reg = /^[A-Za-z0-9\_]+$/;
      return reg.test(name);
    },
    // testChinese(name) {
    //   const regs = /[A-Za-z0-9\-\u4E00-\u9FA5\\s]+/;
    //   return regs.test(name);
    // },
    // 保存
    savemessageBtn() {
      debugger;
      for (var i = 0; i < this.reData.length; i++) {
        var item = this.reData[i];
        if (!this.testnull(item.ename)) {
          this.showSnackbar("标准英文名不能为空，请填写", "error");
          return;
        }
        if (!this.testnull(item.cname)) {
          this.showSnackbar("标准中文名不能为空，请填写", "error");
          return;
        }
        if (!this.testnull(item.code)) {
          this.showSnackbar("短名不能为空，请填写", "error");
          return;
        }
        if (!this.testEnglish(item.ename)) {
          this.showSnackbar("标准英文名称必须填英文", "error");
          return;
        }
        if (!this.testEnglish(item.code)) {
          this.showSnackbar("短名称必须填英文", "error");
          return;
        }
        // if (!this.testChinese(item.cname)) {
        //   this.showSnackbar("标准中文名称必须填中文", "error");
        //   return;
        // }
      }

      for (var i = 0; i < this.standardData.length; i++) {
        var item = this.standardData[i];
        if (!this.testnull(item.codetable_cname)) {
          this.showSnackbar("码表中文名不能为空，请填写", "error");
          return;
        }
        if (!this.testnull(item.codetable_ename)) {
          this.showSnackbar("码表英文名不能为空，请填写", "error");
          return;
        }
        if (!this.testnull(item.code_cname)) {
          this.showSnackbar("码值内容不能为空，请填写", "error");
          return;
        }
        //  if (!this.testnull(item.code_value)) {
        //   this.showSnackbar("短名不能为空，请填写", "error");
        //   return;
        // }
        // if (!this.testEnglish(item.ename)) {
        //   this.showSnackbar("标准英文名称必须填英文", "error");
        //   return;
        // }
        // if (!this.testEnglish(item.code)) {
        //   this.showSnackbar("短名称必须填英文", "error");
        //   return;
        // }
        // if (!this.testChinese(item.cname)) {
        //   this.showSnackbar("标准中文名称必须填中文", "error");
        //   return;
        // }
      }

      let id = this.$route.query.id;
      let objdata = {};
      objdata.file_id = id;
      objdata.std_mess = this.reData;
      objdata.codeinfo_mess = this.standardData;
      console.log(objdata);

      this.$nohttps
        .post("/docmodel/savefile", objdata)
        .then(res => {
          // console.log(res)
          this.showSnackbar("保存成功", "success");
          this.$router.push({
            name: "standard-fileupload"
          });
        })
        .catch(error => {
          this.showSnackbar("保存失败", "error");
        });
      // }
      // this.obj2.file_id = id;
    },
    cancel() {
      this.$router.push({
        name: "standard-fileupload"
      });
    },
    preview(id) {
      this.$https
        .post(
          "/docmodel/getfieldbyid",
          qs.stringify({
            std_id: id
          })
        )
        .then(res => {
          // console.log(res.data.data[0])
          this.obj = res.data.data[0];
          if (res.data.resultCode === "RESULT_SUCCESS") {
            if (res.data.data[0].fields.length != 0) {
              let data = res.data.data[0].fields;
              this.reData4 = [...data];
              this.modelDialog3 = true;
            } else {
              let data = res.data.data[0].objfields;
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
    preview2(dd, ss) {
      // console.log(ss)
      // console.log(dd)
      this.modelDialog = false;
      this.modelDialog2 = true;
      this.reData3 = [...dd];
    }
  },
  computed: {},
  mounted() {
    this.getReList();
  }
};
</script>

<style></style>
