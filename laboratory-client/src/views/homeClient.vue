<template>
  <div class="home-container">
    <van-tabbar v-model="active" route active-color="rgb(30, 125, 126)">
      <van-tabbar-item to='/homePage' icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to='/orderPage' icon="underway-o">预约</van-tabbar-item>
      <van-tabbar-item to='/userPage' icon="user-o">个人中心</van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(0)

</script>

<style lang="less" scoped>

</style>
