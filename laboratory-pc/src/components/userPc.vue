<template>
  <div class="user-container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="id" label="Id" width="200" />
      <el-table-column prop="loginId" label="LoginId" width="300" />
      <el-table-column prop="loginPwd" label="LoginPwd" width="300" />
      <el-table-column prop="role" label="Role" width="200" />
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
    <el-button class="mt-4" style="width: 100%" @click="adduser"
    >Add User</el-button
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
import * as loginServ from '../service/loginService';

export default {
  setup() {
    const store = useStore();
    const tableData = reactive([]);

    const queryInfo = reactive({
      page: 1, // 分页的当前页码
      limit: 10, // 每页获取的数量
      total: null, // 用户列表的总数据数
    });
    // 通过sessionStorage获取当前登录用户的信息
    const userInfo = JSON.parse(sessionStorage.getItem('laboratory-client'));
    const userRole = userInfo.loginUser.data.role;
    // 获取用户列表
    async function getList() {
      const resp = await loginServ.getUsers(queryInfo.page, queryInfo.limit);
      queryInfo.total = resp.data.total;
      // eslint-disable-next-line no-restricted-syntax
      for (const key of resp.data.datas) {
        delete key.deletedAt;
        tableData.push(key);
      }
    }
    // 初始化表达第一页10个数据
    getList();

    function handleCurrentChange(newPage) {
      queryInfo.page = newPage;
      tableData.length = 0;
      getList();
    }

    // 更新用户信息
    async function updateUser(id, user) {
      const resp = await loginServ.updateUser(id, user);
      return resp;
    }
    // 删除用户信息
    async function deleteUser(id) {
      const resp = await loginServ.deleteUser(id);
      return resp;
    }
    // 删除操作
    const confirmEvent = (val) => {
      const userRow = toRaw(val);
      if (userRow.id === 1) {
        ElMessageBox.alert('超级管理员不能删除');
        return;
      }
      if (userRole === '1' && userRow.role === '1') {
        ElMessageBox.alert('你的权限无法对管理员进行删除');
        return;
      }
      deleteUser(userRow.id);
      tableData.length = 0;
      getList();
    };
    const cancelEvent = () => {
      ElMessage.success('取消成功');
    };
    // 新增用户信息
    async function addUser(user) {
      const resp = await loginServ.addUser(user);
      return resp;
    }
    // 新增操作
    async function adduser() {
      const user = {
        loginId: '',
        loginPwd: '',
        role: '',
      };
      ElMessageBox.prompt('Please input 2', '请输入用户权限', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern: /^[2]$/,
        inputErrorMessage: '输入的权限不符合规范',
      })
        .then(({ value }) => {
          user.role = value.toString();
          // 开始新增用户
          addUser(user);
          tableData.length = 0;
          getList();
          ElMessage({
            type: 'success',
            message: `新增用户权限为:${value}`,
          });
        });
      ElMessageBox.prompt('Please input userPassword', '请输入用户密码', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern: /^\w+$/, // 只能输入字母、数字、下划线
        inputErrorMessage: '输入的密码不符合规范',
      })
        .then(({ value }) => {
          user.loginPwd = value.toString();
          ElMessage({
            type: 'success',
            message: `新增用户密码为:${value}`,
          });
        });
      ElMessageBox.prompt('Please input userName', '请输入新增用户ID', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern: /^[\u4E00-\u9FA5\w]+$/, // 中文、英文、数字包括下划线
        inputErrorMessage: '输入的用户ID不符合规范',
      })
        .then(({ value }) => {
          user.loginId = value.toString();
          ElMessage({
            type: 'success',
            message: `新增用户ID为:${value}`,
          });
        });
    }

    // 更新用户权限
    const open = (val) => {
      const userRow = toRaw(val);
      const userRow1 = JSON.parse(JSON.stringify(userRow));
      delete userRow1.id;
      if (userRow.id === 1) {
        ElMessageBox.alert('超级管理员不能修改权限');
        return;
      }
      // 能否更改判断
      if (userRole === '1') {
        ElMessageBox.alert('管理员无法更改任何用户权限');
        return;
      }
      ElMessageBox.prompt('Please input 1 or 2', '请修改当前用户权限', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern: /^[12]$/,
        inputErrorMessage: 'Invalid number',
      })
        .then(({ value }) => {
          // 更换用户权限的值
          userRow1.role = value.toString();
          // 发送请求更改数据
          updateUser(userRow.id, userRow1);
          tableData.length = 0;
          getList();
          ElMessage({
            type: 'success',
            message: `Your permissions is:${value}`,
          });
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Input canceled',
          });
        });
    };

    return {
      tableData,
      store,
      queryInfo,
      handleCurrentChange,
      getList,
      open,
      updateUser,
      deleteUser,
      confirmEvent,
      cancelEvent,
      addUser,
      userInfo,
      userRole,
      adduser,
    };
  },
};
</script>

<style lang="less" scoped>
.user-container {
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
