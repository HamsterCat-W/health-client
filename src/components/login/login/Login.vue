<template>
  <div>
    <div id="login_in"></div>
    <div class="container">
      <div class="form" align="center">
        <div class="logo" align="center">
          <img src="/image/logo.png" alt="健康平台logo" />
        </div>
        <b class="title">个人健康平台</b>
        <a-form-model ref="ruleForm" :model="ruleForm" v-bind="layout">
          <a-form-model-item has-feedback label="用户名">
            <a-input v-model="ruleForm.username" type="text" autocomplete="off" name="username" />
          </a-form-model-item>

          <a-form-model-item has-feedback label="密 码">
            <a-input
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
              name="password"
            />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 8, offset: 8}">
            <a-button
              type="primary"
              block
              shape="round"
              :disabled="ruleForm.username === '' || ruleForm.password === ''"
              @click="submitForm"
            >登录</a-button>
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 8, offset: 8}">
            <a-button type="link" block @click="Register('register')">
              <span class="button_text">还没有账号？立即注册</span>
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      register: "register",
      layout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
      },
    };
  },
  methods: {
    submitForm(event) {
      console.log(this.ruleForm);
    },
    Register(event) {
      // console.log(event);
      if (this.$route.name !== event) {
        // console.log(this.$route.name);
        this.$router.push({
          name: event,
        });
      }
    },
  },
};
</script>


<style>
/*z-index，是用来确定元素层叠关系的，值大的元素显示在值小的元素的上面。同时，该元素position必须为absolute才会起作用*/
#login_in {
  background: url("/image/login_in.png") no-repeat;
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
  z-index: -1;
  padding: 20px;
}

img {
  width: 300px;
  height: 200px;
  margin: 30px;
}

.container {
  margin: 40px;
}

.form {
  margin: 0 auto;
  width: 600px;
  height: 600px;
  background: #ffffff;
  align-items: center;
  box-shadow: 0px 0px 10px grey;
  border-radius: 1%;
}

.button_text {
  color: gray;
}

button.ant-btn.ant-btn-primary.ant-btn-round.ant-btn-block {
  background: #57b846;
}

.title {
  width: 100%;
  text-align: center;
  position: relative;
  font-size: 25px;
  margin-top: 70px;
}
</style>