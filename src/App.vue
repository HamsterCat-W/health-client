<template>
  <div id="app">
    <a-config-provider :locale="zhCN">
      <router-view></router-view>
    </a-config-provider>
  </div>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";

export default {
  name: "App",
  data: () => ({ zhCN }),
};
</script>

<style>
#app {
  height: 100%;
}

.content {
  margin: 10px;
}
</style>

<style>
/* to change antdesign table border color */

.ant-table-bordered .ant-table-thead > tr > th,
.ant-table-bordered .ant-table-tbody > tr > td {
  border-right: 1px solid #ccc !important;
}
.ant-table-thead > tr > th {
  border-bottom: 1px solid #ccc !important;
}
.ant-table-tbody > tr > td {
  border-bottom: 1px solid #ccc !important;
}
.ant-table-bordered .ant-table-header > table,
.ant-table-bordered .ant-table-body > table,
.ant-table-bordered .ant-table-fixed-left table,
.ant-table-bordered .ant-table-fixed-right table {
  border-top: 1px solid #ccc !important;
  border-left: 1px solid #ccc !important;
}
.ant-table-bordered .ant-table-thead > tr:not(:last-child) > th {
  border-bottom: 1px solid #ccc !important;
}

button.ant-btn.ant-btn-primary.ant-btn-round.ant-btn-block:hover {
  background: #000033;
}
</style>


