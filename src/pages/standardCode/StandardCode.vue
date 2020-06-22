<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12 md12 x12>
        <v-widget title="码表列表">
          <div slot="widget-content">
            <v-card-title>
              <v-btn color="primary" @click.stop="addCodeBtn">新增码表</v-btn>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-dialog v-model="logoutDialog" max-width="400">
                <v-card>
                  <v-card-title class="headline error--text">{{ outTitle }}</v-card-title>
                  <v-card-text>{{ outText }}</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" flat @click="logOut">确定</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
            </v-card-title>
            <!-- <v-data-table
              :headers="headers"
              :items="tableData"
              :search="search"
              hide-actions
            >-->

            <v-data-table
              :headers="headers"
              :items="tableData"
              :pagination.sync="pagination"
              :total-items="totalBrands"
              class="elevation-1"
            >
              <template v-slot:items="tableData">
                <td class="text-xs-center">{{ tableData.index + 1 }}</td>
                <td class="text-xs-center">{{ tableData.item.codetableEname }}</td>
                <td class="text-xs-center">{{ tableData.item.codetableCname }}</td>
                <td class="text-xs-center">
                  <span v-if="tableData.item.isAuth === '1'">审核通过</span>
                  <span v-else-if="tableData.item.isAuth === '2'">审核拒绝</span>
                  <span v-else-if="tableData.item.isAuth === '3'">待审核</span>
                  <span v-if="tableData.item.isAuth === '4'">待申请</span>
                  <span v-if="tableData.item.isAuth === '5'">编辑</span>
                </td>
                <td class="text-xs-center">{{ tableData.item.createTime }}</td>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        flat
                        icon
                        class="ma-0"
                        color="primary"
                        v-on="on"
                        @click="viewItem(tableData.item, tableData.index)"
                      >
                        <v-icon>mdi-file-eye-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>查看</span>
                  </v-tooltip>
                  <v-tooltip bottom v-if="tableData.item.isAuth == '5'">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        flat
                        icon
                        class="ma-0"
                        color="primary"
                        v-on="on"
                        @click="subItem(tableData.item, tableData.index)"
                      >
                        <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>申请</span>
                  </v-tooltip>
                  <v-tooltip bottom v-if="tableData.item.isAuth !== '3'">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        flat
                        icon
                        class="ma-0"
                        color="primary"
                        v-on="on"
                        @click="editItem(tableData.item, tableData.index)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>编辑</span>
                  </v-tooltip>
                  <v-tooltip bottom v-if="tableData.item.isAuth == '1'">
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
                            '确实要删除此码表吗？',
                            tableData.item
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
            <!-- <el-pagination
              background
              style="margin-left:50rem;margin-top:2rem"
              layout="prev, pager, next, sizes, total, jumper"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pagesize"
              :total="length"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            />-->
          </div>
        </v-widget>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import VWidget from "@/components/VWidget";
