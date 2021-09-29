<template>
  <div class="container">
    <div class="pic"></div>
    <div class="icon">
      <div class="icon-container" @click="$router.go(-1)">
        <i class="el-icon-back"></i>
      </div>
      <div class="icon-container"><i class="el-icon-right"></i></div>
      <div class="input">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="songs"
          clearable
        >
        </el-input>
      </div>
    </div>
    <div class="login">
      <div class="portrait" v-if="loginState" @click="logOut">
        <img :src="avatarUrl" alt="" />
      </div>
      <div class="logo" @click="change" v-else></div>
      <div v-if="loginState">{{ nickname }}</div>
      <div v-else>点击头像登录</div>
    </div>
    <div class="box">
      <login
        :loginFormVisible="loginFormVisible"
        @change="change"
        @signUp="signUp"
      />
    </div>
    <div class="box">
      <SignUp :signUpFormVisible="signUpFormVisible" @sign="sign" />
    </div>
  </div>
</template>

<script>
import Login from "./login";
import SignUp from "./sign-up";
export default {
  name: "index",
  components: {
    Login,
    SignUp,
  },
  data() {
    return {
      songs: "",
      loginFormVisible: false,
      signUpFormVisible: false,
      loginState: false,
      avatarUrl: "",
      nickname: "",
    };
  },
  created() {
    this.getUser();
  },
  watch: {
    "$store.state.loginState"(loginState) {
      this.loginState = loginState;
      if (this.loginState) this.getUser();
    },
  },
  methods: {
    getUser() {
      const information =
        window.localStorage.getItem("userInfo") &&
        JSON.parse(window.localStorage.getItem("userInfo"));
      if (information) {
        this.loginState = true;
        const { avatarUrl, nickname } = information;
        this.avatarUrl = avatarUrl;
        this.nickname = nickname;
      }
    },
    change() {
      this.loginFormVisible = !this.loginFormVisible;
    },
    sign() {
      this.signUpFormVisible = !this.signUpFormVisible;
    },
    signUp() {
      this.change();
      this.sign();
    },
    logOut() {
      this.$confirm("将退出登陆状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          window.localStorage.setItem("userInfo", null);
          this.$store.commit("updateLoginState", false);
          this.$router.go(0);
          this.$message({
            type: "success",
            message: "退出成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  background: #ec4141;
}
.container > div {
  margin: 0 50px 0 10px;
}
.pic {
  width: 110px;
  height: 30px;
  background: url("./logo.png");
  background-size: contain;
  background-repeat: no-repeat;
}
.icon,
.login {
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 12px;
}
.icon-container {
  width: 20px;
  height: 20px;
  background: #e13e3e;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
  margin: 0 3px;
}
.input {
  margin-left: 16px;
}
/deep/ .el-input--prefix .el-input__inner {
  background: #e13e3e;
  height: 28px;
  border: 1px solid transparent;
  border-radius: 14px;
  font-size: 12px;
  color: #fff;
}
/deep/ .el-input__icon {
  line-height: 28px;
  color: #fff;
}
.portrait {
  margin-right: 8px;
  width: 30px;
  height: 30px;
}
.portrait img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: 999;
}
.logo {
  margin-right: 8px;
  width: 30px;
  height: 30px;
  background: url("./logo.jpg");
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 50%;
}
.box {
  position: absolute;
}
</style>