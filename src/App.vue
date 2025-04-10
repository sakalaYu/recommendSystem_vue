<template>
  <div id="app">
    <!-- 根据需要决定是否显示根组件 -->
    <div v-if="shouldShowRootComponent">
      <header-nav></header-nav>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import headerNav from '@/components/header-nav'

export default {
  name: 'app',
  components: {
    headerNav
  },
  computed: {
    shouldShowRootComponent() {
      // 根据当前路由的信息决定是否显示根组件
      return this.$route.meta.requiresRoot !== false;
    }
  }
}
</script>

<style>
</style>
