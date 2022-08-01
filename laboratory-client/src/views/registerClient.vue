<template>
  <div class="register-container">
      <div class="header">
          <van-icon name="arrow-left" @click="backBtn" />
          <span>帮助</span>
      </div>
      <div class="main">
          <span class="main-header">邮箱注册</span>
          <van-cell-group inset class="main-input">
              <van-field class="bg" v-model="emailInput" placeholder="请输入邮箱">
                 <template #button>
                <van-button class="emailBtn" size="small" type="primary" @click="sendBtn" :disabled="isSmsSend">{{ sendBtnText }}</van-button>
                </template>
              </van-field>
            <van-field
            class="bg bgHeight"
                v-model="verification"
                center
                clearable
                placeholder="请输入邮件验证码"
            />
            <van-field class="bg bgHeight" v-model="password" type="password" placeholder="请输入6~20位密码" />
          </van-cell-group>
          <van-button class="regBtn" square type="primary" @click="registerBtn">注册</van-button>
          <span class="toLogin" @click="toBtn">去登录</span>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import * as sendEmailServ from '../service/sendEmail'
import * as loginServ from '../service/loginService'

const router = useRouter()
const emailInput = ref('')
const verification = ref('')
const password = ref('')

// 发送验证码操作，需要验证邮箱是否合法，邮箱是否已经注册，邮箱是否已经发送过验证码
// 点击发送后按钮禁用，进入60s倒计时
const isSmsSend = ref(false)
const sendBtnText = ref('发送验证码')
const counter = ref(60)
let code = null

// 倒计时60s
function countDown () {
  let timer = null
  timer = setInterval(() => {
    // 替换文本，用es6里面的``这个来创建字符串模板，让秒实时改变
    sendBtnText.value = `(${counter.value}秒)后重新发送`
    counter.value--
    if (counter.value < 0) {
    // 当计时小于零时，取消该计时器
      clearInterval(timer)
      sendBtnText.value = '发送验证码'
      isSmsSend.value = false
    }
  }, 1000)
}

// 发送验证码按钮事件
async function sendBtn () {
// 判断邮箱是否输入
  if (!emailInput.value) {
    Toast('请输入邮箱')
    return
  }
  // 判断qq邮箱是否合法
  if (!/^[a-zA-Z0-9_.-]+@qq\.com$/.test(emailInput.value)) {
    Toast('请输入正确的qq邮箱')
    return
  }
  // 通过邮箱发送验证码
  const resp = await sendEmailServ.sendEmail({
    email: emailInput.value
  })
  code = resp.data.code
  // 按钮点击后，按钮禁用，禁止再次点击
  isSmsSend.value = true
  // 倒计时60s，结束才能点击
  countDown()
}

// 注册按钮事件
async function registerBtn () {
  // 判断邮箱是否输入
  if (!emailInput.value) {
    Toast('请输入邮箱')
    return
  }
  // 判断验证码是否输入
  if (!verification.value) {
    Toast('请输入验证码')
    return
  }
  // 判断密码是否输入
  if (!password.value) {
    Toast('请输入密码')
    return
  }
  // 判断密码是否合法
  if (!/^[a-zA-Z0-9_.-]{6,20}$/.test(password.value)) {
    Toast('请输入6-20位密码')
    return
  }
  // 判断验证码是否正确
  if (verification.value !== code) {
    Toast('验证码错误')
    return
  }
  // 判断邮箱是否已经注册
  const resp1 = await loginServ.getUsers(1, 1, emailInput.value)
  if (resp1.data.datas) {
    Toast('该邮箱已经注册')
    return
  }
  // 注册
  const resp = await loginServ.addUser({
    loginId: emailInput.value,
    loginPwd: password.value,
    role: '2'
  })
  if (resp.data) {
    Toast('注册成功')
    router.push('/')
  }
}

// 去登录按钮事件
function toBtn () {
  router.push('/')
}

// 左上角返回按钮
function backBtn () {
  router.push('/')
}
</script>

<style lang="less" scoped>
.register-container{
    margin: 0;
    padding: 0;
    color: #fff;
    background-image: linear-gradient(to bottom, #454749, #394a5b, #2b4b6e, #1b4c81, #0c4b93);
    width: 100%;
    height: 100vh;
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        height: 44px;
        background-color: #2D3A4B;
        .van-icon{
            color: #fff;
        }
        span{
            font-size: 16px;
        }
    }
    .main{
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top:80px;
        span{
            font-size: 16px;
            color: #fff;
        }
        .main-header{
            font-size: 40px;
            margin-bottom: 20px;
        }
        .main-input{
            width: 80%;
            background-color: transparent;
            .bg{
                border-radius:30px;
                width:280px;
                margin-bottom: 20px;
                .emailBtn{
                    border-radius:20px;
                    font-size: 12px;
                }
            }
            .bgHeight{
                height: 46px;
            }
        }
        .regBtn{
            width: 278px;
            height: 46px;
            border-radius: 30px;
            font-size: 16px;
            margin-left: 10px;
            margin-right: 17px;
            margin-bottom: 20px;
        }
        .toLogin{
            font-size: 14px;
            margin-right:10px;
        }
    }
}
</style>
