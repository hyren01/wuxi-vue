// 文件上传 首页
<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12 md12 x12>
        <v-widget title="文档上传">
          <div slot="widget-content">
            <v-card-title>
              <!-- 上传按钮 -->
              <Upload
                style="position:relative;top:3px;"
                :uploadButton="'upload'"
                url="/stdglprj/docmodel/addstdbyfile"
                :defaultList="defaultList"
                @on-complete="uploadComplete"
                @on-error="uploadError"
                :icon="'md-cloud-upload'"
                :customerBtn="true"
                :btnTxt="'上传'"
                :token="parenttoken"
              />
              <v-spacer></v-spacer>
              <!-- 搜索框 -->
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <!-- 删除按钮模态框 -->
              <v-dialog v-model="deleteDialog" max-width="400">
                <v-card>
                  <v-card-title class="headline error--text">{{
                    deleteTitle
                  }}</v-card-title>
                  <v-card-text>{{ deleteText }}</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" flat @click="deleteDialog = false"
                      >取消</v-btn
                    >
                    <v-btn color="error" flat :loading="deleteloading" @click="deleteMutipleItem"
                      >删除</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-title>
            <!-- 表格 -->
            <v-data-table
              :headers="headers"
              :items="tableData"
              :search="search"
              :pagination.sync="pagination"
            >
              <template v-slot:items="tableData">
                <td>{{ tableData.index + 1 }}</td>
                <td>{{ tableData.item.file_name }}</td>
                <!-- <td>{{ tableData.item.upload_person }}</td> -->
                <td>{{ tableData.item.upload_time }}</td>
                <td>
                  {{
                    tableData.item.auth_status == '3'
                      ? '待审核'
                      : tableData.item.auth_status == '1'
                      ? '审核通过'
                      : tableData.item.auth_status == '2'
                      ? '审核拒绝'
                      : '待申请'
                  }}
                </td>
                <!-- <td :class="[tableData.item.auth_status=== '3'? '待审核' : '',tableData.item.auth_status=== '4'? '待申请' : '',tableData.item.auth_status==='1'? '审核通过' : '']">
                  {{ tableData.item.auth_status }}
                </td> -->
                <!-- 操作 -->
                <td>
                  <!-- 下载 -->
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        flat
                        icon
                        class="ma-0"
                        color="success"
                        v-on="on"
                        @click="download(tableData.item)"
                      >
                        <v-icon>mdi-arrow-down-bold-box-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>下载</span>
                  </v-tooltip>
                  <!-- 查看 -->
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        flat
                        icon
                        class="ma-0"
                        color="info"
                        v-on="on"
                        @click="preapplication2(tableData.item)"
                      >
                        <v-icon>mdi-file-eye-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>查看</span>
                  </v-tooltip>
                  <!-- 申请 -->
                  <v-tooltip bottom v-if="tableData.item.auth_status == '4'">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        flat
                        icon
                        class="ma-0"
                        color="info"
                        v-on="on"
                        @click="preapplication(tableData.item)"
                      >
                        <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>申请</span>
                  </v-tooltip>
                  <!-- 取消申请 -->
                  <v-tooltip
                    bottom
                    v-if="
                      tableData.item.auth_status == '3' &&
                        tableData.item.is_retract == '0'
                    "
                  >
                    <template v-slot:activator="{ on }">
                      <v-btn
                        flat
                        icon
                        class="ma-0"
                        color="error"
                        v-on="on"
                        @click="cancel(tableData.item)"
                      >
                        <v-icon>cancel</v-icon>
                      </v-btn>
                    </template>
                    <span>取消申请</span>
                  </v-tooltip>
                  <!-- 编辑 -->
                  <v-tooltip bottom v-if="tableData.item.auth_status == '4'">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        flat
                        icon
                        class="ma-0"
                        color="primary"
                        v-on="on"
                        @click="preview(tableData.item)"
                      >
                        <!-- @click="editItem(tableData.item,tableData.index)" -->
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>编辑</span>
                  </v-tooltip>
                  <!-- 删除 -->
                  <v-tooltip bottom v-if="tableData.item.auth_status == '4'">
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
                            tableData.item
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
              <template v-slot:no-results>
                <v-alert :value="true" color="error" icon="warning">
                   "{{ search }}" 找不到匹配的值.
                </v-alert>
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
import Upload from '@/components/image-upload'
import Vue from 'vue'
import qs from 'qs'

