<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12 md3 xl3>
        <!-- 机构列表 -->
        <v-widget title="所属单位">
          <div slot="widget-content">
            <v-layout wrap row>
              <v-flex md7>
                <v-text-field clearable v-model="listsearch" label="搜索"></v-text-field>
              </v-flex>
              <v-flex md4>
                <v-btn color="primary" @click="addDialog = true" size="mini">添加机构</v-btn>
              </v-flex>
            </v-layout>
            <!-- 列表 -->
            <v-list dense class="pt-0" :listsearch="search">
              <v-list-tile v-for="item in items" :key="item.depid" @click="aaa(item)">
                <v-list-tile-action @click="getUserByDeptId(item)">{{ item.keyvalue+1 }}</v-list-tile-action>
                <v-list-tile-content @click="getUserByDeptId(item)">
                  <v-list-tile-title>{{ item.depname }}</v-list-tile-title>
                </v-list-tile-content>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn flat icon class="ma-0" color="error" v-on="on" @click="deleteApp(item)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <span>删除</span>
                </v-tooltip>
              </v-list-tile>
            </v-list>
            <!-- 新增机构模态框 -->
            <v-dialog v-model="addDialog" max-width="500">
              <v-widget title="添加机构">
                <div slot="widget-content">
                  <v-form ref="form" lazy-validation>
                    <v-container fluid>
                      <v-layout wrap row>
                        <v-flex md4>
                          <v-text-field style="width: 450px" v-model="addeven" label="机构名称"></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>

                  <v-layout row wrap>
                    <v-flex sm6 md6 xl6></v-flex>
                    <v-flex sm6 md6 xl6>
                      <v-btn color="success" style="float:right" @click="saveDep">确定</v-btn>
                      <v-btn flat @click="addDialog = false" style="float:right">取消</v-btn>
                    </v-flex>
                  </v-layout>
                </div>
              </v-widget>
            </v-dialog>
            <!-- 角色分配模态框 -->
            <v-dialog v-model="roleDialog" max-width="700">
              <v-widget title="角色分配">
                <div slot="widget-content">
                  <v-layout row wrap>
                    <v-flex sm12 md12 xl12>
                      <v-data-table
                        :headers="distribute_role_headers"
                        :items="distribute_role_data"
                        :pagination.sync="pagination"
                        v-model="roleSelected"
                        select-all
                        item-key="idss"
                        :rows-per-page-items="rowsPerPage"
                      >
                        <template v-slot:items="props">
                          <tr>
                            <td @click="props.selected = !props.selected">
                              <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
                            </td>
                            <td>{{ props.item.name }}</td>
                            <td>{{ props.item.code }}</td>
                          </tr>
                        </template>
                      </v-data-table>
                    </v-flex>
                  </v-layout>
                  <v-layout>
                    <v-flex sm12 md12 xl12>
                      <v-btn color="success" style="float:right" @click="handleRole">确定</v-btn>
                      <v-btn flat @click="roleDialog = false" style="float:right">取消</v-btn>
                    </v-flex>
                  </v-layout>
                </div>
              </v-widget>
            </v-dialog>
            <!-- 删除模态框 -->
            <v-dialog v-model="deleteDialog" max-width="400">
              <v-card>
                <v-card-title class="headline error--text">
                  {{
                  '确认删除'
                  }}
                </v-card-title>
                <v-card-text>{{ '确定删除此账号吗?' }}</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="grey" flat @click="deleteDialog = false">取消</v-btn>
                  <v-btn color="error" flat @click="confirmDelUser">确定</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- 删除机构模态框 -->
            <v-dialog v-model="deleteAppDialog" max-width="400">
              <v-card>
                <v-card-title class="headline error--text">
                  {{
                  '确认删除'
                  }}
                </v-card-title>
                <v-card-text>{{ '确定删除此机构吗?' }}</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="grey" flat @click="deleteAppDialog = false">取消</v-btn>
                  <v-btn color="error" flat @click="handleDelete">确定</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- 修改密码模态框 -->
            <v-dialog v-model="setDialog" max-width="500">
              <v-widget title="修改密码">
                <div slot="widget-content">
                  <v-form ref="form" lazy-validation>
                    <v-container fluid>
                      <v-layout wrap row>
                        <v-flex md4>
                          <v-text-field
                            style="width: 450px"
                            clearable
                            v-model="updatePassowrdObj.password_old"
                            label="老密码"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap row>
                        <v-flex md4>
                          <v-text-field
                            style="width: 450px"
                            clearable
                            v-model="updatePassowrdObj.password_new"
                            label="新密码"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                  <v-layout row wrap>
                    <v-flex sm6 md6 xl6></v-flex>
                    <v-flex sm6 md6 xl6>
                      <v-btn color="success" style="float:right" @click="confirmUpdatePassword()">确定</v-btn>
                      <v-btn flat @click="setDialog = false" style="float:right">取消</v-btn>
                    </v-flex>
                  </v-layout>
                </div>
              </v-widget>
            </v-dialog>
            <!-- 新增用户模态框 -->
            <v-dialog v-model="addUserDialog" max-width="500">
              <v-widget title="新增">
                <div slot="widget-content">
                  <v-form ref="form" lazy-validation>
                    <v-container fluid>
                      <v-layout wrap row>
                        <v-flex md4>
                          <v-text-field
                            style="width: 450px"
                            clearable
                            v-model="user.account"
                            label="账号"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap row>
                        <v-flex md4>
                          <v-text-field
                            style="width: 450px"
                            clearable
                            v-model="user.name"
                            label="姓名"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap row>
                        <v-flex md4>
                          <v-text-field
                            style="width: 450px"
                            clearable
                            v-model="user.password"
                            label="密码"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap row>
                        <v-flex md4>
                          <v-text-field
                            style="width: 450px"
                            clearable
                            v-model="user.mobile"
                            label="手机号码"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap row>
                        <v-flex md4>
                          <v-text-field
                            style="width: 450px"
                            clearable
                            v-model="user.email"
                            label="邮箱"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-layout wrap row>
                        <v-flex md4>
                          <v-select
                            :options="items"
                            :options-label="'depname'"
                            :options-value="'depid'"
                            filterable
                            v-model="dep_select"
                            placeholder="请选择"
                            style="width: 450px"
                            @change="depchange"
                          />
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>

                  <v-layout row wrap>
                    <v-flex sm6 md6 xl6></v-flex>
                    <v-flex sm6 md6 xl6>
                      <v-btn color="success" style="float:right" @click="saveUser">确定</v-btn>
                      <v-btn flat @click="addUserDialog = false" style="float:right">取消</v-btn>
                    </v-flex>
                  </v-layout>
                </div>
              </v-widget>
            </v-dialog>
            <!-- 编辑模态框 -->
            <v-dialog v-model="editDialog" max-width="500">
              <v-widget title="编辑">
                <div slot="widget-content">
                  <v-form ref="form" lazy-validation>
                    <v-container fluid>
                      <v-layout wrap row>
                        <v-flex md4>
                          <v-text-field
                            style="width: 450px"
                            clearable
                            v-model="user.account"
                            label="账号"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap row>
                        <v-flex md4>
                          <v-text-field
                            style="width: 450px"
                            clearable
                            v-model="user.name"
                            label="姓名"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap row>
                        <v-flex md4>
                          <v-text-field
                            style="width: 450px"
                            clearable
                            v-model="user.password"
                            label="密码"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap row>
                        <v-flex md4>
                          <v-text-field
                            style="width: 450px"
                            clearable
                            v-model="user.mobile"
                            label="手机号码"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap row>
                        <v-flex md4>
                          <v-text-field
                            style="width: 450px"
                            clearable
                            v-model="user.email"
                            label="邮箱"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-layout wrap row>
                        <v-flex md4>
                          <v-select
                            :options="items"
                            :options-label="'depname'"
                            :options-value="'depid'"
                            filterable
                            v-model="dep_select"
                            placeholder="请选择"
                            style="width: 450px"
                            @change="depchange"
                          />
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                  <v-layout row wrap>
                    <v-flex sm6 md6 xl6></v-flex>
                    <v-flex sm6 md6 xl6>
                      <v-btn color="success" style="float:right" @click="handleEdit">确定</v-btn>
                      <v-btn flat @click="editDialog = false" style="float:right">取消</v-btn>
                    </v-flex>
                  </v-layout>
                </div>
              </v-widget>
            </v-dialog>
            <!-- 查看模态框 -->
            <v-dialog v-model="viewDialog" max-width="500">
              <v-widget title="查看">
                <div slot="widget-content">
                  <v-form ref="form" lazy-validation>
                    <v-container fluid>
                      <v-layout wrap row>
                        <v-flex md4>
                          <v-text-field
                            style="width: 450px"
                            clearable
                            v-model="user.account"
                            label="账号"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap row>
                        <v-flex md4>
                          <v-text-field
                            style="width: 450px"
                            clearable
                            v-model="user.name"
                            label="姓名"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap row>
                        <v-flex md4>
                          <v-text-field
                            style="width: 450px"
                            clearable
                            v-model="user.password"
                            label="密码"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap row>
                        <v-flex md4>
                          <v-text-field
                            style="width: 450px"
                            clearable
                            v-model="user.mobile"
                            label="手机号码"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap row>
                        <v-flex md4>
                          <v-text-field
                            style="width: 450px"
                            clearable
                            v-model="user.email"
                            label="邮箱"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-layout wrap row>
                        <v-flex md4>
                          <v-select
                            :options="items"
                            :options-label="'depname'"
                            :options-value="'depid'"
                            filterable
                            v-model="dep_select"
                            placeholder="请选择"
                            style="width: 450px"
                            @change="depchange"
                          />
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                  <v-layout row wrap>
                    <v-flex sm6 md6 xl6></v-flex>
                    <v-flex sm6 md6 xl6>
                      <v-btn color="success" style="float:right" @click="viewDialog = false">确定</v-btn>
                      <v-btn flat @click="viewDialog = false" style="float:right">取消</v-btn>
                    </v-flex>
                  </v-layout>
                </div>
              </v-widget>
            </v-dialog>
          </div>
        </v-widget>
      </v-flex>
      <v-flex sm12 md9 xl9>
        <v-widget :title="widgetTitle">
          <div slot="widget-content">
            <!-- 搜索框 -->
            <v-layout row wrap>
              <v-flex md4>
                <v-btn color="primary" @click="handleAdd" size="mini">添加用户</v-btn>
              </v-flex>
              <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
            </v-layout>
            <!-- 表格 -->
            <v-data-table
              v-model="selected"
              :headers="headers"
              :items="tableData"
              :pagination.sync="pagination"
              select-all
              item-key="idss"
              :search="search"
              :rows-per-page-items="rowsPerPage"
            >
              <template v-slot:items="props">
                <tr>
                  <td @click="props.selected = !props.selected">
                    <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
                  </td>
                  <td>{{ props.item.account }}</td>
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.mobile }}</td>
                  <td>{{ props.item.depname }}</td>
                  <!-- 表格操作 -->
                  <td nowrap>
                    <!-- 分配角色 -->
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          flat
                          icon
                          class="ma-0"
                          color="info"
                          v-on="on"
                          @click="distributeMenuButton(props.item)"
                        >
                          <v-icon>widgets</v-icon>
                        </v-btn>
                      </template>
                      <span>分配角色</span>
                    </v-tooltip>
                    <!-- 查看按钮 -->
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          flat
                          icon
                          class="ma-0"
                          color="info"
                          v-on="on"
                          @click="getUser(props.item)"
                        >
                          <v-icon>mdi-file-eye-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>查看</span>
                    </v-tooltip>
                    <!-- 编辑按钮 -->
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          flat
                          icon
                          class="ma-0"
                          color="primary"
                          v-on="on"
                          @click="editUser(props.item)"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>编辑</span>
                    </v-tooltip>
                    <!-- 修改密码 -->
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          flat
                          icon
                          class="ma-0"
                          color="warning"
                          v-on="on"
                          @click="updatePasswordButton(props.item)"
                        >
                          <v-icon>settings</v-icon>
                        </v-btn>
                      </template>
                      <span>修改密码</span>
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
                          @click="delUserButton(props.item)"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </template>
                      <span>删除</span>
                    </v-tooltip>
                  </td>
                </tr>
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
import Util from "@/api/utilForDirectoryModification";
import TreeSelect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import qs from "qs";

