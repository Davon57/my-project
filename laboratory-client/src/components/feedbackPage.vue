<template>
  <div class="feedback-container">
    <div class="feedback-header">
      <span @click="backUser" class="backUser"><van-icon name="arrow-left" /></span>
      <span>意见反馈</span>
    </div>
    <div class="feedback-main">
      <van-cell-group inset>
          <van-field
            class="feedback-input"
            v-model="message"
            rows="2"
            autosize
            type="textarea"
            maxlength="100"
            placeholder="请具体描述您的问题，越详细越好"
            show-word-limit
          />
      </van-cell-group>
      <van-button type="primary" class="btn" @click="feedback">提交反馈</van-button>
    </div>
  </div>
</template>

<script setup>
import * as evaluationServ from '../service/evaluationService'
import { ref } from 'vue'
import { Toast } from 'vant'
import moment from 'moment'

// 获取当前登录用户的信息
// 通过localStorage获取当前登录用户的信息
const userInfo = JSON.parse(localStorage.getItem('laboratory-client'))
// 输入文本
const message = ref('')
// 获取当前时间
const time = moment().format('YYYY-MM-DD HH:mm:ss')
// 提交的对象
const feedbackData = {
  loginId: userInfo.loginUser.data.loginId,
  text: '',
  evaluationTime: time
}
// 增加评论
function feedback () {
  feedbackData.text = message.value
  evaluationServ.addEvaluation(feedbackData).then(res => {
    Toast('反馈成功')
    history.go(0)
  })
}

// 返回用户页面
function backUser () {
  history.go(-1)
}
</script>

<style lang="less" scoped>
.feedback-container{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #eee;
    .feedback-header{
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        color: #fff;
        font-size: 15px;
        overflow-y: hidden;
        background-image: linear-gradient(to right, #6f97d6, #3caade, #00bad7, #21c7c5, #61d1ac);
        .backUser{
            margin-left: 20px;
            margin-right: 130px;
        }
    }
    .feedback-main{
        width: 95%;
        height: calc(100% - 60px);
        margin-top: 20px;
        .feedback-input{
            width: 100%;
            height: 150px;
        }
        .btn{
            width: 300px;
            height: 35px;
            border-radius: 8px;
            margin-top: 40px;
            margin-left: 27px;
        }
    }
}
</style>
