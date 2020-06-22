<template>
  <div>
    <v-container grid-list-xl
                 fluid>
      <v-layout row
                wrap>
        <v-flex sm12
                md12>
          <v-widget title="审核和审核记录">
            <div slot="widget-content">
              <v-card-title>
                <v-btn color="primary"
                       @click.stop="auditDialogShow('批量审核')">
                  批量审核
                  <!-- <v-icon right>mdi-checkbox-multiple-marked-circle-outline</v-icon> -->
                  <v-icon right>mdi-check-all</v-icon>
                </v-btn>
                <v-dialog v-model="auditDialog"
                          max-width="400">
                  <v-card>
                    <v-card-title class="headline primary--text">{{auditTitle}}</v-card-title>
                    <v-card-text>
                      <v-textarea clearable
                                  auto-grow
                                  label="审核意见"
                                  outline
                                  v-model="suggestion"></v-textarea>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="grey"
                             flat
                             @click="auditRefuse">拒绝</v-btn>
                      <v-btn color="primary"
                             flat
                             @click="auditPass">通过</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-spacer></v-spacer>
                <v-text-field v-model="search"
                              append-icon="search"
                              label="Search"
                              single-line
                              hide-details></v-text-field>
              </v-card-title>
              <v-data-table v-model="selected"
                            :headers="headers"
                            :items="tableData"
                            :pagination.sync="pagination"
                            select-all
                            item-key="id"
                            :search="search"
                            :rows-per-page-items="rowsPerPage">
                <template v-slot:items="props">
                  <td>
                    <v-checkbox v-model="props.selected"
                                primary
                                hide-details>
                    </v-checkbox>
                  </td>
                  <td>{{ props.item.code }}</td>
                  <td>{{ props.item.resourceType }}</td>
                  <td>{{ props.item.requestPerson }}</td>
                  <td>{{ props.item.requestTime }}</td>
                  <td>{{ props.item.type }}</td>
                  <td :class="[props.item.auditResult=== '审核拒绝'? 'red--text' : '',props.item.auditResult=== '审核通过'? 'green--text' : '',props.item.auditResult==='等待审核'? 'warning--text' : '']">
                    {{ props.item.auditResult }}
                  </td>
                  <td>{{ props.item.auditPerson }}</td>
                  <td nowrap>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn flat
                               icon
                               class="ma-0"
                               color="info"
                               v-on="on"
                               @click="preview(props.item)">
                          <v-icon>mdi-file-eye-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>查看</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn flat
                               icon
                               class="ma-0"
                               color="success"
                               v-on="on"
                               :disabled="!(props.item.auditResult==='等待审核')"
                               @click.stop="auditDialogShow('审核',props.item)">
                          <!-- <v-icon>mdi-thumb-up-outline</v-icon> -->
                          <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>审核</span>
                    </v-tooltip>
                  </td>
                </template>
              </v-data-table>
              <v-dialog v-model="infoDialog"
                        max-width="1450px">
                <v-card>
                  <v-card-title class="headline info--text">查看审核信息</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-tabs>
                      <v-tab :key="1"
                             ripple>
                        基础信息
                      </v-tab>
                      <v-tab-item :key="1">
                        <v-card class="elevation-0">
                          <v-card-text>
                            <v-container class="pa-0"
                                         fluid
                                         grid-list-lg>
                              <v-layout wrap
                                        row>
                                <v-flex md3>
                                  <v-text-field v-model="info.code"
                                                label="编码"
                                                readonly
                                                hide-details></v-text-field>
                                </v-flex>
                                <v-flex md3>
                                  <v-text-field v-model="info.type"
                                                label="模型类型"
                                                readonly
                                                hide-details></v-text-field>
                                </v-flex>
                                <v-flex md3>
                                  <v-text-field v-model="info.name"
                                                label="中文名"
                                                readonly
                                                hide-details></v-text-field>
                                </v-flex>
                                <v-flex md3>
                                  <v-text-field v-model="info.enName"
                                                label="英文名"
                                                readonly
                                                hide-details></v-text-field>
                                </v-flex>
                                <v-flex md3>
                                  <v-text-field v-model="info.bmid"
                                                label="编目ID"
                                                readonly
                                                hide-details></v-text-field>
                                </v-flex>
                                <v-flex md3>
                                  <v-text-field v-model="info.createPerson"
                                                label="创建人"
                                                readonly
                                                hide-details></v-text-field>
                                </v-flex>
                                <v-flex md3>
                                  <v-text-field v-model="info.createTime"
                                                label="创建时间"
                                                readonly
                                                hide-details></v-text-field>
                                </v-flex>
                                <v-flex md3>
                                  <v-text-field v-model="info.updatePerson"
                                                label="更新人"
                                                readonly
                                                hide-details></v-text-field>
                                </v-flex>
                                <v-flex md3>
                                  <v-text-field v-model="info.updateTime"
                                                label="更新时间"
                                                readonly
                                                hide-details></v-text-field>
                                </v-flex>
                                <v-flex md3
                                        v-if="info.type==='表模型'">
                                  <v-text-field v-model="info.borned"
                                                label="是否落表"
                                                readonly
                                                hide-details></v-text-field>
                                </v-flex>
                                <v-flex md3
                                        v-if="info.type==='表模型'">
                                  <v-text-field v-model="info.bornCount"
                                                label="落表次数"
                                                readonly
                                                hide-details></v-text-field>
                                </v-flex>
                                <!-- <v-flex md3>
                                  <v-text-field v-model="info.registerStatus"
                                                label="注册状态"
                                                readonly
                                                hide-details></v-text-field>
                                </v-flex> -->
                                <v-flex md12>
                                  <div class="mb-1 grey--text caption">注册目录</div>
                                  <div class="grey lighten-4 py-1">{{info.categoryId}}</div>
                                </v-flex>
                                <v-flex md12>
                                  <v-textarea height="100"
                                              label="备注"
                                              v-model="info.description"
                                              hide-details
                                              outline
                                              readonly></v-textarea>
                                </v-flex>
                                <v-flex md12>
                                  <v-textarea height="100"
                                              label="审核意见"
                                              v-model="info.auditMessage"
                                              hide-details
                                              outline
                                              readonly></v-textarea>
                                </v-flex>
                              </v-layout>
                            </v-container>
                          </v-card-text>
                        </v-card>
                      </v-tab-item>
                      <v-tab :key="2"
                             ripple>
                        属性详情
                      </v-tab>
                      <v-tab-item :key="2">
                        <v-card class="elevation-0">
                          <v-card-text class="py-0">
                            <vue-perfect-scrollbar :settings="scrollSettings"
                                                   style="max-height:507px">
                              <v-data-table :headers="infoHeaders"
                                            :items="fields"
                                            hide-actions
                                            :pagination.sync="pagination2"
                                            item-key="code">
                                <template v-slot:headers="props1">
                                  <tr>
                                    <th v-for="header in props1.headers"
                                        :key="header.text"
                                        :class="['column sortable px-1 text-xs-left',pagination2.descending ? 'desc' : 'asc', header.value === pagination2.sortBy ? 'active' : '']"
                                        @click="changeSort(header.value,header.sortable)">
                                      {{ header.text }}
                                      <v-icon small>arrow_upward</v-icon>
                                    </th>
                                  </tr>
                                </template>
                                <template v-slot:items="props">
                                  <td class="px-1">未检测</td>
                                  <td class="px-1">{{ props.item.code }}</td>
                                  <td class="px-1">{{ props.item.enName }}</td>
                                  <td class="px-1">{{ props.item.name }}</td>
                                  <td class="px-1">{{ props.item.security }}</td>
                                  <td class="px-1">{{ props.item.definition }}</td>
                                  <td class="px-1">{{ props.item.type }}</td>
                                  <td class="px-1">{{ props.item.maxsize }}</td>
                                  <td class="px-1">{{ props.item.range }}</td>
                                  <td class="px-1">
                                    <v-checkbox v-model="props.item.required"
                                                hide-details
                                                readonly></v-checkbox>
                                  </td>
                                  <td class="px-1">
                                    <v-checkbox v-model="props.item.unique"
                                                hide-details
                                                readonly></v-checkbox>
                                  </td>
                                  <td class="px-1">{{ props.item.maxContains }}</td>
                                  <td class="px-1">{{ props.item.comments }}</td>
                                </template>
                              </v-data-table>
                              <v-divider></v-divider>
                            </vue-perfect-scrollbar>
                          </v-card-text>
                        </v-card>
                      </v-tab-item>
                    </v-tabs>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey"
                           flat
                           @click="infoDialog = false">关闭</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import VWidget from "@/components/VWidget";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

