<template>
  <div class="login-container">
    <div class="login-main">
      <span class="main-header">致一预约系统</span>
      <van-cell-group inset class="login-input">
        <van-field class="bg" v-model="text" required label="用户名" placeholder="请输入用户名" />
        <van-field class="bg" v-model="password" required type="password" label="密码" placeholder="请输入密码" />
      </van-cell-group>
      <van-button class="login-btn" round type="primary" @click="login">立即登录</van-button>
      <div class="bottomBtn"><span @click="forgetBtn">忘记密码？</span>|<span class="btnRight" @click="registerBtn">立即注册</span></div>
      <van-dialog />
    </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Toast, Dialog } from 'vant'

const router = useRouter()
const store = useStore()

const text = ref('')
const password = ref('')
// 登录系统
async function login () {
  if (!text.value) {
    Toast('请输入用户名')
    return
  }
  if (!password.value) {
    Toast('请输入密码')
    return
  }
  const user = await store.dispatch('login', {
    loginId: text.value,
    loginPwd: password.value
  })
  if (user) {
    router.push('/homePage')
  } else {
    Toast.fail('用户名或密码错误')
  }
}
// 注册账户
function registerBtn () {
  router.push('/register')
}
// 忘记密码
function forgetBtn () {
  Dialog.alert({
    title: '致一开发团队通知',
    message: '由于此模块还未开发，如果您忘记了密码，请将登录账号发到2230383936@qq.com邮箱,管理员会给予处理。给您带来不便，十分抱歉。'
  }).then(() => {
  // on close
  })
}
</script>

<style lang="less" scoped>
 .login-container{
    margin: 0;
    padding: 0;
    color: #fff;
    background-image: linear-gradient(to bottom, #454749, #394a5b, #2b4b6e, #1b4c81, #0c4b93);
    width: 100%;
    height: 100vh;
    .login-main{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .main-header{
        font-size: 40px;
        margin-bottom: 1rem;
      }
      .login-input{
        width: 70%;
        background-color: transparent;
        .bg{
          border-radius:30px;
          width:260px;
          margin-bottom: 20px;
        }
      }
      .login-btn{
        width: 69%;
      }
      .bottomBtn{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 5px;
        .van-button{
          width: 100%;
        }
        .btnRight{
          margin-left: 3px;
        }
      }
    }
}
</style>
