<template>
  <div>
    <div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%)">
      <img src="../assets/loading.gif" alt>
      <p>加载中...</p>
    </div>

  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  name: "loading",
  data() {
    return {
      dataForm: {
        tokenid: "",
        syscode: ""
      },
    };
  },
  components:{
  },
  methods: {
    ...Vuex.mapMutations(['changeLogin']),
    async login() {
      let vm = this;
      this.dataForm.showAppInfo = true;
      const res = await this.$jsonAxios.post(
        '/cms/loginByTokenid', 
        this.dataForm
      );
      const data = res.data.data
      this.userToken = data.tokenInfo
      this.changeLogin({
        Authorization: this.userToken,
        "scistor-token": this.userToken
      });
      this.$store.commit('setSouterList', data.userInfo.cmsApp)
      vm.$router.push({ path: "/catalog/fileUpload" });
    },
  },
  created() {
    console.log("进入loading.vue的created方法");
    const paramList = location.search.slice(1).split('&')
    const searchObj = {}
    paramList.map(item => {
      const target = item.split('=')
      if(target.length){
        searchObj[target[0]] = target[1]
      }
    })
    this.dataForm.tokenid = searchObj.tokenid || ''
    this.dataForm.syscode = searchObj.syscode || ''
    console.log("dataForm:"+this.dataForm);
    console.log("this.dataForm.tokenid:"+this.dataForm.tokenid);
    console.log("this.dataForm.syscode:"+this.dataForm.syscode);
    
    
    if (!searchObj.tokenid) {
      // this.$router.push('/login')
      console.log('进入本地登陆')
      // this.flag = 'local'
    } else {
      console.log('进入赛斯登陆')
      // this.login();
    }
    if(this.$route.query.tokenid) this.dataForm.tokenid = this.$route.query.tokenid;
    if(this.$route.query.syscode) this.dataForm.syscode = this.$route.query.syscode;
    console.log("this.$route.query.tokenid："+this.$route.query.tokenid);
    console.log("this.$route.query.syscode"+this.$route.query.syscode);

    if (!this.$route.query.tokenid) {
      // this.$router.push({
      //   path: "/login"
      // });
      console.log("获取到tokenid");
    } else {
      console.log("未获取到tokenid");
      // this.login();
    } 
  },
};
</script>

<style scoped>
</style>