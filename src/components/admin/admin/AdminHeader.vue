<template>
  <div>
  <a-row type="flex">
      <a-col flex="7"></a-col>
      <a-col flex="1"><a-button type="link" block>{{username}}<link rel="stylesheet" href=""></a-button></a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username:'健康平台'
    }
  },
};
</script>

<style>
button.ant-btn.ant-btn-link.ant-btn-block {
  color: aliceblue;
}
</style>