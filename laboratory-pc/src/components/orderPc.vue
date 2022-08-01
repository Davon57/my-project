<template>
  <div class="laboratory-container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="id" label="Id" width="100" />
      <el-table-column prop="laboratoryId" label="LaboratoryId" width="200" />
      <el-table-column prop="loginId" label="LoginId" width="250" />
      <el-table-column prop="ipone" label="Ipone" width="150" />
      <el-table-column prop="check" label="Check" width="150" />
      <el-table-column prop="orderTime" label="OrderTime" width="230" />
      <el-table-column fixed="right" label="Operations" width="200">
        <template v-slot="scope">
          <el-button type="text" size="small" @click="DialogEvent(scope.row)"
              >Check</el-button>
          <!-- 审核按钮弹出的弹框 -->
          <el-dialog
            v-model="dialogRadioVisible"
            title="预约审核"
            width="30%"
          >
          <el-radio v-model="radio" label="通过审核" size="large">通过审核</el-radio>
          <el-radio v-model="radio" label="审核不通过" size="large">审核不通过</el-radio>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogRadioVisible = false">Cancel</el-button>
              <el-button type="primary" @click="DialogClose"
                >Confirm</el-button
              >
            </span>
          </template>
        </el-dialog>
        <!-- 删除操作的弹窗 -->
          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            icon-color="red"
            title="Are you sure to delete this?"
            @confirm="confirmEvent(scope.row)"
            @cancel="cancelEvent"
          >
            <template #reference>
              <el-button type="text" size="small">Delete</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="elpage"
      v-model:current-page="queryInfo.page"
      background
      layout="prev, pager, next"
      :total="queryInfo.total"
      :page-size="queryInfo.limit"
      :page-sizes="[1, 2, 5, 10]"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import { toRaw } from '@vue/reactivity';
// import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import * as orderServ from '../service/orderService';
import * as laboratoryServ from '../service/laboratoryService';

export default {
  setup() {
    const store = useStore();
    const tableData = reactive([]);

    const queryInfo = reactive({
      page: 1, // 分页的当前页码
      limit: 10, // 每页获取的数量
      total: null, // 用户列表的总数据数
    });
    async function getList() {
      // 获取所有订单列表
      const resp = await orderServ.getOrders(queryInfo.page, queryInfo.limit);
      queryInfo.total = resp.data.total;
      // console.log(resp.data);
      // eslint-disable-next-line no-restricted-syntax
      for (const key of resp.data.datas) {
        delete key.deletedAt;
        tableData.push(key);
      }
    }
    // 初始化表达第一页10个数据
    getList();

    // 分页改变的时候触发
    function handleCurrentChange(newPage) {
      queryInfo.page = newPage;
      tableData.length = 0;
      getList();
    }
    // 删除订单信息
    async function deleteOrder(id) {
      const resp = await orderServ.deleteOrder(id);
      return resp;
    }

    // 删除操作
    const confirmEvent = (val) => {
      const orderRow = toRaw(val);
      deleteOrder(orderRow.id);
      tableData.length = 0;
      getList();
      ElMessage.success('删除成功');
    };
    const cancelEvent = () => {
      ElMessage.success('取消成功');
    };
    // 审核弹出操作
    const dialogRadioVisible = ref(false);
    const radio = ref('通过审核');
    // 定义一个变量用于存储当前行的数据
    const currentRow = {};
    const orderId = {};
    function DialogEvent(val) {
      const orderRow = toRaw(val);
      if (orderRow.check === '通过审核' || orderRow.check === '审核不通过') {
        ElMessage.warning('已审核过，不能再审核');
        return;
      }
      dialogRadioVisible.value = true;
      orderId.id = orderRow.id;
      currentRow.data = orderRow;
    }
    function DialogClose() {
      dialogRadioVisible.value = false;
      // 查询当前实验室的状态信息
      const labId = {};
      const labora = {};
      laboratoryServ.getLaboratories(1, 1, currentRow.data.laboratoryId).then((resp) => {
        labId.id = resp.data.datas[0].id;
        labora.laboratoryId = resp.data.datas[0].laboratoryId;
        labora.seat = resp.data.datas[0].seat;
        labora.state = '空闲';
      });
      currentRow.data.check = radio.value;
      orderServ.updateOrder(orderId.id, currentRow.data).then(() => {
        if (currentRow.data.check === '审核不通过') {
          laboratoryServ.updateLaboratory(labId.id, labora);
        }
      });
      // eslint-disable-next-line no-restricted-globals
      history.go(0);
    }
    return {
      tableData,
      store,
      queryInfo,
      handleCurrentChange,
      getList,
      confirmEvent,
      cancelEvent,
      deleteOrder,
      dialogRadioVisible,
      radio,
      DialogClose,
      DialogEvent,
      currentRow,
      orderId,
    };
  },
};
</script>

<style lang="less" scoped>
.laboratory-container {
  width: 100%;
  height: 100%;
  background-color: #eee;
  .elpage{
    position:fixed;
    right: 40px;
    bottom: 110px;
  }
  li {
    list-style: none;
    border: 1px solid red;
  }
}
</style>
