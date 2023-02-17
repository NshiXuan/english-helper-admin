<template>
  <div class="collect">
    <div class="top">
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
    <el-table :data="collects" style="width: 100%">
      <el-table-column label="序号" type="index" width="100" />

      <el-table-column label="收藏夹名称" prop="name" width="180" />

      <el-table-column label="用户" prop="user.username" width="180" />

      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>

  <div class="footer">添加、编辑交给用户，管理只负责删除</div>
</template>

<script setup lang="ts">
import {
  ElInput,
  ElTable,
  ElTableColumn,
  ElButton,
  ElMessageBox
} from 'element-plus'
import { storeToRefs } from 'pinia'
import { deleteCollectAPI, ICollect } from '~~/service/collect'

import { useCollectStore } from '~~/store/collect'

// 从store中获取用户数据
const collectStore = useCollectStore()
const { collects } = storeToRefs(collectStore)

// 搜索内容
const searchValue = ref('')

// 触发获取单词数据的action
collectStore.fetchCollectList()

// 搜索
function handleSearch() {
  collectStore.fetchCollectByName(searchValue.value)
}

// 重置
function handleReset() {
  collectStore.fetchCollectList()
  searchValue.value = ''
}

// 删除用户
const handleDelete = (index: number, row: ICollect) => {
  ElMessageBox.confirm('您确定要删除吗?', {
    distinguishCancelAndClose: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
    .then(() => {
      deleteCollectAPI(row.id as number).then((res) => {
        collectStore.fetchCollectList()
      })
    })
    .catch(() => {
      // catch error
    })
}
</script>

<style lang="scss" scoped>
.collect {
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

.footer {
  margin: 20px 0;
  text-align: center;
}
</style>
