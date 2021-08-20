<template>
  <div>
    <el-dialog title="网易云音乐账号注册" :visible.sync="signUpFormVisible" :before-close="cancle">
      <el-form :model="form" label-width="60px" :rules="rules" ref="form">
        <el-form-item label="手机号" prop="number">
          <el-input
            v-model="form.number"
            autocomplete="off"
            placeholder="请填写手机号"
            clearable
            @change="checkPhone"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            autocomplete="off"
            placeholder="请填写密码"
            :disabled="isNotSignUp"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请填写昵称"
            :disabled="isNotSignUp"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input
            v-model="form.code"
            autocomplete="off"
            placeholder="点击发送验证码"
            clearable
            :disabled="isNotSignUp"
            class="code"
          ></el-input>
          <el-button
            class="turn-code"
            type="info"
            @click="turnCode"
            :disabled="isNotSignUp"
            >发送验证码</el-button
          >
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle" size="mini">取 消</el-button>
        <el-button
          type="danger"
          @click="sign"
          size="mini"
          :disabled="isNotSignUp"
          >注 册</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      isNotSignUp: false,
      form: {
        number: "",
        password: "",
        name: "",
        code: "",
      },
      rules: {
        number: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 13, message: "请输入正确的手机号", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "请输入6~15位的密码", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 1, max: 12, message: "请输入1~12位的昵称", trigger: "blur" },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "请输入6位密码", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    signUpFormVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    //验证手机号是否合格，可以发送验证码
    turnCode() {
      this.$refs.form.validateField("number", async (errMsg) => {
        if (errMsg) {
          this.$message({
            message: "请输入合法的手机号",
            type: "warning",
          });
        } else {
          const res = await this.$http.post(
            "/captcha/sent?phone=" + this.form.number
          );
          console.log(res, "res");
        }
      });
    },

    // 手机号是否注册过
    async checkPhone() {
      this.isNotSignUp = false;
      this.$refs.form.validateField("number", async (errMsg) => {
        if (errMsg) {
          this.$message.warning("请输入合法的手机号");
        } else {
          const exist = await this.$http.post(
            "/cellphone/existence/check?phone=" + this.form.number
          );
          console.log(exist, "xxx");
          if (exist.data.exist === 1) {
            this.isNotSignUp = true;
            this.$message.warning("该手机号已被注册过");
          }
        }
      });
    },

    // 退出注册
    cancle() {
      this.$emit("sign");
      this.isNotSignUp = false;
      try {
        this.$refs.form.resetFields();
      } catch (err) {
        console.log(err);
      }
    },

    // 注册
    sign() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let { data: res2 } = await this.$http.post(
            "/captcha/verify?phone=" +
              this.form.number +
              "&captcha=" +
              this.form.code
          );
          console.log(res2, "klkl");
          let { data: res3 } = await this.$http.post(
            "/register/cellphone?phone=" +
              this.form.number +
              "&password=" +
              this.form.password +
              "&captcha=" +
              this.form.code +
              "&nickname=" +
              encodeURI(encodeURI(this.form.name))
          );
          console.log(res3);
          this.$refs.form.resetFields();
          this.$message.success("您已注册成功");
          this.$emit("sign");
        }
        return;
      });
    },
  },
};
</script>

<style scoped>
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
.code {
  width: 210px;
  margin-right: 20px;
}
/deep/button.el-button.turn-code {
  padding: 8px 20px;
  font-size: 8px;
}
</style>

