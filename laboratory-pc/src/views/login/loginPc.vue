<template>
  <div class="login">
    <div class="login-box">
      <h1>致一实验室预约平台</h1>
      <el-input @blur="openDialog" class="user" v-model="loginId" placeholder="请输入用户名" />
      <div class="userTip" ref="userTipSty">please enter user name</div>
      <el-input
        @blur="openDialogp"
        class="user-pwd"
        v-model="loginPwd"
        type="password"
        placeholder="请输入密码"
        show-password
      />
      <div class="userPwdTip" ref="userTipStyp">please enter user password</div>
      <br />
      <el-button :plain="true" class="btn" type="primary"  @click="login"
        >登录</el-button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

export default {
  setup() {
    const router = useRouter();
    // const route = useRoute();
    const loginId = ref('');
    const loginPwd = ref('');
    const userTipSty = ref(null);
    const userTipStyp = ref(null);
    const store = useStore();

    async function login() {
      const user = await store.dispatch('login', {
        loginId: loginId.value,
        loginPwd: loginPwd.value,
      });
      if (user) {
        if (user.role === '2') {
          ElMessage.error('您没有权限登录');
          return;
        }
        router.push('/home');
      } else {
        ElMessage.error('用户名或密码错误');
      }
    }
    function openDialog() {
      if (!loginId.value) {
        userTipSty.value.style.opacity = '1';
      } else {
        userTipSty.value.style.opacity = '0';
      }
    }
    function openDialogp() {
      if (!loginPwd.value) {
        userTipStyp.value.style.opacity = '1';
      } else {
        userTipStyp.value.style.opacity = '0';
      }
    }
    return {
      openDialog,
      userTipSty,
      userTipStyp,
      openDialogp,
      store,
      loginId,
      loginPwd,
      login,
      useRoute,
      useRouter,
    };
  },
};
</script>

<style lang="less" scoped>
body {
  margin:0px;
}
.login {
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  overflow: hidden;
  color: #fff;
  background-color: #2D3A4B;
  position: relative;
  .login-box {
    height: auto;
    position: absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    .user{
      width: 448px;
      margin-top: 50px;
      /deep/ .el-input__inner{
        height: 52px;
        background:#202935;
        color: #fff;
      }
    }
    .userTip{
      color: #f56c6c;
      font-size: 12px;
      line-height: 1;
      padding-top: 4px;
      margin-bottom: 5px;
      text-align: left;
      opacity: 0;
    }
    .user-pwd {
      width: 448px;
      /deep/ .el-input__inner{
        height: 52px;
        background:#202935;
        color: #fff;
      }
    }
    .userPwdTip{
      color: #f56c6c;
      font-size: 12px;
      line-height: 1;
      padding-top: 4px;
      margin-bottom: 5px;
      text-align: left;
      opacity: 0;
    }
    .btn{
      width: 448px;
      color: #fff;
      background: #409EFF;
      font-family: STXihei, "华文细黑", "Microsoft YaHei", "微软雅黑";
    }
  }
}
</style>
