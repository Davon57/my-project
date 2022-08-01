<template>
  <div>
    <el-container fixed class="common-layout">
      <el-aside class="aside-container">
        <li class="title">致一实验室预约系统</li>
        <router-link to="/user">
          <li
            id="btn-user"
            @mouseenter="ChangebgEnter($event)"
            @mouseleave="ChangebgLeave($event)"
            @click="Downing($event);"
            ref="userDom"
          >
            <el-icon class="icon"><avatar /></el-icon>用户管理
          </li>
        </router-link>
        <router-link to="/laboratory">
          <li
            @mouseenter="ChangebgEnter($event)"
            @mouseleave="ChangebgLeave($event)"
            @click="Downing($event)"
          >
            <el-icon class="icon"><house /></el-icon>实验室管理
          </li>
        </router-link>
        <router-link to="/evaluation">
          <li
            @mouseenter="ChangebgEnter($event)"
            @mouseleave="ChangebgLeave($event)"
            @click="Downing($event)"
          >
            <el-icon class="icon"><comment /></el-icon>评价管理
          </li>
        </router-link>
        <router-link to="/order">
          <li
            @mouseenter="ChangebgEnter($event)"
            @mouseleave="ChangebgLeave($event)"
            @click="Downing($event)"
          >
            <el-icon class="icon"><list /></el-icon>预约管理
          </li>
        </router-link>
      </el-aside>
      <el-container>
        <el-header class="header-container">
          <div class="header-left">
            <el-icon class="fold"><fold /></el-icon>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/user' }">userPage</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/laboratory' }">laboratoryPage</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/evaluation' }">evaluationPage</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/order' }">orderPage</el-breadcrumb-item>
          </el-breadcrumb>
          </div>
          <el-dropdown class="dropdown-container">
             <span class="el-dropdown-link">
               <el-avatar class="avatar" shape="square" :size="100" :src="url" />
             <el-icon class="el-icon--right">
                 <arrow-down />
             </el-icon>
             </span>
             <template #dropdown>
               <el-dropdown-menu>
                 <el-dropdown-item>个人中心</el-dropdown-item>
                 <el-dropdown-item>信息中心</el-dropdown-item>
                 <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
               </el-dropdown-menu>
             </template>
          </el-dropdown>
        </el-header>
        <el-main class="main-container">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {
  Avatar, House, Comment, List, Fold, ArrowDown,
} from '@element-plus/icons-vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
// import { toRaw } from '@vue/reactivity';

export default {
  components: {
    Avatar,
    House,
    Comment,
    List,
    Fold,
    ArrowDown,
  },
  setup() {
    const store = useStore();
    const last = ref('');
    const router = useRouter();
    const url = ref('https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg');
    const route = useRoute();
    const userDom = ref(null);

    function ChangebgEnter(e) {
      e.currentTarget.classList.add('liActive');
    }
    function ChangebgLeave(e) {
      e.currentTarget.classList.remove('liActive');
    }
    function Downing(e) {
      if (!e.currentTarget.classList.contains('active')) {
        if (last.value.classList) {
          last.value.classList.remove('active');
        }
        e.currentTarget.classList.add('active');
        last.value = e.currentTarget;
      }
    }
    function init() {
      router.push('/user');
    }
    init();
    // 退出登录
    function logout() {
      store.dispatch('loginOut');
      router.push('/');
    }

    return {
      ChangebgEnter,
      ChangebgLeave,
      Downing,
      last,
      store,
      url,
      logout,
      router,
      route,
      init,
      userDom,
    };
  },
};
</script>

<style lang="less" scoped>
.common-layout{
  overflow: hidden;
}
.aside-container {
  width: 200px;
  height: 100vh;
  background-color: #304156;
  color: #bfcbd9;
  li {
    list-style: none;
    height: 56px;
    line-height: 56px;
  }
  .title {
    text-align: center;
  }
  .icon {
    margin-right: 10px;
    vertical-align: middle;
    padding-bottom: 2px;
    margin-left: 30px;
  }
  .liActive {
    background-color: #273546;
  }
  .active {
    color: #409EFF;
  }
  .router-link-active {
    text-decoration: none;
    color: #bfcbd9;
  }
  a {
    text-decoration: none;
    color: #bfcbd9;
  }
}
.header-container {
  background-color: #fff;
  display:flex;
  align-items: center;
  justify-content:space-between;
  height: 60px;
  padding: 0 20px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
  .avatar {
    width: 45px;
    height: 45px;
    margin-top:8px;
  }
  .header-left {
    display: flex;
    align-items: center;
    justify-content: center;
    .fold{
      margin-right: 20px;
    }
  }
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.main-container {
  // overflow-y: scroll;
}
</style>
