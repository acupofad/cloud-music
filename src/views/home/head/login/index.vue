<template>
  <div>
    <el-dialog
      title="网易云音乐账号登录"
      :visible.sync="loginFormVisible"
      :before-close="cancle"
    >
      <el-form :model="form" label-width="60px" :rules="rules" ref="form">
        <el-form-item label="手机号" prop="number">
          <el-input
            v-model="form.number"
            autocomplete="off"
            placeholder="请填写手机号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            autocomplete="off"
            placeholder="请填写密码"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div>
          <div class="change">
            <span class="others" @click="signUp">没有账号？注册一个</span>
            <span class="others">选择其它登录方式</span>
          </div>
          <el-button @click="cancle" size="mini">取 消</el-button>
          <el-button type="danger" @click="login" size="mini">登 录</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      form: {
        number: "",
        password: "",
      },
      rules: {
        number: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "请输入6~15位的密码", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    loginFormVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    reset() {
      try {
        this.$refs.form.resetFields();
      } catch (err) {
        console.log(err);
      }
    },
    signUp() {
      console.log(1);
      this.reset();
      this.$emit("signUp");
    },
    cancle() {
      this.reset();
      this.$emit("change");
    },
    login() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const { data: res } = await this.$http.post(
            "/login/cellphone?phone=" +
              this.form.number +
              "&password=" +
              this.form.password
          );
          if (res.code !== 200) return this.$message.error("登录失败");
          console.log(res);
          this.$store.commit('setUser', res.token);
          this.$router.push("/");
          this.$refs.form.resetFields();
          this.$emit("change");
        }
      });
    },
  },
};
</script>

<style scoped>
.change {
  margin-bottom: 18px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #e3170d;
  text-decoration: underline #e3170d;
}
/deep/.el-dialog {
  width: 30%;
}
/deep/.el-input__inner {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
/deep/.el-form-item__label {
  font-size: 12px;
}
/deep/.el-dialog__body {
  padding: 20px 40px 0 20px;
}
/deep/.el-form-item {
  margin-bottom: 16px;
}
/deep/.el-form-item__error {
  font-size: 6px;
}
.dialog-footer {
  padding: 0 10px;
}
</style>