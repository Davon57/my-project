<template>
  <div class="contactUs-container">
    <div class="contactUs-header">
        <span @click="backUser" class='iconLeft'><van-icon  name="arrow-left" /></span>
        <span>联系我们</span>
    </div>
    <div class="contactUs-title">欢迎指导和建议，您的支持是我们最大的动力！</div>
    <div class="contactUs-main">
        <img src="../static/contactUs/qq.png" alt="">
    </div>
  </div>
</template>

<script setup>
// 返回用户页面
function backUser () {
  history.go(-1)
}
</script>

<style lang="less" scoped>
.contactUs-container{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    background-color: #eee;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    .contactUs-header{
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        font-size: 15px;
        color: #fff;
        background-image: linear-gradient(to right, #6f97d6, #3caade, #00bad7, #21c7c5, #61d1ac);
        .iconLeft{
            margin-left: 20px;
            margin-right: 130px;
        }
    }
    .contactUs-title{
        width: 95%;
        height: 40px;
        font-size:13px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        color: rgb(174, 166, 166);
        background-color: #fff;
    }
    .contactUs-main{
        width: 95%;
        height: 400px;
        margin-top: 10px;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
  }
</style>
