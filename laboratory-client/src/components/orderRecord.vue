<template>
  <div class="record-container">
      <div class="record-header">
          <span @click="backUser" class="backUser"><van-icon name="arrow-left" /></span>
          <span>预约记录</span>
      </div>
      <div class="record-main">
          <li v-for="item in orderList" :key="item" class="item">
              <div class="item-left">
                 <span class="item-title">实验室: {{item.laboratoryId}}</span>
                 <span class="item-time">预约时间: {{item.orderTime}}</span>
              </div>
              <van-tag :type=item.color class="item-tag">{{item.check}}</van-tag>
          </li>
      </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import * as orderServ from '../service/orderService'

// 获取当前登录用户的信息
// 通过localStorage获取当前登录用户的信息
const userInfo = JSON.parse(localStorage.getItem('laboratory-client'))
const userLoginId = userInfo.loginUser.data.loginId

// 获取订单列表操作
const orderList = reactive([])
getList(1, 1000, userLoginId)
// 获取订单列表
async function getList (page, limit, keywords) {
  const resp = await orderServ.getOrders(page, limit, keywords)
  for (const key of resp.data.datas) {
    delete key.id
    if (key.check === '未审核') {
      key.color = 'warning'
    } else if (key.check === '通过审核') {
      key.color = 'success'
    } else if (key.check === '审核不通过') {
      key.color = 'danger'
    }
    orderList.push(key)
  }
}
// 返回用户页面
const backUser = () => {
  history.go(-1)
}
</script>

<style lang="less" scoped>
::-webkit-scrollbar{
display:none;
}
.record-container{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
    background-color: #eee;
    .record-header{
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
    .record-main{
        width: 95%;
        height: calc(100% - 50px);
        // background-color: #fff;
        list-style: none;
        margin-left: 9px;
        margin-top: 5px;
        overflow-y: scroll;
        .item{
            width: 100%;
            height: 70px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 10px;
            // font-size: 13px;
            background-color: #fff;
            .item-left{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                .item-title{
                    margin-left: 20px;
                    margin-right: 30px;
                    font-size: 15px;
                }
                .item-time{
                    font-size: 12px;
                    margin-left: 20px;
                    margin-right: 30px;
                    margin-top: 10px;
                }
            }
            .item-tag{
                margin-right: 20px;
                height: 20px;
            }
        }
    }
}

</style>
