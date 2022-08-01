<template>
  <div class="laboratory-container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="id" label="Id" width="200" />
      <el-table-column prop="laboratoryId" label="LaboratoryId" width="300" />
      <el-table-column prop="seat" label="Seat" width="300" />
      <el-table-column prop="state" label="State" width="200" />
      <el-table-column fixed="right" label="Operations" width="270">
        <template v-slot="scope">
          <el-button type="text" size="small" @click="open(scope.row)"
          >Update</el-button>
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
    <el-button class="mt-4" style="width: 100%" @click="addLab"
    >Add Laboratory</el-button
  >
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
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { toRaw } from '@vue/reactivity';
// import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
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
      // 获取所有实验室列表
      const resp = await laboratoryServ.getLaboratories(queryInfo.page, queryInfo.limit);
      queryInfo.total = resp.data.total;
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

    // 更新实验室信息
    async function updateLaboratory(id, laboratory) {
      const resp = await laboratoryServ.updateLaboratory(id, laboratory);
      return resp;
    }
    // 删除实验室信息
    async function deleteLaboratory(id) {
      const resp = await laboratoryServ.deleteLaboratory(id);
      return resp;
    }
    // 新增实验室信息
    async function addLaboratory(laboratory) {
      const resp = await laboratoryServ.addLaboratory(laboratory);
      return resp;
    }
    // 删除操作
    const confirmEvent = (val) => {
      const laboratoryRow = toRaw(val);
      deleteLaboratory(laboratoryRow.id);
      tableData.length = 0;
      getList();
      ElMessage.success('删除成功');
    };
    const cancelEvent = () => {
      ElMessage.success('取消成功');
    };

    // 更新操作
    const open = (val) => {
      const laboratoryRow = toRaw(val);
      const laboratoryRow1 = JSON.parse(JSON.stringify(laboratoryRow));
      delete laboratoryRow1.id;
      // console.log(laboratoryRow, laboratoryRow1);
      ElMessageBox.prompt('Please input 2~3位数字编码', '请新的实验室座位数', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern: /^\d{2,3}$/,
        inputErrorMessage: '输入的座位数不符合规范',
      })
        .then(({ value }) => {
          // 更改实验室座位数
          laboratoryRow1.seat = value.toString();
          // 更改实验室信息
          updateLaboratory(laboratoryRow.id, laboratoryRow1);
          tableData.length = 0;
          getList();
          ElMessage({
            type: 'success',
            message: `座位号已更改为:${value}`,
          });
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Input canceled',
          });
        });
      ElMessageBox.prompt('Please input 4~6位数字编码', '请输入新的实验室ID', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern: /^\d{4,6}$/,
        inputErrorMessage: '输入的ID不符合规范',
      })
        .then(({ value }) => {
          // 更换实验室编号的值
          laboratoryRow1.laboratoryId = value.toString();
          ElMessage({
            type: 'success',
            message: `实验室编号已更改为:${value}`,
          });
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Input canceled',
          });
        });
    };
    // 新增操作
    async function addLab() {
      const laboratory = {
        laboratoryId: '',
        seat: '',
        state: '',
      };
      ElMessageBox.prompt('Please input 1', '请输入实验室状态', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern: /^[1]$/,
        inputErrorMessage: '输入的状态不符合规范',
      })
        .then(({ value }) => {
          if (value === '1') {
            laboratory.state = '空闲';
          }
          // laboratory.state = value.toString();
          // 开始新增实验室
          addLaboratory(laboratory);
          tableData.length = 0;
          getList();
          ElMessage({
            type: 'success',
            message: `新增实验室状态为:${value}`,
          });
        });
      ElMessageBox.prompt('Please input 2~3位数字编码', '请新的实验室座位数', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern: /^\d{2,3}$/,
        inputErrorMessage: '输入的座位数不符合规范',
      })
        .then(({ value }) => {
          laboratory.seat = value.toString();
          ElMessage({
            type: 'success',
            message: `新增座位号为:${value}`,
          });
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Input canceled',
          });
        });
      ElMessageBox.prompt('Please input 4~6位数字编码', '请输入实验室ID', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern: /^\d{4,6}$/,
        inputErrorMessage: '输入的ID不符合规范',
      })
        .then(({ value }) => {
          laboratory.laboratoryId = value.toString();
          ElMessage({
            type: 'success',
            message: `新增实验室编号为:${value}`,
          });
        });
    }
    return {
      tableData,
      store,
      queryInfo,
      handleCurrentChange,
      getList,
      updateLaboratory,
      open,
      deleteLaboratory,
      addLaboratory,
      addLab,
      confirmEvent,
      cancelEvent,
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
