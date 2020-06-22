<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12 md12 x12>
        <v-widget title="审核和审核记录">
          <div slot="widget-content">
            <v-card-title>
              <v-btn color="warning" @click="handlereview">批量审核</v-btn>
              <v-btn color="info" @click="exportToExcel">导出标准</v-btn>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              >
              </v-text-field>
              <v-dialog v-model="auditDialog" max-width="400">
                <v-card>
                  <v-btn icon style="float:right">
                    <v-icon @click="back">close</v-icon>
                  </v-btn>
                  <v-card-title class="headline primary--text">
                    {{ auditTitle }}
                  </v-card-title>
                  <v-card-text>
                    <v-textarea
                      clearable
                      auto-grow
                      label="审核意见"
                      outline
                      v-model="suggestion"
                    ></v-textarea>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" flat @click="auditRefuse">不通过</v-btn>
                    <v-btn color="primary" flat @click="auditPass">通过</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- 查看信息模态框 -->
              <v-dialog v-model="infoDialog" max-width="1450px">
                <v-card>
                  <v-widget title="码表信息">
                    <div slot="widget-content">
                      <v-card-title>
                        <v-text-field
                          v-model="codetableCname"
                          label="码表中文名"
                          disabled
                          required
                        ></v-text-field>
                        <v-spacer></v-spacer>
                        <v-text-field
                          v-model="codetableEname"
                          label="码表英文名"
                          disabled
                          required
                        ></v-text-field>
                        <v-spacer></v-spacer>
                        <v-text-field
                          v-model="remarks"
                          label="备注"
                          disabled
                          required
                        ></v-text-field>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="info"
                          @click="infoDialog = false"
                          style="float:right"
                          >返回</v-btn
                        >
                      </v-card-title>
                      <v-data-table
                        :headers="headers2"
                        :items="tableData11"
                        :search="search"
                        :pagination.sync="pagination2"
                      >
                        <template v-slot:items="tableData11">
                          <td>{{ tableData11.index + 1 }}</td>
                          <td>{{ tableData11.item.codeCname }}</td>
                          <td>{{ tableData11.item.codeEname }}</td>
                          <td>{{ tableData11.item.codeValue }}</td>
                        </template>

                        <template v-slot:no-results>
                          <v-alert :value="true" color="error" icon="warning">
                             "{{ search }}" 找不到匹配的值.
                          </v-alert>
                        </template>
                      </v-data-table>
                    </div>
                  </v-widget>
                </v-card>
              </v-dialog>
              <!-- 模态框 -->
              <v-dialog v-model="typeCodeShow" max-width="1450px" persistent>
                <v-card-title
                  style="background:#fff;"
                  class="headline info--text"
                  >查看审核信息</v-card-title
                >
                <v-divider></v-divider>
                <v-form ref="form" style="background:#fff;" lazy-validation>
                  <v-container fluid>
                    <v-layout wrap row>
                      <v-flex md4>
                        <v-select
                          :items="tableNameList"
                          label="数据库名称 *"
                          v-model="typeCodeData.databaseName"
                          readonly
                        ></v-select>
                      </v-flex>
                      <v-flex md4>
                        <v-text-field
                          v-model="typeCodeData.tableCname"
                          label="数据表中文名称 *"
                          readonly
                        ></v-text-field>
                      </v-flex>
                      <v-flex md4>
                        <v-text-field
                          v-model="typeCodeData.tableEname"
                          label="数据表英文名称 *"
                          readonly
                        ></v-text-field>
                      </v-flex>
                      <v-flex md4>
                        <v-text-field
                          v-model="typeCodeData.codeCname"
                          label="代码中文名称 *"
                          readonly
                        ></v-text-field>
                      </v-flex>
                      <v-flex md4>
                        <v-text-field
                          v-model="typeCodeData.codeEname"
                          label="代码英文名称 *"
                          readonly
                        ></v-text-field>
                      </v-flex>
                      <v-flex md4>
                        <v-text-field
                          v-model="typeCodeData.codeValue"
                          label="代码值 *"
                          readonly
                        ></v-text-field>
                      </v-flex>
                      <v-flex md9>
                        <v-textarea
                          auto-grow
                          label="备注"
                          v-model="typeCodeData.remark"
                          readonly
                        ></v-textarea>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-spacer></v-spacer>
                      <v-btn flat @click="typeCodeShow = false">关闭</v-btn>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-dialog>
            </v-card-title>
            <!-- 审核列表 -->
            <v-data-table
              :headers="headers"
              :items="tableData"
              select-all
              v-model="selected"
              :pagination.sync="pagination"
              :search="search"
              item-key="idss"
              :rows-per-page-items="rowsPerPage"
            >
              <template v-slot:items="props">
                <tr>
                  <td @click="props.selected = !props.selected">
                    <v-checkbox
                      :input-value="props.selected"
                      primary
                      hide-details
                    ></v-checkbox>
                  </td>
                  <td>{{ props.index + 1 }}</td>
                  <td>{{ props.item.batchNo }}</td>
                  <td>{{ props.item.type }}</td>
                  <td>{{ props.item.code }}</td>
                  <td>{{ props.item.createTime }}</td>
                  <td>
                    {{ props.item.dataType=='1'?'新增':(props.item.dataType=='2'?'编辑':'删除'), }}
                  </td>
                  <!-- 操作 -->
                  <td class="px-1">
                    <!-- 查看 -->
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
                    <!-- 审核 -->
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          flat
                          icon
                          class="ma-0"
                          color="warning"
                          v-on="on"
                          @click="review(props.item)"
                        >
                          <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>审核</span>
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
import VWidget from '@/components/VWidget'
import qs from 'qs'
// import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  name: 'registration-audit',
  components: {
    VWidget,
  },
  data: () => ({
    singleSelect: false,
    auditDialog: false,
    selected: [],
    codetableCname: {},
    codetableEname: {},
    remarks: {},
    tableData11: [],
    codetableCname: {},
    codetableEname: {},
    resultobj: {},
    moudlelist: [],
    codeInfolist: [],
    fileId: [],
    headers: [
      { text: '序号', value: 'index' },
      { text: '操作编号', value: 'batchNo' },
      { text: '功能类型', value: 'type' },
      { text: '短名', value: 'code' },
      { text: '申请提交时间', value: 'createTime' },
      { text: '申请操作' },
      { text: '操作' },
    ],
    headers2: [
      { text: '序号', value: 'no' },
      { text: '代码中文名', value: 'codeCname' },
      { text: '代码英文名', value: 'codeEname' },
      { text: '代码值', value: 'codeValue' },
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
      code: '',
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
      dataSource: '',
      description: '',
      auditMessage: '',
      type: '',
      fields: [],
    },
    categorys: [],
    scrollSettings: {
      maxScrollbarLength: 160,
    },
    pagination2: {
      rowsPerPage: -1, // -1 for All
      sortBy: null,
    },
    pagination3: {
      rowsPerPage: -1, // -1 for All
      sortBy: null,
    },
    changeSortNum: 0,
    infoHeaders: [
      { text: '短名', value: 'code' },
      { text: '英文名', value: 'enName' },
      { text: '中文名', value: 'name' },
      { text: '密级', value: 'security' },
      { text: '定义', value: 'definition' },
      { text: '元数据类型', value: 'type' },
      { text: '长度', value: 'maxsize' },
      { text: '值域', value: 'range' },
      { text: '是否必填', value: 'required' },
      { text: '最大出现次数', value: 'maxContains' },
      { text: '备注', value: 'comments' },
    ],
    fields: [],
    obj: {},
    modelType: [],
    aalist: [],
    db_id: [],
    typeCodeShow: false,
    typeCodeData: {},
    tableNameList: ['stdgl_dict'],
  }),
  mounted() {
    this.initialize()
  },
  methods: {
    //全选
    toggleAll() {
      if (this.selected.length) this.selected = []
      else this.selected = this.tableData.slice()
    },
    //取消
    back() {
      this.auditDialog = false
    },
    exportToExcel() {
      window.open('/stdglprj/newstandard/exportStandardToExcel')
    },
    //批量审核
    handlereview() {
      console.log(this.selected)
      if (this.selected.length === 0) {
        this.showSnackbar('请至少选择一条数据', 'error')
      } else {
        // console.log(this.selected)
        this.suggestion = ''
        this.auditDialog = true
        this.moudlelist = []
        this.codeInfolist = []
        this.fileId = []
        this.db_id = []
        this.selected.forEach((value) => {
          this.fileId.push(value.fileId)
          this.db_id.push(value.db_id)
          if (value.type == '标准') {
            var obj = {}
            obj.batchNo = value.batchNo
            obj.id = value.moudleId
            obj.dataType = value.dataType
            this.moudlelist.push(obj)
          } else {
            var obj = {}
            obj.batchNo = value.batchNo
            obj.codetableEname = value.ename
            obj.dataType = value.dataType
            this.codeInfolist.push(obj)
          }
        })
        let data = new Object({
          moudleList: this.moudlelist,
          codeInfoList: this.codeInfolist,
          fileId: this.fileId,
          db_id: this.db_id,
        })
        this.obj = data
        console.log(data)
      }
    },
    //展示
    showSnackbar(text, color) {
      this.snackbar = {
        show: true,
        text: text,
        color: color,
      }
      this.$emit('showSnackbar', this.snackbar)
    },
    //查看审核列表
    initialize() {
      this.$nohttps
        .get('/newstandard/getAuditList', {
          headers: { Authorization: sessionStorage.getItem('Authorization') },
        })
        .then((res) => {
          console.log(res.data.data)
          let data = res.data.data
          for (let j = 0; j < data.length; j++) {
            data[j].idss = j
          }
          this.tableData = [...data]
        })
        .catch((error) => {
          this.showSnackbar('REST服务失败', 'error')
        })
    },
    // 批量审核通过
    auditPass() {
      let data = this.obj
      ;(data.isAuth = '1'),
        (data.authRemark = this.suggestion),
        console.log(data)

      this.$nohttps
        .post('/newstandard/auditStandard', data)
        .then((res) => {
          this.auditDialog = false
          this.selected = []
          this.initialize()
        })
        .catch((error) => {
          this.showSnackbar('REST服务失败', 'error')
        })
    },
    // 批量审核拒绝
    auditRefuse() {
      let data = this.obj
      ;(data.isAuth = '2'),
        (data.authRemark = this.suggestion),
        this.$nohttps
          .post('/newstandard/auditStandard', data)
          .then((res) => {
            // console.log(res);
            this.auditDialog = false
            this.selected = []
            this.initialize()
          })
          .catch((error) => {
            this.showSnackbar('REST服务失败', 'error')
          })
    },
    //单个审核
    review(sss) {
      // console.log(sss)
      this.suggestion = ''
      this.auditDialog = true
      ;(this.moudlelist = []), (this.codeInfolist = [])
      if (sss.type == '标准') {
        var obj = {}
        obj.id = sss.moudleId
        ;(obj.batchNo = sss.batchNo), (obj.dataType = sss.dataType)
        this.moudlelist.push(obj)
      } else {
        var obj = {}
        obj.codetableEname = sss.ename
        ;(obj.batchNo = sss.batchNo), (obj.dataType = sss.dataType)
        this.codeInfolist.push(obj)
      }
      let data = new Object({
        moudleList: this.moudlelist,
        codeInfoList: this.codeInfolist,
      })
      this.obj = data
      // console.log(data)
    },
    //查看
    preview(info) {
      if (info.type == '标准') {
        this.previewTypeCode(info.batchNo, info.moudleId)
      } else {
        this.getData(info)
      }
    },
    getData(info) {
      let codeName = info.ename
      let isAuth = info.isAuth
      let batchNo = info.batchNo
      let obj = {}
      obj.codeName = codeName
      obj.isAuth = isAuth
      obj.batchNo = batchNo

      this.$https
        .post('/codeinfo/getCodeInfoByName', qs.stringify(obj), {
          headers: { Authorization: sessionStorage.getItem('Authorization') },
        })
        .then((res) => {
          let data = res.data.data[0].codeInfoList
          this.tableData11 = [...data]
          this.tableData1 = res.data.data[0].moudleList
          this.codetableEname = data[0].codetableEname
          this.codetableCname = data[0].codetableCname
          this.remarks = data[0].remark
          this.infoDialog = true
        })
        .catch((err) => {
          this.showSnackbar('REST服务失败', 'error')
        })
    },
    previewTypeCode(nos, ids) {
      this.$router.push({
        name: 'standard-modify2',
        query: {
          id: ids,
          no: nos,
        },
      })
    },
  },
}
</script>

<style></style>
