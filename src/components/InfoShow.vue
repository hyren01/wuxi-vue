<template>
  <div>
    <div v-if="showArray.length===0">
      <div style="padding-top: 20px">
        <p>
          <v-icon size="18">mdi-information</v-icon>&nbsp;&nbsp;没有找到符合条件的数据资源</p>
        <p style="margin-bottom: 20px">
          <v-icon size="18">mdi-information</v-icon>&nbsp;&nbsp;请更换查找条件</p>
        <v-divider></v-divider>
      </div>
    </div>
    <div v-else>
      <div v-for="(item) in showArray"
           :key="item.id"
           @mouseenter="mouseOver(item)"
           @mouseleave="mouseOut(item)"
           :class="['px-1',{ 'grey lighten-4': item.mouseOn }]">
        <div class="pt-3">
          <a href="javascript:void(0)"
             style="font-size: 18px;text-decoration:none;"
             class="pink--text"
             @click="getTableInfo(item)">{{item.code}}</a>
        </div>
        <v-layout row
                  wrap
                  class="pb-2 pt-2">
          <v-flex md2
                  class="py-0 pr-1 grey--text text--darken-2">
            <v-icon size="18">mdi-shape</v-icon> 类型：
            <span style="color:#111111">{{item.type}}</span>
          </v-flex>
          <v-flex md2
                  class="py-0 px-1 grey--text text--darken-2">
            <v-icon size="18">mdi-account</v-icon> 所有者：
            <span style="color:#111111">{{item.createPerson}}</span>
          </v-flex>
          <v-flex md2
                  class="py-0 px-1 grey--text text--darken-2">
            <v-icon size="18">mdi-database</v-icon> 数据源类型：
            <span style="color:#111111">{{item.dbtype}}</span>
          </v-flex>
          <v-flex md3
                  class="py-0 px-1 grey--text text--darken-2">
            <v-icon size="18">mdi-clock-outline</v-icon> 创建时间：
            <span style="color:#111111">{{item.createTime}}</span>
          </v-flex>
          <v-flex md3
                  class="py-0 pl-1 grey--text text--darken-2">
            <v-icon size="18">mdi-clock</v-icon> 更新时间：
            <span style="color:#111111">{{item.updateTime}}</span>
          </v-flex>
        </v-layout>
        <div class="py-1 grey--text text--darken-2">
          <v-icon size="18">mdi-file-document-box-multiple</v-icon> 描述：
          <span style="color:#111111">{{item.description}}</span>
        </div>
        <div class="mb-2 grey--text text--darken-2"
             style="height:32px;line-height:32px">
          <span>
            <v-icon size="18">mdi-tag</v-icon> 标签：
            <v-chip v-for="(item1) in item.systemLabel"
                    :key="item1.id"
                    label
                    color="info"
                    small
                    text-color="white"
                    selected>{{item1.label_name}}</v-chip>
            <!-- <v-chip v-for="(item2,index2) in item.userLabel" -->
            <v-chip v-for="(item2) in item.userLabel"
                    :key="item2.id"
                    @input="deleteLabelDialog(item.id,item2)"
                    label
                    color="success"
                    small
                    text-color="white"
                    selected
                    close>{{item2.label_name}}</v-chip>
          </span>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn flat
                     icon
                     class="ma-0"
                     color="pink"
                     v-on="on"
                     @click.stop="addLabelDialog(item.id)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>添加用户标签</span>
          </v-tooltip>
        </div>
        <v-divider></v-divider>
      </div>
      <v-dialog v-model="deleteDialog"
                max-width="400">
        <v-card>
          <v-card-title class="headline error--text">确认删除</v-card-title>
          <v-card-text>确实要删除标签 “{{deleteText}}” 吗？</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey"
                   flat
                   @click="deleteDialog = false">取消</v-btn>
            <v-btn color="error"
                   flat
                   @click="deleteLabel">删除</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="addDialog"
                max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline success--text">添加标签</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form1"
                    lazy-validation
                    v-model="form1Value">
              <v-container grid-list-md
                           fluid>
                <v-layout row
                          wrap>
                  <v-flex md12>
                    <v-select :items="typeSelect"
                              label="标签类型 *"
                              :rules="[rules.required]"
                              v-model="labelType"></v-select>
                  </v-flex>
                  <v-flex md12>
                    <v-select :items="nameSelect"
                              label="标签名称 *"
                              :rules="[rules.required]"
                              v-model="labelName"
                              item-text="label_name"
                              item-value="label_id"
                              return-object></v-select>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <small class="ml-4">* 表示必填项</small>
            <v-spacer></v-spacer>
            <v-btn color="grey"
                   flat
                   @click="addDialog=false">取消</v-btn>
            <v-btn color="success"
                   flat
                   @click="addLabel">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- <v-layout justify-center> -->
      <div style="text-align:center"
           class="pt-3">
        <v-pagination v-model="page"
                      :length="pageCount"
                      :total-visible="7"></v-pagination>
      </div>
      <!-- </v-layout> -->
    </div>
  </div>

