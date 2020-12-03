<template>
  <a-card title="饮食推荐">
    <a-card
      hoverable
      v-for="(item, index) in foodList"
      :key="index"
      :title="item.type_name"
      :style="{ marginTop: '16px' }"
    >
      <a slot="extra" href="https://www.meishichina.com" target="blank">More</a>
      <p>食物名：{{ item.cp_name }}</p>
      <p>类型：{{ item.type_name }}</p>
      <p v-show="item.texing">口味：{{ item.texing }}</p>
      <p>原料：{{ item.yuanliao }}</p>
      <p v-show="item.tiaoliao">调料：{{ item.tiaoliao }}</p>
      <p>制作方法：{{ item.zuofa }}</p>
      <p v-show="item.tishi">注意事项：{{ item.tishi }}</p>
    </a-card>
  </a-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      foodList: [
        {
          cp_name: "金钩黄瓜条",
          type_name: "凉菜类",
          zuofa: "hhhhhhhhh",
          tishi: "",
          texing: "好吃",
          yuanliao: "黄瓜300克",
          tiaoliao: "食用油25克",
        },
        {
          cp_name: "金钩黄瓜条",
          type_name: "凉菜类",
          zuofa: "hhhhhhhhh",
          tishi: "腌黄瓜时。。。。",
          texing: "真不错",
          yuanliao: "黄瓜300克",
          tiaoliao: "食用油25克",
        },
        {
          type_name: "凉菜类",
          cp_name: "金钩黄瓜条",
          zuofa:
            "1.将黄瓜洗净去皮，切成条状（可根据个人喜好切成其他形状），加入精盐少许，腌5分钟；将海米洗净，用沸水泡透，捞出沥干水分；香葱洗净切成末；2.将黄瓜沥干，加入味精、香油拌匀，再放入海米；3.将炒锅置火上，倒入食用油烧热，下入葱末，炸出香味后捞出不用，把油淋在黄瓜条上，拌匀即可。",
          texing: "色泽鲜艳，咸香爽口。",
          tishi: "腌黄瓜时不能加太多的盐，否则黄瓜不脆嫩。",
          tiaoliao:
            "食用油25克；香油1小匙(3克)；精盐2小匙(6克)；味精1/2小匙(1.5克)",
          yuanliao: "黄瓜300克；海米10克；香葱1棵",
        },
        {
          type_name: "凉菜类",
          cp_name: "金钩黄瓜条",
          zuofa:
            "1.将黄瓜洗净去皮，切成条状（可根据个人喜好切成其他形状），加入精盐少许，腌5分钟；将海米洗净，用沸水泡透，捞出沥干水分；香葱洗净切成末；2.将黄瓜沥干，加入味精、香油拌匀，再放入海米；3.将炒锅置火上，倒入食用油烧热，下入葱末，炸出香味后捞出不用，把油淋在黄瓜条上，拌匀即可。",
          texing: "色泽鲜艳，咸香爽口。",
          tishi: "腌黄瓜时不能加太多的盐，否则黄瓜不脆嫩。",
          tiaoliao:
            "食用油25克；香油1小匙(3克)；精盐2小匙(6克)；味精1/2小匙(1.5克)",
          yuanliao: "黄瓜300克；海米10克；香葱1棵",
        },
      ],
    };
  },
  methods: {},
};
</script>
<style>
</style>