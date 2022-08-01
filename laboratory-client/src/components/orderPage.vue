<template>
  <div class="order-container">
    <div class="order-header">
      <span>实验室预约</span>
    </div>
    <div class="dropdown">
      <van-dropdown-menu active-color="#1989fa">
        <van-dropdown-item v-model="value1" :options="option1" />
        <van-dropdown-item v-model="value2" :options="option2" @click="selectOption" />
      </van-dropdown-menu>
    </div>
    <div class="order-list">
      <li class="order-item" @click="itemBtn(item)" v-for="item in orderList" :key="item">
        <span class="itemId">{{item.laboratoryId}}</span>
        <span class="itemSeat">座位数:{{item.seat}}</span>
        <van-tag class="itemTag" :type=item.states>{{item.state}}</van-tag>
        </li>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
// import { toRaw } from '@vue/reactivity'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
import * as laboratoryServ from '../service/laboratoryService'

// 下拉菜单
const value1 = ref(0)
const value2 = ref('a')
const option1 = [
  { text: '全部', value: 0 },
  { text: '实验室', value: 1 }
]
const option2 = [
  { text: '全部', value: 'a' },
  { text: '空闲', value: 'b' },
  { text: '已预约', value: 'c' },
  { text: '正忙碌', value: 'd' }
]

// 获取实验室列表操作
const orderList = reactive([])
getList(1, 1000)
// 获取实验室列表
async function getList (page, limit, keywords) {
  const resp = await laboratoryServ.getLaboratories(page, limit, keywords)
  for (const key of resp.data.datas) {
    delete key.id
    if (key.state === '空闲') {
      key.states = 'success'
    } else if (key.state === '已预约') {
      key.states = 'warning'
    } else if (key.state === '正忙碌') {
      key.states = 'danger'
    }
    orderList.push(key)
  }
}
// 实验室分类
function selectOption () {
  if (value2.value === 'a') {
    orderList.length = 0
    getList(1, 1000)
  } else if (value2.value === 'b') {
    orderList.length = 0
    getList(1, 1000, '空闲')
  } else if (value2.value === 'c') {
    orderList.length = 0
    getList(1, 1000, '已预约')
  } else if (value2.value === 'd') {
    orderList.length = 0
    getList(1, 1000, '正忙碌')
  }
}
// 实验室状态设置
const router = useRouter()
// const state = ref('success')
function itemBtn (item) {
  if (item.state === '已预约') {
    Toast('该实验室已经被预约')
    return
  } else if (item.state === '正忙碌') {
    Toast('该实验室正在忙碌')
    return
  }
  router.push(`/orderDetail/${item.laboratoryId}`)
}
</script>

<style lang="less" scoped>
::-webkit-scrollbar{
display:none;
}
.order-container{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  background-color: #eee;
  overflow-y: hidden;
  .order-header{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #fff;
    background-image: linear-gradient(to right, #6f97d6, #3caade, #00bad7, #21c7c5, #61d1ac);
  }
  .dropdown{
    top: 40px;
  }
  .order-list{
    width:100%;
    height: calc(100% - 127px);
    list-style: none;
    overflow-y: scroll;
    .order-item{
      width: 98%;
      height: 60px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 6px;
      margin-left: 3px;
      background-color: #fff;
      .itemId{
        margin-left:10px;
        color: rgb(56, 4, 177)
      }
      .itemSeat{
        // margin-left:40px;
        // border: 1px solid #eee;
      }
      .itemTag{
        height: 20px;
      }
    }
  }
}
</style>
