<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12 md4 xl3>
        <v-widget title="目录列表">
          <div slot="widget-content" style="min-height:400px">
            <v-treeview
              style="cursor:pointer"
              v-model="tree"
              :open.sync="open"
              :items="folderItems"
              activatable
              active-class="grey lighten-3 indigo--text"
              transition
            >
              <template v-slot:prepend="{ item, open }">
                <v-icon v-if="item.children">
                  {{
                  open ? 'mdi-folder-open' : 'mdi-folder'
                  }}
                </v-icon>
                <v-icon v-else>mdi-folder-outline</v-icon>
              </template>
              <template v-slot:label="{ item }">
                <div :title="item.name" @click="onSelect(item)">{{ item.name }}</div>
              </template>
            </v-treeview>
          </div>
        </v-widget>
      </v-flex>
      <v-flex sm12 md8 xl9>
        <v-widget :title="hTitle">
          <div slot="widget-content" style="min-height:400px">
            <v-card-title>
              <div style="margin-left:50%">
                <v-btn color="primary" @click="add()">新增</v-btn>
                <v-btn color="primary" @click="del()">删除</v-btn>
                <v-btn color="primary" @click="save()">保存</v-btn>
              </div>
              <v-flex sm12 md12 x12>
                <div style="margin-top:20px">
                  <v-form ref="form" lazy-validation>
                    <v-container>
                      <v-layout wrap row>
                        <v-flex md5>
                          <v-text-field
                            clearable
                            :rules="nameRules"
                            v-model="category.name"
                            label="目录名称 *"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap row>
                        <v-flex md5>
                          <!-- <v-select
                            v-model="category.parentId"
                            :items="categoryList"
                            label="请选择父级目录"
                            @change="standChange"
                          ></v-select>-->
                          <!-- <v-combobox
                            v-model="category.parent_category_name"
                            :items="categoryList"
                            label="请选择父级目录"
                            @change="standChange"
                          ></v-combobox>-->
                          <TreeSelect
                            :default-expand-level="1"
                            v-model="category.parentId"
                            :options="categoryList"
                            :normalizer="normalizer"
                            searchable
                            :clearable="false"
                            placeholder="请选择父级目录"
                            @select="standChange"
                          />
                        </v-flex>
                      </v-layout>
                      <v-layout wrap row>
                        <v-flex md5>
                          <v-text-field
                            clearable
                            :rules="pxhRules"
                            v-model="category.pxh"
                            label="排序号 *"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                </div>
              </v-flex>
            </v-card-title>
          </div>
        </v-widget>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import qs from "qs";
import VWidget from "@/components/VWidget";
import { toTreeData, dealChildren } from "@/plugins/tools";
import TreeSelect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "standard-catalog",
  components: {
    VWidget,
    TreeSelect
  },
  data: () => ({
    tree: [],
    folderItems: [],
    users: [],
    open: [],
    testparentId: "",
    hTitle: "新增目录",
    category: {
      id: "",
      name: "",
      parentId: "0",
      creator: "",
      createTime: "",
      pxh: "",
      response_data: ""
    },
    allcategory: [],
    categoryList: [],
    nameRules: [v => !!v || "请填写目录名称"],
    pxhRules: [
      v => {
        const val = Number(v);
        return (!isNaN(val) && val >= 0) || "请填写大于等于0的纯数字";
      }
    ],
    normalizer(node) {
      return {
        id: node.id,
        label: node.name,
        ...node
      };
    }
  }),
  created() {
    this.getData();
  },
  methods: {
    //展示用方法
    showSnackbar(text, color) {
      this.snackbar = {
        show: true,
        text: text,
        color: color
      };
      this.$emit("showSnackbar", this.snackbar);
    },
    selectValue(value) {
      this.category.parentId = value;
    },
    //获取后端数据
    getData() {
      this.category = {
        id: "",
        name: "",
        parentId: "0",
        pxh: ""
      };
      const attr = {
        id: "id",
        parentId: "parentId",
        name: "name"
      };
      this.$nohttps
        .post("/category/getAllCategory")
        .then(response => {
          this.allcategory = JSON.parse(
            JSON.stringify(response.data.data)
          ).sort((a, b) => a.pxh - b.pxh);
          const treeData = toTreeData(this.allcategory, attr);
          this.folderItems = treeData;
          this.categoryList = dealChildren(treeData);
        })
        .catch(function(error) {});
    },
    // 选择树节点
    onSelect(item) {
      if (item.parentId === "") {
        item.parentId = null;
      }
      this.category = item;
    },
    // 编辑和新增的保存方法
    save() {
      if (!this.$refs.form.validate()) {
        // this.showSnackbar("请先填写表单", "warning");
        return;
      }
      if (this.category.id && this.category.id === this.category.parentId) {
        this.showSnackbar("当前目录与父级目录不能相同", "warning");
        return;
      }
      let obj = {};
      obj.id = this.category.id ? this.category.id : "";
      obj.name = this.category.name;
      obj.parent_id =
        this.category.parentId === null ? "" : this.category.parentId;
      obj.pxh =
        typeof this.category.pxh === "number"
          ? this.category.pxh
          : this.category.pxh.trim();
      this.$nohttps
        .post("/category/addCategory", obj)
        .then(res => {
          if (res.data.resultCode === "RESULT_SUCCESS") {
            this.showSnackbar("保存成功", "success");
            this.getData();
          } else {
            this.showSnackbar(res.data.message, "error");
          }
        })
        .catch(function(error) {});
    },
    // 新增目录
    add() {
      this.category = {
        id: "",
        name: "",
        parentId: "0",
        pxh: ""
      };
      this.hTitle = "新增目录";
    },
    // 删除目录
    del() {
      if (!this.category.id) {
        this.showSnackbar("请先选择目录", "error");
        return;
      }
      this.$nohttps
        .get("/category/deleteCategory/" + this.category.id)
        .then(res => {
          if (res.data.resultCode === "RESULT_SUCCESS") {
            this.showSnackbar("删除成功", "success");
            this.getData();
          } else {
            this.showSnackbar(res.data.message, "error");
          }
        })
        .catch(function(error) {});
    },
    standChange(name) {
      const target = this.allcategory.find(v => v.name === name);
      if (target) {
        this.category.parentId = target.id;
      }
    }
  }
};
</script>

<style></style>
