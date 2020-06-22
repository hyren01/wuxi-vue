<template>
  <v-container grid-list-xl
               fluid>
    <!-- 标准信息模态框 -->
    <v-dialog v-model="modelDialog"
              max-width="1000px">
      <v-widget title="查看">
        <div slot="widget-content">
          <v-data-table :headers="headers2"
                        :items="reData2"
                        class="elevation-1"
                        :pagination.sync="pagination">
            <template v-slot:items="reData2">
              <td>
                {{ reData2.item.objCname }}
              </td>
              <td>
                {{ reData2.item.objEname }}
              </td>
              <td>
                {{ reData2.item.shortName }}
              </td>
              <td>
                {{ reData2.item.objDefined }}
              </td>
              <td>
                {{ reData2.item.remark }}
              </td>
              <td v-if="reData2.item.standardField">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn flat
                           icon
                           class="ma-0"
                           color="info"
                           v-on="on"
                           @click="
                        preview2(reData2.item.standardField, reData2.item)
                      ">
                      <!-- console.log(res.data.data[0].objfields[0].fields) -->
                      <v-icon>mdi-file-eye-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>查看</span>
                </v-tooltip>
              </td>
            </template>
          </v-data-table>
          <v-layout row
                    wrap>
            <v-flex sm6
                    md6
                    xl6> </v-flex>
            <v-flex sm6
                    md6
                    xl6>
              <v-btn color="success"
                     style="float:right"
                     @click="handlecancel">确定</v-btn>
              <v-btn flat
                     @click="handlecancel"
                     style="float:right">取消</v-btn>
            </v-flex>
          </v-layout>
        </div>
      </v-widget>
    </v-dialog>
    <!-- 详细信息模态框 -->
    <v-dialog v-model="modelDialog2"
              max-width="1450px">
      <v-widget title="详细信息">
        <div slot="widget-content">
          <v-data-table :headers="headers3"
                        :items="reData3"
                        class="elevation-1"
                        :pagination.sync="pagination1">
            <template v-slot:items="reData3">
              <td>{{ reData3.index + 1 }}</td>
              <td>
                {{ reData3.item.name }}
              </td>
              <td>
                {{ reData3.item.enName }}
              </td>
              <td>
                {{ reData3.item.code }}
              </td>
              <td>
                {{ reData3.item.defination }}
              </td>
              <td>
                {{ reData3.item.type }}
              </td>
              <td>
                {{ reData3.item.maxContains }}
              </td>
              <td>
                <v-checkbox true-value="O"
                            false-value="o"
                            v-model="reData3.item.required"
                            hide-details
                            readonly></v-checkbox>
              </td>
              <td>
                {{ reData3.item.maxContains }}
              </td>
              <td>
                {{ reData3.item.comments }}
              </td>
            </template>
          </v-data-table>
          <v-layout row
                    wrap>
            <v-flex sm6
                    md6
                    xl6> </v-flex>
            <v-flex sm6
                    md6
                    xl6>
              <v-btn color="success"
                     @click="handlecancel2"
                     style="float:right">确定</v-btn>
              <v-btn flat
                     @click="handlecancel3"
                     style="float:right">返回</v-btn>
            </v-flex>
          </v-layout>
        </div>
      </v-widget>
    </v-dialog>
    <!-- 非对象类型模态框 -->
    <v-dialog v-model="modelDialog3"
              max-width="1450px">
      <v-widget title="详细信息">
        <div slot="widget-content">
          <v-data-table :headers="headers3"
                        :items="reData4"
                        class="elevation-1"
                        :pagination.sync="pagination2">
            <template v-slot:items="reData4">
              <td>{{ reData4.index + 1 }}</td>
              <td>
                {{ reData4.item.name }}
              </td>
              <td>
                {{ reData4.item.enName }}
              </td>
              <td>
                {{ reData4.item.code }}
              </td>
              <td>
                {{ reData4.item.defination }}
              </td>
              <td>
                {{ reData4.item.type }}
              </td>
              <td>
                {{ reData4.item.range }}
              </td>
              <td>
                <v-checkbox true-value="O"
                            false-value="o"
                            v-model="reData4.item.required"
                            hide-details
                            readonly></v-checkbox>
              </td>
              <td>
                {{ reData4.item.maxContains }}
              </td>
              <td>
                {{ reData4.item.comments }}
              </td>
            </template>
          </v-data-table>
          <v-layout row
                    wrap>
            <v-flex sm6
                    md6
                    xl6> </v-flex>
            <v-flex sm6
                    md6
                    xl6>
              <v-btn color="success"
                     @click="saves"
                     style="float:right">确定</v-btn>
              <v-btn flat
                     @click="saves"
                     style="float:right">返回</v-btn>
            </v-flex>
          </v-layout>
        </div>
      </v-widget>
    </v-dialog>
    <!-- 页面 -->
    <v-layout row
              wrap>
      <v-layout row
                wrap>
        <v-flex sm6
                md6
                xl7>
          <!-- <a-tree-select style="width: 300px"
                         :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                         :treeData="treeData"
                         placeholder='Please select'
                         treeDefaultExpandAll
                         @select="selecttreechange" /> -->
        </v-flex>
        <v-flex sm6
                md6
                xl4>
          <v-btn color="success"
                 @click="cancel"
                 style="float:right">返回</v-btn>
        </v-flex>
      </v-layout>
      <!-- 标准信息 -->
      <v-flex sm12
              md12
              xl12>
        <v-widget title="标准信息">
          <div slot="widget-content">
            <!-- 数据table -->
            <v-data-table :headers="headers"
                          :items="reData"
                          class="elevation-1"
                          :pagination.sync="pagination3">
              <template v-slot:items="reData">
                <td>{{ reData.index + 1 }}</td>
                <td>
                  {{ reData.item.code }}
                </td>
                <td>
                  {{ reData.item.name }}
                </td>
                <td>
                  {{ reData.item.enName }}
                </td>
                <td>
                  {{ reData.item.createTime }}
                </td>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn flat
                             icon
                             class="ma-0"
                             color="info"
                             v-on="on"
                             @click="preview(reData.item.id)">
                        <v-icon>mdi-file-eye-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>查看</span>
                  </v-tooltip>
                </td>
              </template>
            </v-data-table>
          </div>
        </v-widget>
      </v-flex>
      <!-- 码表信息↓ -->
      <v-flex sm12
              md12
              xl12>
        <v-widget title="码表信息">
          <div slot="widget-content">
            <!-- 数据table -->
            <v-data-table :headers="reHeaders"
                          :items="standardData"
                          class="elevation-1"
                          :pagination.sync="pagination4">
              <template v-slot:items="standardData">
                <td>
                  {{ standardData.index + 1 }}
                </td>
                <td>
                  {{ standardData.item.codetableCname }}
                </td>
                <td>
                  {{ standardData.item.codetableEname }}
                </td>
                <td>
                  {{ standardData.item.codeCname }}
                </td>
                <!-- <td>
                  {{ standardData.item.codeEname }}
                </td> -->
                <td>
                  {{ standardData.item.codeValue }}
                </td>
                <td>
                  {{ standardData.item.createTime }}
                </td>
                <td>
                  {{ standardData.item.remark }}
                </td>
              </template>
            </v-data-table>
          </div>
        </v-widget>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import VWidget from '@/components/VWidget'
