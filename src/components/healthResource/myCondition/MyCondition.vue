<template>
  <div style="background: #ececec; padding: 30px">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-card title="我的个人信息">
          <a-form-model
            :model="form"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="我的性别">
              <a-input v-model="form.sex" />
            </a-form-model-item>
            <a-form-model-item label="我的身高">
              <a-input v-model="form.height" />
            </a-form-model-item>
            <a-form-model-item label="我的体重">
              <a-input v-model="form.weight" />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 20 }">
              <a-button type="primary" @click="onSubmit"> 查询 </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="我的身体状况">
          <p v-for="(item, index) in myState" :key="index">
            {{ item.name }}：{{ condition[item.key] }}
          </p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import axios from "axios";
const myState = [
  {
    name: "BMI指数",
    key: "bmi",
  },
  {
    name: "正常BMI指数",
    key: "normbmi",
  },
  {
    name: "理想体重",
    key: "idealweight",
  },
  {
    name: "健康水平",
    key: "level",
  },
  {
    name: "相关疾病发病的危险",
    key: "danger",
  },
  {
    name: "是否正常",
    key: "status",
  },
];

const condition = {
  bmi: 20.3,
  normbmi: "18.5～23.9",
  idealweight: 68,
  level: "正常范围",
  danger: "平均水平",
  status: "是",
};
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
      myState,
      condition,
      state: 0,
      statusTesx: "",
      form: {
        sex: "男",
        height: 175,
        weight: 60,
      },
    };
  },
  methods: {
    async onSubmit() {
      let that = this;
      axios
        .get(
          `/condition/weight/bmi?appkey=ce4390a7c71a973e&sex=${this.form.sex}&height=${this.form.height}&weight=${this.form.weight}`
        )
        .then(
          function (response) {
            console.log(response);
            console.log(response.data.result);
            let data = response.data.result;

            that.condition.bmi = data.bmi;
            that.condition.normbmi = data.normbmi;
            that.condition.idealweight = data.idealweight;
            that.condition.level = data.level;
            that.condition.danger = data.danger;
            if (data.status === 1) {
              that.condition.status = "健康";
            } else {
              that.condition.status = "亚健康";
            }
            if (response.statusText === "OK") {
              that.$message.success("查询成功", 10);
            }
          },
          function (err) {
            console.log(err);
          }
        );
    },
  },
};
</script>

