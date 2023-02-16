<template>
  <div class="user">
    <div class="top">
      <!-- 添加 -->
      <el-button type="primary" @click="handleAdd">添加用户</el-button>

      <!-- 搜索框 -->
      <el-input
        class="search"
        v-model="searchValue"
        placeholder="请输入内容"
        clearable
      />

      <!-- 搜索 -->
      <el-button type="primary" @click="handleSearch">搜索</el-button>

      <!-- 重置 -->
      <el-button type="warning" @click="handleReset">重置</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="users" style="width: 100%">
      <el-table-column label="序号" type="index" width="100" />

      <el-table-column label="用户名" prop="username" width="180" />

      <el-table-column label="用户密码" prop="password" width="180" />

      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="添加用户"
      :show-close="false"
      width="40%"
    >
      <span>
        <el-form :model="form" label-width="80px">
          <!-- 单词名称 -->
          <el-form-item label="用户名称">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="用户密码">
            <el-input v-model="form.password" />
          </el-form-item>

          <!-- 确定取消 -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="handleCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </span>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElTable,
  ElTableColumn,
  ElButton,
  ElMessageBox,
  ElMessage
} from 'element-plus'
import { f } from 'ofetch/dist/error-8a55452d'
import { storeToRefs } from 'pinia'

import {
  registerApi,
  IUser,
  deleteUserById,
  getUserByName,
  updateUserById
} from '~~/service/user'
import { useUserStore } from '~~/store/user'

// 从store中获取用户数据
const userStorte = useUserStore()
const { users } = storeToRefs(userStorte)

// 控制展示对话框
const dialogVisible = ref(false)

// 搜索内容
const searchValue = ref('')

// 表单数据
const form = reactive({
  id: 0,
  username: '',
  password: ''
})

// 触发获取单词数据的action
userStorte.fetchUserList()

// 搜索
function handleSearch() {
  userStorte.fetchUserByName(searchValue.value)
}

// 重置
function handleReset() {
  userStorte.fetchUserList()
  searchValue.value = ''
}

// 添加用户
function handleAdd() {
  form.id = 0
  dialogVisible.value = true
}

// 提交表单
const onSubmit = () => {
  if (form.id === 0) {
    // 添加用户
    registerApi(form.username, form.password).then((res) => {
      if (res.data.value?.code !== 0) {
        ElMessage.error(res.data.value?.msg)
      }

      dialogVisible.value = false
      // 添加成功后重新获取用户列表
      userStorte.fetchUserList()
    })
  } else {
    // 更新用户
    updateUserById(form.id + '', form.username, form.password).then((res) => {
      dialogVisible.value = false
      // 添加成功后重新获取用户列表
      userStorte.fetchUserList()
    })
  }
}

// 取消表单
function handleCancel() {
  dialogVisible.value = false

  // 重置数据
  form.username = ''
  form.password = ''
}

// 编辑用户
const handleEdit = (index: number, row: IUser) => {
  form.id = row.id as number
  form.username = row.username as string
  form.password = row.password as string
  dialogVisible.value = true
}

// 删除用户
const handleDelete = (index: number, row: IUser) => {
  ElMessageBox.confirm('您确定要删除吗?', {
    distinguishCancelAndClose: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
    .then(() => {
      deleteUserById(row.id + '').then((res) => {
        console.log('res', res)
        // 删除后查询获取单词列表
        userStorte.fetchUserList()
      })
    })
    .catch(() => {
      // catch error
    })
}
</script>

<style lang="scss" scoped>
.user {
  padding: 20px;

  .top {
    display: flex;
    gap: 20px;

    .search {
      width: 250px;
      border-radius: 10px;
    }
  }
}
</style>
