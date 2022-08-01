<template>
  <div class='homePage-container'>
    <div class='home-header'>
      <van-swipe class='my-swiper' :autoplay="3000" lazy-render >
        <van-swipe-item >
          <img src="../static/homePage/banner1.png"  />
        </van-swipe-item>
        <van-swipe-item >
          <img src="../static/homePage/banner2.png"  />
        </van-swipe-item>
        <van-swipe-item >
          <img src="../static/homePage/banner3.jpg"  />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="home-mid">
      <van-notice-bar
        left-icon="volume-o"
        scrollable
        text="欢迎使用致一实验室预约系统，使用方法请点击下方按钮查看。如发现问题，请及时联系我们。"
      />
    </div>
    <div class="home-main">
        <van-button class="btn" color="linear-gradient(to right, #86A8E7, #41A29C)">
          服务
        </van-button>
        <van-button class="btn" color="linear-gradient(to right, #86A8E7, #41A29C)">
          扫一扫
        </van-button>
        <van-button class="btn" color="linear-gradient(to right, #86A8E7, #41A29C)">
          开门
        </van-button>
        <van-button class="btn" color="linear-gradient(to right, #86A8E7, #41A29C)">
          使用说明
        </van-button>
        <van-button @click="checkBtn" v-if="isShow" class="btn btn-check" color="linear-gradient(to right, #86A8E7, #41A29C)">
          预约审核
        </van-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
let isShow = false
// 获取当前登录用户的信息
// 通过localStorage获取当前登录用户的信息
const userInfo = JSON.parse(localStorage.getItem('laboratory-client'))
if (userInfo.loginUser.data.role !== '2') {
  isShow = true
}
// 预约审核
const router = useRouter()
function checkBtn () {
  router.push('/checkOrder')
}

</script>

<style lang="less" scoped>
.homePage-container{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  background-color: #eee;
  .home-header{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 150px;
    background-color: rgb(30, 125, 126);
    .my-swiper{
      width: 80%;
      height: 180px;
      top: 50px;
      border-radius:5px;
      // margin-top: 30px;
      .van-swipe-item {
        color: #fff;
        font-size: 20px;
        text-align: center;
        width: 100%;
        height: 180px;
        img{
          width: 100%;
          height: 180px;
        }
      }
    }
  }
  .home-mid{
    width: 100%;
    margin-top: 80px;
  }
  .home-main{
    width: 90%;
    height: 250px;
    margin: 10px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    .btn{
      width: 40%;
      height: 50px;
      border-radius:5px;
    }
    .btn-check{
      width: 60%;
      height: 50px;
      border-radius:5px;
    }
  }
}

</style>
