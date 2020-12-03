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
            {{ item.name }}：{{ item.value }}
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
    value: "20.30",
  },
  {
    name: "正常BMI指数",
    key: "normbmi",
    value: "18.5~23.9",
  },
  {
    name: "理想体重",
    key: "idealweight",
    value: "68",
  },
  {
    name: "健康水平",
    key: "level",
    value: "正常范围",
  },
  {
    name: "相关疾病发病的危险",
    key: "danger",
    value: "平均水平",
  },
  {
    name: "是否正常",
    key: "status",
    value: "是",
  },
];
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
      myState,
      state: 0,
      form: {
        sex: "男",
        height: 175,
        weight: 60,
      },
    };
  },
  methods: {
    async onSubmit() {
      // let url = `/weight/bmi?appkey=ce4390a7c71a973e&sex=${this.form.sex}&height=${this.form.height}&weight=${this.form.weight}`;
      // console.log(this.form.weight);
      let url =
        "https://api.jisuapi.com/weight/bmi?appkey=ce4390a7c71a973e&sex=男&height=172&weight=60";
      let that = this;

      axios.get(url).then(
        function (response) {
          console.log(response);
        },
        function (err) {
          console.log(err);
        }
      );
    },
  },
};
</script>

