<template>
  <div class="check-container">
      <div class="check-header">
          <span @click="backHome" class="backHome"><van-icon name="arrow-left" /></span>
          <span>预约审核</span>
      </div>
      <div class="check-title">
          <van-dropdown-menu active-color="#1989fa">
            <van-dropdown-item v-model="value1" :options="option1" />
            <van-dropdown-item v-model="value2" :options="option2" @click="optionBtn" />
          </van-dropdown-menu>
      </div>
      <div class="check-main">
          <li class="check-item" v-for="item in orderList" :key="item" @click="checkBtn(item)">
              <div class="check-left">
                 <span class="bg bgLab">实验室: {{item.laboratoryId}}</span>
                <span class="bg">预约人: {{item.loginId}}</span>
                <span class="bg bgTime">预约时间: {{item.orderTime}}</span>
              </div>
              <van-tag class="check-tag" :type=item.checkColor>{{item.check}}</van-tag>
          </li>
          <van-popup round v-model:show="show" position="top" :style="{ height: '15%' }" @close="popupClose">
              <van-radio-group v-model="checked" @change="onChange" direction="horizontal" class="radioBtn">
                <van-radio name="1">通过审核</van-radio>
                <van-radio name="2">审核不通过</van-radio>
              </van-radio-group>

          </van-popup>
      </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import * as orderServ from '../service/orderService'
import * as labServ from '../service/laboratoryService'
import { Dialog } from 'vant'
// 审批操作
const checked = ref('1')
function onChange (val) {
  checked.value = val
}
const show = ref(false)
// 获取当前实验室信息
const labId = {}
const labora = {}
// 点击item时弹出审批框
function checkBtn (item) {
  if (item.check === '未审核') {
    labServ.getLaboratories(1, 1, item.laboratoryId).then(res => {
      labId.id = res.data.datas[0].id
      labora.laboratoryId = res.data.datas[0].laboratoryId
      labora.seat = res.data.datas[0].seat
      labora.state = '空闲'
    })
    show.value = true
    order.laboratoryId = item.laboratoryId
    order.orderTime = item.orderTime
    order.loginId = item.loginId
    order.ipone = item.ipone
    id = item.id
  } else {
    Dialog.alert({
      message: '该预约已审核，无法再次审核'
    })
  }
}
// 关闭弹窗触发事件
function popupClose () {
  if (checked.value === '1') {
    order.check = '通过审核'
  } else {
    order.check = '审核不通过'
    labServ.updateLaboratory(labId.id, labora)
  }
  updateOrder(id, order)
  history.go(0)
}

// 最新的订单信息
let id = ''
const order = {
  laboratoryId: '',
  loginId: '',
  ipone: '',
  orderTime: '',
  check: ''
}
// 更改订单的审核状态
function updateOrder (id, order) {
  orderServ.updateOrder(id, order)
}

// 分类title
const value1 = ref(0)
const value2 = ref('a')
const option1 = [
  { text: '全部', value: 0 },
  { text: '审核', value: 1 }
]
const option2 = [
  { text: '全部', value: 'a' },
  { text: '未审核', value: 'b' },
  { text: '通过审核', value: 'c' },
  { text: '审核不通过', value: 'd' }
]
function optionBtn () {
  if (value2.value === 'a') {
    orderList.length = 0
    getList(1, 1000)
  } else if (value2.value === 'b') {
    orderList.length = 0
    getList(1, 1000, '未审核')
  } else if (value2.value === 'c') {
    orderList.length = 0
    getList(1, 1000, '通过审核')
  } else if (value2.value === 'd') {
    orderList.length = 0
    getList(1, 1000, '审核不通过')
  }
}
// 获取订单列表操作
const orderList = reactive([])
getList(1, 1000)
// 获取订单列表
async function getList (page, limit, keywords) {
  const resp = await orderServ.getOrders(page, limit, keywords)
  for (const key of resp.data.datas) {
    if (key.check === '未审核') {
      key.checkColor = 'primary'
    } else if (key.check === '通过审核') {
      key.checkColor = 'success'
    } else if (key.check === '审核不通过') {
      key.checkColor = 'danger'
    }
    orderList.push(key)
  }
}
// 返回首页
function backHome () {
  history.go(-1)
}

</script>

<style lang="less" scoped>
::-webkit-scrollbar{
display:none;
}
.check-container{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
    background-color: #eee;
    .check-header{
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        color: #fff;
        font-size: 15px;
        overflow-y: hidden;
        background-image: linear-gradient(to right, #6f97d6, #3caade, #00bad7, #21c7c5, #61d1ac);
        .backHome{
            margin-left: 20px;
            margin-right: 130px;
        }
    }
    .check-main{
        width: 90%;
        height: calc(100% - 50px);
        margin: 0 auto;
        padding: 0;
        overflow-y: scroll;
        list-style: none;
        // background-color: #fff;
        .check-item{
            width: 100%;
            height: 100px;
            margin: 10px auto;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #fff;
            border-bottom: 2px solid;
            border-image: linear-gradient(90deg, rgba(0, 216, 247, 0) 0%, #00afed 100%) 2 2 2 2;
            .check-left {
                width: 50%;
                display: flex;
                flex-direction: column;
                justify-content:center;
                .bg{
                    margin-left: 20px;
                    margin-bottom: 10px;
                }
                .bgLab{
                font-size: 16px;
                margin-top: 10px;
                }
                .bgTime{
                    margin-bottom: 10px;
                }
            }
            .check-tag{
                margin-right: 20px;
            }
        }
        .radioBtn{
            width: 250px;
            height: 50px;
            margin: 30px auto;
            font-size: 18px;
        }
    }
}
</style>
