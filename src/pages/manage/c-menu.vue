<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12 md12 x12>
        <v-widget title="菜单列表">
          <div slot="widget-content">
            <v-card-title>
              <v-btn color="primary" @click.stop="addMenuButton">添加一级菜单</v-btn>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <!-- 删除模态框 -->
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
                    <v-btn color="error" flat @click="confirmDelMenu">删除</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- 查看,添加,编辑菜单模态框 -->
              <v-dialog v-model="modelDialog" max-width="500">
                <v-widget :title="modelTitle">
                  <div slot="widget-content">
                    <v-form ref="form" lazy-validation>
                      <v-container fluid>
                        <v-layout wrap row>
                          <v-flex md4>
                            <v-text-field style="width: 450px" v-model="menuObj.name" label="菜单名称"></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout wrap row>
                          <v-flex md4>
                            <v-text-field style="width: 450px" v-model="menuObj.code" label="菜单编码"></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout wrap row>
                          <v-flex md4>
                            <v-text-field style="width: 450px" v-model="menuObj.route" label="路由"></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout wrap row>
                          <v-flex md4>
                            <v-text-field
                              style="width: 450px"
                              v-model="menuObj.ordernum"
                              label="排序号"
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-form>
                    <v-layout row wrap>
                      <v-flex sm6 md6 xl6></v-flex>
                      <v-flex sm6 md6 xl6>
                        <v-btn color="success" style="float:right" @click="confirm">确定</v-btn>
                        <v-btn flat @click="modelDialog = false" style="float:right">取消</v-btn>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-widget>
              </v-dialog>
              <!-- 分配菜单模态框 -->
              <v-dialog v-model="addmodelDialog" max-width="500">
                <v-widget title="添加菜单">
                  <div slot="widget-content">
                    <v-form ref="form" lazy-validation>
                      <v-container fluid>
                        <v-layout wrap row>
                          <v-flex md4>
                            <v-text-field
                              style="width: 450px"
                              clearable
                              v-model="menuObj.lastname"
                              label="上级菜单"
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout wrap row>
                          <v-flex md4>
                            <v-text-field
                              style="width: 450px"
                              clearable
                              v-model="menuObj.name"
                              label="菜单名称"
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout wrap row>
                          <v-flex md4>
                            <v-text-field
                              style="width: 450px"
                              clearable
                              v-model="menuObj.code"
                              label="菜单编码"
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout wrap row>
                          <v-flex md4>
                            <v-text-field
                              style="width: 450px"
                              clearable
                              v-model="menuObj.route"
                              label="路由"
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout wrap row>
                          <v-flex md4>
                            <v-text-field
                              style="width: 450px"
                              clearable
                              v-model.number="menuObj.ordernum"
                              label="排序号"
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-form>
                    <v-layout row wrap>
                      <v-flex sm6 md6 xl6></v-flex>
                      <v-flex sm6 md6 xl6>
                        <v-btn color="success" style="float:right" @click="confirmMenu">确定</v-btn>
                        <v-btn flat @click="addmodelDialog = false" style="float:right">取消</v-btn>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-widget>
              </v-dialog>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="menuList"
              :expand="expand"
              item-key="appid"
              :search="search"
              :pagination.sync="pagination"
            >
              <template v-slot:items="tableData">
                <tr>
                  <td
                    class="text-xs-center"
                    @click="tableData.expanded =!tableData.expanded"
                  >{{ tableData.item.name }}</td>
                  <td
                    class="text-xs-center"
                    @click="tableData.expanded =!tableData.expanded"
                  >{{ tableData.item.code }}</td>
                  <td
                    class="text-xs-center"
                    @click="tableData.expanded =!tableData.expanded"
                  >{{ tableData.item.route }}</td>
                  <td>
                    <!-- 分配菜单 -->
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          flat
                          icon
                          class="ma-0"
                          color="info"
                          v-on="on"
                          @click="handleMenu(tableData.item)"
                        >
                          <v-icon>widgets</v-icon>
                        </v-btn>
                      </template>
                      <span>添加子菜单</span>
                    </v-tooltip>
                    <!-- 查看00 -->
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          flat
                          icon
                          class="ma-0"
                          color="primary"
                          v-on="on"
                          @click="chakanButton(tableData.item)"
                        >
                          <v-icon>mdi-file-eye-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>查看</span>
                    </v-tooltip>
                    <!-- 编辑 -->
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          flat
                          icon
                          class="ma-0"
                          color="primary"
                          v-on="on"
                          @click="editButton(tableData.item)"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>编辑</span>
                    </v-tooltip>
                    <!-- 删除 -->
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
                            '确实要删除此菜单吗？',
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
                </tr>
              </template>
              <template v-slot:no-results>
                <v-alert
                  :value="true"
                  color="error"
                  icon="warning"
                >"{{ search }}" 找不到匹配的值.</v-alert>
              </template>
              <!-- 折叠表格 -->
              <template v-slot:expand="tableData">
                <v-data-table :items="tableData.item.children" hide-actions>
                  <template v-slot:items="tableData">
                    <td class="text-xs-center">{{ tableData.item.name }}</td>
                    <td class="text-xs-center">{{ tableData.item.code }}</td>
                    <td class="text-xs-center">{{ tableData.item.route }}</td>
                    <td>
                      <!-- 查看 -->
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            flat
                            icon
                            class="ma-0"
                            color="primary"
                            v-on="on"
                            @click="chakanButton(tableData.item)"
                          >
                            <v-icon>mdi-file-eye-outline</v-icon>
                          </v-btn>
                        </template>
                        <span>查看</span>
                      </v-tooltip>
                      <!-- 编辑 -->
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            flat
                            icon
                            class="ma-0"
                            color="primary"
                            v-on="on"
                            @click="editButton(tableData.item)"
                          >
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                        </template>
                        <span>编辑</span>
                      </v-tooltip>
                      <!-- 删除 -->
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
                                '确实要删除此菜单吗？',
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
                  <template v-slot:no-results>
                    <v-alert
                      :value="true"
                      color="error"
                      icon="warning"
                    >"{{ search }}" 找不到匹配的值.</v-alert>
                  </template>
                </v-data-table>
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
  name: "c-menu",
  components: {
    VWidget
  },
  methods: {
    showSnackbar(text, color) {
      this.snackbar = {
        show: true,
        text: text,
        color: color
      };
      this.$emit("showSnackbar", this.snackbar);
    },
    //首页
    index() {
      let obj = {
        page: 0,
        pagesize: 0,
        paging: "true",
        syscode: "stdcode"
      };
      this.menuList = [];
      // this.axios.defaults.headers.post = {
      //   "Content-type": "application/json;charset=UTF-8"
      // };
      this.$jsonAxios
        .post("/cms/app/list", obj)
        .then(res => {
          if (res.data.status === 200) {
            // console.log(res.data.data.list)
            let testmenu = this.listToTree(res.data.data.list);
            // console.log(testmenu)
            this.menuList = testmenu;
          } else {
            this.showSnackbar(res.data.message, "error");
          }
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    //分配菜单按钮
    handleMenu(item) {
      console.log(item);
      this.menuObj = {
        code: "",
        name: "",
        ordernum: "",
        lastname: item.name,
        parentid: item.appid,
        primarykey: "",
        route: "",
        syscode: "stdcode"
      };
      this.addmodelDialog = true;
    },
    //把菜单分层次方法
    listToTree(data) {
      let arr = JSON.parse(JSON.stringify(data));
      const listChildren = (obj, filter) => {
        [arr, obj.children] = arr.reduce(
          (res, val) => {
            if (filter(val)) res[1].push(val);
            else res[0].push(val);
            return res;
          },
          [[], []]
        );
        obj.children.forEach(val => {
          if (arr.length) listChildren(val, obj => obj.parentid === val.appid);
        });
      };
      const tree = {};
      listChildren(
        tree,
        val => arr.findIndex(i => i.appid === val.parentid) === -1
      );
      return tree.children;
    },
    //分配菜单确定按钮
    confirmMenu() {
      console.log(this.menuObj);
      this.$jsonAxios
        .post("/cms/app/saveOrUpdate", this.menuObj)
        .then(res => {
          if (res.data.status === 200) {
            this.addmodelDialog = false;
            this.showSnackbar("添加成功", "success");
            this.index();
          } else {
            this.showSnackbar(res.data.message, "error");
          }
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    //添加一级菜单按钮
    addMenuButton() {
      this.menuObj = {
        code: "",
        name: "",
        ordernum: "",
        parentid: "",
        primarykey: "",
        route: "",
        syscode: "stdcode"
      };
      this.editOrNew = 1;
      this.disabled = false;
      this.modelDialog = true;
    },
    //编辑菜单按钮
    editButton(item) {
      this.editOrNew = 2;
      this.disabled = false;
      this.modelDialog = true;
      this.appid = item.appid;
      this.$jsonAxios
        .get("/cms/app/info/" + item.appid)
        .then(res => {
          if (res.data.status === 200) {
            const testdata = res.data.data;
            this.menuObj.code = testdata.code;
            this.menuObj.name = testdata.name;
            this.menuObj.ordernum = testdata.ordernum;
            this.menuObj.parentid = testdata.parentid;
            this.menuObj.route = testdata.route;
          } else {
            this.showSnackbar(res.data.message, "error");
          }
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    //查看菜单按钮
    chakanButton(item) {
      this.editOrNew = 3;
      this.disabled = true;
      this.$jsonAxios
        .get("/cms/app/info/" + item.appid)
        .then(res => {
          if (res.data.status === 200) {
            console.log(res.data.data);
            const testdata = res.data.data;
            this.menuObj.code = testdata.code;
            this.menuObj.name = testdata.name;
            this.menuObj.ordernum = testdata.ordernum;
            this.menuObj.parentid = testdata.parentid;
            this.menuObj.route = testdata.route;
            this.modelDialog = true;
          } else {
            this.showSnackbar(res.data.message, "error");
          }
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    //添加菜单模态框，确定按钮
    confirm() {
      // this.modelDialog = false;
      console.log(this.menuObj);
      if (this.editOrNew === 1) {
        //新增菜单  确定
        this.menuObj.parentid = "";
        console.log(this.menuObj);
        this.$jsonAxios
          .post("/cms/app/saveOrUpdate", this.menuObj)
          .then(res => {
            if (res.data.status === 200) {
              this.modelDialog = false;
              this.index();
            } else {
              this.showSnackbar(res.data.message, "error");
            }
          })
          .catch(err => {
            this.showSnackbar("REST服务失败", "error");
          });
      } else if (this.editOrNew === 2) {
        //编辑菜单  确定
        console.log(this.appid);
        this.menuObj.primarykey = this.appid;
        this.$jsonAxios
          .post("/cms/app/saveOrUpdate", this.menuObj)
          .then(res => {
            if (res.data.status === 200) {
              this.showSnackbar("操作成功", "success");
              this.modelDialog = false;
              this.index();
            } else {
              this.showSnackbar(res.data.message, "error");
            }
          })
          .catch(err => {
            this.showSnackbar("REST服务失败", "error");
          });
      } else {
        //查看菜单  确定
        this.modelDialog = false;
      }
    },
    //点击删除按钮
    deleteDialogShow(deleteTitle, deleteText, item) {
      console.log(item);
      this.deleteTitle = deleteTitle;
      this.deleteText = deleteText;
      this.deleteDialog = true;
      this.appid = item.appid;
    },
    //确定删除菜单
    confirmDelMenu() {
      this.deleteDialog = false;
      console.log(this.menuObj);
      this.$jsonAxios
        .delete("/cms/app/delete/" + this.appid)
        .then(res => {
          if (res.data.status === 200) {
            this.index();
          } else {
            this.showSnackbar(res.data.message, "error");
          }
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    }
  },
  data() {
    return {
      expand: false,
      disabled: false,
      menuObj: {
        code: "",
        name: "",
        ordernum: "",
        lastname: "",
        parentid: "",
        primarykey: "",
        route: "",
        syscode: "stdcode"
      },
      appid: "",
      menuList: [],
      menuCount: "",
      editOrNew: "1",
      modelTitle: "1",
      search: null,
      addmodelDialog: false,
      editDialog: false,
      // 表格数据
      tableData: [],
      // 表格头部
      headers: [
        { text: "菜单名称", value: "codetableEname", align: "center" },
        { text: "菜单编码", value: "codetableCname", align: "center" },
        { text: "路由", value: "route", align: "center" },
        { text: "操作", value: "remark" }
      ],
      pagination: {
        rowsPerPage: 10, // -1 for All
        sortBy: null
      },
      rowsPerPage: [10, 25, 100, { text: "全部", value: -1 }],
      modelDialog: false,
      deleteDialog: false,
      deleteTitle: "",
      deleteText: "",
      singleDeleteItem: {}
    };
  },
  mounted() {
    this.index();
  },
  watch: {
    editOrNew() {
      if (this.editOrNew === 1) {
        this.modelTitle = "添加菜单";
      } else if (this.editOrNew === 2) {
        this.modelTitle = "编辑菜单";
      } else {
        this.modelTitle = "查看菜单";
      }
    }
  },
  computed: {},
  filters: {}
};
</script>