export default {
  name: "a-message",
  components: {
    VWidget
  },
  data: () => ({
    value: "",
    options: [],
    //分配菜单保存数据
    menuObj: {},
    // 表单数据
    user: {
      account: "",
      name: "",
      password: "",
      mobile: "",
      email: "",
      depname: "",
      depid: "",
      roleid: [],
      syscode: "stdcode"
    },
    //获取表格行的数据
    userItem: {},
    roles: [],
    roleSelected: [],
    headers: [
      { text: "账号", value: "code" },
      { text: "姓名", value: "name" },
      { text: "手机号", value: "phoneNumber" },
      { text: "机构", value: "isAuth" },
      { text: "操作", sortable: false }
    ], //表格的头
    tableData: [], //右边  表格数据
    items: [], //左边 机构列表
    distribute_role_headers: [
      { text: "角色名称", value: "rolename" },
      { text: "角色编码", value: "rolecode" }
    ], //分配角色表头
    distribute_role_data: [], //分配角色表格数据
    syscode: "stdcode",
    addUserDialog: false, //添加用户模态框flag
    dep_select: "",
    setDialog: false,
    roleDialog: false,
    updatePassowrdObj: {
      userid: "",
      password_old: "",
      password_new: ""
    },
    tmpdeluser: {}, //删除用户，临时的user
    deleteobj: {}, //删除机构, 临时的机构
    deleteDialog: false,
    deleteAppDialog: false,
    viewDialog: false,
    editDialog: false,
    addeven: "",
    addDialog: false,
    modelInfo: {},
    autoExpandParent: true,
    treeData: [],
    rootcategory: {},
    reData3: [],
    widgetTitle: "所属单位",
    search: "",
    listsearch: "",
    selected: [],
    newDialog: false,
    // testid: 100,
    pagination: {
      rowsPerPage: 10, // -1 for All
      sortBy: null
    },
    rowsPerPage: [10, 25, 100, { text: "全部", value: -1 }],
    editOrNew: -1, //-1表示新增
    snackbar: {
      show: false,
      text: "",
      color: ""
    },
    scrollSettings: {
      maxScrollbarLength: 160
    },
    ids: "",
    defaultList: []
  }),
  computed: {
    formTitle() {
      return this.editOrNew === -1 ? "新增标准" : "修改标准";
    }
  },
  watch: {},
  // 页面创建生命周期函数
  created() {
    this.indexPage();
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
    indexPage() {
      let obj = {
        page: "0",
        pagesize: "0",
        paging: "false",
        searchKeyWord: "",
        syscode: "stdcode",
        userid: ""
      };
      //机构列表
      this.$jsonAxios
        .post("/cms/dep/list", obj)
        .then(res => {
          // console.log(res.data.data.list);
          let testdata = res.data.data.list;
          testdata.forEach((item, index) => {
            item.keyvalue = index;
          });
          this.items = testdata;
        })
        .catch(err => {
          // this.showSnackbar('REST服务失败', 'error')
        });
      //用户列表
      this.$jsonAxios
        .post("/cms/user/list", obj)
        .then(res => {
          this.tableData = res.data.data.list;
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
      this.deleteDialog = false;
    },
    aaa() {
      // console.log("123");
    },
    //删除机构模态框
    deleteApp(item) {
      console.log(item);
      this.deleteobj = item;
      this.deleteAppDialog = true;
    },
    //确认删除
    handleDelete() {
      // console.log(this.deleteobj);
      this.$jsonAxios
        .delete("/cms/dep/delete/" + this.deleteobj.depid)
        .then(res => {
          if (res.data.status === 200) {
            this.deleteAppDialog = false;
            // console.log(res.data.data);
            this.showSnackbar("删除成功", "success");
            this.indexPage();
          } else {
            //this.showSnackbar(res.data.msg, 'error')
          }
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    //分配角色确定
    handleRole() {
      // console.log(this.menuObj);
      // console.log(this.selected);
      let obj = {
        account: this.menuObj.account,
        mobile: this.menuObj.mobile,
        email: this.menuObj.email,
        idcard: this.menuObj.idcard,
        password: "",
        depid: this.menuObj.depid,
        roleid: [],
        syscode: "stdcode",
        name: this.menuObj.name,
        primarykey: this.menuObj.userid
      };
      this.roleSelected.forEach(item => {
        obj.roleid.push(item.roleid);
      });
      // console.log(obj);
      this.$jsonAxios
        .post("/cms/user/saveOrUpdate", obj)
        .then(res => {
          if (res.data.status === 200) {
            this.showSnackbar("操作成功", "success");
            this.roleDialog = false;
            this.indexPage();
          } else {
            this.showSnackbar(res.data.message, "error");
          }
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    //添加用户
    handleAdd() {
      this.user = {
        account: "",
        name: "",
        password: "",
        mobile: "",
        email: "",
        depname: "",
        depid: "",
        roleid: [],
        syscode: "stdcode"
      };
      this.addUserDialog = true;
    },
    //根据部门id获取用户
    getUserByDeptId(item) {
      item.syscode = this.syscode;
      this.$jsonAxios
        .post("/cms/user/list", item)
        .then(res => {
          if (res.data.status === 200) {
            // console.log(res.data.data.list);
            this.tableData = res.data.data.list;
          } else {
            this.showSnackbar(res.data.message, "error");
          }
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    //保存机构
    saveDep() {
      let depname = this.addeven;
      let obj = {
        depname: depname,
        parentid: "",
        primiarykey: "",
        syscode: "stdcode"
      };
      this.$jsonAxios
        .post("/cms/dep/saveOrUpdate", obj)
        .then(res => {
          if (res.data.status === 200) {
            //this.showSnackbar(res.data.meg,'操作成功')
            this.addDialog = false;
            this.indexPage();
          } else {
            this.showSnackbar(res.data.message, "error");
          }
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    //保存用户
    saveUser() {
      this.user.syscode = "stdcode";
      this.$jsonAxios
        .post("/cms/user/saveOrUpdate", this.user)
        .then(res => {
          if (res.data.status === 200) {
            this.showSnackbar(res.data.msg, "success");
            this.indexPage();
          } else {
            this.showSnackbar(res.data.message, "error");
          }
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
      this.addUserDialog = false;
    },
    //编辑用户确定
    handleEdit() {
      // console.log(this.userItem);
      this.user.syscode = "stdcode";
      this.user.primarykey = this.userItem.userid;
      this.$jsonAxios
        .post("/cms/user/saveOrUpdate", this.user)
        .then(res => {
          if (res.data.status === 200) {
            this.showSnackbar(res.data.msg, "success");
            this.indexPage();
          } else {
            this.showSnackbar(res.data.message, "error");
          }
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
      this.editDialog = false;
    },
    //修改密码按钮
    updatePasswordButton(item) {
      this.updatePassowrdObj.password_new = "";
      this.updatePassowrdObj.password_old = "";
      this.setDialog = true;
      this.updatePassowrdObj.userid = item.userid;
    },
    //确定修改密码
    confirmUpdatePassword() {
      this.$jsonAxios.defaults.headers.post = {
        "Content-type": "application/json;charset=UTF-8"
      };
      this.$jsonAxios
        .post("/cms/user/modify_password", this.updatePassowrdObj)
        .then(res => {
          if (res.data.status === 200) {
            this.setDialog = false;
            this.showSnackbar("修改成功", "success");
          } else {
            this.showSnackbar(res.data.msg, "error");
          }
        })
        .catch(err => {
          this.showSnackbar("原密码不正确", "error");
        });
    },
    depchange(e) {
      this.user.depid = e.depid;
      this.user.depname = e.depname;
    },
    //分配菜单按钮
    distributeMenuButton(item) {
      // console.log('用户信息',item);
      this.menuObj = item;
      let obj = {
        page: "0",
        pagesize: "10",
        paging: "true",
        searchKeyWord: "",
        syscode: "stdcode"
      };
      /* this.$jsonAxios
        .post("/cms/role/list", obj)
        .then(res => {
          if (res.data.status === 200) {
            let testArr = res.data.data.list;
            testArr.forEach((v, index) => {
              v.idss = index + 1;
              v.selected = true;
            });
            this.distribute_role_data = testArr;
            this.selected = item.roleids ? item.roleids.split(",") : [];
          } else {
            //this.showSnackbar(res.data.msg, 'error')
          }
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        }); */
      this.$jsonAxios
        .get("/cms/role/list/leftjoin/stdcode/" + item.userid)
        .then(res => {
          if (res.data.status === 200) {
            // console.log(res.data.data);
            let testArr = res.data.data;
            testArr.forEach((v, index) => {
              v.idss = index + 1;
              v.selected = true;
            });
            this.distribute_role_data = testArr;

            this.roleSelected = testArr.filter(v => v.include)
            this.roleDialog = true;
          } else {
          }
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    //查看用户信息
    getUser(item) {
      // console.log(item);
      this.$jsonAxios
        .get("/cms/user/info/stdcode/" + item.userid)
        .then(res => {
          if (res.data.status === 200) {
            // console.log(res.data.data);
            this.user = res.data.data;
            this.viewDialog = true;
            //this.showSnackbar(res.data.msg, '操作成功')
          } else {
            this.showSnackbar(res.data.msg, "error");
          }
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    //编辑用户信息
    editUser(item) {
      // console.log(item);
      this.userItem = item;
      this.$jsonAxios
        .get("/cms/user/info/stdcode/" + item.userid)
        .then(res => {
          if (res.data.status === 200) {
            // console.log(res.data.data);
            this.user = res.data.data;
            this.editDialog = true;
          } else {
            this.showSnackbar(res.data.msg, "error");
          }
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    //删除用户按钮
    delUserButton(item) {
      this.deleteDialog = true;
      this.tmpdeluser.userid = item.userid;
    },
    //确定删除用户
    confirmDelUser() {
      this.$jsonAxios
        .delete("/cms/user/delete/" + this.tmpdeluser.userid)
        .then(res => {
          if (res.data.status === 200) {
            this.deleteDialog = false;
            // console.log(res.data.data);
            this.indexPage();
          } else {
            //this.showSnackbar(res.data.msg, 'error')
          }
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    }
  }
};
</script>
<style></style>
