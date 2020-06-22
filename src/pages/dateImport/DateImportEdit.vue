<template>
  <v-container grid-list-xl fluid>
    <!-- 标准信息删除按钮模态框 -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline error--text">{{
          deleteTitle
        }}</v-card-title>
        <v-card-text>{{ deleteText }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" flat @click="deleteDialog = false">取消</v-btn>
          <v-btn color="error" flat @click="deleteMutipleItem">删除</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 码表信息删除按钮模态框 -->
    <v-dialog v-model="deleteDialog1" max-width="400">
      <v-card>
        <v-card-title class="headline error--text">{{
          deleteTitle1
        }}</v-card-title>
        <v-card-text>{{ deleteText1 }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" flat @click="deleteDialog1 = false">取消</v-btn>
          <v-btn color="error" flat @click="deleteMutipleItem1">删除</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="detailShow2" style="background:#fff;" max-width="1100">
      <v-widget title="字段信息">
        <div slot="widget-content">
          <v-data-table
            :headers="headers2"
            :items="reData2"
            class="elevation-1"
            :pagination.sync="pagination"
          >
            <template v-slot:items="reData2">
              <td>{{ reData2.item.codeEname }}</td>
              <td>{{ reData2.item.type }}</td>
              <td>{{ reData2.item.maxsize }}</td>
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
    <!-- 页面 -->
    <v-layout row wrap>
      <v-layout row wrap>
        <v-flex sm6 md6 xl6> </v-flex>
        <v-flex sm6 md6 xl6>
          <v-btn @click="savemessageBtn" color="success" style="float:right"
            >保存</v-btn
          >
          <v-btn flat @click="cancel" style="float:right">取消</v-btn>
        </v-flex>
      </v-layout>
      <v-flex sm12 md12 xl6>
        <!-- 标准信息 -->
        <v-widget title="标准信息">
          <div slot="widget-content">
            <!-- 数据table -->
            <v-data-table
              :headers="headers"
              :items="reData"
              class="elevation-1"
              :pagination.sync="pagination"
            >
              <template v-slot:items="reData">
                <td>{{ reData.index + 1 }}</td>
                <td>
                  <v-edit-dialog lazy>
                    {{ reData.item.code }}
                    <template v-slot:input>
                      <v-text-field
                        clearable
                        v-model="reData.item.code"
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                </td>
                <td>
                  <v-edit-dialog lazy>
                    {{ reData.item.enName }}
                    <template v-slot:input>
                      <v-text-field
                        clearable
                        v-model="reData.item.enName"
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                </td>
                <td>
                  {{ reData.item.createTime }}
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
                        @click="edit2(reData.item)"
                      >
                        <v-icon>mdi-file-eye-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>编辑</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        flat
                        icon
                        class="ma-0"
                        color="error"
                        v-on="on"
                        @click.stop="
                          deleteDialogShow(
                            '确认删除',
                            '确实要删除此文件吗？',
                            reData.index
                          )
                        "
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                    <span>删除</span>
                  </v-tooltip>
                </td>
              </template>
            </v-data-table>
          </div>
        </v-widget>
      </v-flex>
      <!-- 码表信息↓ -->
      <v-flex sm12 md12 xl6>
        <v-widget title="码表信息">
          <div slot="widget-content">
            <!-- 数据table -->
            <v-data-table
              :headers="reHeaders"
              :items="standardData"
              class="elevation-1"
              :pagination.sync="pagination"
            >
              <template v-slot:items="standardData">
                <td>
                  {{ standardData.index + 1 }}
                </td>
                <td>
                  <v-edit-dialog lazy>
                    {{ standardData.item.enName }}
                    <template v-slot:input>
                      <v-text-field
                        clearable
                        :rules="[rules.required]"
                        v-model="standardData.item.enName"
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                </td>
                <td>
                  <v-edit-dialog lazy>
                    {{ standardData.item.codeEname }}
                    <template v-slot:input>
                      <v-text-field
                        clearable
                        :rules="[rules.required]"
                        v-model="standardData.item.codeEname"
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                </td>
                <td>
                  <v-edit-dialog lazy>
                    {{ standardData.item.codeValue }}
                    <template v-slot:input>
                      <v-text-field
                        clearable
                        :rules="[rules.required]"
                        v-model="standardData.item.codeValue"
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                </td>
                <td>
                  {{ standardData.item.createTime }}
                </td>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        flat
                        icon
                        class="ma-0"
                        color="error"
                        v-on="on"
                        @click.stop="
                          deleteDialogShow1(
                            '确认删除',
                            '确实要删除此文件吗？',
                            standardData.index
                          )
                        "
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                    <span>删除</span>
                  </v-tooltip>
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
    VWidget,
  },
  data: () => ({
    rules: {
      required: (value) => !!value || '该项不能为空！',
      counter: (value) => value.length <= 20 || '最多20个字符',
    },
    allReList: [],
    allStandardList: [],
    standardList: [],
    reName: null,
    reId: null,
    detailShow2: false,
    standardName: null,
    standardId: null,
    modelDialog: false,
    modelDialog2: false,
    singleDeleteIndex: null,
    singleDeleteIndex1: null,
    deleteText: '',
    deleteText1: '',
    deleteTitle: '',
    deleteTitle1: '',
    modelData: {},
    pagination: {
      rowsPerPage: 10, // -1 for All
      sortBy: null,
    }, //不分页
    rowsPerPage: [10, 25, 100, { text: '全部', value: -1 }],
    // 标准信息表格头
    headers: [
      { text: '序号', value: 'index' },
      { text: '短名 *', value: 'code' },
      { text: '标准英文名 *', value: 'enName' },
      // { text: '上传人', value: 'creator' },
      { text: '上传日期', value: 'createTime' },
      { text: '操作', value: 'way2' },
    ],
    //码表信息表格头
    reHeaders: [
      { text: '序号', value: '' },
      { text: '码表英文名 *', value: 'enName' },
      { text: '码值英文名 *', value: 'codeEname' },
      { text: '代码值 *', value: 'codeValue' },
      // { text: '创建人', value: 'creator' },
      { text: '创建时间', value: 'createTime' },
      { text: '操作', value: 'way3' },
    ],
    headers2: [
      { text: '字段名', value: 'codeEname' },
      { text: '字段类型', value: 'type' },
      { text: '长度', value: 'maxsize' },
      { text: '是否必填', value: 'isRequired' },
    ],
    //详细信息头
    headers3: [
      { text: '序号', value: 'index' },
      { text: '中文名称 *', value: 'cname' },
      { text: '英文名称 *', value: 'ename' },
      { text: '短名 *', value: 'code' },
      { text: '定义', value: 'person' },
      { text: '数据类型', value: 'maxsize' },
      { text: '值域', value: 'range' },
      { text: '约束条件', value: 'required' },
      { text: '最大出现次数', value: 'maxContains' },
      { text: '备注', value: 'comments' },
    ],
    // tables
    reData: [],
    obj: [],
    // obj2: {},
    reData2: [],
    reData3: [],
    reData4: [],
    //码表信息表格
    standardData: [],
    modelDialog3: false,
    deleteDialog: false,
    deleteDialog1: false,
    haveCheck: false,
    toSaveData: [],
    reBody: {}, //检测时传的参数
  }),
  methods: {
    backs() {
      this.modelDialog3 = false
    },
    showSnackbar(text, color) {
      this.snackbar = {
        show: true,
        text: text,
        color: color,
      }
      this.$emit('showSnackbar', this.snackbar)
    },
    handlecancel() {
      this.detailShow2 = false
    },
    edit2(item) {
      // console.log(item)

      this.$https
        .post(
          '/operModule/getStandardFieldById',
          qs.stringify({
            // operPerson: '2001',
            id: item.id,
            batch_no: item.batchNo,
            tableName: item.enName,
          })
        )
        .then((res) => {
          // console.log(res.data.data)
          this.reData2 = [...res.data.data]
          // console.log(this.detailData)
          this.detailShow2 = true
        })
        .catch((err) => {
          this.showSnackbar('REST服务失败', 'error')
        })
    },
    // 标准删除按钮
    deleteDialogShow(deleteTitle, deleteText, index) {
      this.deleteTitle = deleteTitle
      this.deleteText = deleteText
      this.singleDeleteIndex = index
      this.deleteDialog = true
    },
    // 码表删除按钮
    deleteDialogShow1(deleteTitle, deleteText, index) {
      this.deleteTitle1 = deleteTitle
      this.deleteText1 = deleteText
      this.singleDeleteIndex1 = index
      this.deleteDialog1 = true
    },
    //标准删除模态框里的删除按钮
    deleteMutipleItem() {
      let index = this.singleDeleteIndex
      this.reData.splice(index, 1)
      this.deleteDialog = false
    },
    //码表删除模态框里的删除按钮
    deleteMutipleItem1() {
      let index = this.singleDeleteIndex1
      this.standardData.splice(index, 1)
      this.deleteDialog1 = false
    },
    // 查看信息
    getReList() {
      let id = this.$route.query.id
      // console.log(id)

      this.$https
        .post(
          '/operModule/editTable',
          qs.stringify({
            db_id: id,
          })
        )
        .then((res) => {
          // console.log(res.data.data)
          this.obj = res.data.data
          this.reData = res.data.data[0]
          this.standardData = res.data.data[1]
          // this.detailShow = true;
        })
        .catch((err) => {
          this.showSnackbar('REST服务失败', 'error')
        })
    },
    // 保存
    savemessageBtn() {
      // console.log(this.standardData)
      // console.log(this.reData)
      let objdata = {}
      objdata.std_mess = this.reData
      objdata.codeinfo_mess = this.standardData
      // console.log(objdata.std_mess)
      // console.log(objdata.codeinfo_mess)
      if (
        objdata.codeinfo_mess.some(
          (v) => v.codeValue === '' || v.codeEname === '' || v.enName === ''
        )
      ) {
        this.showSnackbar('码表必填字段未填', 'error')
      } else if (
        objdata.std_mess.some((v) => v.code === '' || v.enName === '')
      ) {
        this.showSnackbar('标准必填字段未填', 'error')
      } else {
        // console.log('111')
        this.$https
          .post(
            '/operModule/saveEditStandard',
            qs.stringify({
              operTable: JSON.stringify(this.reData),
              codeTable: JSON.stringify(this.standardData),
            })
          )
          .then((res) => {
            // console.log(res)
            this.showSnackbar('保存成功', 'success')
            this.$router.go(-1)
          })
          .catch((error) => {
            this.showSnackbar('保存失败', 'error')
          })
      }
    },
    cancel() {
      this.$router.go(-1)
    },
  },
  mounted() {
    this.getReList()
  },
}
</script>

<style></style>
