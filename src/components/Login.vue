<template>
  <div class="wrap" id="wrap">
    <div class="logGet">
      <!-- 头部提示信息 -->
      <div class="logD logDtip">
        <p class="p1">登录</p>
      </div>
      <!-- 输入框 -->
      <div class="lgD">
        <img src="../icons/svg/user.svg" width="20" height="20" alt />
        <input type="text" placeholder="输入用户名" v-model="user" />
      </div>
      <div class="lgD">
        <img src="../icons/svg/password.svg" width="15" height="15" alt />
        <input type="password" placeholder="输入用户密码" v-model="password" />
      </div>
      <div class="logC">
        <a>
          <button @click="login">登 录</button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import Vuex from "vuex";
import md5 from "js-md5";
export default {
  data() {
    return {
      searchObj: {},
      user: "",
      password: "",
      userToken: "",
      temp: null,
      testresult: "",
      dataForm: {
        tokenid: "",
        syscode: ""
      },
    };
    
  },
  /* computed:{
      ...Vuex.mapGetters(['mant'])
  }, */
  created() {
    this.user = "";
    this.password = "";
    this.userToken = "";
    this.temp = null;
    // console.log("进入login.vue的created方法");
    // const paramList = location.search.slice(1).split('&')
    
    // paramList.map(item => {
    //   const target = item.split('=')
    //   if(target.length){
    //     this.searchObj[target[0]] = target[1]
    //   }
    // })
    // this.dataForm.tokenid = this.searchObj.tokenid || ''
    // this.dataForm.syscode = this.searchObj.syscode || ''


    // if (!this.searchObj.tokenid) {
      
    //   console.log('进入本地登陆')
      
    // } else {
    //   console.log('进入赛斯登陆')
    //   this.login2();
    // }

    //console.log('123456----'+md5('123456'))
  },
  methods: {
    ...Vuex.mapMutations(["changeLogin"]),
    reloads() {
      if (location.href.indexOf("#reloaded") == -1) {
        location.href = location.href + "#reloaded";
        location.reload();
      }
    },
    showSnackbar(text, color) {
      this.snackbar = {
        show: true,
        text: text,
        color: color
      };
      this.$emit("showSnackbar", this.snackbar);
    },

    
    async login() {
      
      let ur = this.user;
      let pawd = this.password;
      this.$jsonAxios
        .post(
          // 'http://172.16.45.227:9000/cms/login',
          "/cms/login",
          {
            account: ur,
            password: md5(pawd),
            showAppInfo: "true",
            syscode: "stdcode"
          }
        )
        .then(res => {
          debugger;
                   
          if (res.data.status === 200) {
            const data = res.data.data;
            console.log("res:"+res);
            this.userToken = data.tokenInfo;
            console.log("userToken:"+this.userToken);
            this.changeLogin({
              Authorization: this.userToken,
              "scistor-token": this.userToken
            });
            console.log("data.userInfo.cmsApp:"+data.userInfo.cmsApp);
            this.$store.commit("setSouterList", data.userInfo.cmsApp);
            this.$router.push("/standard/sv");
          }
        })
        .catch(err => {
          debugger;
          if(ur != "" && ur != undefined){
            alert("用户名或者密码错误，请检查")
          }else{
            alert("用户名不能为空")
          }
        });

    },

    // async login2() {
    //   let vm = this;
    //   this.dataForm.showAppInfo = true;
    //   const res = await this.$jsonAxios.post(
    //     '/cms/loginByTokenid', 
    //     this.dataForm
    //   );
    //   console.log("单点登录成功");
    //   console.log("res:"+res);
    //   const data = res.data.data
    //   this.userToken = data.tokenInfo
    //   console.log("userToken:"+userToken);
    //   this.changeLogin({
    //     Authorization: this.userToken,
    //     "scistor-token": this.userToken
    //   });
    //   console.log("data.userInfo.cmsApp:"+data.userInfo.cmsApp);
    //   this.$store.commit('setSouterList', data.userInfo.cmsApp);
    //   this.$router.push("/standard/sv");
    // },

   
    geturl() {
      let url = window.location.toString();
      console.log("url", url);
      let result = url.split("=")[1];
      console.log(result, typeof result);
      this.testresult = result;
    }
  }
};
</script>

<style>
body {
  background-image: url(../assets/bg.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
}

* {
  margin: 0;
  padding: 0;
}

#wrap {
  height: 600px;
  width: 100%;
  background-position: center center;
  position: relative;
}

#head {
  height: 120px;
  width: 100;
  background-color: #66cccc;
  text-align: center;
  position: relative;
}

#wrap .logGet {
  height: 408px;
  width: 368px;
  position: absolute;
  background-color: #ffffff;
  top: 100px;
  right: 15%;
}

.logC a button {
  width: 100%;
  height: 45px;
  background-color: #ee7700;
  border: none;
  color: white;
  font-size: 18px;
}

.logGet .logD.logDtip .p1 {
  display: inline-block;
  font-size: 28px;
  margin-top: 30px;
  width: 86%;
}

#wrap .logGet .logD.logDtip {
  width: 86%;
  border-bottom: 1px solid #ee7700;
  margin-bottom: 60px;
  margin-top: 0px;
  margin-right: auto;
  margin-left: auto;
}

.logGet .lgD img {
  position: absolute;
  top: 12px;
  left: 8px;
}

.logGet .lgD input {
  width: 100%;
  height: 42px;
  text-indent: 2.5rem;
}

#wrap .logGet .lgD {
  width: 86%;
  position: relative;
  margin-bottom: 30px;
  margin-top: 30px;
  margin-right: auto;
  margin-left: auto;
}

#wrap .logGet .logC {
  width: 86%;
  margin-top: 0px;
  margin-right: auto;
  margin-bottom: 0px;
  margin-left: auto;
}

.title {
  font-family: "宋体";
  color: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 使用css3的transform来实现 */
  font-size: 36px;
  height: 40px;
  width: 30%;
}

.copyright {
  font-family: "宋体";
  color: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 使用css3的transform来实现 */
  height: 60px;
  width: 40%;
  text-align: center;
}
</style>