const categoryPath = (categoryId, categorys) => {
  let category = {};
  let categoryName = [];
  while (category) {
    // console.log(categorys);
    // console.log(categoryId);
    category = categorys.find(v => { return v.id === categoryId });
    if (category) {
      categoryName.push(category.name);
      categoryId = category.parentId;
    }
  }
  return categoryName;

};

export default {
  name: "registration-audit",
  components: {
    VWidget, VuePerfectScrollbar
  },
  data: () => ({
    auditDialog: false,
    selected: [],
    headers: [
      { text: "编码", value: "code" },
      { text: "类型", value: "resourceType" },
      { text: "申请提交者", value: "requestPerson" },
      { text: "申请提交时间", value: "requestTime" },
      { text: "申请操作", value: "type" },
      { text: "审核结果", value: "auditResult" },
      { text: "审核人", value: "auditPerson" },
      { text: "操作", sortable: false }
    ],
    tableData: [],
    rowsPerPage: [10, 25, 100, { text: '全部', value: -1 }],
    pagination: {
      rowsPerPage: 10, // -1 for All
      sortBy: 'requestTime',
      descending: true,
    },
    search: '',
    suggestion: '',
    auditTitle: '',
    singleAudit: undefined,
    infoDialog: false,
    info: {
      code: '12345678',
      name: '',
      enName: '',
      bmid: '',
      createPerson: '',
      createTime: '',
      updatePerson: '',
      updateTime: '',
      borned: '',
      bornCount: '',
      // registerStatus: '',
      categoryId: '',
      description: '',
      auditMessage: '',
      type: ''
    },
    categorys: [],
    scrollSettings: {
      maxScrollbarLength: 160
    },
    pagination2: {
      rowsPerPage: -1, // -1 for All
      sortBy: null,
    },
    changeSortNum: 0,
    infoHeaders: [
      { text: "标准检测", value: "actions" },
      { text: "编码", value: "code" },
      { text: "英文名", value: "enName" },
      { text: "中文名", value: "cnName" },
      { text: "密级", value: "secretLevel" },
      { text: "定义", value: "definition" },
      { text: "元数据类型", value: "type" },
      { text: "长度", value: "length" },
      { text: "值域", value: "range" },
      { text: "是否必填", value: "necessary" },
      { text: "是否唯一", value: "unique" },
      { text: "最大出现次数", value: "maxCount" },
      { text: "备注", value: "remarks" }
    ],
    fields: [],
    modelType: []
  }),
  watch: {
    auditDialog () {
      this.suggestion = '';
    }
  },
  created () {
    this.initialize();
  },
  methods: {
    changeSort (column, sortable) {
      if (!(sortable === false)) {
        if (this.pagination2.sortBy === column) {
          if (this.changeSortNum === 1) {
            this.pagination2.descending = !this.pagination2.descending
            this.changeSortNum = 2;
          } else {
            this.pagination2.sortBy = null;
          }
        } else {
          this.changeSortNum = 1;
          this.pagination2.sortBy = column;
          this.pagination2.descending = false;
        }
      }
    },
    // changeSort (column) {
    //   if (this.pagination2.sortBy === column) {
    //     this.pagination2.descending = !this.pagination2.descending
    //   } else {
    //     this.pagination2.sortBy = column
    //     this.pagination2.descending = false
    //   }
    // },
    // changeSort (column, sortable, tmp_pagination) {
    //   console.log(this.pagination2);
    //   if (!(sortable === false)) {
    //     if (tmp_pagination.sortBy === column) {
    //       if (this.changeSortNum === 1) {
    //         tmp_pagination.descending = !tmp_pagination.descending;
    //         this.changeSortNum = 2;
    //       } else {
    //         tmp_pagination.sortBy = null;
    //       }
    //     } else {
    //       // console.log(tmp_pagination.sortBy);
    //       this.changeSortNum = 1;
    //       tmp_pagination.sortBy = column;
    //       tmp_pagination.descending = false;
    //     }
    //   }
    // },
    showSnackbar (text, color) {
      this.snackbar = {
        show: true,
        text: text,
        color: color,
      };
      this.$emit("showSnackbar", this.snackbar);
      // console.log(this.snackbar);
    },
    initialize () {
      this.modelType[0] = '表模型';
      this.modelType[21] = '实时数据模型';
      this.modelType[31] = '原始数据模型';

      this.tableData = new Array();
      const _this = this;
      this.axios.post('/ywsjglprj/audit/getRegisterInfo')
        .then(function (response) {
          if (response.data.resultCode === 'RESULT_SUCCESS') {
            // console.log(response.data.data);
            // _this.tableData = response.data.data;
            for (let v of response.data.data) {
              let content = JSON.parse(v.resourceContent);
              if (v.auditResult === '')
                v.auditResult = '等待审核';
              _this.tableData.push(new Object({
                id: v.id,
                code: content.code,
                resourceType: v.resourceType,
                requestPerson: v.requestPerson,
                requestTime: v.requestTime,
                type: v.type,
                auditResult: v.auditResult,
                auditPerson: v.auditPerson,
                modelInfo: content,
                auditMessage: v.auditMessage
              }));
            }
            // console.log(_this.tableData);
          } else {
            _this.showSnackbar("200OK，内部服务错误：" + response.data.message, "error");
          }
        })
        .catch(function (error) {
          console.log(error);
        });

      this.axios.get('/ywsjglprj/category/getAllCategorys')
        .then(function (response) {
          // console.log(response);
          if (response.data.resultCode === 'RESULT_SUCCESS') {
            // console.log(response.data.data);
            _this.categorys = response.data.data;
            // _this.folderItems = [builtTreeJSON(response.data.data)];
            // _this.folderItemsArray = response.data.data;
            // _this.open = ['0'];
            // console.log(_this.folderItems);
          } else {
            _this.showSnackbar("200OK，数据服务内部错误：" + response.data.message, "error");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    auditDialogShow (state, item) {
      this.auditTitle = state;
      if (state === '审核') {
        this.auditDialog = true;
        this.singleAudit = item;
        // console.log(this.singleAudit);
      } else {
        this.singleAudit = undefined;
        if (this.selected.length === 0) {
          this.auditDialog = false;
          this.showSnackbar("请选择“等待审核”的模型", "warning");
        }
        else {
          // this.deleteDialog = true;
          let len = 0;
          for (let value of this.selected) {
            if (value.auditResult === '等待审核') {
              len++;
            }
          }
          if (len === this.selected.length) {
            this.auditDialog = true;
          }
          else {
            this.showSnackbar("只能选择“等待审核”的模型", "warning");
          }
        }
      }

    },
    auditPass () {
      let audit = {};
      audit.message = this.suggestion;
      audit.requestIdList = new Array();
      if (this.auditTitle === '审核') {
        audit.requestIdList.push(this.singleAudit.id);
      } else {
        for (let value of this.selected) {
          audit.requestIdList.push(value.id);
        }
      }
      const _this = this;
      this.axios.post('/ywsjglprj/audit/batchAgree', JSON.stringify(audit))
        .then(function (response) {
          // console.log(response.data.data);
          if (response.data.resultCode === 'RESULT_SUCCESS') {
            let index;
            if (_this.auditTitle === '审核') {
              index = _this.tableData.indexOf(_this.singleAudit);
              _this.tableData[index].auditResult = '审核通过';
              _this.auditDialog = false;
              _this.showSnackbar("审核通过", "success");
            } else {
              for (let value of _this.selected) {
                value.auditResult = '审核通过';
                // console.log(value);
              }
              _this.auditDialog = false;
              _this.showSnackbar("批量审核通过", "success");
            }
          } else {
            _this.showSnackbar("200OK，数据服务内部错误：" + response.data.data[0], "error");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    auditRefuse () {
      let audit = {};
      audit.message = this.suggestion;
      audit.requestIdList = new Array();
      if (this.auditTitle === '审核') {
        audit.requestIdList.push(this.singleAudit.id);
      } else {
        for (let value of this.selected) {
          audit.requestIdList.push(value.id);
        }
      }
      const _this = this;
      this.axios.post('/ywsjglprj/audit/batchReject', JSON.stringify(audit))
        .then(function (response) {
          // console.log(response.data.data);
          if (response.data.resultCode === 'RESULT_SUCCESS') {
            let index;
            if (_this.auditTitle === '审核') {
              index = _this.tableData.indexOf(_this.singleAudit);
              _this.tableData[index].auditResult = '审核拒绝';
              _this.auditDialog = false;
              _this.showSnackbar("审核拒绝", "success");
            } else {
              for (let value of _this.selected) {
                value.auditResult = '审核拒绝';
                // console.log(value);
              }
              _this.auditDialog = false;
              _this.showSnackbar("批量审核拒绝", "success");
            }
          } else {
            _this.showSnackbar("200OK，数据服务内部错误：" + response.data.data[0], "error");
          }
        })
        .catch(function (error) {
          console.log(error);
        });


    },
    preview (info) {
      this.infoDialog = true;
      console.log(info);
      this.info.code = info.code;
      this.info.type = this.modelType[info.modelInfo.type];
      this.info.name = info.modelInfo.name;
      this.info.enName = info.modelInfo.enName;
      this.info.bmid = info.modelInfo.bmid;
      this.info.createPerson = info.modelInfo.createPerson;
      // console.log((info.modelInfo.createTime.year + 1900).toString());
      if (info.modelInfo.createTime) {
        this.info.createTime = (info.modelInfo.createTime.year + 1900).toString() + '-' + info.modelInfo.createTime.month + '-'
          + info.modelInfo.createTime.date + ' ' + info.modelInfo.createTime.hours + ':' + info.modelInfo.createTime.minutes
          + ':' + info.modelInfo.createTime.seconds;
      } else {
        this.info.createTime = '';
      }
      this.info.updatePerson = info.modelInfo.updatePerson;
      // console.log(info.modelInfo);
      if (info.modelInfo.updateTime) {
        this.info.updateTime = (info.modelInfo.updateTime.year + 1900).toString() + '-' + info.modelInfo.updateTime.month + '-'
          + info.modelInfo.updateTime.date + ' ' + info.modelInfo.updateTime.hours + ':' + info.modelInfo.updateTime.minutes
          + ':' + info.modelInfo.updateTime.seconds;
      } else {
        this.info.updateTime = '';
      }
      this.info.borned = info.modelInfo.borned;
      this.info.bornCount = info.modelInfo.bornCount;
      // this.info.registerStatus = info.modelInfo.registerStatus;
      let path = categoryPath(info.modelInfo.categoryId, this.categorys);
      let pathString = '';
      while (path.length > 0) {
        pathString = pathString + path.pop() + '\xa0\xa0>\xa0\xa0';
      }
      this.info.categoryId = pathString.slice(0, -5);
      this.info.description = info.modelInfo.description;
      this.info.auditMessage = info.auditMessage;
      // console.log(info.modelInfo.fields);
      this.fields = new Array();
      this.fields = info.modelInfo.fields;
    }
  }
}
</script>

<style>
</style>