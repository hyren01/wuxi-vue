<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap style="background:#fff;padding:20px;">
      <v-layout row wrap>
        <v-flex sm4 md4 xl4 class="checkTop">
          <v-btn color="primary" @click="setDataSource">选择数据库</v-btn>
          <span>{{ this.dbData.db_name || '暂未选择数据库' }}</span>
        </v-flex>
        <v-flex sm4 md4 xl4> </v-flex>
        <v-flex sm4 md4 xl4 class="checkTop" style="text-align:right;">
          <!-- <v-btn color="primary"
                 @click="setSql">生成sql</v-btn> -->
          <v-btn color="primary" @click="back">返回</v-btn>
          <v-btn color="success" @click="finish">保存</v-btn>
        </v-flex>
      </v-layout>
      <!-- table -->
      <v-data-table
        :headers="dataHeaders"
        style="width:100%;"
        :items="dataList"
        item-key="table_cname"
        select-all
        v-model="selected"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>
            <v-checkbox
              v-model="props.selected"
              primary
              hide-details
            ></v-checkbox>
          </td>
          <td>{{ props.item.table_cname }}</td>
          <td>
            <!-- {{props.item.less_name}} -->
            <v-edit-dialog lazy>
              {{ props.item.less_name }}
              <template v-slot:input>
                <v-text-field
                  clearable
                  v-model="props.item.less_name"
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </td>
          <td style="width:30px">
            <v-select
              :items="selectItems2"
              v-model="props.item.type"
              small-chips
            ></v-select>
          </td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  flat
                  icon
                  class="ma-0"
                  color="info"
                  v-on="on"
                  @click="edit(props.item)"
                >
                  <v-icon>mdi-file-eye-outline</v-icon>
                </v-btn>
              </template>
              <span>查看</span>
            </v-tooltip>
          </td>
        </template>
      </v-data-table>
    </v-layout>
    <!-- 字段信息模态框 -->
    <v-dialog v-model="modeltable" max-width="1000px">
      <v-widget title="字段信息">
        <div slot="widget-content">
          <v-data-table
            :headers="headers2"
            :items="reData2"
            class="elevation-1"
            :pagination.sync="pagination"
          >
            <template v-slot:items="reData2">
              <td>{{ reData2.item.columnName }}</td>
              <td>{{ reData2.item.columnType }}</td>
              <td>{{ reData2.item.precision }}</td>
              <td>{{ reData2.item.isRequired == 'O' ? '是' : '否' }}</td>
            </template>
          </v-data-table>
          <v-layout row wrap>
            <v-flex sm6 md6 xl6> </v-flex>
            <v-flex sm6 md6 xl6>
              <v-btn color="primary" @click="handlecancel" style="float:right"
                >返回</v-btn
              >
            </v-flex>
          </v-layout>
        </div>
      </v-widget>
    </v-dialog>
    <!-- 保存模态框 -->
    <v-dialog v-model="saveDialog" max-width="400">
      <v-card>
        <v-card-title class="headline error--text">{{
          saveTitle
        }}</v-card-title>
        <v-card-text>{{ saveText }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" flat @click="saveDialog = false">取消</v-btn>
          <v-btn color="primary" flat @click="must">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 选择数据库modal -->
    <v-dialog v-model="modelDialog" max-width="1450px" persistent>
      <v-card>
        <v-card-title>
          DB配置
          <v-btn color="primary" small @click="showdbBtn">数据库列表</v-btn>
        </v-card-title>
      </v-card>
      <v-form ref="form" style="background:#fff;" lazy-validation>
        <v-container fluid>
          <v-layout wrap row>
            <v-flex md4>
              <v-text-field
                clearable
                :rules="[rules.required]"
                v-model="modelData.db_name"
                label="数据库名称 *"
              ></v-text-field>
            </v-flex>
            <v-flex md4>
              <v-text-field
                clearable
                :rules="[rules.required]"
                v-model="modelData.db_type"
                label="数据库类型 *"
              ></v-text-field>
            </v-flex>
            <v-flex md4>
              <v-text-field
                clearable
                :rules="[rules.required]"
                v-model="modelData.db_ip"
                label="数据库ip *"
              ></v-text-field>
            </v-flex>
            <v-flex md4>
              <v-text-field
                clearable
                :rules="[rules.required]"
                v-model="modelData.db_port"
                label="数据库端口 *"
              ></v-text-field>
            </v-flex>
            <v-flex md4>
              <v-text-field
                clearable
                :rules="[rules.required]"
                v-model="modelData.username"
                label="数据库用户名 *"
              ></v-text-field>
            </v-flex>
            <v-flex md4>
              <v-text-field
                clearable
                :rules="[rules.required]"
                v-model="modelData.password"
                label="数据库密码 *"
              ></v-text-field>
            </v-flex>
            <v-flex md12>
              <v-text-field
                clearable
                :rules="[rules.required]"
                v-model="modelData.jdbc_url"
                label="jdbcUrl *"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-spacer></v-spacer>
            <v-btn flat @click="closeSet">取消</v-btn>
            <!-- <v-btn color="primary"
                   @click="testCheck">测试连接</v-btn> -->
            <v-btn color="success" @click="okSetData">确认</v-btn>
          </v-layout>
        </v-container>
      </v-form>
    </v-dialog>
    <!-- 数据库列表 -->
    <v-dialog v-model="dbShow" max-width="1450px" persistent>
      <v-card>
        <v-card-title>
          数据库列表
        </v-card-title>
      </v-card>
      <v-layout row wrap>
        <v-data-table
          :headers="dbHeaders"
          style="width:100%"
          :items="fList"
          hide-actions
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td>{{ props.item.db_name }}</td>
            <td>{{ props.item.db_type }}</td>
            <td>{{ props.item.db_ip }}</td>
            <td>{{ props.item.db_port }}</td>
            <td class="px-1">
              <v-btn color="success" @click="checkDb(props.item)" small
                >选择</v-btn
              >
            </td>
          </template>
        </v-data-table>
      </v-layout>
      <v-layout justify-end style="background:#fff" row wrap>
        <v-spacer></v-spacer>
        <v-btn flat @click="dbShow = false">取消</v-btn>
      </v-layout>
    </v-dialog>
  </v-container>
</template>
<script>
import qs from 'qs'
import VWidget from '@/components/VWidget'
export default {
  name: 'standar-detection',
  components: {
    VWidget,
  },
  data() {
    return {
      modelData: {},
      rules: {
        required: (value) => !!value || '该项不能为空！',
        counter: (value) => value.length <= 20 || '最多20个字符',
      },
      modelDialog: false,
      saveDialog: false,
      objjj: {},
      dbShow: false,
      modeltable: false,
      dbHeaders: [
        { text: '数据库名称', value: 'db_name' },
        { text: '数据库类型', value: 'db_type' },
        { text: '数据库ip', value: 'db_ip' },
        { text: '数据库端口', value: 'db_port' },
        { text: '操作', value: 'ope' },
      ],
      selectItems2: ['标准', '码表'],
      dbData: {}, //保存的数据库数据
      // 选择数据库↑
      fList: [],
      fName: '',
      sName: '',
      sList: [],
      headers2: [
        { text: '字段名', value: 'columnName' },
        { text: '字段类型', value: 'columnType' },
        { text: '长度', value: 'precision' },
        { text: '是否必填', value: 'isRequired' },
      ],
      dataHeaders: [
        { text: '表英文名', value: 'table_cname' },
        { text: '短名', value: 'less_name' },
        { text: '类型', value: 'sql' },
        { text: '操作', value: 'ope' },
      ],
      dataList: [],
      paginationAll: {},
      pagination: {}, //不分页
      selected: [],
      typeList: ['码表', '区间'],
      items: [],
      codeList: [],
      editShow: false,
      reData2: [],
      sql: '',
      columnName: '',
      dbinfo2: {},
      resultArr: [],
      finalyobj: {},
      saveTitle: '保存',
      saveText: '确定保存这些表吗?',
      modol: 'false',
    }
  },
  methods: {
    showSnackbar(text, color) {
      this.snackbar = {
        show: true,
        text: text,
        color: color,
      }
      this.$emit('showSnackbar', this.snackbar)
    },
    handlecancel() {
      this.modeltable = false
    },
    back() {
      this.$router.go(-1)
    },
    //保存方法
    must() {
      let params = JSON.stringify(this.finalyobj)
      // console.log(this.finalyobj);
      // console.log(this.modol)
      this.saveDialog = false
      if (this.modol == 'false') {
        this.$https
          .post(
            '/operModule/insertStandards/',
            qs.stringify({
              op: params,
              bm: '1',
            })
          )
          .then((res) => {
            // console.log(res.data.data)
            this.showSnackbar('保存成功', 'success')

            this.$router.push({
              name: 'dateImport-standard',
            })
          })
          .catch((err) => {
            this.showSnackbar('REST服务失败', 'error')
          })
      } else {
        this.showSnackbar('短名重复 请修改', 'error')
        this.saveDialog = false
      }
    },
    // 选择数据库按钮
    setDataSource() {
      this.modelData = JSON.parse(JSON.stringify(this.dbData))
      this.modelDialog = true
    },
    okSetData() {
      if (this.$refs.form.validate()) {
        this.dbData = JSON.parse(JSON.stringify(this.modelData))
        this.modelDialog = false
        this.sList = []
        this.sName = ''
        this.getTableList()
      }
    },
    // 取消设置数据库
    closeSet() {
      // this.$refs.form.resetValidation();
      this.modelDialog = false
    },
    // 选择数据库列表数据
    checkDb(item) {
      this.modelData = JSON.parse(JSON.stringify(item))
      // console.log(item);
      this.dbShow = false
    },
    // 查询数据库列表
    showdbBtn() {
      this.dbShow = true
    },
    //查询数据库中所有的表名
    getTableList() {
      let params = JSON.stringify(this.dbData)
      // console.log(params);
      // params.insname = params.dbname;
      // this.axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded;charset=UTF-8";

      this.$https
        .post('/operModule/getDbTableInfo/', qs.stringify({ db: params }))
        .then((res) => {
          // console.log(res.data.data)
          let arr = res.data.data[0].less_name
          let arr1 = res.data.data[0].table_cname
          let result = arr.map((data, i) => ({
            less_name: data,
            table_cname: arr1[i],
            type: '标准',
          }))
          // console.log(result)
          this.dataList = result
        })
        .catch((err) => {
          this.showSnackbar('REST服务失败', 'error')
        })
    },
    // 保存按钮
    finish() {
      if (this.selected.length === 0) {
        this.showSnackbar('请至少选择一条数据', 'error')
      } else {
        var objjj = {}
        let checkedList = JSON.parse(JSON.stringify(this.selected))
        let arr = []
        let allCheck = this.dataList.map((sel) => {
          return sel.columnName
        })
        this.modol = 'false'
        var dbinfo2 = {}
        dbinfo2 = this.dbData
        // console.log(dbinfo2)
        // 循环调用接口拼接数据
        let standardList = []
        var arr2 = this.selected.map((item) => {
          return item.less_name
        })
        var nary = arr2.sort()
        for (var i = 0; i < arr2.length; i++) {
          if (nary[i] == nary[i + 1]) {
            this.modol = 'true'
          }
        }
        this.selected.forEach((item) => {
          // console.log(item.type)
          this.dbData.table_name = item.table_cname
          let params = JSON.stringify(this.dbData)
          // console.log(params)

          this.$https
            .post('/operModule/queryFieldsInfo/', qs.stringify({ db: params }))
            .then((res) => {
              // console.log(res.data.data)
              let data = res.data.data
              let standardField = []
              let resultobj = {}
              ;(resultobj.name = item.type == '标准' ? '1' : '2'), //item.type  类型
                (resultobj.code = item.less_name), //表名前三位
                (resultobj.enname = item.table_cname), //表名
                (resultobj.fileId = ''),
                data.forEach((item) => {
                  let obj = {}
                  ;(obj.fieldname = item.columnName), //字段英文名
                    (obj.code = item.columnName.substr(0, 3))
                  ;(obj.enname = item.columnName), //字段英文名
                    (obj.required = item.isRequired), //是否为空
                    (obj.maxsize = item.precision), //字段长度
                    (obj.type = item.columnType), //字段类型
                    (obj.pxh = ''), //字段排序号
                    (obj.fieldrange = ''),
                    (obj.rangee = ''),
                    standardField.push(obj)
                })
              resultobj.standardField = standardField
              // console.log(dbinfo2)
              standardList.push(resultobj)
              // console.log(standardList);
              let finishobj = {}
              finishobj.dbinfo2 = dbinfo2
              finishobj.standardList = standardList
              this.finalyobj = finishobj
              this.saveDialog = true
              // console.log(this.finalyobj)
            })
            .catch((err) => {
              this.showSnackbar('REST服务失败', 'error')
            })
        })
      }
    },
    // 查看按钮
    edit(item) {
      // console.log(this.dbData)
      this.modeltable = true
      this.dbData.table_name = item.table_cname
      let params = JSON.stringify(this.dbData)
      // console.log(params)

      this.$https
        .post('/operModule/queryFieldsInfo/', qs.stringify({ db: params }))
        .then((res) => {
          // console.log(res.data.data)
          this.reData2 = res.data.data
        })
        .catch((err) => {
          this.showSnackbar('REST服务失败', 'error')
        })
    },
    // 配置jdbcurl
    setJdbcUrl() {
      let type =
        this.modelData.dbtype === undefined ? '' : this.modelData.dbtype
      let ip = this.modelData.ip === undefined ? '' : this.modelData.ip
      let user =
        this.modelData.user === undefined
          ? ''
          : this.modelData.user + '_management'
      let port = this.modelData.port === undefined ? '' : this.modelData.port
      let name =
        this.modelData.dbname === undefined ? '' : this.modelData.dbname
      let jdbc =
        'jdbc:' +
        type +
        '://' +
        ip +
        ':' +
        port +
        '/' +
        name +
        '?characterEncoding=utf8&zeroDateTimeBehavior=convertToNull'
      this.modelData.url = jdbc
    },
    //查看所有的数据库
    getAllDbInfo() {
      this.$nohttps
        .get('/operModule/getDbInfo/')
        .then((res) => {
          // console.log(res.data.data)
          let data = res.data
          if (data.resultCode === 'RESULT_SUCCESS') {
            this.fList = data.data
          } else {
            this.showSnackbar(data.message, 'error')
          }
        })
        .catch((err) => {
          this.showSnackbar('REST服务失败', 'error')
        })
    },
  },
  mounted() {
    this.getAllDbInfo()
  },
  watch: {
    'modelData.dbname': function() {
      this.setJdbcUrl()
    },
    'modelData.dbtype': function() {
      this.setJdbcUrl()
    },
    'modelData.ip': function() {
      this.setJdbcUrl()
    },
    'modelData.port': function() {
      this.setJdbcUrl()
    },
  },
}
</script>
<style scoped>
.checkTop {
  margin-top: 10px;
}
</style>
