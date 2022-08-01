<template>
  <div class="userPage-container">
    <div class="user-header">
      <van-image
      class="user-img"
      round
      width="100px"
      height="100px"
      fit="cover"
      src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F31%2F20200531010354_urbvv.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654590152&t=c60ad3f2d964118a759c589750904eac"
    />
    <div class="userId">账号：{{userLoginId.data}}</div>
    </div>
    <div class='user-content'>
      <div class='user-content-main'>
        <div class="user-item user-item-top" @click="recordBtn">
          <van-icon class='item-icon' name="orders-o" size='27' />
          <span class="item-font">预约记录</span>
          <van-icon name="arrow" />
          </div>
        <div class="user-item" @click="contactUsBtn">
          <van-icon class='item-icon' name="phone-o" size='27' />
          <span class="item-font">联系我们</span>
          <van-icon name="arrow" />
          </div>
        <div class="user-item" @click="feedback">
          <van-icon class='item-icon' name="chat-o" size='27' />
          <span class="item-font">意见反馈</span>
          <van-icon name="arrow" />
          </div>
        <div class="user-item" @click="showShare = true">
          <van-icon class='item-icon' name="share-o" size='27' />
          <span class="item-font">分享好友</span>
          <van-icon name="arrow" />
          </div>
          <van-share-sheet
            v-model:show="showShare"
            title="立即分享给好友"
            :options="options"
            @select="onSelect"
          />
      </div>
    </div>
    <van-button class='removeBtn' type="primary" @click="loginOut">退出登录</van-button>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
import * as loginServ from '../service/loginService'

const router = useRouter()

// 获取当前登录用户的信息
// 通过localStorage获取当前登录用户的信息
const userInfo = JSON.parse(localStorage.getItem('laboratory-client'))
const userLoginId = reactive({
  data: userInfo.loginUser.data.loginId
})

// 预约记录
function recordBtn () {
  router.push('/orderRecord')
}
// 联系我们
function contactUsBtn () {
  router.push('/contactUs')
}
// 分享面板
const showShare = ref(false)
const options = [
  { name: '微信', icon: 'wechat' },
  { name: '微博', icon: 'weibo' },
  { name: '复制链接', icon: 'link' },
  { name: '分享海报', icon: 'poster' },
  { name: '二维码', icon: 'qrcode' }
]

const onSelect = (option) => {
  Toast(option.name)
  showShare.value = false
}
// 意见反馈
function feedback () {
  router.push('/feedback')
}
// 退出登录
function loginOut () {
  loginServ.loginOut()
  router.push('/')
}
</script>

<style lang="less" scoped>
.userPage-container{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  background-color: #eee;
  .user-header{
    width: 100%;
    height: 200px;
    text-align: center;
    background-color: rgb(30, 125, 126);
    box-shadow:
      2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
      6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
      12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
      22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
      41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
      100px 100px 80px rgba(0, 0, 0, 0.07)
    ;

    .user-img{
      margin-top: 40px;
    }
    .userId{
      margin-top: 20px;
      font-size: 16px;
      color: #fff;
    }
  }
  .user-content{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
    background-color:#eee;
    .user-content-main{
      background-color: #fff;
      width: 310px;
      height: 210px;
      border-radius: 5px;
      .user-item{
        display: flex;
        // justify-content: space-between;
        align-items: center;
        margin: auto;
        width: 300px;
        height: 50px;
        background-color: #fff;
        .item-icon{
          margin-left: 20px;
        }
        .item-font{
          margin-left: 15px;
          margin-right: 160px;
          font-size: 14px;
        }
      }
      .user-item-top{
        margin-top: 5px;
      }
    }
  }
  .removeBtn{
    margin-top: 20px;
    margin-left: 35px;
    border-radius: 10px;
    width: 80%;
  }
}

</style>
