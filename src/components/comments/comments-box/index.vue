<template>
  <div class="flex center">
    <div class="pic" v-if="loginState">
      <img :src="avatarUrl" alt="" />
    </div>
    <div class="pic" v-else></div>
    <div class="text ml-30 mr-16">
      <textarea name="" id="" cols="60" rows="8" v-model="text"></textarea>
    </div>
    <div class="publish flex item-end">
      <el-button size="mini" type="danger" @click="publish">发表评论</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      text: "",
      avatarUrl: "",
      loginState: false,
    };
  },
  watch: {
    "$store.state.loginState"(loginState) {
      this.loginState = loginState;
      console.log(this.loginState, "kkkk");
      if (this.loginState) {
        const information =
          window.localStorage.getItem("userInfo") &&
          JSON.parse(window.localStorage.getItem("userInfo"));
        const { avatarUrl } = information;
        this.avatarUrl = avatarUrl;
      }
    },
  },
  methods: {
    async publish() {
      if (!this.text) return;
      console.log(this.$route.query.id);
      await this.$http
        .post(
          `/comment?t=1&type=2&id=${this.$route.query.id}&content=${this.text}`
        )
        .then(console.log(11));
    },
  },
};
</script>

<style scoped>
.pic {
  width: 115px;
  height: 115px;
  background: url("../../../assets/img/comments.jpg");
  background-size: contain;
  background-repeat: no-repeat;
}
.picPerson {
  width: 115px;
  height: 115px;
}
.picPerson img {
  width: 100%;
  height: 100%;
}
</style>