import qs from 'qs'
export default {
  name: 'standar-detection',
  components: {
    VWidget
  },
  data: () => ({
    allReList: [],
    allStandardList: [],
    standardList: [],
    treeData: [],
    result_category_array: [],
    rootcategory: {},
    reName: null,
    reId: null,
    standardName: null,
    standardId: null,
    modelDialog: false,
    modelDialog2: false,
    modelDialog3: false,
    modelData: {},
    // tables
    pagination: {
      rowsPerPage: 10, // -1 for All
      sortBy: null
    }, //不分页
    pagination1: {
      rowsPerPage: 10, // -1 for All
      sortBy: null
    },
    pagination2: {
      rowsPerPage: 10, // -1 for All
      sortBy: null
    },
    pagination3: {
      rowsPerPage: 10, // -1 for All
      sortBy: null
    },
    pagination4: {
      rowsPerPage: 10, // -1 for All
      sortBy: null
    },
    rowsPerPage: [5, 10, 20, { text: '全部', value: -1 }],
    // 标准信息表格头
    headers: [
      { text: '序号', value: 'index' },
      { text: '短名', value: 'code' },
      { text: '标准中文名', value: 'cname' },
      { text: '标准英文名', value: 'ename' },
      // { text: '上传人', value: 'creator', },
      { text: '上传日期', value: 'creator_time' },
      { text: '操作', value: 'way2' }
    ],
    //码表信息表格头
    reHeaders: [
      { text: '序号', value: '' },
      { text: '码表中文名', value: 'codetable_cname' },
      { text: '码表英文名', value: 'codetable_ename' },
      { text: '码值内容', value: 'code_cname' },
      // { text: '码值英文名', value: 'code_ename' },
      { text: '代码值', value: 'code_value' },
      // { text: '创建人', value: 'creator' },
      { text: '创建时间', value: 'create_time' },
      { text: '备注', value: 'remark' }
    ],
    headers2: [
      { text: '字段中文名', value: 'cname' },
      { text: '字段英文名', value: 'ename' },
      { text: 'code', value: 'code' },
      { text: '定义', value: 'defined' },
      { text: '备注', value: 'text' },
      { text: '操作', value: 'way' }
    ],
    //详细信息头
    headers3: [
      { text: '序号', value: 'name' },
      { text: '中文名称', value: 'cname' },
      { text: '英文名称', value: 'ename' },
      { text: '短名', value: 'type' },
      { text: '定义', value: 'person' },
      { text: '数据类型', value: 'maxsize' },
      { text: '值域', value: 'code' },
      { text: '约束条件', value: 'code' },
      { text: '最大出现次数', value: 'code' },
      { text: '备注', value: 'code' }
    ],
    // tables
    reData: [],
    category: {
      id: '',
      name: '',
      parentId: '',
      // creator: '',
      createTime: '',
      ismodel: '',
      parent_category_name: '',
      pxh: '',
      status: ''
    },
    obj: {},
    obj2: {},
    reData2: [],
    reData3: [],
    reData4: [],
    //码表信息表格
    standardData: [],
    haveCheck: false,
    toSaveData: [],
    reBody: {} //检测时传的参数
  }),
  methods: {
    handlecancel3 () {
      this.modelDialog2 = false
      this.modelDialog = true
    },
    selecttreechange (value, node, extra) {
      //console.log(extra.node.eventKey)
      this.category_id = extra.node.eventKey
    },
    showSnackbar (text, color) {
      this.snackbar = {
        show: true,
        text: text,
        color: color
      }
      this.$emit('showSnackbar', this.snackbar)
    },
    // 模态框取消按钮
    handlecancel () {
      this.modelDialog = false
    },
    handlecancel2 () {
      this.modelDialog2 = false
      this.modelDialog = true
    },
    saves () {
      this.modelDialog3 = false
    },
    //模态框保存按钮  确定
    handlesave () {

      this.$nohttps
        .post('/docmodel/savestd/', this.obj)
        .then(res => {
          // console.log(res)
          this.modelDialog = false
        })
        .catch(error => {
          // console.log(error)
        })
    },
    // 查看信息
    getReList () {
      let id = this.$route.query.id
      this.$nohttps
        .get('/docmodel/editfile/' + id)
        .then(res => {
          // console.log(res.data.data)
          this.obj2 = res.data.data[0]
          let data = res.data.data[0].std_mess
          let data2 = res.data.data[0].codeinfo_mess
          this.reData = [...data]
          this.standardData = [...data2]
        })
        .catch(err => {
          this.showSnackbar('REST服务失败', 'error')
        })
    },
    // 取消按钮
    close () {
      this.modelDialog = false
      this.modelData = {}
    },
    cancel () {
      this.$router.push({
        name: 'standard-fileupload'
      })
    },
    preview (id) {
      // console.log(id)

      this.$https
        .post(
          '/docmodel/getfieldbyidresulttable',
          qs.stringify({
            std_id: id
          })
        )
        .then(res => {
          // console.log(res.data.data)
          this.obj = res.data.data[0]
          if (res.data.resultCode === 'RESULT_SUCCESS') {
            if (res.data.data[0].standardField) {
              let data = res.data.data[0].standardField
              this.reData4 = [...data]
              this.modelDialog3 = true
            } else {
              let data = res.data.data[0].standardObject
              this.reData2 = [...data]
              this.modelDialog = true
            }
          } else {
            this.showSnackbar(res.data.message, 'error')
          }
        })
        .catch(err => {
          this.showSnackbar('REST服务失败', 'error')
        })
    },
    preview2 (dd, ss) {
      // console.log(ss)
      // console.log(dd)
      this.modelDialog = false
      this.modelDialog2 = true
      this.reData3 = [...dd]
    }
  },
  computed: {},
  mounted () {
    this.getReList()
  }
}
</script>

<style></style>
