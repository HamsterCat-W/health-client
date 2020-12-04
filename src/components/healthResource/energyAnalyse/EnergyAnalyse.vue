<template>
  <div class="content">
    <a-row style="margin-bottom: 10px">
      <a-col span="12">
        <a-row>
          <a-col span="2">
            <a-button
              type="primary"
              shape="circle"
              icon="search"
              @click="handSerach"
            />
          </a-col>

          <a-col span="10">
            <a-input
              placeholder="请输入今日食物"
              v-model="food"
              @keyup.enter="handSerach"
            />
          </a-col>
        </a-row>
      </a-col>
    </a-row>

    <a-card :title="title">
      <a-card-grid
        class="card"
        v-for="(item, index) in nameList"
        :key="index"
        hoverable
      >
        <p v-show="item.name">{{ item.name }}</p>
        <p v-show="item.name">{{ data[item.key] }}</p>
      </a-card-grid>
    </a-card>
  </div>
</template>

<script>
import axios from "axios";

const data = {
  name: "油条",
  rl: 386,
  las: 0.01000000000000000020816681711721685132943093776702880859375,
  gai: 6,
  dbz: 6.9000000000000003552713678800500929355621337890625,
  su: 0.070000000000000006661338147750939242541790008544921875,
  mei: 19,
  zf: 17.60000000000000142108547152020037174224853515625,
  ys: 0.6999999999999999555910790149937383830547332763671875,
  tei: 1,
  shhf: 50.10000000000000142108547152020037174224853515625,
  wsfc: 0,
  meng: 0.520000000000000017763568394002504646778106689453125,
  ssxw: 0.90000000000000002220446049250313080847263336181640625,
  wsse: 3.189999999999999946709294817992486059665679931640625,
  xin: 0.75,
  wssa: 0,
  dgc: 0,
  tong: 0.190000000000000002220446049250313080847263336181640625,
  lb: 2.70000000000000017763568394002504646778106689453125,
  jia: 227,
  ling: 77,
  shc: 21.800000000000000710542735760100185871124267578125,
  la: 585.200000000000045474735088646411895751953125,
  xi: 8.5999999999999996447286321199499070644378662109375,
  type: "谷类",
};
const nameList = [
  {
    name: "食品名称",
    key: "name",
  },
  {
    name: "热量(大卡)",
    key: "rl",
  },
  {
    name: "硫胺素",
    key: "las",
  },
  {
    name: "钙(毫克)",
    key: "gai",
  },
  {
    name: "蛋白质",
    key: "dbz",
  },
  {
    name: "核黄素",
    key: "su",
  },
  {
    name: "镁",
    key: "mei",
  },
  {
    name: "脂肪",
    key: "zf",
  },
  {
    name: "烟酸",
    key: "ys",
  },
  {
    name: "铁",
    key: "tei",
  },
  {
    name: "碳水化合物",
    key: "shhf",
  },
  {
    name: "维生素C",
    key: "wsfc",
  },
  {
    name: "锰",
    key: "meng",
  },
  {
    name: "膳食纤维",
    key: "ssxw",
  },
  {
    name: "维生素E",
    key: "wsse",
  },
  {
    name: "锌",
    key: "xin",
  },
  {
    name: "维生素A",
    key: "wssa",
  },
  {
    name: "胆固醇",
    key: "dgc",
  },
  {
    name: "铜",
    key: "tong",
  },
  {
    name: "胡萝卜素",
    key: "lb",
  },
  {
    name: "钾",
    key: "jia",
  },
  {
    name: "磷",
    key: "ling",
  },
  {
    name: "视黄醇当量",
    key: "shc",
  },
  {
    name: "钠",
    key: "la",
  },
  {
    name: "硒",
    key: "xi",
  },
  {
    name: "食品种类",
    key: "type",
  },
];
export default {
  data() {
    return {
      food: "",
      title: "食物分析结果",
      data,
      nameList,
    };
  },
  methods: {
    handSerach() {
      // http://api.tianapi.com/txapi/nutrient/index?key=fe429defd907e84df59a15637e39ed24&word=油条&mode=0
      console.log("搜索食物");
      let that = this;
      axios
        .get(
          `/food/txapi/nutrient/index?key=fe429defd907e84df59a15637e39ed24&word=${this.food}&mode=0`
        )
        .then(
          function (response) {
            console.log(response);
            console.log(response.data.newslist[0]);
            that.data = response.data.newslist[0];
          },
          function (err) {
            console.log(err);
          }
        );
    },
  },
};
</script>

<style>
.card {
  width: 25%;
  text-align: center;
  border: 1px solid #00ffff;
}
</style>