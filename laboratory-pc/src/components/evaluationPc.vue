<template>
  <div class="laboratory-container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="id" label="Id" width="150" />
      <el-table-column prop="loginId" label="LoginId" width="250" />
      <el-table-column prop="text" label="Text" width="400" />
      <el-table-column prop="evaluationTime" label="EvaluationTime" width="260" />
      <el-table-column fixed="right" label="Operations" width="200">
        <template v-slot="scope">
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
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { toRaw } from '@vue/reactivity';
// import axios from 'axios';
import { ElMessage } from 'element-plus';
import * as evaluationServ from '../service/evaluationService';

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
      // 获取所有评论列表
      const resp = await evaluationServ.getEvaluations(queryInfo.page, queryInfo.limit);
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
    // 删除评论信息
    async function deleteEvaluation(id) {
      const resp = await evaluationServ.deleteEvaluation(id);
      return resp;
    }

    // 删除操作
    const confirmEvent = (val) => {
      const evaluationRow = toRaw(val);
      deleteEvaluation(evaluationRow.id);
      tableData.length = 0;
      getList();
      ElMessage.success('删除成功');
    };
    const cancelEvent = () => {
      ElMessage.success('取消成功');
    };
    return {
      tableData,
      store,
      queryInfo,
      handleCurrentChange,
      getList,
      confirmEvent,
      cancelEvent,
      deleteEvaluation,
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
