<template>
  <a-menu mode="inline" theme="dark" @click="route_to" :default-open-keys="['userManage']">
    <a-sub-menu key="userManage">
      <template #title>
        <span>
          <a-icon type="mail" />
          <span>用户管理</span>
        </span>
      </template>
      <a-menu-item key="admin_superUser">
        <a-icon type="deployment-unit" />
        <span>超级管理员</span>
      </a-menu-item>
      <a-menu-item key="admin_normalUser">
        <a-icon type="deployment-unit" />
        <span>普通用户</span>
      </a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="healthManagement">
      <template #title>
        <span>
          <a-icon type="mail" />
          <span>健康管理平台</span>
        </span>
      </template>
      <a-menu-item key="admin_health_state">
        <a-icon type="usergroup-add" />
        <span>我的健康状况</span>
      </a-menu-item>
      <a-menu-item key="admin_health_diary">
        <a-icon type="usergroup-add" />
        <span>我的健康日记</span>
      </a-menu-item>
      <a-menu-item key="admin_energy_analyse">
        <a-icon type="usergroup-add" />
        <span>今日食物分析</span>
      </a-menu-item>
      <a-menu-item key="admin_food_recommend">
        <a-icon type="usergroup-add" />
        <span>今日饮食推荐</span>
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
  export default {
    methods: {
      route_to({
        key
      }) {
        if (this.$route.name !== key) {
          this.$router.push({
            name: key,
          });
        }
      },
    },
  };
</script>