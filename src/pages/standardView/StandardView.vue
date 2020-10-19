<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12 md3 xl3>
        <v-widget title="标准目录">
          <div slot="widget-content">
            <v-treeview
              style="cursor:pointer"
              v-model="newtree"
              :open.sync="open"
              :items="newfolderItems"
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
                <div :title="item.name" @click="newonSelect(item)">{{ item.name }}</div>
              </template>
            </v-treeview>
          </div>
        </v-widget>
      </v-flex>
      <v-flex sm12 md9 xl9>
        <v-widget :title="widgetTitle">
          <div slot="widget-content">
            <v-card-title>
              <v-btn color="primary" @click.stop="modelDialogShow">
                新增标准
                <v-icon right>mdi-plus</v-icon>
              </v-btn>
              <v-btn
                color="error"
                @click.stop="
                  deleteDialogShow('确认批量删除', '确实要删除这些标准吗？')
                "
              >
                批量删除
                <v-icon right>mdi-delete-forever</v-icon>
              </v-btn>

              <!-- <v-btn color="primary" @click.stop="addToDbModel = true">
                导入数据库
                <v-icon right>mdi-plus</v-icon>
              </v-btn>-->
              <v-btn color="primary" @click="exportToExcel">
                excel模板下载
                <v-icon right>mdi-plus</v-icon>
              </v-btn>
              <Upload
                style="position:relative;top:3px;"
                :uploadButton="'upload'"
                url="/stdglprj/newstandard/importStandard"
                :defaultList="defaultList"
                @on-complete="uploadComplete"
                @on-error="uploadError"
                :icon="'md-cloud-upload'"
                :customerBtn="true"
                :btnTxt="'excel导入'"
                :token="parenttoken"
              />
              <v-btn color="info" @click="exportToExcel2">导出标准</v-btn>
              <v-dialog v-model="addToDbModel" max-width="500">
                <v-widget title="选择数据库">
                  <div slot="widget-content">
                    <v-layout wrap align-center>
                      <v-flex sm3 md3 xl3></v-flex>
                      <v-flex xs9 sm6 d-flex>
                        <v-select v-model="dbType" :items="dbTypes" label="DB"></v-select>
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                      <v-flex sm6 md6 xl6></v-flex>
                      <v-flex sm6 md6 xl6>
                        <v-btn
                          color="success"
                          style="float:right"
                          @click="confirmAddToDbButton()"
                        >确定</v-btn>
                        <v-btn flat @click="addToDbModel = false" style="float:right">取消</v-btn>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-widget>
              </v-dialog>

              <!-- 模态框 -->
              <v-dialog v-model="modelDialog" max-width="1450px" persistent>
                <v-stepper v-model="stepVal">
                  <v-stepper-header flat class="elevation-0">
                    <v-stepper-step :complete="stepVal > 1" step="1">建模步骤 1</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="2">建模步骤 2</v-stepper-step>
                  </v-stepper-header>
                  <v-divider></v-divider>
                  <v-stepper-items>
                    <v-stepper-content step="1">
                      <div class="mb-2">
                        <span class="headline">{{ formTitle }}&nbsp;:&nbsp;填写标准基本信息</span>
                      </div>
                      <div style="margin-bottom:80px">
                        <v-form ref="form" lazy-validation>
                          <v-container fluid>
                            <v-layout wrap row>
                              <v-flex md4>
                                <v-text-field
                                  clearable
                                  :rules="[rules.cnName]"
                                  v-model="editedItem.cnName"
                                  label="标准中文名称 *"
                                ></v-text-field>
                              </v-flex>
                              <v-flex md4>
                                <v-text-field
                                  clearable
                                  v-model="editedItem.enName"
                                  :rules="[rules.enName]"
                                  label="标准英文名称 *"
                                ></v-text-field>
                              </v-flex>
                              <v-flex md4>
                                <v-text-field
                                  clearable
                                  :rules="[rules.code]"
                                  v-model="editedItem.code"
                                  label="短名 *"
                                ></v-text-field>
                              </v-flex>
                              <v-flex md4>
                                <v-text-field clearable label="定义" v-model="editedItem.description"></v-text-field>
                              </v-flex>
                              <v-flex md4>
                                <v-layout wrap>
                                  <v-flex md12>
                                    <div class="mb-3 grey--text">标准目录 *</div>
                                    <!-- <v-select> -->
                                    <!-- <v-input style="overflow: auto"> -->
                                    <!-- <div style="max-height:50px;overflow-y:auto;" > -->
                                    <TreeSelect
                                      :default-expand-level="1"
                                      placeholder="请选择目录"
                                      :normalizer="normalizer"
                                      :options="treeData"
                                      v-model="category_id"
                                      :clearable="false"
                                    />
                                    <!-- </div> -->
                                    <!-- </v-select> -->
                                    <!-- </v-input> -->
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                            <small>* 表示必填项</small>
                          </v-container>
                        </v-form>
                      </div>
                      <v-layout row wrap>
                        <v-btn color="primary" @click="next1">下一步</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn flat @click="close">取消</v-btn>
                      </v-layout>
                    </v-stepper-content>
                    <v-stepper-content step="2">
                      <div class="mb-2">
                        <span class="headline">{{ formTitle }}&nbsp;:&nbsp;创建标准属性</span>
                      </div>
                      <v-card-title>
                        <v-btn @click="addProperty">
                          新增属性
                          <v-icon right>add</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-text-field
                          v-model="search"
                          append-icon="search"
                          label="Search"
                          single-line
                          hide-details
                        ></v-text-field>
                      </v-card-title>
                      <vue-perfect-scrollbar
                        :settings="scrollSettings"
                        style="max-height:402px;margin-bottom:20px"
                      >
                        <v-data-table
                          :headers="propertyHeaders"
                          :items="editedItem.property"
                          hide-actions
                          :pagination.sync="pagination2"
                          :search="search"
                        >
                          <template v-slot:headers="props1">
                            <tr>
                              <th
                                v-for="header in props1.headers"
                                :key="header.text"
                                :class="[
                                  'column sortable px-1 text-xs-left',
                                  pagination2.descending ? 'desc' : 'asc',
                                  header.value === pagination2.sortBy
                                    ? 'active'
                                    : '',
                                ]"
                                @click="
                                  changeSort(header.value, header.sortable)
                                "
                              >
                                {{ header.text }}
                                <v-icon small>arrow_upward</v-icon>
                              </th>
                            </tr>
                          </template>
                          <template v-slot:items="props">
                            <td class="px-1">
                              <v-edit-dialog lazy>
                                {{ props.index + 1 }}
                                <template v-slot:input>
                                  <v-text-field clearable v-model="props.index"></v-text-field>
                                </template>
                              </v-edit-dialog>
                            </td>
                            <td class="px-1">
                              <v-edit-dialog lazy>
                                {{ props.item.cnName }}
                                <template v-slot:input>
                                  <v-text-field clearable v-model="props.item.cnName"></v-text-field>
                                </template>
                              </v-edit-dialog>
                            </td>
                            <td class="px-1">
                              <v-edit-dialog lazy>
                                {{ props.item.enName }}
                                <template v-slot:input>
                                  <v-text-field clearable v-model="props.item.enName"></v-text-field>
                                </template>
                              </v-edit-dialog>
                            </td>

                            <td class="px-1">
                              <v-edit-dialog lazy>
                                {{ props.item.code }}
                                <template v-slot:input>
                                  <v-text-field clearable v-model="props.item.code"></v-text-field>
                                </template>
                              </v-edit-dialog>
                            </td>

                            <td class="px-1">
                              <v-edit-dialog lazy>
                                {{ props.item.defination }}
                                <template v-slot:input>
                                  <v-text-field clearable v-model="props.item.defination"></v-text-field>
                                </template>
                              </v-edit-dialog>
                            </td>
                            <!-- 数据类型 -->
                            <td style="width:30px" class="px-1">
                              <v-select :items="selectItems2" v-model="props.item.type" small-chips></v-select>
                            </td>
                            <!-- 长度 -->
                            <td style="width:30px" class="px-1">
                              <v-edit-dialog lazy>
                                {{ props.item.maxsize }}
                                <template v-slot:input>
                                  <v-text-field clearable v-model="props.item.maxsize"></v-text-field>
                                </template>
                              </v-edit-dialog>
                            </td>
                            <!-- 值域 -->
                            <td class="px-1">
                              <v-edit-dialog lazy>
                                {{ props.item.range }}
                                <template v-slot:input>
                                  <v-text-field clearable v-model="props.item.range"></v-text-field>
                                </template>
                              </v-edit-dialog>
                            </td>
                            <!-- 约束条件 -->
                            <td class="px-1">
                              <v-checkbox v-model="props.item.required" hide-details></v-checkbox>
                            </td>
                            <!-- 最大出现次数 -->
                            <td class="px-1">
                              <v-edit-dialog lazy>
                                {{ props.item.maxCount }}
                                <template v-slot:input>
                                  <v-text-field clearable v-model="props.item.maxCount"></v-text-field>
                                </template>
                              </v-edit-dialog>
                            </td>
                            <td class="px-1">
                              <v-edit-dialog lazy>
                                {{ props.item.comments }}
                                <template v-slot:input>
                                  <v-text-field clearable v-model="props.item.comments"></v-text-field>
                                </template>
                              </v-edit-dialog>
                            </td>
                            <!-- 操作 -->
                            <td class="px-1">
                              <v-icon small @click="deleteProperty(props.index)">delete</v-icon>
                            </td>
                          </template>
                        </v-data-table>
                        <v-divider></v-divider>
                      </vue-perfect-scrollbar>
                      <small>* 表示必填项</small>
                      <v-layout row wrap>
                        <v-btn color="primary" @click="stepVal = 1">上一步</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn flat @click="close">取消</v-btn>
                        <v-btn color="success" @click="finish">完成</v-btn>
                      </v-layout>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
              </v-dialog>
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
                    <v-btn color="error" flat @click="deleteMutipleItem">删除</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- 查看历史版本模态框 -->
              <v-dialog v-model="historyDialog" max-width="1000">
                <v-widget title="查看历史">
                  <div slot="widget-content">
                    <v-data-table
                      :headers="historyheaders"
                      :items="historytable"
                      class="elevation-1"
                      :pagination.sync="pagination"
                    >
                      <template v-slot:items="historytable">
                        <td class="text-xs-left">{{ historytable.index + 1 }}</td>
                        <td class="text-xs-left">{{ historytable.item.code }}</td>
                        <td class="text-xs-left">{{ historytable.item.name }}</td>
                        <td class="text-xs-left">{{ historytable.item.enName }}</td>
                        <!-- <td class="text-xs-left"> {{ historytable.item.updatePerson }} </td> -->
                        <td class="text-xs-left">{{ historytable.item.updateTime }}</td>
                        <td class="text-xs-left">{{ historytable.item.version }}</td>
                        <td class="text-xs-left">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                flat
                                icon
                                class="ma-0"
                                color="info"
                                v-on="on"
                                @click="previewhis(historytable.item)"
                              >
                                <v-icon>mdi-file-eye-outline</v-icon>
                              </v-btn>
                            </template>
                            <span>查看</span>
                          </v-tooltip>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                flat
                                icon
                                class="ma-0"
                                color="info"
                                v-on="on"
                                @click="activeted(historytable.item)"
                              >
                                <v-icon>mdi-mouse</v-icon>
                              </v-btn>
                            </template>
                            <span>激活</span>
                          </v-tooltip>
                        </td>
                      </template>
                    </v-data-table>
                    <v-layout row wrap>
                      <v-flex sm6 md6 xl6></v-flex>
                      <v-flex sm6 md6 xl6>
                        <v-btn color="success" style="float:right" @click="handlesave()">确定</v-btn>
                        <v-btn flat @click="historyDialog = false" style="float:right">取消</v-btn>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-widget>
              </v-dialog>
              <!-- 详细信息模态框 -->
              <v-dialog v-model="modelDialog2" max-width="1450px">
                <v-widget title="详细信息">
                  <div slot="widget-content">
                    <v-data-table
                      :headers="headers1"
                      :items="reData3"
                      class="elevation-1"
                      :pagination.sync="pagination"
                    >
                      <template v-slot:items="reData3">
                        <td>{{ reData3.item.code }}</td>
                        <td>{{ reData3.item.enName }}</td>
                        <td>{{ reData3.item.name }}</td>
                        <td>{{ reData3.item.defination }}</td>
                        <td>{{ reData3.item.type }}</td>
                        <td>{{ reData3.item.maxsize }}</td>
                        <td>{{ reData3.item.range }}</td>
                        <td>
                          <v-checkbox
                            true-value="O"
                            false-value="o"
                            v-model="reData3.item.required"
                            hide-details
                            readonly
                          ></v-checkbox>
                        </td>
                        <td>{{ reData3.item.maxContains }}</td>
                        <td>{{ reData3.item.comments }}</td>
                      </template>
                    </v-data-table>
                    <v-layout row wrap>
                      <v-flex sm6 md6 xl6></v-flex>
                      <v-flex sm6 md6 xl6>
                        <v-btn flat @click="handlecancel3" style="float:right">返回</v-btn>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-widget>
              </v-dialog>
              <!-- 查看历史失效版本标准模态框 -->
              <v-dialog v-model="historyDialog2" max-width="1450px">
                <v-widget title="失效版本标准">
                  <div slot="widget-content">
                    <!-- 复用型表格 要有操作 -->
                    <v-data-table
                      :headers="headers2"
                      :items="reData2"
                      class="elevation-1"
                      :pagination.sync="pagination"
                      v-if="
                        this.modelInfo.standardField &&
                          this.modelInfo.standardField.length == 0
                      "
                    >
                      <template v-slot:items="reData2">
                        <td>{{ reData2.item.objCname }}</td>
                        <td>{{ reData2.item.objEname }}</td>
                        <td>{{ reData2.item.shortName }}</td>
                        <td>{{ reData2.item.objDefined }}</td>
                        <td>{{ reData2.item.remark }}</td>
                        <td>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                flat
                                icon
                                class="ma-0"
                                color="info"
                                v-on="on"
                                @click="preview2(reData2.item)"
                              >
                                <v-icon>mdi-file-eye-outline</v-icon>
                              </v-btn>
                            </template>
                            <span>查看</span>
                          </v-tooltip>
                        </td>
                      </template>
                    </v-data-table>
                    <!-- 不是复用型表格 -->
                    <v-data-table
                      :headers="headers1"
                      :items="tableData1"
                      class="elevation-1"
                      v-if="
                        this.modelInfo.standardField &&
                          this.modelInfo.standardField.length != 0
                      "
                      :pagination.sync="pagination1"
                      hide-actions
                    >
                      <template v-slot:headers="props1">
                        <tr>
                          <th
                            v-for="header in props1.headers"
                            :key="header.text"
                            :class="[
                              'column sortable px-1 text-xs-left',
                              pagination1.descending ? 'desc' : 'asc',
                              header.value === pagination1.sortBy
                                ? 'active'
                                : '',
                            ]"
                            @click="
                              changeSort(
                                header.value,
                                header.sortable,
                                pagination1
                              )
                            "
                          >
                            {{ header.text }}
                            <v-icon small>arrow_upward</v-icon>
                          </th>
                        </tr>
                      </template>
                      <template v-slot:items="props">
                        <td class="px-1">{{ props.item.code }}</td>
                        <td class="px-1">{{ props.item.enName }}</td>
                        <td class="px-1">{{ props.item.name }}</td>
                        <td class="px-1">{{ props.item.defination }}</td>
                        <td class="px-1">{{ props.item.type }}</td>
                        <td class="px-1">{{ props.item.maxsize }}</td>
                        <td class="px-1">{{ props.item.range }}</td>
                        <td class="px-1">
                          <v-checkbox
                            true-value="O"
                            false-value="o"
                            v-model="props.item.required"
                            hide-details
                            readonly
                          ></v-checkbox>
                        </td>
                        <td class="px-1">{{ props.item.maxContains }}</td>
                        <td class="px-1">{{ props.item.comments }}</td>
                      </template>
                    </v-data-table>
                    <v-layout row wrap>
                      <v-flex sm6 md6 xl6></v-flex>
                      <v-flex sm6 md6 xl6>
                        <v-btn color="success" @click="handlecancel2" style="float:right">确定</v-btn>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-widget>
              </v-dialog>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <!-- 表格 -->
            <v-data-table
              v-model="selected"
              :headers="headers"
              :items="brands"
              select-all
              :pagination.sync="pagination"
              :total-items="totalBrands"
              class="elevation-1"
            >
              <template v-slot:items="props">
                <tr :active="props.selected">
                  <td @click="props.selected = !props.selected">
                    <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
                  </td>
                  <td>{{ props.item.code }}</td>
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.updateTime }}</td>
                  <td>
                    <span v-if="props.item.isAuth === '1'">审核通过</span>
                    <span v-else-if="props.item.isAuth === '2'">审核拒绝</span>
                    <span v-else-if="props.item.isAuth === '3'">待审核</span>
                    <span v-else-if="props.item.isAuth === '4'">待申请</span>
                    <span v-else-if="props.item.isAuth === '5'">编辑</span>
                  </td>
                  <td>{{ props.item.count }}</td>
                  <!-- 表格操作 -->
                  <td nowrap>
                     <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          flat
                          icon
                          class="ma-0"
                          color="info"
                          v-on="on"
                          @click="preview(props.item)"
                        >
                          <v-icon>mdi-file-eye-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>查看</span>
                    </v-tooltip>
                    <v-tooltip bottom v-if="props.item.isAuth != '3'">
                      <template v-slot:activator="{ on }">
                        <v-btn
                          flat
                          icon
                          class="ma-0"
                          color="info"
                          v-on="on"
                          @click="previewhistory(props.item)"
                        >
                          <v-icon>widgets</v-icon>
                        </v-btn>
                      </template>
                      <span>查看历史版本</span>
                    </v-tooltip>
                   
                    <v-tooltip bottom v-if="props.item.isAuth != '3'">
                      <template v-slot:activator="{ on }">
                        <v-btn
                          flat
                          icon
                          class="ma-0"
                          color="primary"
                          v-on="on"
                          @click="editItem(props.item)"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>编辑</span>
                    </v-tooltip>
                    <v-tooltip bottom v-if="props.item.isAuth == '5'">
                      <template v-slot:activator="{ on }">
                        <v-btn
                          flat
                          icon
                          class="ma-0"
                          color="warning"
                          v-on="on"
                          @click="application(props.item)"
                        >
                          <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>提交审核</span>
                    </v-tooltip>
                    <v-tooltip bottom v-if="props.item.isAuth != '3'">
                      <template v-slot:activator="{ on }">
                        <v-btn
                          flat
                          icon
                          class="ma-0"
                          color="error"
                          v-on="on"
                          @click.stop="
                            deleteDialogShow2(
                              '确认删除',
                              '确实要删除这个标准吗？',
                              props.item
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
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import qs from "qs";
import Upload from "@/components/image-upload";
import { toTreeData, dealChildren } from "@/plugins/tools";
let lodash = require("lodash");

export default {
  name: "directory-modification",
  components: {
    VWidget,
    TreeSelect,
    VuePerfectScrollbar,
    Upload
  },
  data: () => ({
    defaultList: "",
    addToDbModel: false,
    modelInfo: {},
    autoExpandParent: true,
    treeData: [],
    rootcategory: {},
    children_array: [],
    reData3: [],
    headers2: [
      {
        text: "字段中文名",
        value: "cname"
      },
      {
        text: "字段英文名",
        value: "ename"
      },
      {
        text: "code",
        value: "code"
      },
      {
        text: "定义",
        value: "defined"
      },
      {
        text: "备注",
        value: "text"
      },
      {
        text: "操作",
        value: "way"
      }
    ],
    category: {
      id: "0",
      name: "",
      parentId: "",
      creator: "",
      createTime: "",
      ismodel: "",
      pxh: "",
      status: ""
    },
    newcategory: {
      id: "",
      name: "",
      parentId: "",
      creator: "",
      createTime: "",
      ismodel: "",
      parent_category_name: "",
      pxh: "",
      status: ""
    },
    allcategory: [],
    result_category_array: [],
    result_category_obj: {},
    treeselects: false,
    widgetTitle: "全部标准模型",
    search: "",
    historyDialog2: false,
    headers1: [
      {
        text: "短名 *",
        value: "code"
      },
      {
        text: "英文名",
        value: "enName"
      },
      {
        text: "中文名",
        value: "name"
      },
      {
        text: "定义",
        value: "defination"
      },
      {
        text: "元数据类型 *",
        value: "type"
      },
      {
        text: "长度 *",
        value: "maxsize"
      },
      {
        text: "值域",
        value: "range"
      },
      {
        text: "是否必填",
        value: "required"
      },
      {
        text: "最大出现次数",
        value: "maxContains"
      },
      {
        text: "备注",
        value: "comments"
      }
    ],
    tableData1: [],
    historytable2: [],
    changeSortNum: 0,
    tree: [], //结合selectable属性，勾选的checkbox会出现在tree里面,20190322暂时没使用
    folderItems: [],
    newfolderItems: [],
    newtree: [],
    folderItemsList: [], //folderItems和folderItemsList必须同时修改，一个是目录树，一个是目录树的数组
    selectItems: [],
    // allSelectItems: [],
    selectItem: {
      id: undefined,
      name: undefined
    },
    category_id: null,
    searchText: "",
    selected: [],
    newDialog: false,
    // testid: 100,
    pagination: {
      // descending: boolean,
      page: 1,
      rowsPerPage: 10, // -1 for All
      sortBy: null
    },
    brands: [],
    totalBrands: 0,
    pagination1: {
      // descending: boolean,
      rowsPerPage: 10, // -1 for All
      sortBy: null
    },
    pagination2: {
      rowsPerPage: -1, // -1 for All
      sortBy: null
    },
    pagination3: {
      rowsPerPage: -1, // -1 for All
      sortBy: null
    },
    headers: [
      // {
      //   text: "选择",
      //   value: "index"
      // },
      {
        text: "短名",
        value: "code"
      },
      {
        text: "标准中文名",
        value: "name"
      },
      {
        text: "更新时间",
        value: "createTime"
      },
      {
        text: "审核状态",
        value: "isAuth"
      },
      {
        text: "检测次数",
        value: "count"
      },
      // {
      //   text: "count",
      //   value: "count"
      // },
      {
        text: "操作",
        sortable: false
      }
    ],
    // 查看历史模态框表格头
    historyheaders: [
      {
        text: "序号",
        value: "code"
      },
      {
        text: "短名",
        value: "cnName"
      },
      {
        text: "标准中文名",
        value: "createPerson"
      },
      {
        text: "标准英文名",
        value: "createTime"
      },
      {
        text: "上传日期",
        sortable: false
      },
      {
        text: "版本号",
        sortable: false
      },
      {
        text: "操作",
        sortable: false
      }
    ],
    // 失效版本标准表格头
    historyheaders2: [
      {
        text: "序号",
        sortable: false,
        value: "actions"
      },
      {
        text: "中文名称",
        value: "code"
      },
      {
        text: "英文名称",
        value: "enName"
      },
      {
        text: "短名",
        value: "cnName"
      },
      {
        text: "定义",
        value: "defination"
      },
      {
        text: "数据类型 *",
        value: "type"
      },
      {
        text: "长度",
        value: "maxsize"
      },
      {
        text: "值域 *",
        value: "range"
      },
      {
        text: "是否必填",
        value: "required"
      },
      {
        text: "最大出现次数",
        value: "maxCount"
      },
      {
        text: "备注",
        value: "remarks"
      },
      {
        text: "操作",
        value: "codes"
      }
    ],
    tableData: [],
    historytable: [],
    rowsPerPage: [
      10,
      25,
      100,
      {
        text: "全部",
        value: -1
      }
    ],
    editOrNew: -1, //-1表示新增
    editedItem: {
      id: "",
      code: "",
      enName: "",
      cnName: "",
      bmID: "",
      categoryId: "",
      creator: "",
      createTime: "",
      updateTime: "",
      remarks: "",
      dataSource: "",
      property: []
    },
    stepVal: 1,
    rules: {
      cnName: value =>
        /^[\u4e00-\u9fa5A-Za-z0-9\_]+$/.test(value) || "请填写中文",
      enName: value =>
        /^[A-Za-z0-9\_]+$/.test(value) || "请填写英文或数字或下划线",
      code: value =>
        /^[A-Za-z0-9\_]+$/.test(value) || "请填写英文或数字或下划线"
    },
    snackbar: {
      show: false,
      text: "",
      color: ""
    },
    scrollSettings: {
      maxScrollbarLength: 160
    },
    propertyHeaders: [
      {
        text: "序号",
        sortable: false,
        value: "actions"
      },
      {
        text: "中文名称",
        value: "code"
      },
      {
        text: "英文名称",
        value: "enName"
      },
      {
        text: "短名",
        value: "cnName"
      },
      {
        text: "定义",
        value: "defination"
      },
      {
        text: "数据类型 *",
        value: "type"
      },
      {
        text: "长度",
        value: "maxsize"
      },
      {
        text: "值域 *",
        value: "range"
      },
      {
        text: "是否必填",
        value: "required"
      },
      {
        text: "最大出现次数",
        value: "maxCount"
      },
      {
        text: "备注",
        value: "remarks"
      },
      {
        text: "操作",
        value: "codes"
      }
    ],
    defaultProperty: {
      enName: "",
      cnName: "",
      code: "",
      defination: "",
      type: "字符串",
      maxsize: 0,
      range: 0,
      required: false,
      maxCount: 1,
      comments: ""
    },
    selectItems2: ["字符串", "整数", "单精度", "双精度", "日期", "对象"],
    deleteTitle: "",
    deleteText: "",
    deleteDialog: false,
    historyDialog: false,
    modelType: [],
    modelDialog: false,
    modelDialog2: false,
    form1Value: false,
    form2Value: false,
    ids: "",
    defaultList: [],
    open: [],
    arr: [],
    length: 100,
    pagesize: 10,
    currpage: 1,
    dbType: "",
    dbTypes: ["Mysql", "Hive", "Hbase", "Gbase"],
    parenttoken: {
      "scistor-token": ""
    },

    value: null,
    // define options
    options: [
      {
        key: "a",
        name: "a",
        children: [
          {
            key: "aa",
            name: "aa"
          }
        ]
      }
    ]
  }),
  computed: {
    formTitle() {
      return this.editOrNew === -1 ? "新增标准" : "修改标准";
    }
  },

  watch: {
    pagination: {
      deep: true, //深度監控
      handler() {
        this.getTableList();
      }
    },
    modelDialog(val) {
      if (!val) {
        this.stepVal = 1;
      }
    },
    search: function() {
      this.handleSearch3();
    }
  },
  created() {
    this.parenttoken["scistor-token"] = sessionStorage.getItem("scistor-token");
    this.getData();
    this.handleSearch3 = lodash.debounce(this.handleSearch, 600);
  },
  methods: {
    getData() {
      this.newcategory = {
        id: "",
        name: "",
        parent_id: "",
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
          const data = JSON.parse(JSON.stringify(response.data.data)).sort(
            (a, b) => a.pxh - b.pxh
          );
          console.log(data);
          this.newfolderItems = toTreeData(data, attr);
          console.log(this.newfolderItems);
          this.treeData = dealChildren(this.newfolderItems);
          this.category_id = "0";
          this.getTableList();
        })
        .catch(function(error) {});
    },
    //查找列表
    getTableList() {
      let category = this.newcategory.id;
      var obj = {
        key: this.search,
        categoryId: category,
        pagenum: this.pagination.page,
        size: this.pagination.rowsPerPage
      };
      this.$nohttps
        .post("/newstandard/getStandardListByPage", obj)
        .then(res => {
          
          var data = [];
          if (res.data.operStandardList != null) {
            data = res.data.operStandardList;
          }

          let count = res.data.count;
          this.brands = data;
          this.totalBrands = count;
        })
        .catch(err => {
          // this.showSnackbar("REST服务失败", "error");
        });
    },
    // 选择树节点
    newonSelect(item) {
      this.pagination.page = 1;
      this.pagination.rowsPerPage = 10;
      this.newcategory.id = item.id;
      this.category_id = item.id;
      this.getTableList();
    },
    // 上传成功
    uploadComplete(msg) {
      debugger;
      this.showSnackbar(msg, "success");
      this.getTableList();
    },
    // 上传失败
    uploadError(msg) {
      this.showSnackbar(msg, "error");
    },
    exportToExcel() {
      window.open("/stdglprj/newstandard/getExcelTemp");
    },
    exportToExcel2() {
      window.open("/stdglprj/newstandard/exportStandardToExcel");
    },
    //导入数据库模态框，确定按钮
    confirmAddToDbButton() {
      this.addToDbModel = false;

      this.arr = [];
      this.selected.forEach(value => {
        let obj = {};
        obj.id = value.id;
        obj.batchNo = value.batchNo;
        obj.isAuth = value.isAuth;
        this.arr.push(obj);
      });

      this.$nohttps
        .post(
          "/newstandard/confirmAddToDb",
          JSON.stringify({
            dbType: this.dbType,
            stdArray: JSON.stringify(this.arr)
          })
        )
        .then(res => {
          // let data = res.data.operStandardList
          // for (let j = 0; j < data.length; j++) {
          //   data[j].idss = j
          // }
          // this.length = res.data.count
          // this.tableData = [...data]
        })
        .catch(err => {
          // this.showSnackbar("REST服务失败", "error");
        });
    },
    //搜索
    handleSearch() {
      var obj = {
        key: this.search,
        pagenum: this.currpage,
        size: this.pagesize
      };
      this.$nohttps
        .post("/newstandard/searchStandard", obj)
        .then(res => {
          let data = res.data.operStandardList;
          for (let j = 0; j < data.length; j++) {
            data[j].idss = j;
          }
          this.totalBrands = res.data.count;
          this.brands = [...data];
          //console.log(this.tableData);
        })
        .catch(err => {
          // this.showSnackbar("REST服务失败", "error");
        });
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
      if (this.search != "") {
        this.handleSearch3();
      } else {
        this.getTableList();
      }
    },
    handleCurrentChange(cpage) {
      this.currpage = cpage;
      if (this.search != "") {
        this.handleSearch3();
      } else {
        this.getTableList();
      }
    },
    application(item) {
      this.$nohttps
        .post("/newstandard/doStandardAudit?" + "batchNo=" + item.batchNo)
        .then(res => {
          this.showSnackbar("提交审核成功", "success");
          this.getTableList();
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.tableData.slice();
    },
    handlecancel2() {
      (this.historyDialog2 = false), (this.historyDialog = true);
    },
    //激活
    activeted(ss) {
      this.$nohttps
        .post(
          "/newstandard/getOldVersionOpen?stdId=" +
            ss.id +
            "&version=" +
            ss.version
        )
        .then(res => {
          this.showSnackbar("激活成功", "success");
          this.historyDialog = false;
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    showSnackbar(text, color) {
      this.snackbar = {
        show: true,
        text: text,
        color: color
      };
      this.$emit("showSnackbar", this.snackbar);
    },
    changeSort(column, sortable) {
      if (!(sortable === false)) {
        if (this.pagination2.sortBy === column) {
          if (this.changeSortNum === 1) {
            this.pagination2.descending = !this.pagination2.descending;
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
    handlecancel3() {
      this.modelDialog2 = false;
    },
    // 查看历史版本
    previewhistory(ss) {
      this.$nohttps
        .post("/newstandard/getOldVersionList?" + "stdId=" + ss.id, {
          headers: {
            Authorization: sessionStorage.getItem("Authorization")
          }
        })
        .then(res => {
          let data = res.data.data;
          this.historytable = [...data];
          this.historyDialog = true;
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    preview2(dd) {
      this.modelDialog2 = true;
      this.reData3 = dd.standardField;
    },
    handlesave() {
      this.historyDialog = false;
    },
    //查看历史版本详细信息
    previewhis(ss) {
      this.$https
        .post(
          "/newstandard/getStandardByIdVersion/",
          qs.stringify({
            stdId: ss.id,
            version: ss.version
          })
        )
        .then(res => {
          this.modelInfo = res.data.data[0];
          this.historyDialog2 = true;
          if (res.data.data[0].standardField == 0) {
            this.reData2 = res.data.data[0].standardObject;
          } else {
            this.tableData1 = res.data.data[0].standardField;
          }
        })
        .catch(error => {});
    },
    // 批量删除按钮
    deleteDialogShow(deleteTitle, deleteText, item) {
      this.arr = [];
      let flag = false;
      this.selected.forEach(value => {
        let obj = {};
        obj.id = value.id;
        obj.batchNo = value.batchNo;
        obj.isAuth = value.isAuth;
        if(value.isAuth == '3'){
          flag = true;
        }
        this.arr.push(obj);
      });
      if(flag){
        this.showSnackbar("待审核的标准不能删除", "warning");
        return;
      }
      this.deleteTitle = deleteTitle;
      this.deleteText = deleteText;
      let _this = this;
      if (deleteTitle === "确认删除") {
        this.singleDeleteItem = item;
        this.ids = this.singleDeleteItem;
        this.deleteDialog = true;
      } else {
        this.singleDeleteItem = undefined;
        if (this.selected.length === 0) {
          this.deleteDialog = false;
          this.showSnackbar("请选择待删除的标准", "warning");
        } else {
          this.deleteDialog = true;
        }
      }
    },
    //单个删除按钮
    deleteDialogShow2(deleteTitle, deleteText, item) {
      this.arr = [];
      let obj = {};
      obj.id = item.id;
      obj.batchNo = item.batchNo;
      obj.isAuth = item.isAuth;
      this.arr.push(obj);
      this.deleteTitle = deleteTitle;
      this.deleteText = deleteText;
      // let _this = this;
      if (deleteTitle === "确认删除") {
        this.singleDeleteItem = item;
        this.ids = this.singleDeleteItem.id;
        this.deleteDialog = true;
      } else {
        this.singleDeleteItem = undefined;
        if (this.selected.length === 0) {
          this.deleteDialog = false;
          this.showSnackbar("请选择待删除的标准", "warning");
        } else {
          this.deleteDialog = true;
        }
      }
    },
    //新增标准模态框
    modelDialogShow() {
      this.editOrNew = -1;
      this.modelDialog = true;
      this.editedItem = {
        id: "",
        code: "",
        enName: "",
        cnName: "",
        // bmID: "",
        categoryId: "",
        creator: "",
        createTime: "",
        updateTime: "",
        remarks: "",
        dataSource: "",
        property: []
      };
      this.$refs.form.resetValidation();
      this.treeselects = true;
    },
    //删除方法
    deleteMutipleItem() {
      let data = this.arr;
      this.$nohttps
        .post("/newstandard/deleteStandardById", data)
        .then(res => {
          if (res.data.message === "删除成功") {
            this.deleteDialog = false;
            this.showSnackbar("删除成功,请等待审核", "success");
            this.getTableList();
          }
        })
        .catch(error => {});
    },
    // 编辑
    editItem(item) {
      if (item.isAuth == "1") {
        this.$router.push({
          name: "stdmodel-info2",
          query: {
            id: item.id,
            batchNo: ""
          }
        });
      } else {
        this.$router.push({
          name: "stdmodel-info2",
          query: {
            id: item.id,
            batchNo: item.batchNo
          }
        });
      }
    },
    deleteProperty(index) {
      this.editedItem.property.splice(index, 1);
    },
    close() {
      this.modelDialog = false;
    },
    testEnglish(name) {
      const reg = /^[A-Za-z0-9\_]+$/;
      return reg.test(name);
    },
    testnumber(name) {
      const reg = /^[0-9]+$/;
      return reg.test(name);
    },
    testChinese(name) {
      const regs = /[A-Za-z0-9\_\u4E00-\u9FA5\\s]+/;
      return regs.test(name);
    },
    testnull(name) {
      if (
        name === "null" ||
        name === null ||
        name === "" ||
        name === undefined ||
        name === "undefined"
      ) {
        return false;
      }
      return true;
    },
    finish() {
      // 没有复合型字段
      let data = new Object({
        code: this.editedItem.code, //标准短名
        name: this.editedItem.cnName, //标准中文名称
        enName: this.editedItem.enName,
        description: this.editedItem.description, //标准定义
        dataSource: "自定义", //数据源
        categoryId: this.category_id, //挂载目录ID
        standardField: [],
        standardObject: []
      });
      
      if (this.editedItem.property.length == 0) {
        this.showSnackbar("属性为空，请新增属性", "error");
        return;
      }
      for (let a of this.editedItem.property) {
        if (!this.testnull(a.enName)) {
          this.showSnackbar("英文名不能为空，请填写", "error");
          return;
        }
        if (!this.testnull(a.cnName)) {
          this.showSnackbar("中文名不能为空，请填写", "error");
          return;
        }
        if (!this.testnull(a.code)) {
          this.showSnackbar("短名不能为空，请填写", "error");
          return;
        }
        if (!this.testnull(a.maxsize)) {
          this.showSnackbar("长度不能为空，请填写", "error");
          return;
        }
        if (!this.testnull(a.maxCount)) {
          this.showSnackbar("最大出现次数不能为空，请填写", "error");
          return;
        }
        if (!this.testnull(a.range)) {
          this.showSnackbar("值域不能为空，请填写", "error");
          return;
        }

        // if (!this.testEnglish(a.cnName)) {
        //   this.showSnackbar("中文名请输入中文", "error");
        //   return;
        // }
        if (!this.testChinese(a.name)) {
          this.showSnackbar("标准英文名请输入英文", "error");
          return;
        }
        if (!this.testEnglish(a.code)) {
          this.showSnackbar("短名请输入英文，请填写", "error");
          return;
        }
        if (!this.testnumber(a.maxsize)) {
          this.showSnackbar("字段长度请输入数字", "error");
          return;
        }
        if (!this.testnumber(a.maxCount)) {
          this.showSnackbar("最大出现次数请输入数字", "error");
          return;
        }
        if (!this.testnumber(a.range)) {
          this.showSnackbar("范围请输入数字", "error");
          return;
        }

        data.standardField.push(
          new Object({
            enName: a.enName, //字段英文名称       1
            code: a.code, //字段短名
            name: a.cnName, //字段中文名        1
            required: a.required, //字段是否必须
            maxsize: a.maxsize, //字段长度
            type: a.type, //字段类型          1
            range: a.range, //字段范围          1
            defination: a.defination, //字段定义          1
            maxContains: a.maxCount, //字段最大出现次数   1
            comments: a.comments //字段备注
          })
        );
      }
      this.$nohttps
        .post("/newstandard/saveStandard", data)
        .then(res => {
          if (res.data.message === "获取信息成功") {
            this.showSnackbar("新增成功", "success");
          }
          this.getTableList();
          this.modelDialog = false;
        })
        .catch(error => {
          this.modelDialog = false;
          this.showSnackbar(error, "error");
        });
    },
    addProperty() {
      this.editedItem.property.push(Object.assign({}, this.defaultProperty));
    },
    next1() {
      if (!this.$refs.form.validate()) {
        this.stepVal = 1;
      } else if (!this.testEnglish(this.editedItem.enName)) {
        this.showSnackbar("标准英文名称必须填英文", "error");
      } else if (!this.testChinese(this.editedItem.cnName)) {
        this.showSnackbar("标准中文名称必须填中文", "error");
      } else {
        this.stepVal = 2;
      }
    },
    // //判断英文名
    // testEnglish(name) {
    //   const reg = /^[A-Za-z0-9\_]+$/;
    //   return reg.test(name);
    // },
    // testChinese(name) {
    //   const regs = /[\u4E00-\u9FA5\\s]+/;
    //   return regs.test(name);
    // },
    typeSelectChanged(event) {
      this.editedItem.property = [];
    },
    //查看
    preview(item) {
      if (item.isAuth == "1") {
        this.$router.push({
          name: "stdmodel-info",
          query: {
            id: item.id,
            batchNo: "",
            version: item.version
          }
        });
      } else {
        this.$router.push({
          name: "stdmodel-info",
          query: {
            id: item.id,
            batchNo: item.batchNo
          }
        });
      }
    },

    normalizer(node) {
      return {
        id: node.id,
        label: node.name,
        ...node
      };
    }
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
