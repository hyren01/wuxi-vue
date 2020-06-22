<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12 md12 x12>
        <v-widget title="数据库导入标准">
          <div slot="widget-content">
            <v-card-title>
              <v-btn color="primary" @click.stop="addCheck">
                新增
                <v-icon right>mdi-plus</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <!-- 删除确认框 -->
              <v-dialog v-model="deleteDialog" max-width="400">
                <v-card>
                  <v-card-title class="headline error--text">提示</v-card-title>
                  <v-card-text>确认删除此数据？</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" flat @click="deleteDialog = false">取消</v-btn>
                    <v-btn color="error" @click="okDelete">删除</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- 模态框 -->
              <v-dialog v-model="detailShow" style="background:#fff;" max-width="1000">
                <v-card>
                  <v-card-title class="headline">基本信息</v-card-title>
                  <v-divider></v-divider>
                  <v-data-table
                    :headers="detailHeaders"
                    :items="detailData"
                    :search="detailSearch"
                    :pagination.sync="detailPagination"
                  >
                    <template v-slot:items="detailData">
                      <td>{{ detailData.item.enName }}</td>
                      <td>{{ detailData.item.code }}</td>
                      <td>{{ detailData.item.name == '1' ? '标准' : '码表' }}</td>
                      <td>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              flat
                              icon
                              class="ma-0"
                              color="info"
                              v-on="on"
                              @click="edit2(detailData.item)"
                            >
                              <v-icon>mdi-file-eye-outline</v-icon>
                            </v-btn>
                          </template>
                          <span>查看</span>
                        </v-tooltip>
                      </td>
                    </template>
                  </v-data-table>
                  <v-layout row wrap justify-end>
                    <v-btn flat @click="closeDetail">取消</v-btn>
                  </v-layout>
                </v-card>
              </v-dialog>
              <!-- 明细模态框 -->
              <v-dialog v-model="detailShow2" style="background:#fff;" max-width="1100">
                <v-widget title="字段信息">
                  <div slot="widget-content">
                    <v-data-table
                      :headers="headers2"
                      :items="reData2"
                      class="elevation-1"
                      :pagination.sync="pagination"
                    >
                      <template v-slot:items="reData2">
                        <td>{{ reData2.item.codeEname }}</td>
                        <td>{{ reData2.item.type }}</td>
                        <td>{{ reData2.item.maxsize }}</td>
                        <td>{{ reData2.item.isRequired == 'O' ? '是' : '否' }}</td>
                      </template>
                    </v-data-table>
                    <v-layout row wrap>
                      <v-flex sm6 md6 xl6></v-flex>
                      <v-flex sm6 md6 xl6>
                        <v-btn color="primary" @click="handlecancel" style="float:right">返回</v-btn>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-widget>
              </v-dialog>
              <!-- 码表模态框 -->
              <v-dialog v-model="detailShow3" style="background:#fff;" max-width="1100">
                <v-widget title="码表信息">
                  <div slot="widget-content">
                    <v-data-table
                      :headers="headers3"
                      :items="reData2"
                      class="elevation-1"
                      :pagination.sync="pagination"
                    >
                      <template v-slot:items="reData2">
                        <td>{{ reData2.item.codeEname }}</td>
                        <td>{{ reData2.item.codeValue }}</td>
                        <!-- <td>{{ reData2.item.maxsize }}</td> -->
                        <!-- <td>{{ reData2.item.isRequired=='O'?'是':'否' }}</td> -->
                      </template>
                    </v-data-table>
                    <v-layout row wrap>
                      <v-flex sm6 md6 xl6></v-flex>
                      <v-flex sm6 md6 xl6>
                        <v-btn color="primary" @click="handlecancel1" style="float:right">返回</v-btn>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-widget>
              </v-dialog>
              <!-- 申请模态框 -->
              <v-dialog v-model="sqlShow" style="background:#fff;"  max-width="600px" persistent>
                <v-card>
                  <v-card-title class="headline info--text">选择目录</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-flex md12>
                      <!-- <a-tree-select
                        style="width: 300px"
                        :dropdownStyle="{
                          maxHeight: '400px',
                          overflow: 'auto',
                        }"
                        :treeData="treeData"
                        placeholder="请选择目录"
                        treeDefaultExpandAll
                        @select="selecttreechange"
                      />-->

                      <TreeSelect
                        :default-expand-level="1"
                        placeholder="请选择目录"
                        :normalizer="normalizer"
                        :options="treedata2"
                        @select="selectnewtreechange"
                      />
                      <v-btn color="primary" @click="handlefinish">确认申请</v-btn>
                    </v-flex>
                    <v-layout row wrap justify-end>
                      <v-btn flat @click="closeSql">取消</v-btn>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-dialog>
              <v-data-table
                :headers="headers"
                :items="tableData"
                :search="search"
                :pagination.sync="pagination"
                style="width:100%"
              >
                <template v-slot:items="tableData">
                  <td>{{ tableData.index + 1 }}</td>
                  <td>{{ tableData.item.db_name }}</td>
                  <td>{{ tableData.item.db_type }}</td>
                  <td>{{ tableData.item.create_time }}</td>
                  <td>
                    {{
                    tableData.item.is_auth == '3'
                    ? '待审核'
                    : tableData.item.is_auth == '1'
                    ? '审核通过'
                    : tableData.item.is_auth == '2'
                    ? '审核拒绝'
                    : '待申请'
                    }}
                  </td>
                  <td class="px-1">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          flat
                          icon
                          class="ma-0"
                          color="info"
                          v-on="on"
                          @click="detailBtn(tableData.item)"
                        >
                          <v-icon>mdi-file-eye-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>查看</span>
                    </v-tooltip>
                    <v-tooltip bottom v-if="tableData.item.is_auth == '4'">
                      <template v-slot:activator="{ on }">
                        <v-btn
                          flat
                          icon
                          class="ma-0"
                          color="info"
                          v-on="on"
                          @click="sqlBtn(tableData.item)"
                        >
                          <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>申请</span>
                    </v-tooltip>
                    <v-tooltip bottom v-if="tableData.item.is_auth == '4'">
                      <template v-slot:activator="{ on }">
                        <v-btn
                          flat
                          icon
                          class="ma-0"
                          color="primary"
                          v-on="on"
                          @click="preview(tableData.item)"
                        >
                          <!-- @click="editItem(tableData.item,tableData.index)" -->
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>编辑</span>
                    </v-tooltip>
                    <v-tooltip bottom v-if="tableData.item.is_auth == '4'">
                      <template v-slot:activator="{ on }">
                        <v-btn
                          flat
                          icon
                          class="ma-0"
                          color="error"
                          v-on="on"
                          @click="delBtn(tableData.item)"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </template>
                      <span>删除</span>
                    </v-tooltip>
                  </td>
                </template>
              </v-data-table>
            </v-card-title>
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
  name: "data-monitoring-list",
  components: {
    TreeSelect,
    VWidget
  },
  data() {
    return {
      headers: [
        { text: "序号", value: "databaseName" },
        { text: "数据库名称", value: "db_name" },
        { text: "数据库类型", value: "db_type" },
        { text: "时间", value: "create_time" },
        { text: "状态", value: "is_auth" },
        { text: "操作", value: "ope" }
      ],
      headers2: [
        { text: "字段名", value: "codeEname" },
        { text: "字段类型", value: "type" },
        { text: "长度", value: "maxsize" },
        { text: "是否必填", value: "isRequired" }
      ],
      headers3: [
        { text: "字段名", value: "columnName" },
        { text: "码值", value: "codeValue" }
        // { text: '长度', value: 'precision', },
        // { text: '是否必填', value: 'isNull', }
      ],
      pagination: {
        rowsPerPage: 10, // -1 for All
        sortBy: null
      },
      rowsPerPage: [10, 25, 100, { text: "全部", value: -1 }],
      tableData: [],
      reData2: [],
      detailShow3: false,
      search: null,
      deleteDialog: false,
      deleteItem: {},
      //   明细↓
      detailShow: false,
      detailShow2: false,
      detailHeaders: [
        { text: "表英文名", value: "enName" },
        { text: "短名", value: "code" },
        { text: "类型", value: "dataType" },
        { text: "操作" }
      ],
      detailData: [],
      detailSearch: null,
      detailPagination: {
        rowsPerPage: 10, // -1 for All
        sortBy: null
      },
      //   sql
      sqlShow: false,
      sql: "",
      rootcategory: {},
      result_category_array: [],
      treeData: [],
      treedata2:[],
      idss: ""
    };
  },
  methods: {
    preview(dd) {
      // console.log(dd)
      this.$router.push({
        name: "dateImport-edit",
        query: {
          id: dd.db_id
        }
      });
    },
    handlecancel() {
      this.detailShow2 = false;
    },
    handlecancel1() {
      this.detailShow3 = false;
    },
    edit2(item) {
      // console.log(item)
      // console.log(item.name)
      if (item.name == "1") {
        this.$https
          .post(
            "/operModule/getStandardFieldById",
            qs.stringify({
              // operPerson: '2001',
              id: item.id,
              batch_no: item.batchNo,
              tableName: item.enName
            })
          )
          .then(res => {
            // console.log(res.data.data)
            this.reData2 = [...res.data.data];
            // console.log(this.detailData)
            this.detailShow2 = true;
          })
          .catch(err => {
            this.showSnackbar("REST服务失败", "error");
          });
      } else {
        this.$https
          .post(
            "/operModule/getOperCode",
            qs.stringify({
              // operPerson: '2001',
              db_id: item.db_id,
              tableName: item.enName
            })
          )
          .then(res => {
            // console.log(res.data.data)
            this.reData2 = res.data.data;
            // console.log(this.detailData)
            this.detailShow3 = true;
          })
          .catch(err => {
            this.showSnackbar("REST服务失败", "error");
          });
      }
    },
    initialize() {
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
    showSnackbar(text, color) {
      this.snackbar = {
        show: true,
        text: text,
        color: color
      };
      this.$emit("showSnackbar", this.snackbar);
    },
    // 新增按钮
    addCheck() {
      this.$router.push({
        name: "dateImport-add"
      });
    },
    // selecttreechange(value, node, extra) {
    //   //console.log(extra.node.eventKey)
    //   this.category_id = extra.node.eventKey;
    //   // console.log(this.category_id)
    // },
    selectnewtreechange(node, instanceId) {
      this.category_id = node.id;
    },
    // 查询所有标准的操作记录列表
    getList() {
      this.$nohttps
        .get("/operModule/getAllDbInfo", {
          headers: { Authorization: sessionStorage.getItem("Authorization") }
        })
        .then(res => {
          console.log(res.data.data);
          let data = res.data;
          for (let j = 0; j < data.data.length; j++) {
            // data[j].idss = j
            console.log(data.data[j]);
            if (data.data[j].is_auth == "2") {
              data.data.splice(j, 1);
              j--;
            }
          }
          if (data.resultCode === "RESULT_SUCCESS") {
            data.data.sort(
              (a, b) =>
                new Date(b.create_time).getTime() -
                new Date(a.create_time).getTime()
            );
            this.tableData = data.data;
          } else {
            this.showSnackbar(data.message, "error");
          }
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    // 详情按钮
    detailBtn(item) {
      this.$https
        .post(
          "/operModule/getAllStandardInfo",
          qs.stringify({
            db_id: item.db_id
          })
        )
        .then(res => {
          // console.log(res.data.data)
          this.detailData = [...res.data.data];
          this.detailShow = true;
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    // 关闭明细模态框
    closeDetail() {
      this.detailShow = false;
    },
    closeDetail2() {
      this.detailShow2 = false;
      this.detailShow = true;
    },
    // sql按钮
    sqlBtn(item) {
      this.sqlShow = true;
      this.idss = "";
      // console.log(item.db_id)
      this.idss = item.db_id;
    },
    //申请按钮
    handlefinish() {
      // console.log(this.category_id)
      // console.log(this.idss)

      this.$https
        .post(
          "/operModule/applayStandard",
          qs.stringify({
            // operPerson: '2001',
            category_id: this.category_id,
            db_id: this.idss
            // is_auth: this.deleteItem.is_auth,
          })
        )
        .then(res => {
          // console.log(res)
          if (res.data.resultCode === "RESULT_ERROR") {
            this.showSnackbar(res.data.message, "error");
          } else {
            this.showSnackbar("申请成功", "success");
            //   //  this.getList();
            this.sqlShow = false;
            this.getList();
            this.initialize();
          }
        })
        .catch(err => {
          this.showSnackbar("服务失败", "error");
        });
    },
    closeSql() {
      this.sqlShow = false;
    },
    // 删除按钮
    delBtn(item) {
      this.deleteItem = item;
      this.deleteDialog = true;
    },
    //确认删除
    okDelete() {
      this.deleteDialog = false;
      // console.log(this.deleteItem);
      // let id = JSON.stringify(this.deleteItem.id)
      // let batchNo = JSON.stringify(this.deleteItem.batch_no)

      this.$https
        .post(
          "/operModule/deleteStandard",
          qs.stringify({
            // operPerson: '2001',
            db_id: this.deleteItem.db_id,
            Auth: this.deleteItem.is_auth
            // is_auth: this.deleteItem.is_auth,
          })
        )
        .then(res => {
          let data = res.data;
          if (data.resultCode === "RESULT_SUCCESS") {
            this.showSnackbar("删除成功", "success");
            this.getList();
          } else {
            this.showSnackbar(data.message, "error");
          }
        })
        .catch(err => {
          this.showSnackbar("服务失败", "error");
        });
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
  filters: {
    typeTxt(value) {
      return value === "1" ? "码表" : "区间";
    },
    statusTxt(value) {
      if (value == "1") {
        return "等待运行";
      } else if (value == "2") {
        return "运行中";
      } else if (value == "3") {
        return "运行成功";
      } else if (value == "4") {
        return "运行失败";
      } else {
        return "-";
      }
    }
  },
  mounted() {
    this.getList();
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
