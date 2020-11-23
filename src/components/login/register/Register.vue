<template>
  <div>
    <div id="login_in"></div>
    <div class="container">
      <div class="form" align="center">
        <b class="title">个人健康平台注册</b>
        <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
          <a-form-model-item has-feedback label="用户名" prop="user">
            <a-input
              v-model="ruleForm.username"
              type="text"
              autocomplete="off"
              name="username"
              placeholder="请输入用户名"
            />
          </a-form-model-item>

          <a-form-model-item has-feedback label="密 码" prop="pass">
            <a-input
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
              name="password"
              placeholder="请输入6-8位密码"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback label="联系电话" prop="tel">
            <a-input
              v-model="ruleForm.tel"
              type="tel"
              autocomplete="off"
              name="tel"
              placeholder="请输入电话号码"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback label="邮箱" prop="email">
            <a-input
              v-model="ruleForm.email"
              type="email"
              autocomplete="off"
              name="email"
              placeholder="请输入可用邮箱"
            />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 8, offset: 8}">
            <a-button
              type="primary"
              block
              shape="round"
              :disabled="ruleForm.username === '' 
              || ruleForm.password === ''
              ||ruleForm.tel===''
              ||ruleForm.email===''"
              @click="submitForm"
            >注册</a-button>
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 8, offset: 8}">
            <a-button type="link" block @click="Login_in('login')">
              <span class="button_text">已有账号，去登陆</span>
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
    let validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };

    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用密码"));
      } else {
        callback();
      }
    };

    let validateTel = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入联系电话"));
      } else {
        callback();
      }
    };

    let validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        username: "",
        password: "",
        tel: "",
        email: "",
      },
      login: "login",
      rules: {
        user: [
          {
            required: true,
            validator: validateUser,
            trigger: "change",
          },
        ],
        pass: [{ required: true, validator: validatePass, trigger: "change" }],
        tel: [
          {
            validator: validateTel,
            trigger: "change",
          },
        ],
        email: [
          {
            validator: validateEmail,
            trigger: "change",
          },
        ],
      },
      layout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
      },
    };
  },
  methods: {
    submitForm() {
      // 获取表单数据
      console.log(this.ruleForm);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    Login_in(event) {
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
  position: absolute;
  width: 100%;
  z-index: -1;
  padding: 20px;
}

img {
  width: 300px;
  height: 200px;
  margin-top: 30px;
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

.container {
  margin: 40px;
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
  font-size: 25px;
}
</style>