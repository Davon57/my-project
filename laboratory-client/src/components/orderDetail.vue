<template>
  <div class="detail-container">
    <div class="detail-header"><span @click="backList" class='iconLeft'><van-icon  name="arrow-left" />返回</span>座位预约</div>
    <div class="detail-main">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            class="bg"
            v-model="username"
            name="loginId"
            label="用户名"
            placeholder="请输入登录账号"
            :rules="[{ required: true, message: '用户名不能为空' }]"
          />
          <van-field
            class="bg"
            v-model="phone"
            type="phone"
            name="phone"
            label="手机号"
            placeholder="请输入手机号"
            :rules="[{ required: true, message: '手机号不能为空' }]"
          />
          <van-field
            class="bg"
            v-model="Calendarvalue"
            is-link
            readonly
            name="calendar"
            label="日期"
            placeholder="点击选择日期"
            @click="showCalendar = true"
            :rules="[{ required: true, message: '日期不能为空' }]"
          />
          <van-calendar v-model:show="showCalendar" @confirm="onConfirm" />
          <van-field
            class="bg"
            v-model="result"
            is-link
            readonly
            name="startTime"
            label="开始时间"
            placeholder="点击选择时间"
            @click="showPicker = true"
            :rules="[{ required: true, message: '开始时间不能为空' }]"
          />
          <van-popup v-model:show="showPicker" position="bottom">
            <van-datetime-picker
              type="time"
              @confirm="onConfirm1"
              @cancel="showPicker = false"
            />
          </van-popup>
          <van-field
            class="bg"
            v-model="result1"
            is-link
            readonly
            name="endTime"
            label="结束时间"
            placeholder="点击选择时间"
            @click="showPicker1 = true"
            :rules="[{ required: true, message: '结束时间不能为空' }]"
          />
          <van-popup v-model:show="showPicker1" position="bottom">
            <van-datetime-picker
              type="time"
              @confirm="onConfirm2"
              @cancel="showPicker = false"
            />
          </van-popup>
          </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
  </div>
</van-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Toast } from 'vant'
import { useRoute } from 'vue-router'
// import { toRaw } from '@vue/reactivity'
import * as orderServ from '../service/orderService'
import * as laboratoryServ from '../service/laboratoryService'
// 姓名与手机号的规则
const username = ref('')
const phone = ref('')
// 获取当前登录用户的信息
// 通过localStorage获取当前登录用户的信息
const userInfo = JSON.parse(localStorage.getItem('laboratory-client'))
const userLoginId = userInfo.loginUser.data.loginId
// 提交事件
const route = useRoute()
const onSubmit = (values) => {
  const pattern = /^(13|14|15|17|18|19)[0-9]{9}$/
  if (!pattern.test(phone.value)) {
    Toast('请输入正确的手机号')
    return false
  }
  if (values.loginId !== userLoginId) {
    Toast('请输入正确的用户名')
    return false
  }
  values.calendar = values.calendar.replace('/', '-')
  const timeStr = values.calendar + ' ' + values.startTime + '-' + values.endTime
  const order = {
    laboratoryId: route.params.id,
    loginId: values.loginId,
    ipone: values.phone,
    check: '未审核',
    orderTime: timeStr
  }
  // 获取当前实验室的信息
  const laboratory = {}
  const labId = {}
  laboratoryServ.getLaboratories(1, 1, order.laboratoryId).then(res => {
    labId.id = res.data.datas[0].id
    laboratory.laboratoryId = res.data.datas[0].laboratoryId
    laboratory.seat = res.data.datas[0].seat
    laboratory.state = '已预约'
  })

  orderServ.addOrder(order).then(res => {
    // 将实验室状态改为已预约
    laboratoryServ.updateLaboratory(labId.id, laboratory)
    Toast('已预约,请等待审核')
    history.go(-1)
  })
}
// 日期
const Calendarvalue = ref('')
const showCalendar = ref(false)
const onConfirm = (date) => {
  Calendarvalue.value = `${date.getMonth() + 1}/${date.getDate()}`
  showCalendar.value = false
}
// 开始时间选择
const result = ref('')
const showPicker = ref(false)
const onConfirm1 = (value) => {
  result.value = value
  showPicker.value = false
}
// 结束时间选择
const result1 = ref('')
const showPicker1 = ref(false)
const onConfirm2 = (value) => {
  result1.value = value
  showPicker1.value = false
}
// 返回列表
const backList = () => {
  history.go(-1)
}
</script>

<style lang="less" scoped>
.detail-container{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  background-color:#eee;
  .detail-header{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #fff;
    background-image: linear-gradient(to right, #6f97d6, #3caade, #00bad7, #21c7c5, #61d1ac);
    .iconLeft{
      margin-left: 20px;
      margin-right: 90px;
    }
  }
  .detail-main{
    width: 95%;
    margin-left: 10px;
    margin-top: 40px;
    .bg{
      margin-top:10px;
      height: 55px;
    }
  }
}

</style>
