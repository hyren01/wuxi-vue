<template>
  <v-container grid-list-xl
               fluid>
    <v-layout row
              wrap>
      <v-flex sm5
              md5
              lg4>
        <v-widget title="基础编目">
          <div slot="widget-content">
            <v-treeview style="cursor:pointer"
                        v-model="tree"
                        :open.sync="open"
                        :items="folderItems"
                        activatable
                        :active.sync="activeFolderId"
                        active-class="grey lighten-3 indigo--text"
                        transition>
              <template v-slot:prepend="{ item,open }">
                <v-icon v-if="item.children">
                  {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                </v-icon>
                <v-icon v-else>
                  mdi-folder-outline
                </v-icon>
              </template>
              <template v-slot:append="{ item }">
                {{ " ("+item.num+")" }}
              </template>
            </v-treeview>
          </div>
        </v-widget>
      </v-flex>
      <v-flex sm7
              md7
              lg8>
        <v-widget title="选中的目录信息">
          <div slot="widget-content">
            <v-layout row
                      justify-center>
              <v-btn class="mt-4"
                     color="success"
                     @click="addFolder">
                新增下级目录
                <v-icon right>mdi-plus</v-icon>
              </v-btn>
              <v-btn class="mt-4"
                     color="info"
                     @click="disabled = false">
                编辑当前目录
                <v-icon right>mdi-folder-edit</v-icon>
              </v-btn>
              <v-btn class="mt-4"
                     color="error"
                     @click="deleteFolder">
                删除当前目录
                <v-icon right>mdi-delete-forever</v-icon>
              </v-btn>
            </v-layout>
            <v-layout row
                      align-end>
              <v-flex md3>
                <h5 class="text-md-right">上级目录 *</h5>
              </v-flex>
              <v-flex md6>
                <v-select placeholder="上级目录名称"
                          hide-details
                          :disabled="disabled"
                          v-model="selectItem"
                          :items="selectItems"
                          item-text="name"
                          item-value="id"></v-select>
              </v-flex>
              <v-flex md3></v-flex>
            </v-layout>
            <v-layout row
                      align-end>
              <v-flex md3>
                <h5 class="text-md-right">名称 *</h5>
              </v-flex>
              <v-flex md6>
                <v-text-field clearable
                              placeholder="当前选中目录名称"
                              hide-details
                              :disabled="disabled"
                              v-model="folderItem.name"></v-text-field>
              </v-flex>
              <v-flex md3></v-flex>
            </v-layout>
            <v-layout row
                      align-end>
              <v-flex md3>
                <h5 class="text-md-right">编目ID *</h5>
              </v-flex>
              <v-flex md6>
                <v-text-field clearable
                              placeholder="编目ID"
                              hide-details
                              :disabled="disabled"
                              v-model="folderItem.bmID"></v-text-field>
              </v-flex>
              <v-flex md3></v-flex>
            </v-layout>
            <v-layout row
                      align-end>
              <v-flex md3>
                <h5 class="text-md-right">排序号</h5>
              </v-flex>
              <v-flex md6>
                <v-text-field clearable
                              placeholder="默认排序号为1"
                              hide-details
                              :disabled="disabled"
                              v-model="folderItem.pxh"></v-text-field>
              </v-flex>
              <v-flex md3></v-flex>
            </v-layout>
            <v-layout row
                      align-end>
              <v-flex md3>
                <h5 class="text-md-right">创建时间</h5>
              </v-flex>
              <v-flex md6>
                <v-text-field placeholder="创建时间"
                              hide-details
                              disabled
                              v-model="folderItem.createdTime"></v-text-field>
              </v-flex>
              <v-flex md3></v-flex>
            </v-layout>
            <v-layout row
                      align-end>
              <v-flex md3>
                <h5 class="text-md-right">修改时间</h5>
              </v-flex>
              <v-flex md6>
                <v-text-field placeholder="修改时间"
                              hide-details
                              disabled
                              v-model="folderItem.modifiedTime"></v-text-field>
              </v-flex>
              <v-flex md3></v-flex>
            </v-layout>
            <v-layout row
                      align-end>
              <v-flex md3>
                <h5 class="text-md-right">创建者</h5>
              </v-flex>
              <v-flex md6>
                <!-- <v-subheader>Custom items</v-subheader> -->
                <v-text-field placeholder="创建者"
                              hide-details
                              disabled
                              v-model="folderItem.creator"></v-text-field>
              </v-flex>
              <v-flex md3></v-flex>
            </v-layout>
            <v-layout class="ma-1"
                      row
                      align-end>
              <small class="pa-3">* 表示必填项</small>
              <v-spacer></v-spacer>
              <v-btn v-if="!disabled"
                     flat
                     @click="cancel">取消</v-btn>
              <v-btn v-if="!disabled"
                     color="primary"
                     @click="save">
                保存
              </v-btn>
            </v-layout>
          </div>
        </v-widget>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
import VWidget from "@/components/VWidget";
import Util from '@/api/util';

export default {
  name: "directory-modification",
  components: {
    VWidget
  },
  data: () => ({
    activeFolderId: [],
    open: ['1'],
    tree: [],    //结合selectable属性，勾选的checkbox会出现在tree里面,20190322暂时没使用
    folderItems: [],
    folderItemsList: [],
    selectItems: [],
    selectItem: {
      id: undefined,
      name: undefined
    },
    disabled: true,
    formData: {
      name: 'test',
      num: 777,
      bmID: 777,
      creator: 'admin777',
      createdTime: '2011-11-11',
      pxh: 1,
    },
    folderItem: {
      id: undefined,
      name: undefined,
      bmID: undefined,
      creator: undefined,
      createdTime: undefined,
      modifiedTime: undefined,
      pxh: undefined,
      parentID: undefined,
      parentName: undefined
    }
  }),
  watch: {
    activeFolderId (val) {
      // console.log(this.activeFolderId);
      // console.log(val);
      if (val[0]) {
        let tmpItem = this.folderItemsList.find(v => { return v.id === val[0] });
        // console.log(JSON.stringify(tmpItem));
        if (tmpItem) {
          this.folderItem = tmpItem;
          this.selectItem = new Object({
            id: tmpItem.parentID,
            name: tmpItem.parentName
          });
        } else {
          this.showSnackbar("请在左侧选择目录项", "warning");
        }
      }

    }
  },
  created () {
    this.initialize()
  },
  methods: {
    showSnackbar (text, color) {
      this.snackbar = {
        show: true,
        text: text,
        color: color,
      };
      this.$emit("showSnackbar", this.snackbar);
    },
    initialize () {
      this.folderItems = [
        {
          id: '1',
          name: 'public',
          num: 133,
          bmID: 111,
          creator: 'admin',
          createdTime: '2019-03-22',
          modifiedTime: '2019-03-23',
          pxh: 1,
          children: [
            {
              id: '1-1',
              name: 'static',
              num: 4567,
              bmID: 111,
              creator: 'admin',
              createdTime: '2019-03-22',
              modifiedTime: '2019-03-23',
              pxh: 1,
              children: [{
                id: '1-1-1',
                name: 'logo.png',
                num: 1334,
                bmID: 111,
                creator: 'admin',
                createdTime: '2019-03-22',
                modifiedTime: '2019-03-23',
                pxh: 1
              },
              {
                id: '1-1-2',
                name: '.gitignore',
                num: 33,
                bmID: 111,
                creator: 'admin',
                createdTime: '2019-03-22',
                modifiedTime: '2019-03-23',
                pxh: 1,
                children: [
                  {
                    id: '1-1-2-1',
                    name: 'babel.config.js',
                    num: 88,
                    bmID: 111,
                    creator: 'admin',
                    createdTime: '2019-03-22',
                    modifiedTime: '2019-03-23',
                    pxh: 1
                  },
                  {
                    id: '1-1-2-2',
                    name: 'package.json',
                    num: 6789,
                    bmID: 111,
                    creator: 'admin',
                    createdTime: '2019-03-22',
                    modifiedTime: '2019-03-23',
                    pxh: 1
                  },
                  {
                    id: '1-1-2-3',
                    name: 'README.md',
                    num: 777,
                    bmID: 111,
                    creator: 'admin',
                    createdTime: '2019-03-22',
                    modifiedTime: '2019-03-23',
                    pxh: 1
                  }
                ]
              },
              {
                id: '1-1-3',
                name: 'babel.config.js',
                num: 88,
                bmID: 111,
                creator: 'admin',
                createdTime: '2019-03-22',
                modifiedTime: '2019-03-23',
                pxh: 1
              }]
            },
            {
              id: '1-2',
              name: 'favicon.ico',
              num: 0,
              bmID: 111,
              creator: 'admin',
              createdTime: '2019-03-22',
              modifiedTime: '2019-03-23',
              pxh: 1
            },
            {
              id: '1-3',
              name: 'index.html',
              num: 22,
              bmID: 111,
              creator: 'admin',
              createdTime: '2019-03-22',
              modifiedTime: '2019-03-23',
              pxh: 1,
              children: [
                {
                  id: '1-3-1',
                  name: 'vue.config.js',
                  num: 1331,
                  bmID: 111,
                  creator: 'admin',
                  createdTime: '2019-03-22',
                  modifiedTime: '2019-03-23',
                  pxh: 1
                },
                {
                  id: '1-3-2',
                  name: 'yarn.lock',
                  num: 2323,
                  bmID: 111,
                  creator: 'admin',
                  createdTime: '2019-03-22',
                  modifiedTime: '2019-03-23',
                  pxh: 1
                }
              ]
            },
            {
              id: '1-4',
              name: '.gitssssss',
              num: 10,
              bmID: 111,
              creator: 'admin',
              createdTime: '2019-03-22',
              modifiedTime: '2019-03-23',
              pxh: 1
            },
            {
              id: '1-5',
              name: 'node_modules',
              num: 100,
              bmID: 111,
              creator: 'admin',
              createdTime: '2019-03-22',
              modifiedTime: '2019-03-23',
              pxh: 1
            },
          ]
        }
      ];
      Util.getAllTreeItem(this.folderItems[0], 'null', 'null', this.folderItemsList);

      //构建下拉菜单选项
      for (let v of this.folderItemsList) {
        this.selectItems.push(new Object({
          id: v.id,
          name: v.name
        }));
      }
      // console.log(x);
      // console.log(this.selectItems);
    },
    save () {
      this.disabled = true;
    },
    cancel () {
      // console.log(this.btnShow);
      this.disabled = true;
    },
    addFolder () {

    },
    deleteFolder () {

    }
  }
}
</script>