<template>
  <a-layout style="height: 100%">
    <a-layout-header style="background:#000033">
      <customer-header />
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200px">
        <customer-aside />
      </a-layout-sider>
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import CustomerAside from "./CustomerAside";
import CustomerHeader from "./CustomerHeader";

export default {
  components: { CustomerAside, CustomerHeader },
};
</script>
