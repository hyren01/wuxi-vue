<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12 md12 x12>
        <v-widget title="角色列表">
          <div slot="widget-content">
            <v-card-title>
              <v-btn color="primary" @click.stop="addRoleButton">添加角色</v-btn>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <!-- 分配菜单模态框 -->
              <v-dialog v-model="MenuDialog" max-width="500">
                <v-widget title="分配菜单">
                  <div slot="widget-content">
                    <!-- <el-tree
                      :data="treedata"
                      show-checkbox
                      node-key="appid"
                      :default-checked-keys="include"
                      ref="tree"
                      :props="defaultProps"
                    ></el-tree> -->
                    <!--这里没法测试-->
                    <!-- <TreeSelect
                      :multiple="multiple"
                      :default-expand-level="1"
                      :normalizer="normalizer"
                      :options="treedata2"
                      :value="value"
                      v-model="value"
                    /> -->
                    <v-treeview
                    selectable
                    :items="treedata"
                    v-model="treeSelectData"
                    >

                    </v-treeview>
                    <v-layout row wrap>
                      <v-flex sm6 md6 xl6></v-flex>
                      <v-flex sm6 md6 xl6>
                        <v-btn color="success" style="float:right" @click="handleMenu">确定</v-btn>
                        <v-btn flat @click="MenuDialog = false" style="float:right">取消</v-btn>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-widget>
              </v-dialog>
              <!-- 删除模态框 -->
              <v-dialog v-model="deleteDialog" max-width="400">
                <v-card>
                  <v-card-title class="headline error--text">{{ deleteTitle }}</v-card-title>
                  <v-card-text>{{ deleteText }}</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" flat @click="deleteDialog = false">取消</v-btn>
                    <v-btn color="error" flat @click="confirmDelRole">删除</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- 添加角色模态框 -->
              <v-dialog v-model="modelDialog" max-width="500">
                <v-widget :title="modelTitle">
                  <div slot="widget-content">
                    <v-form ref="form" lazy-validation>
                      <v-container fluid>
                        <v-layout wrap row>
                          <v-flex md4>
                            <v-text-field style="width: 450px" v-model="role.name" label="角色名称"></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout wrap row>
                          <v-flex md4>
                            <v-text-field style="width: 450px" v-model="role.code" label="角色编码"></v-text-field>
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
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="tableData"
              :search="search"
              :pagination.sync="pagination"
            >
              <template v-slot:items="tableData">
                <td class="text-xs-center">{{ tableData.item.name }}</td>
                <td class="text-xs-center">{{ tableData.item.code }}</td>
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
                        @click="handleRole(tableData.item)"
                      >
                        <v-icon>widgets</v-icon>
                      </v-btn>
                    </template>
                    <span>分配菜单</span>
                  </v-tooltip>
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
                        @click="
                          deleteDialogShow(
                            '确认删除',
                            '确实要删除此角色吗？',
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

export default {
  name: "b-role",
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
      var obj = {
        page: 0,
        pagesize: 10,
        paging: "true",
        searchKeyWord: "",
        syscode: "stdcode"
      };
      this.$jsonAxios
        .post("/cms/role/list", obj)
        .then(res => {
          if (res.data.status === 200) {
            this.tableData = res.data.data.list;
          } else {
            this.showSnackbar(res.data.message, "error");
          }
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
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
    //分配菜单
    handleRole(item) {
      this.roleitem = item;
      this.treeSelectData = []
      this.$jsonAxios
        .get(
          "/cms/app/list/leftjoin/stdcode/" + item.roleid
        )
        .then(res => {
          if (res.data.status === 200) {
            const data = res.data.data.map(v　=>{
              v.id = v.appid
              v.name = v.name
              v.children = []
              if(v.include){
                this.treeSelectData.push(v.id)
              }
              return v
            })
            const firstLevel = data.filter(v => !v.parentid)
            const secondLevel = data.filter(v => v.parentid)
            firstLevel.forEach(item　=> {
              const target = secondLevel.filter(v => v.parentid === item.id)
              if(target.length) {
                item.children = target
              }
            })
            this.treedata = firstLevel
            this.MenuDialog = true;
          } else {
            this.showSnackbar(res.data.message, "error");
          }
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    // 分配菜单确定
    handleMenu() {
      // console.log(this.roleitem)
      let roleobj = {
        primarykey: this.roleitem.roleid,
        apps: [],
        auths: [],
        dsrs: [],
        code: this.roleitem.code, //角色编码
        name: this.roleitem.name, //角色名称
        syscode: "stdcode"
      };
      // console.log(this.treeSelectData)
      roleobj.apps = this.treeSelectData
      this.$jsonAxios
        .post("/cms/role/saveOrUpdate", roleobj)
        .then(res => {
          if (res.status === 200) {
            this.showSnackbar("操作成功", "success");
            this.MenuDialog = false;
            this.index();
          } else {
            this.showSnackbar(res.data.message, "error");
          }
        })
        .catch(err => {
          this.showSnackbar(err, "error");
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
    //查看按钮
    chakanButton(item) {
      this.editOrNew = 3; //3是查看
      this.disabled = true;
      this.modelDialog = true;
      this.$jsonAxios
        .get("/cms/role/info/" + item.roleid)
        .then(res => {
          if (res.data.status === 200) {
            this.role = res.data.data;
          } else {
            this.showSnackbar(res.data.message, "error");
          }
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    //编辑按钮
    editButton(item) {
      this.disabled = false;
      this.editOrNew = 2; //2是编辑
      this.modelDialog = true;
      this.$jsonAxios
        .get("/cms/role/info/" + item.roleid)
        .then(res => {
          if (res.data.status === 200) {
            this.role = res.data.data;
          } else {
            this.showSnackbar(res.data.message, "error");
          }
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    //新增角色按钮
    addRoleButton() {
      this.role = {};
      this.editOrNew = 1; //1是新增
      this.disabled = false;
      this.modelDialog = true;
    },
    //添加，查看，编辑，角色模态框，点击确定
    confirm() {
      if (this.editOrNew === 1) {
        //新增  确定
        this.modelDialog = false;
        this.addRoleParamObj.name = this.role.name;
        this.addRoleParamObj.code = this.role.code;
        this.$jsonAxios
          .post(
            "/cms/role/saveOrUpdate",
            this.addRoleParamObj
          )
          .then(res => {
            if (res.data.status === 200) {
              this.role = res.data.data;
              this.index();
            } else {
              this.showSnackbar(res.data.message, "error");
            }
          })
          .catch(err => {
            this.showSnackbar("REST服务失败", "error");
          });
      } else if (this.editOrNew === 2) {
        //编辑  确定
        this.modelDialog = false;
        this.addRoleParamObj.primarykey = this.role.roleid;
        this.addRoleParamObj.name = this.role.name;
        this.addRoleParamObj.code = this.role.code;
        this.$jsonAxios
          .post(
            "/cms/role/saveOrUpdate",
            this.addRoleParamObj
          )
          .then(res => {
            if (res.data.status === 200) {
              this.role = res.data.data;
              this.showSnackbar("操作成功", "success");
              this.index();
            } else {
              this.showSnackbar(res.data.message, "error");
            }
          })
          .catch(err => {
            this.showSnackbar("REST服务失败", "error");
          });
      } else {
        //查看  确定
        this.modelDialog = false;
      }
    },
    //点击删除按钮
    deleteDialogShow(deleteTitle, deleteText, item) {
      this.deleteTitle = deleteTitle;
      this.deleteText = deleteText;
      this.deleteDialog = true;
      this.role = item;
    },
    //确定删除角色
    confirmDelRole() {
      this.deleteDialog = false;
      this.$jsonAxios
        .delete("/cms/role/delete/" + this.role.roleid)
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
  data() {
    return {
      roleitem: {}, //分配菜单需要用到
      tableData: [],
      roleModelTitle: "",
      disabled: false,
      editOrNew: "1", //判断是新增，编辑，查看
      role: {},
      addRoleParamObj: {
        apps: [],
        auths: [],
        code: "",
        dsrs: [],
        name: "",
        primarykey: "",
        syscode: "stdcode",
        user: ""
      },
      modelTitle: "添加角色",
      MenuDialog: false,
      search: null,
      include: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      // 表单数据
      headers: [
        { text: "角色名称", value: "codetableEname", align: "center" },
        { text: "角色编码", value: "codetableCname", align: "center" },
        { text: "操作", value: "remark" }
      ],
      pagination: {
        rowsPerPage: 10, // -1 for All
        sortBy: null
      },
      rowsPerPage: [10, 25, 100, { text: "全部", value: -1 }],
      modelData: {},
      modelType: "add",
      modelDialog: false,
      logoutDialog: false,
      deleteDialog: false,
      deleteTitle: "",
      deleteText: "",
      outTitle: "",
      outText: "",
      singleDeleteItem: {},
      treedata: [],
      treedata2:[],
      treeSelectData:[],
    };
  },
  mounted() {
    this.index();
  },
  filters: {},
  watch: {
    editOrNew() {
      if (this.editOrNew === 1) {
        this.modelTitle = "添加角色";
      } else if (this.editOrNew === 2) {
        this.modelTitle = "编辑角色";
      } else {
        this.modelTitle = "查看角色";
      }
    }
  },
  computed: {}
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
