<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12 md12 x12>
        <v-widget title="模型列表">
          <div slot="widget-content">
            <v-card-title>
              <v-btn color="warning" @click.stop="checkBtn">一键检测</v-btn>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>

            <v-data-table
              :headers="headers"
              :items="tableData"
              :search="search"
              :pagination.sync="pagination"
              select-all
              item-key="moudleId"
              v-model="selected"
            >
              <template v-slot:items="tableData">
                <td>
                  <v-checkbox
                    v-model="tableData.selected"
                    v-if="tableData.item.isCheck == '已检测'"
                    primary
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="tableData.selected"
                    v-if="tableData.item.isCheck == '未检测'"
                    primary
                    disabled
                    hide-details
                  ></v-checkbox>
                </td>
                <td class="text-xs-center">{{ tableData.item.moudleName }}</td>
                <td class="text-xs-center">{{ tableData.item.enName }}</td>
                <td class="text-xs-center">{{ tableData.item.moudleCode }}</td>
                <td class="text-xs-center">{{ tableData.item.moudleDesc }}</td>
                <td class="text-xs-center">{{ tableData.item.updateDate }}</td>
                <td class="text-xs-center">
                  <span v-if="tableData.item.isCheckModify">
                    {{
                    tableData.item.isCheckModify
                    }}
                  </span>
                  <span v-else>{{ tableData.item.isCheck }}</span>
                </td>
                <td class="text-xs-center">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        flat
                        icon
                        class="ma-0"
                        color="info"
                        v-on="on"
                        @click="preview(tableData.item)"
                      >
                        <v-icon>mdi-file-eye-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>查看检测历史</span>
                  </v-tooltip>
                  <v-tooltip bottom v-if="tableData.item.isCheck == '已检测'">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        flat
                        icon
                        class="ma-0"
                        color="info"
                        v-on="on"
                        @click="dataCheck(tableData.item)"
                      >
                        <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>数据检测</span>
                  </v-tooltip>
                </td>
              </template>
              <template v-slot:no-results>
                <v-alert
                  :value="true"
                  color="error"
                  icon="warning"
                > "{{ search }}" 找不到匹配的值.</v-alert>
              </template>
            </v-data-table>
            <!-- 数据检测模态框 -->
            <v-dialog v-model="dataCheckShow" style="background:#fff;" max-width="600px" persistent>
              <v-card>
                <v-card-title class="headline info--text">选择系统</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-flex md12>
                    <v-combobox
                      v-model="dbName"
                      :items="dbList"
                      label="请选择"
                      @change="select"
                    ></v-combobox>
                    <v-btn color="primary" @click="doDataCheck(tableData.item)">确认检测</v-btn>
                  </v-flex>
                  <v-layout row wrap justify-end>
                    <v-btn flat @click="close">取消</v-btn>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>
        </v-widget>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import VWidget from "@/components/VWidget";
import qs from "qs";
export default {
  name: "standard-code",
  components: {
    VWidget
  },
  methods: {
    showSnackbar(text, color) {
      this.snackbar = {
        show: true,
        text: text,
        color: color
      };
      this.$emit("showSnackbar", this.snackbar);
    },
    // 查看按钮
    preview(item) {
      if (item.isCheck == "未检测") {
        this.$router.push({
          name: "standard-models-history2",
          query: {
            moudleId: item.moudleId
          }
        });
      } else if (item.isCheck == "已检测") {
        this.$router.push({
          name: "standard-models-history",
          query: {
            moudleId: item.moudleId
          }
        });
      }
    },
    // 查询列表
    getTableList() {
      this.$nohttps
        .get("/checkmoudle/getMoudleList", {
          headers: { Authorization: sessionStorage.getItem("Authorization") }
        })
        .then(res => {
          let data = res.data.data;
          this.tableData = [...data];
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    //检测
    checkBtn() {
      if (this.selected.length === 0) {
        this.showSnackbar("请选择数据进行检测", "error");
      } else {

        this.selected.forEach(item => {
          console.log(item.moudleId);
          this.$nohttps
            .post("/checkmoudle/oneClickDetection?model_id=" + item.moudleId)
            .then(res => {
              if (res.data.resultCode == "RESULT_SUCCESS") {
                this.showSnackbar(res.data.message, "success");
                let data = res.data.data;
                this.getTableList();
              } else {
                this.showSnackbar(res.data.message, "error");
              }
              /* this.tableData.forEach((re)=>{
              data.forEach((e)=>{
                if (re.id === e.fieldId) {
                  this.$set(re,'checkResult',e.checkResult);
                }
              });
            }); */
            })
            .catch(err => {
              this.showSnackbar("REST服务失败", "error");
            });
        });
      }
    },
    dataCheck(item) {
      this.dbInfo.checkTableId = item.moudleId;
      this.dbInfo.checkTableName = item.moudleCode;
      this.dataCheckShow = true;
      
      let obj = {}
      obj.schemaCode = item.enName
      obj.moudleId = item.moudleId
      this.$nohttps
        .post("/checkmoudle/getDbList",obj)
        .then(res => {
          let data = res.data.data;
          this.allDbList = data;
          this.dbList = data.map(item => {
            return item.sysName;
          });
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    close() {
      this.dataCheckShow = false;
    },
    doDataCheck() {
      this.$nohttps
        .post(
          "/checkmoudle/getDataCheck",
          this.dbInfo
        )
        .then(res => {
          let data = res.data.data;
          this.$router.push({
          name: "standard-models-datacheck",
          params: {
            data: data
            // [
            //   {
            //     id: '123456',
            //     name: '测试',
            //     nullNum: 0,
            //     overLenNum: 1,
            //     notInCodeNum: null,
            //   }
            // ]
          }
        });
        })
        .catch(err => {
          this.showSnackbar("REST服务失败", "error");
        });
    },
    select(value) {
      this.allDbList.forEach(item => {
        if (item.sysName == value) {
          this.dbInfo.sysName = value;
          this.dbInfo.driver=item.dbDriver;
          this.dbInfo.dbUrl = item.dbUrl;
          this.dbInfo.dbName = item.dbName;
          this.dbInfo.dbUsername = item.dbUsername;
          this.dbInfo.dbpwd = item.dbpwd;
        }
      });
    }
  },
  data() {
    return {
      search: null,
      tableData: [],
      selected: [],
      headers: [
        { text: "中文名称", value: "moudleName", align: "center" },
        { text: "英文名称", value: "enName", align: "center" },
        { text: "短名", value: "moudleCode", align: "center" },
        { text: "描述", value: "moudleDesc", align: "center" },
        { text: "更新日期", value: "updateDate", align: "center" },
        { text: "状态", value: "status", align: "center" },
        { text: "操作", value: "remark", align: "center" }
      ],
      pagination: {
        rowsPerPage: 10, // -1 for All
        sortBy: null
      },
      rowsPerPage: [10, 25, 100, { text: "全部", value: -1 }],
      dataCheckShow: false,
      dbName: null,
      allDbList: [],
      dbList: [],
      dbInfo: {
        sysName: "",
        driver:"",
        dbName: "",
        dbUrl: "",
        dbUsername: "",
        dbpwd: "",
        checkTableId: "",
        checkTableName: ""
      },
      
    };
  },
  mounted() {
    this.getTableList();
  }
};
</script>