</template>

<script>

// const findLabel = (labelArray, label) => {
//   for (let v1 of labelArray) {
//     for (let v2 of v1.list_items) {
//       if (v2.id === label.id) {
//         // console.log('find');
//         // console.log(v2,label);
//         return v2;
//       }
//     }
//   }
// };

export default {
  name: "info-show",
  props: {
    dataArray: {
      type: Array,
      required: true
    },
    numPerPage: {
      type: Number,
      required: false,
      default: 10
    },
    search: {
      type: String,
      required: false,
      default: ''
    },
  },
  data () {
    return {
      showArray: [],
      page: 1,
      pageCount: 1,
      deleteDialog: false,
      deleteText: '',
      deleteId1: '',
      deleteId2: '',
      addId1: '',
      addDialog: false,
      form1Value: true,
      rules: {
        required: value => !!value || "该项不能为空！"
      },
      labelType: '',
      labelName: {},
      typeSelect: [],
      nameSelect: [],
    }
  },
  // beforeCreate () {
  //   this.pageCount = Math.ceil(this.dataArray.length / this.numPerPage);
  // },
  // mounted () {
  //   console.log(this.dataArray.length);
  //   this.pageCount = Math.ceil(this.dataArray.length / this.numPerPage);
  // },
  // updated () {
  //   console.log(this.dataArray.length);
  //   this.pageCount = Math.ceil(this.dataArray.length / this.numPerPage);
  // },
  created () {
    this.pageChange();    //初始化工作实际最后是在watch：dataArray的变化里面完成的，这里只有在调试热加载的时候才会单独调用
    this.initialize();
    // console.log('this.dataArray.length ： ' + this.dataArray.length);
    // console.log(this.dataArray.length);
  },
  watch: {
    page (val) {
      this.pageChange();
    },
    dataArray (val) {
      // console.log('this.dataArray.length ： ' + this.dataArray.length);
      this.page = 1;
      this.pageChange();
      this.initialize();
    },
    labelType () {
      // console.log('labelType');
      const _this = this;
      this.axios.post('/ywsjglprj/label_api/label/classification', JSON.stringify({ classification: this.labelType }))
        .then(function (response) {
          // console.log(response.data);
          _this.nameSelect = response.data;
        })
        .catch(function (error) {
          console.log(error);
          _this.showSnackbar('REST服务失败，未获取标签', 'error');
        });
    },
  },
  computed: {
    // chipIndex () {
    //   return 0;
    // },
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
      // console.log(this.dataArray.length);
      // this.pageCount = this.dataArray.length;
      this.pageCount = Math.ceil(this.dataArray.length / this.numPerPage);
    },
    pageChange () {
      this.showArray = new Array();
      let tmpNum = 0;
      if (this.dataArray.length - (this.numPerPage * (this.page - 1)) > this.numPerPage) {
        tmpNum = this.numPerPage;
      } else {
        tmpNum = this.dataArray.length - (this.numPerPage * (this.page - 1));
      }
      for (let i = this.numPerPage * (this.page - 1); i < this.numPerPage * (this.page - 1) + tmpNum; i++) {
        // console.log(this.dataArray[i].labelList);
        let tmpSystemLabel = new Array();
        let tmpUserLabel = new Array();
        for (let v of this.dataArray[i].labelList) {
          if (v.create_person === 'system') {
            tmpSystemLabel.push(v);
          } else {
            tmpUserLabel.push(v);
          }
        }
        this.showArray.push(new Object({
          id: this.dataArray[i].id,
          code: this.dataArray[i].code,
          type: this.dataArray[i].type,
          dbtype: this.dataArray[i].dbtype,
          createPerson: this.dataArray[i].createPerson,
          createTime: this.dataArray[i].createTime,
          updateTime: this.dataArray[i].updateTime,
          description: this.dataArray[i].description,
          systemLabel: tmpSystemLabel,
          userLabel: tmpUserLabel,
          mouseOn: false
        }));
      }
      // console.log(this.dataArray);
    },
    mouseOver (item) {
      // console.log(item);
      item.mouseOn = true;
    },
    mouseOut (item) {
      // console.log(item);
      item.mouseOn = false;
    },
    deleteLabelDialog (id1, item) {
      // console.log('deleteLabel-', id1, '-', item.label_id);
      this.deleteDialog = true;
      this.deleteText = item.label_name;
      this.deleteId1 = id1;
      this.deleteId2 = item.label_id;
    },
    deleteLabel () {
      // console.log(this.deleteId1, '-', this.deleteId2);
      this.deleteDialog = false;
      let deleteData = new Object({
        tableItems: [this.deleteId1],
        label: [this.deleteId2]
      });
      // console.log(JSON.stringify(deleteData));
      // console.log(this.showArray);
      const _this = this;
      this.axios.delete('/ywsjglprj/label_api/label_relation', { data: JSON.stringify(deleteData) })
        .then(function (response) {
          let index = _this.showArray.findIndex(v => { return v.id === _this.deleteId1 });
          let index2 = _this.showArray[index].userLabel.findIndex(v => { return v.label_id === _this.deleteId2 });
          _this.showArray[index].userLabel.splice(index2, 1);
          // console.log(index);
          _this.showSnackbar('用户标签删除成功', 'success');
        })
        .catch(function (error) {
          console.log(error);
          _this.showSnackbar('REST服务失败，无法删除', 'error');
        });
    },
    addLabelDialog (id1) {
      this.$refs.form1.resetValidation();
      this.addDialog = true;
      this.labelType = '';
      this.addId1 = id1;
      // console.log(this.addId1);
      const _this = this;
      this.axios.get('/ywsjglprj/label_api/label/type')
        .then(function (response) {
          // console.log(response.data);
          _this.typeSelect = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    addLabel () {
      if (this.$refs.form1.validate()) {
        this.addDialog = false;

        let addData = new Object({
          tableItems: [this.addId1],
          label: [this.labelName.label_id]
        });
        // console.log(this.labelName);
        const _this = this;
        this.axios.post('/ywsjglprj/label_api/label_relation', JSON.stringify(addData))
          .then(function (response) {
            let index = _this.showArray.findIndex(v => { return v.id === _this.addId1 });
            _this.showArray[index].userLabel.push(_this.labelName);
            // console.log(_this.showArray[index].userLabel);
            _this.showSnackbar('用户标签添加成功', 'success');
          })
          .catch(function (error) {
            console.log(error);
            _this.showSnackbar('REST服务失败，无法添加', 'error');
          });
      }
    },
    getTableInfo (item) {
      // console.log(item);
      this.$router.push({
        // path: '/model/mv/mi',
        name: 'table-info2',
        query: {
          table_id: item.id,
          code: item.code,
          type: item.type
        }
      });
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>