import qs from "qs";
import Vuex from "vuex";
let lodash = require("lodash");
export default {
  name: "standard-code",
  components: {
    VWidget
  },
  watch: {
    search: function() {
      this.handleSearch3();
    },
    pagination: {
      deep: true, //深度監控
      handler() {
        this.getTable();
      }
    }
  },
  methods: {
    ...Vuex.mapMutations(["changeLogin"]),
    showSnackbar(text, color) {
      this.snackbar = {
        show: true,
        text: text,
        color: color
      };
      this.$emit("showSnackbar", this.snackbar);
    },
    //搜索
    handleSearch() {
      this.$nohttps
        .post("/codeinfo/searchCodeInfo", {
          key: this.search,
          pagenum: this.pagination.page,
          size: this.pagination.rowsPerPage
        })
        .then(res => {
          let data = res.data.data;
          this.tableData = data;
          this.totalBrands = res.data.count;
          // this.length = res.data.count;
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    // 查询
    getTable() {
      let obj = {
        pagenum: this.pagination.page,
        size: this.pagination.rowsPerPage
      };
      this.$nohttps
        .post("/codeinfo/getCodeInfoListByPage", obj)
        .then(res => {
          let data = res.data.data;
          this.tableData = data;
          this.totalBrands = res.data.count;
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    // 新增码表按钮
    addCodeBtn() {
      this.$router.push({
        name: "standard-add",
        query: {
          hTitle: "新增码表"
        }
      });
    },
    // 取消按钮
    close() {
      this.modelDialog = false;
      this.modelData = {};
      this.$refs.form.resetValidation();
    },
    //提交申请
    subItem(item) {
      if (item.batchNo != "") {
        this.$nohttps
          .post("/codeinfo/doCodeInfoAudit?batchNo=" + item.batchNo)
          .then(res => {
            if (res.data.resultCode === "RESULT_SUCCESS") {
              this.showSnackbar("申请成功", "success");
              this.getTable();
            } else {
              this.showSnackbar("申请失败", "error");
            }
          })
          .catch(err => {
            this.showSnackbar("REST服务失败", "error");
          });
      }
    },
    // 查看按钮
    preview(item) {
      this.modelType = "show";
      this.modelData = JSON.parse(JSON.stringify(item));
      this.modelDialog = true;
    },
    //查看按钮
    viewItem(item) {
      if (item.isAuth == "1") {
        this.$router.push({
          name: "standard-stdview",
          query: {
            codeName: item.codetableEname,
            isAuth: item.isAuth,
            batchNo: "",
            codetableEname: item.codetableEname,
            codetableCname: item.codetableCname,
            hTitle: "查看码表"
          }
        });
      } else {
        this.$router.push({
          name: "standard-stdview",
          query: {
            codeName: item.codetableEname,
            isAuth: item.isAuth,
            batchNo: item.batchNo,
            codetableEname: item.codetableEname,
            codetableCname: item.codetableCname,
            hTitle: "查看码表"
          }
        });
      }
    },
    // 编辑按钮
    editItem(item) {
      let obj = {};
      obj.codeName = item.codetableEname;
      obj.isAuth = item.isAuth;
      obj.batchNo = item.batchNo;
      this.$https
        .post("/codeinfo/getCodeInfoByName", qs.stringify(obj))
        .then(res => {
          console.log(res);
          if (res.data.code == "RESULT_ERROR") {
            // this.showSnackbar(res.data.message, 'error')
          } else if (res.data.message == "用户登录信息失效") {
            // this.showSnackbar(res.data.message, 'error')
            this.logoutDialogShow("登录身份失效", "请点击确定按钮返回登录页面");
          } else {
            if (item.isAuth == "1") {
              this.$router.push({
                name: "standard-addorupdate",
                query: {
                  codeName: item.codetableEname,
                  isAuth: item.isAuth,
                  batchNo: "",
                  dataType: "2",
                  codetableEname: item.codetableEname,
                  codetableCname: item.codetableCname,
                  hTitle: "编辑码表",
                  dataes: res.data.data
                }
              });
            } else if (item.isAuth == "3" || item.isAuth == "5") {
              this.$router.push({
                name: "standard-addorupdate",
                query: {
                  codeName: item.codetableEname,
                  isAuth: item.isAuth,
                  batchNo: item.batchNo,
                  dataType: "",
                  codetableEname: item.codetableEname,
                  codetableCname: item.codetableCname,
                  hTitle: "编辑码表",
                  dataes: res.data.data
                }
              });
            }
          }
        })
        .catch(err => {
          //   this.showSnackbar('REST服务失败', 'error')
        });
    },
    logoutDialogShow(outTitle, outText) {
      this.outTitle = outTitle;
      this.outText = outText;
      this.logoutDialog = true;
    },
    //退出登录按钮
    logOut() {
      this.logoutDialog = false;
      this.$router.push("/login");
      this.changeLogin({ Authorization: "" });
      sessionStorage.clear();
    },
    // 删除按钮
    deleteDialogShow(deleteTitle, deleteText, item) {
      this.deleteTitle = deleteTitle;
      this.deleteText = deleteText;
      let _this = this;
      if (deleteTitle === "确认删除") {
        this.singleDeleteItem = item;
        let thereOpen = _this.open;
        this.deleteDialog = true;
        // console.log(thereOpen);
      } else {
        // this.singleDeleteItem = undefined;
        // if (this.selected.length === 0) {
        //   this.deleteDialog = false;
        //   this.showSnackbar("请选择待删除的标准", "warning");
        // } else {
        //   // this.deleteDialog = true;
        // }
      }
    },
    deleteMutipleItem() {
      if (this.singleDeleteItem.isAuth == "5") {
        this.$https
          .post(
            "/codeinfo/deleteOperCodeInfo",
            qs.stringify({
              codeName: this.singleDeleteItem.codetableEname,
              batchNo: this.singleDeleteItem.batchNo
            })
          )
          .then(res => {
            if (res.data.resultCode === "RESULT_SUCCESS") {
              this.showSnackbar("删除成功，请注意审核", "success");
              this.getTable();
            } else {
              this.showSnackbar(res.data.message, "error");
            }
          })
          .catch(err => {
            this.showSnackbar("REST服务失败", "error");
          });
        this.deleteDialog = false;
      } else {
        this.$https
          .post(
            "/codeinfo/deleteCodeInfo",
            qs.stringify({ codeName: this.singleDeleteItem.codetableEname })
          )
          .then(res => {
            if (res.data.resultCode === "RESULT_SUCCESS") {
              this.showSnackbar("删除成功，请注意审核", "success");
              this.getTable();
            } else {
              this.showSnackbar(res.data.message, "error");
            }
          })
          .catch(err => {
            this.showSnackbar("REST服务失败", "error");
          });
        this.deleteDialog = false;
      }
    }
  },
  data() {
    return {
      search: null,
      tableData: [],
      headers: [
        { text: "序号", value: "no", align: "center" },
        { text: "码表编号", value: "codetableEname", align: "center" },
        { text: "码表中文名称", value: "codetableCname", align: "center" },
        { text: "审核状态", value: "isAuth", align: "center" },
        { text: "创建日期", value: "createTime", align: "center" },
        { text: "操作", value: "remark" }
      ],
      modelData: {},
      tableNameList: ["stdgl_dict"],
      rules: {
        required: value => !!value || "该项不能为空！",
        counter: value => value.length <= 20 || "最多20个字符"
      },
      modelType: "add",
      modelDialog: false,
      logoutDialog: false,
      deleteDialog: false,
      deleteTitle: "",
      deleteText: "",
      outTitle: "",
      outText: "",
      singleDeleteItem: {},
      pagination: {
        page: 1,
        rowsPerPage: 10, // -1 for All
        sortBy: null
      },
      totalBrands: 0
    };
  },
  mounted() {
    this.getTable();
    this.handleSearch3 = lodash.debounce(this.handleSearch, 600);
  },
  filters: {
    strDate(value) {
      if (value && value != null && value != "") {
        value = value.split("");
        return (
          value[0] +
          value[1] +
          value[2] +
          value[3] +
          "-" +
          value[4] +
          value[5] +
          "-" +
          value[6] +
          value[7]
        );
      }
    },
    strTime(value) {
      if (value && value != null && value != "") {
        value = value.split("");
        return (
          value[0] +
          value[1] +
          ":" +
          value[2] +
          value[3] +
          ":" +
          value[4] +
          value[5]
        );
      }
    }
  }
};
</script>
