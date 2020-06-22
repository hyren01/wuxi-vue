//编辑页面
<template>
  <v-container grid-list-xl fluid>
    <!-- 标准信息模态框 -->
    <v-dialog v-model="modelDialog" max-width="1000px">
      <v-widget title="查看">
        <div slot="widget-content">
          <v-data-table
            :headers="headers2"
            :items="reData2"
            class="elevation-1"
            :pagination.sync="pagination"
          >
            <template v-slot:items="reData2">
              <td>{{ reData2.item.cname }}</td>
              <td>{{ reData2.item.ename }}</td>
              <td>{{ reData2.item.code }}</td>
              <td>{{ reData2.item.defined }}</td>
              <td>{{ reData2.item.remark }}</td>
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
              <v-btn color="success" style="float:right" @click="handlecancel">确定</v-btn>
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
              <td>{{ reData3.item.cname }}</td>
              <td>{{ reData3.item.ename }}</td>
              <td>{{ reData3.item.code }}</td>
              <td>{{ reData3.item.definded }}</td>
              <td>{{ reData3.item.datatype }}</td>
              <td>{{ reData3.item.field_range }}</td>
              <td>
                <v-checkbox
                  true-value="O"
                  false-value="o"
                  v-model="reData3.item.required"
                  hide-details
                  readonly
                ></v-checkbox>
              </td>
              <td>{{ reData3.item.maxContains }}</td>
              <td>{{ reData3.item.comments }}</td>
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
              <td>{{ reData4.item.cname }}</td>
              <td>{{ reData4.item.ename }}</td>
              <td>{{ reData4.item.code }}</td>
              <td>{{ reData4.item.definded }}</td>
              <td>{{ reData4.item.datatype }}</td>
              <td>{{ reData4.item.field_range }}</td>
              <td>
                <v-checkbox
                  true-value="O"
                  false-value="o"
                  v-model="reData4.item.required"
                  hide-details
                  readonly
                ></v-checkbox>
              </td>
              <td>{{ reData4.item.maxContains }}</td>
              <td>{{ reData4.item.comments }}</td>
            </template>
          </v-data-table>
          <v-layout row wrap>
            <v-flex sm6 md6 xl6></v-flex>
            <v-flex sm6 md6 xl6>
              <v-btn color="success" @click="saves" style="float:right">确定</v-btn>
              <v-btn flat @click="saves" style="float:right">返回</v-btn>
            </v-flex>
          </v-layout>
        </div>
      </v-widget>
    </v-dialog>
    <!-- 页面 -->
    <v-layout row wrap>
      <v-layout row wrap>
        <v-flex sm6 md6 xl6>
          <!-- <a-tree-select
            style="width: 300px"
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="treeData"
            placeholder="请选择目录"
            treeDefaultExpandAll
            @select="selecttreechange"
          /> -->
          <TreeSelect
            :default-expand-level="1"
            placeholder="请选择目录"
            :normalizer="normalizer"
            :options="treedata2"
            @select="selectnewtreechange"
          />
        </v-flex>
        <v-flex sm6 md6 xl6>
          <v-btn
            @click="savemessageBtn"
            color="success"
            style="float:right"
            :loading="loadingsave"
          >确认申请</v-btn>
          <v-btn flat @click="cancel" style="float:right">取消</v-btn>
        </v-flex>
      </v-layout>
      <!-- 标准信息 -->
      <v-flex sm12 md12 xl12>
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
                <td>{{ reData.item.code }}</td>
                <td>{{ reData.item.cname }}</td>
                <td>{{ reData.item.ename }}</td>
                <!-- <td>
                  {{ reData.item.creator }}
                </td>-->
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
                        <v-icon>mdi-file-eye-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>查看</span>
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
                <td>{{ standardData.item.codetable_cname }}</td>
                <td>{{ standardData.item.codetable_ename }}</td>
                <td>{{ standardData.item.code_cname }}</td>
                <td>{{ standardData.item.code_value }}</td>
                <td>{{ standardData.item.create_time }}</td>
                <td>{{ standardData.item.remark }}</td>
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
import TreeSelect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "standar-detection",
  components: {
    TreeSelect,
    VWidget
  },
  data: () => ({
    loadingsave: false,
    allReList: [],
    allStandardList: [],
    standardList: [],
    treeData: [],
    treedata2:[],
    result_category_array: [],
    rootcategory: {},
    reName: null,
    reId: null,
    standardName: null,
    standardId: null,
    modelDialog: false,
    modelDialog2: false,
    modelDialog3: false,
    modelData: {},
    // tables
    pagination: {
      rowsPerPage: 10, // -1 for All
      sortBy: null
    },
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
      { text: "短名", value: "code" },
      { text: "标准中文名", value: "cname" },
      { text: "标准英文名", value: "ename" },
      // { text: '上传人', value: 'creator', },
      { text: "上传日期", value: "creator_time" },
      { text: "操作", value: "way2" }
    ],
    //码表信息表格头
    reHeaders: [
      { text: "序号", value: "" },
      { text: "码表中文名", value: "codetable_cname" },
      { text: "码表英文名", value: "codetable_ename" },
      { text: "码值内容", value: "code_cname" },
      { text: "代码值", value: "code_value" },
      { text: "创建时间", value: "create_time" },
      { text: "备注", value: "remark" }
    ],
    headers2: [
      { text: "字段中文名", value: "cname" },
      { text: "字段英文名", value: "ename" },
      { text: "code", value: "code" },
      { text: "定义", value: "defined" },
      { text: "备注", value: "text" },
      { text: "操作", value: "way" }
    ],
    //详细信息头
    headers3: [
      { text: "序号", value: "name" },
      { text: "中文名称", value: "cname" },
      { text: "英文名称", value: "ename" },
      { text: "短名", value: "type" },
      { text: "定义", value: "person" },
      { text: "数据类型", value: "maxsize" },
      { text: "值域", value: "code" },
      { text: "约束条件", value: "code" },
      { text: "最大出现次数", value: "code" },
      { text: "备注", value: "code" }
    ],
    // tables
    reData: [],
    category: {
      id: "",
      name: "",
      parentId: "",
      // creator: '',
      createTime: "",
      ismodel: "",
      parent_category_name: "",
      pxh: "",
      status: ""
    },
    obj: {},
    obj2: {},
    reData2: [],
    reData3: [],
    reData4: [],
    //码表信息表格
    standardData: [],
    haveCheck: false,
    toSaveData: [],
    reBody: {} //检测时传的参数
  }),
  methods: {
    handlecancel3() {
      this.modelDialog2 = false;
      this.modelDialog = true;
    },
    selecttreechange(value, node, extra) {
      this.category_id = extra.node.eventKey;
    },
    selectnewtreechange(node, instanceId) {
      this.category_id = node.id;
    },
    showSnackbar(text, color) {
      this.snackbar = {
        show: true,
        text: text,
        color: color
      };
      this.$emit("showSnackbar", this.snackbar);
    },
    // 模态框取消按钮
    handlecancel() {
      this.modelDialog = false;
    },
    handlecancel2() {
      this.modelDialog2 = false;
      this.modelDialog = true;
    },
    saves() {
      this.modelDialog3 = false;
    },
    //模态框保存按钮  确定
    handlesave() {
      this.$nohttps
        .post("/docmodel/savestd/", this.obj)
        .then(res => {
          // console.log(res)
          this.modelDialog = false;
        })
        .catch(error => {
          // console.log(error)
        });
    },
    // 查看信息
    getReList() {
      let id = this.$route.query.id;
      this.$nohttps
        .get("/docmodel/editfile/" + id)
        .then(res => {
          this.obj2 = res.data.data[0];
          let data = res.data.data[0].std_mess;
          let data2 = res.data.data[0].codeinfo_mess;
          this.reData = [...data];
          this.standardData = [...data2];
          // this.reList=data.map((item)=>{return item.name});
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    initialize() {
      //console.log(this.axios.defaults);
      this.$nohttps
        .post("/category/getCategoryInfo/", qs.stringify({ id: "" }), {
          headers: { Authorization: sessionStorage.getItem("Authorization") }
        })
        .then(response => {
          this.rootcategory = response.data.data[0];
          this.$nohttps
            .post("/category/getAllCategory/")
            .then(response => {
              this.allcategory = response.data.data;
              this.findchild(this.rootcategory);
              this.result_category_array.push(this.result_category_obj);
              this.treeData = this.result_category_array;
              this.treedata2.push(this.mapTree(this.treeData[0]));
              // console.log(this.treeData)
            })
            .catch(function(error) {
              // console.log(error);
            });
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    mapTree(org) {
      const haveChildren =
        Array.isArray(org.children) && org.children.length > 0;
      return {
        //分别将我们查询出来的值做出改变他的key
        id: org.key,
        label: org.title,
        key: org.title,
        name: org.title,
        value: org.value,
        data: {
          ...org
        },
        //判断它是否存在子集，若果存在就进行再次进行遍历操作，知道不存在子集便对其他的元素进行操作
        children: haveChildren ? org.children.map(i => this.mapTree(i)) : []
      };
    },
    // 取消按钮
    close() {
      this.modelDialog = false;
      this.modelData = {};
    },
    findchild(category) {
      var parent_category_obj = {};
      parent_category_obj.title = category.name;
      parent_category_obj.value = category.name;
      parent_category_obj.key = category.id;
      parent_category_obj.children = [];
      var category_obj = {};
      var has_child_flag = false;
      this.allcategory.forEach(element => {
        category_obj.title = element.name;
        category_obj.value = element.name;
        category_obj.key = element.id;
        if (element.parentId == category.id) {
          has_child_flag = true;
          var child_array = this.findchild(element);
          parent_category_obj.children.push(child_array);
        }
      });
      this.result_category_obj = parent_category_obj;
      //console.log(JSON.stringify(this.result_category_obj))
      return parent_category_obj;
    },
    // 申请
    savemessageBtn() {
      let id = this.$route.query.id;
      let category = this.category_id;
      this.loadingsave = true;

      this.$https
        .post(
          "/docmodel/fileapply",
          qs.stringify({
            category_id: category,
            file_id: id
          })
        )
        .then(res => {
          if (res.data.message == "申请成功") {
            this.showSnackbar(res.data.message, "success");
            this.loadingsave = false;
            this.$router.push({
              name: "standard-fileupload"
            });
          } else {
            this.showSnackbar(res.data.message, "error");
            this.loadingsave = false;
          }
        })
        .catch(error => {
          this.showSnackbar("请检查是否选择目录", "error");
          this.loadingsave = false;
        });
    },
    cancel() {
      this.$router.push({
        name: "standard-fileupload"
      });
    },

    preview(id) {
      // this.axios.defaults.headers.post = {
      //   'Content-type': 'application/x-www-form-urlencoded'
      // }
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
    },
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.key,
        label: node.name,
        children: node.children
      };
    }
  },
  computed: {},
  mounted() {
    this.getReList();
    this.initialize();
  }
};
</script>

<style>
.leftdig {
  /* width: 25%;  */
  float: left;
  overflow-y: auto;
  overflow-x: auto;
  height: 317px;
  border: 1px solid rgb(255, 255, 255);
}
.vue-treeselect__menu {
  max-height: 150px !important;
  overflow-y: auto !important;
}
</style>

