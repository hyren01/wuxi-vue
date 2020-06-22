<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <!-- re目录 -->
      <v-flex sm6 md6 xl6>
        <v-widget title="模型目录">
          <div slot="widget-content">
            <v-layout row wrap>
              <v-flex sm4 md4 x12>
                <v-btn @click="checkBtn" color="warning">检测</v-btn>
                <v-btn
                  @click="saveBtn"
                  v-if="haveCheck && reId !== null && standardId !== null"
                  color="info"
                >保存</v-btn>
              </v-flex>
              <v-flex sm4 md4 x12>
                <a-tree-select
                  style="width: 172px;margin-top:15px"
                  :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                  :treeData="treedata"
                  placeholder="请选择目录"
                  v-model="reName1"
                  @select="onSelect1"
                />
              </v-flex>
              <v-flex sm4 md4 x12>
                <v-combobox v-model="reName" :items="reList" label="请选择" @change="reChange"></v-combobox>
              </v-flex>
            </v-layout>
            <!-- 数据table -->
            <v-data-table
              :headers="reHeaders"
              :items="reData"
              class="elevation-1"
              hide-actions
              select-all
              v-model="selected"
              v-if="this.checks == 1"
            >
              <template v-slot:items="reData">
                <td>
                  <v-checkbox v-model="reData.selected" primary hide-details></v-checkbox>
                </td>
                <td class="text-xs-center">
                  <span
                    class="red--text"
                    v-if="reData.item.checkResult === '不符合'"
                  >{{ reData.item.name }}</span>
                  <span
                    class="yellow--text text--darken-3"
                    v-else-if="reData.item.checkResult === '相似'"
                  >{{ reData.item.name }}</span>
                  <span
                    v-else-if="reData.item.checkResult === '符合'"
                    class="green--text"
                  >{{ reData.item.name }}</span>
                  <span v-else>{{ reData.item.name }}</span>
                </td>
                <td class="text-xs-center">
                  <span
                    class="red--text"
                    v-if="reData.item.checkResult === '不符合'"
                  >{{ reData.item.enName }}</span>
                  <span
                    class="yellow--text text--darken-3"
                    v-else-if="reData.item.checkResult === '相似'"
                  >{{ reData.item.enName }}</span>
                  <span
                    v-else-if="reData.item.checkResult === '符合'"
                    class="green--text"
                  >{{ reData.item.enName }}</span>
                  <span v-else>{{ reData.item.enName }}</span>
                </td>
                <td class="text-xs-center">
                  <span
                    class="red--text"
                    v-if="reData.item.checkResult === '不符合'"
                  >{{ reData.item.code }}</span>
                  <span
                    class="yellow--text text--darken-3"
                    v-else-if="reData.item.checkResult === '相似'"
                  >{{ reData.item.code }}</span>
                  <span
                    v-else-if="reData.item.checkResult === '符合'"
                    class="green--text"
                  >{{ reData.item.code }}</span>
                  <span v-else>{{ reData.item.code }}</span>
                </td>
              </template>
            </v-data-table>
            <v-data-table
              :headers="reHeaders2"
              :items="reData"
              class="elevation-1"
              :pagination.sync="pagination"
              hide-actions
              select-all
              v-model="selected"
              v-if="this.checks == 2"
            >
              <template v-slot:items="reData">
                <td>
                  <v-checkbox v-model="reData.selected" primary hide-details></v-checkbox>
                </td>
                <td class="text-xs-center">
                  <span
                    class="red--text"
                    v-if="reData.item.checkResult === '不符合'"
                  >{{ reData.item.name }}</span>
                  <span
                    class="yellow--text text--darken-3"
                    v-else-if="reData.item.checkResult === '相似'"
                  >{{ reData.item.name }}</span>
                  <span
                    v-else-if="reData.item.checkResult === '符合'"
                    class="green--text"
                  >{{ reData.item.name }}</span>
                  <span v-else>{{ reData.item.name }}</span>
                </td>
                <td class="text-xs-center">
                  <span
                    class="red--text"
                    v-if="reData.item.checkResult === '不符合'"
                  >{{ reData.item.enName }}</span>
                  <span
                    class="yellow--text text--darken-3"
                    v-else-if="reData.item.checkResult === '相似'"
                  >{{ reData.item.enName }}</span>
                  <span
                    v-else-if="reData.item.checkResult === '符合'"
                    class="green--text"
                  >{{ reData.item.enName }}</span>
                  <span v-else>{{ reData.item.enName }}</span>
                </td>
                <td class="text-xs-center">
                  <span
                    class="red--text"
                    v-if="reData.item.checkResult === '不符合'"
                  >{{ reData.item.code }}</span>
                  <span
                    class="yellow--text text--darken-3"
                    v-else-if="reData.item.checkResult === '相似'"
                  >{{ reData.item.code }}</span>
                  <span
                    v-else-if="reData.item.checkResult === '符合'"
                    class="green--text"
                  >{{ reData.item.code }}</span>
                  <span v-else>{{ reData.item.code }}</span>
                </td>
                <td class="text-xs-center">
                  <span
                    class="red--text"
                    v-if="reData.item.checkResult === '不符合'"
                  >{{ reData.item.checkResult }}</span>
                  <span
                    class="yellow--text text--darken-3"
                    v-else-if="reData.item.checkResult === '相似'"
                  >{{ reData.item.checkResult }}</span>
                  <span
                    v-else-if="reData.item.checkResult === '符合'"
                    class="green--text"
                  >{{ reData.item.checkResult }}</span>
                  <span v-else>{{ reData.item.checkResult }}</span>
                </td>
              </template>
            </v-data-table>
          </div>
        </v-widget>
      </v-flex>
      <!-- 标准目录↓ -->
      <v-flex sm6 md6 xl6>
        <v-widget title="标准目录">
          <div slot="widget-content">
            <v-layout row wrap>
              <v-flex sm4 md4 xl2>
                <v-icon
                  @click="backBtn"
                  style="margin-top:25px;margin-left:20px"
                  v-if="this.temp == 3"
                  color="info"
                >mdi-arrow-left</v-icon>
              </v-flex>
              <v-flex sm4 md4 x12>
                <TreeSelect
                  :default-expand-level="1"
                  v-model="reName2"
                  :options="treeData2"
                  :normalizer="normalizer"
                  searchable
                  :clearable="false"
                  placeholder="请选择目录"
                  @select="onSelect2"
                />
              </v-flex>
              <v-flex sm4 md4 xl2>
                <v-combobox
                  v-model="standardName"
                  :items="standardList"
                  label="请选择"
                  @change="standChange"
                ></v-combobox>
              </v-flex>
            </v-layout>

            <!-- 数据table -->
            <v-data-table
              :headers="reHeaders1"
              :items="standardData"
              v-if="this.temp == 1"
              class="elevation-1"
              hide-actions
            >
              <template v-slot:items="standardData">
                <td class="text-xs-center">{{ standardData.item.objCname }}</td>
                <td class="text-xs-center">{{ standardData.item.objEname }}</td>
                <td class="text-xs-center">{{ standardData.item.shortName }}</td>
                <td class="text-xs-center">
                  <v-icon
                    small
                    class="mr-2"
                    @click="fileItem(standardData.item)"
                  >mdi-file-eye-outline</v-icon>
                </td>
              </template>
            </v-data-table>
            <v-data-table
              :headers="reHeaders"
              :items="standardData"
              v-if="this.temp == 2"
              class="elevation-1"
              hide-actions
            >
              <template v-slot:items="standardData">
                <td class="text-xs-center">{{ standardData.item.name }}</td>
                <td class="text-xs-center">{{ standardData.item.enName }}</td>
                <td class="text-xs-center">{{ standardData.item.code }}</td>
              </template>
            </v-data-table>
            <v-data-table
              :headers="reHeaders"
              :items="standardDataes"
              v-if="this.temp == 3"
              class="elevation-1"
              hide-actions
            >
              <template v-slot:items="standardDataes">
                <td class="text-xs-center">{{ standardDataes.item.name }}</td>
                <td class="text-xs-center">{{ standardDataes.item.enName }}</td>
                <td class="text-xs-center">{{ standardDataes.item.code }}</td>
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
import { toTreeData, dealChildren } from "@/plugins/tools";
import TreeSelect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "standar-detection",
  components: {
    VWidget,
    TreeSelect
  },
  data: () => ({
    treedata: [],
    defaultProps: {
      children: "children",
      label: "name"
    },
    scrollSettings: {
      maxScrollbarLength: 80
    },
    allReList: [],
    objectId: "",
    allStandardList: [],
    reList: [],
    reList1: [],
    standardList: [],
    reName: null,
    reName1: null,
    reName2: null,
    treeData: [],
    treeData2: [],
    reId: null,
    standardName: null,
    standardId: null,
    vers: null,
    objId: "",
    checks: 1,
    result_category_obj: {},
    category: {
      id: "",
      name: "",
      parentId: "",
      creator: "",
      createTime: "",
      ismodel: "",
      parent_category_name: "",
      pxh: "",
      status: "",
      response_data: "",
    },
    // tables
    pagination: {}, //不分页
    reHeaders: [
      {
        text: "中文名称",
        value: "name",
        align: "center"
      },
      {
        text: "英文名称",
        value: "enName",
        align: "center"
      },
      {
        text: "短名",
        value: "code",
        align: "center"
      }
    ],
    reHeaders2: [
      {
        text: "中文名称",
        value: "name",
        align: "center"
      },
      {
        text: "英文名称",
        value: "enName",
        align: "center"
      },
      {
        text: "短名",
        value: "code",
        align: "center"
      },
      {
        text: "检测结果",
        value: "checkResult",
        align: "center"
      }
    ],
    reHeaders1: [
      {
        text: "中文名称",
        value: "name",
        align: "center"
      },
      {
        text: "英文名称",
        value: "enName",
        align: "center"
      },
      {
        text: "短名",
        value: "code",
        align: "center"
      },
      {
        text: "操作",
        value: "remark",
        align: "center"
      }
    ],
    // tables
    temp: "",
    reData: [],
    standardData: [],
    standardDataes: [],
    haveCheck: false,
    toSaveData: [],
    toSave: [],
    selected: [], //选中的数据
    reBody: {}, //检测时传的参数
    normalizer(node) {
      return {
        id: node.id,
        label: node.name,
        ...node
      };
    }
  }),
  mounted() {
    this.getAllcategory();
    this.initialize();
  },
  methods: {
    //获取所有目录
    getAllcategory() {
      this.$nohttps
        .get("/model/getAllModelCategory", {
          headers: { Authorization: sessionStorage.getItem("Authorization") }
        })
        .then(res => {
          let data = res.data.data;
          let tempTree = [];
          data.forEach(item => {
            let tempTreeobj = {};
            tempTreeobj.title = item.name;
            tempTreeobj.value = item.id;
            tempTreeobj.key = item.id;
            tempTreeobj.fatherkey = item.parentId;
            tempTree.push(tempTreeobj);
          });
          this.treedata = this.listToTree(tempTree);
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    initialize() {
      this.$nohttps
        .post("/category/getAllCategory")
        .then(response => {
          const attr = {
            id: "id",
            parentId: "parentId",
            name: "name"
          };
          const treeData = toTreeData(response.data.data, attr);
          this.treeData2 = dealChildren(treeData);
        })
        .catch(function(error) {});
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
          if (arr.length) listChildren(val, obj => obj.fatherkey === val.key);
        });
      };
      const tree = {};
      listChildren(
        tree,
        val => arr.findIndex(i => i.key === val.fatherkey) === -1
      );
      return tree.children;
    },
    fileItem(item) {
      this.standardDataes = item.standardField;
      this.objId = item.objId;
      this.objectId = "";
      this.temp = 3;
    },
    backBtn() {
      this.temp = 1;
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.reData.slice();
    },
    showSnackbar(text, color) {
      this.snackbar = {
        show: true,
        text: text,
        color: color
      };
      this.$emit("showSnackbar", this.snackbar);
    },
    // 查询re列表
    // getReList(){
    //   this.axios.get(
    //     '/stdglprj/model/getAllModelInfoInner',{headers:{'Authorization':sessionStorage.getItem('Authorization')}}
    //   ).then((res)=>{
    //     let data=res.data.data;
    //     this.allReList=[...data];
    //     this.reList=data.map((item)=>{return item.name});
    //   }).catch((err)=>{
    //     this.showSnackbar("REST服务失败", "error");
    //   })
    // },
    // 查询标准列表
    getStandList() {
      this.$nohttps
        .get("/newstandard/getStandard?categoryId", {
          headers: { Authorization: sessionStorage.getItem("Authorization") }
        })
        .then(res => {
          let data = res.data.data;
          this.allStandardList = [...data];
          this.standardList = data.map(item => {
            return item.name;
          });
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    // 模型改变
    reChange(item) {
      this.haveCheck = false;
      if (item === "") {
        this.reData = [];
      } else {
        this.reId = null;
        this.allReList.forEach(e => {
          if (e.name === item) {
            this.reId = e.id;
          }
        });
        if (this.reId === null) {
          this.reData = [];
        } else {
          this.getReData();
        }
      }
    },
    standChange(item) {
      this.haveCheck = false;
      this.objectId = "";
      if (item === "") {
        this.reData = [];
      } else {
        this.standardId = null;
        this.allStandardList.forEach(e => {
          if (e.name === item) {
            this.standardId = e.id;
          }
        });
        if (this.standardId === null) {
          this.standardData = [];
        } else {
          this.getStandData();
        }
      }
    },
    // 查询table数据
    getReData() {
      this.$nohttps
        .get("/model/getModelInfo/" + this.reId)
        .then(res => {
          console.log(res)
          this.reBody = JSON.parse(JSON.stringify(res.data.data[0]));
          this.reData = res.data.data[0].fields || [];
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    getStandData() {
      this.$nohttps
        .post(
          "/newstandard/getStandardById?" +
            "stdId=" +
            this.standardId +
            "&version" +
            "&batchNo"
        )
        .then(res => {
          let resdata = res.data.data;
          this.vers = resdata[0].version;
          if (resdata[0].standardObject.length > 0) {
            this.standardData = resdata[0].standardObject;
            this.temp = 1;
          } else {
            this.standardData = resdata[0].standardField;
            this.temp = 2;
          }
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    // 检测
    checkBtn() {
      if (
        this.reId === null ||
        this.standardId === null ||
        this.selected.length === 0
      ) {
        this.showSnackbar("请选择数据进行检测", "error");
      } else {
        let params = JSON.parse(JSON.stringify(this.reBody));
        delete params.fields;
        params.fields = JSON.parse(JSON.stringify(this.selected));
        if (this.objectId) {
          this.objectId = this.objectId;
          // this.objId = '';
        } else {
          this.objectId = this.objId;
        }
        let obj = {};
        obj.fields = this.selected;
        obj.id = this.reId;
        this.$nohttps
          .post(
            "/checkmoudle/contrastbyModel?moudleId=" +
              this.standardId +
              "&objId=" +
              this.objectId,
            obj
          )
          .then(res => {
            if (res.data.resultCode == "RESULT_SUCCESS") {
              this.showSnackbar(res.data.message, "success");
              let data = res.data.data;
              this.objId = "";
              this.checks = 2;
              let arrs = [];
              data.forEach(item => {
                item.moudleId = this.reId;
                item.version = this.vers;
              });
              this.toSaveData = data;
              this.reData.forEach(e => {
                if (e.checkResult) delete e.checkResult;
              });
              this.reData.forEach(re => {
                data.forEach(item => {
                  if (re.id === item.fieldId) {
                    this.$set(re, "checkResult", item.checkResult);
                  }
                });
              });
              this.haveCheck = true;
              this.dataFun();
            } else {
              this.showSnackbar(res.data.message, "error");
            }
          })
          .catch(err => {
            this.showSnackbar("REST服务失败", "error");
          });
      }
    },
    dataFun() {
      let arr = [];
      this.reData.forEach(item => {
        for (let key in item) {
          var objs = {};
          if (key == "id") {
            var objes = {};
            objes.fieIdId = item[key];
          }
          objs = Object.assign({}, objes);
          arr.push(objs);
        }
      });
      //所有数据
      let newarr = deteleObject(arr);
      let arr1 = [];
      this.selected.forEach(item => {
        for (let key in item) {
          var objs1 = {};
          if (key == "id") {
            var objes1 = {};
            objes1.fieIdId = item[key];
          }
          objs1 = Object.assign({}, objes1);
          arr1.push(objs1);
        }
      });
      //被勾选的数据
      let newarr1 = deteleObject(arr1);
      function deteleObject(obj) {
        var uniques = [];
        var stringify = {};
        for (var i = 0; i < obj.length; i++) {
          var keys = Object.keys(obj[i]);
          keys.sort(function(a, b) {
            return Number(a) - Number(b);
          });
          var str = "";
          for (var j = 0; j < keys.length; j++) {
            str += JSON.stringify(keys[j]);
            str += JSON.stringify(obj[i][keys[j]]);
          }
          if (!stringify.hasOwnProperty(str)) {
            uniques.push(obj[i]);
            stringify[str] = true;
          }
        }
        uniques = uniques;
        return uniques;
      }
      //未被勾选的数据
      let newArr = [];
      for (let i = 0; i < newarr.length; i++) {
        var obj2 = newarr[i];
        var num = obj2.fieIdId;
        var flag = false;
        for (let j = 0; j < newarr1.length; j++) {
          var obj1 = newarr1[j];
          var n = obj1.fieIdId;
          if (n == num) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          newArr.push(obj2);
        }
      }
      newArr.forEach(item => {
        item.checkDate = null;
        item.checkResult = "未检测";
        item.checkUser = null;
        item.detail = "未检测";
        item.fieIdCode = null;
        item.id = null;
        item.moudIeId = this.reId;
        item.stdname = null;
        item.stdProperty = null;
        item.version = "-1";
      });
      let newArrs = this.toSaveData.concat(newArr);
      this.toSave = JSON.stringify(newArrs);
    },
    //保存检测结果
    saveBtn() {
      var obj = {
        model_id: this.reId,
        std_id:  this.standardId,
        obj_id:  this.objectId,
        version: this.vers,
        tosave:  this.toSave
      }
      console.log(obj);
      this.$nohttps
        .post("/checkmoudle/save",obj)
        .then(res => {
          if (res.data.resultCode === "RESULT_SUCCESS") {
            this.showSnackbar(res.data.message, "success");
            // window.location.reload();
          } else {
            this.showSnackbar(res.data.message, "error");
          }
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    onSelect1(key, event) {
      this.$nohttps
        .get("/model/getTableByCategoryId/" + key)
        .then(res => {
          let data = res.data.data;
          let arr = [];
          this.allReList = [...data];
          this.reList = data.map(item => {
            return item.name;
          });
        })
        .catch(error => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    onSelect2(item) {
      this.standardName = null;
      this.category = item
      this.getTableList();
    },
    //查找列表
    getTableList() {
      let category = this.category.id;
      this.$nohttps
        .get("/newstandard/getAllSHTGStandardInfo/" + category, {
          headers: { Authorization: sessionStorage.getItem("Authorization") }
        })
        .then(res => {
          let data = res.data.data;
          let arr = [];
          this.allStandardList = [...data];
          data.forEach(item => {
            arr.push(item.name);
          });
          this.standardList = arr;
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    }
  }
};
</script>

<style></style>