export default {
  name: 'standard-code',
  components: {
    VWidget,
    Upload,
  },
  beforeRouteEnter(to, from, next) {
    console.log(from.name)
    if (from.name == 'standard-fileapplication2') {
      to.meta.ifDoFresh = false
    } else {
      // this.getTableList()
      to.meta.ifDoFresh = true
    }
    next()
  },
  activated() {
    if (this.$route.meta.ifDoFresh) {
      this.$route.meta.ifDoFresh = false
      this.getTableList()
    } else {
      console.log('123')
    }
  },
  methods: {
    // 上传成功
    uploadComplete(msg) {
      this.showSnackbar(msg, 'success')
      this.getTableList()
    },
    // 上传失败
    uploadError(msg) {
      alert(msg);
      this.showSnackbar(msg, 'error')
    },
    showSnackbar(text, color) {
      this.snackbar = {
        show: true,
        text: text,
        color: color,
      }
      this.$emit('showSnackbar', this.snackbar)
    },
    // 删除按钮
    deleteDialogShow(deleteTitle, deleteText, item) {
      this.deleteTitle = deleteTitle
      this.deleteText = deleteText
      let _this = this
      if (deleteTitle === '确认删除') {
        this.singleDeleteItem = item
        let thereOpen = _this.open
        this.deleteDialog = true
        // console.log(thereOpen);
      } else {
      }
    },
    //删除模态框里的删除按钮
    async deleteMutipleItem() {
      this.deleteloading = true;
      const res = await this.$nohttps.post(
        '/docmodel/delfile',
        this.singleDeleteItem
      )
      this.deleteloading = false;
      if (res.data.resultCode === 'RESULT_SUCCESS') {
        this.showSnackbar('删除成功', 'success')
        this.getTableList()
        this.deleteDialog = false
      } else {
        this.showSnackbar(res.data.message, 'error')
      }
    },
    //下载按钮
    download(ss) {
      let id = ss.file_id
      window.open('/stdglprj/docmodel/downloadfile/' + id)
    },
    //申请按钮
    preapplication(item) {
      this.$router.push({
        name: 'standard-fileapplication',
        query: {
          id: item.file_id,
          name: item.file_name,
        },
      })
    },
    //查看
    preapplication2(item) {
       this.showSnackbar("aaaaaaaaaaaaaaaaaa", 'success')
      console.log(item.auth_status)
      if (item.auth_status == '1') {
        this.$router.push({
          name: 'standard-fileapplication3',
          query: {
            id: item.file_id,
            name: item.file_name,
          },
        })
      } else {
        this.$router.push({
          name: 'standard-fileapplication2',
          query: {
            id: item.file_id,
            name: item.file_name,
          },
        })
      }
    },
    //取消申请
    cancel(dd) {
      console.log(dd.file_id)

      this.$nohttps
        .post('/docmodel/retractapply?file_id=' + dd.file_id)
        .then((res) => {
          if (res.data.resultCode === 'RESULT_SUCCESS') {
            this.showSnackbar('取消申请成功', 'success')
            this.getTableList()
          } else {
            this.showSnackbar(res.data.message, 'error')
          }
        })
        .catch((err) => {
          this.showSnackbar('REST服务失败', 'error')
        })
    },
    // 编辑按钮
    preview(item) {
      this.$router.push({
        name: 'standard-fileview',
        query: {
          id: item.file_id,
        },
      })
    },
    // 查询列表
    async getTableList() {
      const res = await this.$https.get('/docmodel/fileindex')
      console.log(res, 'res')
      let data = res.data.data
      for (let j = 0; j < data.length; j++) {
        if (data[j].auth_status == '2') {
          data.splice(j, 1)
          j--
        }
      }
      this.tableData = [...data]
    },
  },
  data() {
    return {
      deleteDialog: false,
      deleteText: '',
      deleteTitle: '',
      defaultList: '',
      search: null,
      tableData: [],
      headers: [
        { text: '序号', value: 'no' },
        { text: '文件名', value: 'file_name' },
        // { text: '上传人', value: 'upload_person', },
        { text: '上传时间', value: 'upload_time' },
        { text: '审核状态', value: 'auth_status' },
        { text: '操作', value: 'code' },
      ],
      pagination: {
        rowsPerPage: 10, // -1 for All
        sortBy: null,
      },
      rowsPerPage: [10, 25, 100, { text: '全部', value: -1 }],

      parenttoken: {
        'scistor-token': '',
      },
      deleteloading: false,
    }
  },

  mounted() {
    this.parenttoken['scistor-token'] = sessionStorage.getItem('scistor-token')
    // console.log(this.parenttoken)
    this.getTableList()
  },
}
</script>
