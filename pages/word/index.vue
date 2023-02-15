<template>
  <div class="word">
    <div class="top">
      <!-- 添加 -->
      <el-button type="primary" @click="handleAdd">添加单词</el-button>

      <!-- 搜索框 -->
      <el-input
        class="search"
        v-model="searchValue"
        placeholder="请输入内容"
        clearable
      />

      <!-- 搜索 -->
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="words" style="width: 100%">
      <el-table-column label="序号" type="index" width="100" />

      <el-table-column label="单词" prop="word" width="180" />

      <el-table-column label="中文" prop="mean_cn" width="180" />

      <el-table-column label="46级" prop="level" width="100" />

      <el-table-column label="例句" prop="sentences[0].sentence" width="400">
      </el-table-column>

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
      title="添加单词"
      :show-close="false"
      width="40%"
    >
      <span>
        <el-form :model="form" label-width="80px">
          <!-- 单词名称 -->
          <el-form-item label="单词名称">
            <el-input v-model="form.word" />
          </el-form-item>

          <!-- 中文 -->
          <el-form-item label="中文">
            <el-input v-model="form.mean_cn" />
          </el-form-item>

          <el-form-item label="46级">
            <el-select
              v-model="form.level"
              class="m-2"
              placeholder="Select"
              size="large"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <!-- 例句 -->
          <el-form-item label="例句">
            <el-button type="primary" @click="handleAddSentence"
              >添加例句</el-button
            >
            <el-button type="danger" @click="handleDeleteSentence"
              >删除例句</el-button
            >
          </el-form-item>
          <template v-for="(item, index) in form.sentences">
            <el-form-item label="英语例句">
              <el-input v-model="form.sentences[index].sentence" />
            </el-form-item>
            <el-form-item label="中文翻译">
              <el-input v-model="form.sentences[index].sentence_cn" />
            </el-form-item>
          </template>

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
  ElSelect,
  ElOption
} from 'element-plus'
import { storeToRefs } from 'pinia'
import { useHomeStore } from '~~/store/home'

import { deleteWorById, IWord, addWorById } from '~~/service/word'

// 从store中获取单词数据
const homeStore = useHomeStore()
const { words } = storeToRefs(homeStore)

// 控制展示对话框
const dialogVisible = ref(false)

// 搜索内容
const searchValue = ref('')

// 表单数据
const form = reactive({
  word: '',
  mean_cn: '',
  level: '',
  sentences: [
    {
      sentence: '',
      sentence_cn: ''
    }
  ]
})

const options = [
  {
    value: 4,
    label: '4级'
  },
  {
    value: 6,
    label: '6级'
  }
]

// 触发获取单词数据的action
homeStore.fetchWordList()

// 搜索
function handleSearch() {
  homeStore.fetchWordByName(searchValue.value)
}

// 添加单词
function handleAdd() {
  dialogVisible.value = true
}

// 添加例句
function handleAddSentence() {
  form.sentences.push({
    sentence: '',
    sentence_cn: ''
  })
}

// 删除例句
function handleDeleteSentence() {
  form.sentences.pop()
}

// 提交表单
const onSubmit = () => {
  console.log('submit!')
  dialogVisible.value = false
  console.log(form)
  addWorById(form.word, form.mean_cn, +form.level, form.sentences).then(
    (res) => {
      console.log(res)
      // 添加成功后重新获取单词列表
      homeStore.fetchWordList()
    }
  )
}

// 取消表单
function handleCancel() {
  dialogVisible.value = false

  // 重置数据
  form.word = ''
  form.mean_cn = ''
  form.sentences = [
    {
      sentence: '',
      sentence_cn: ''
    }
  ]
}

// 编辑单词
const handleEdit = (index: number, row: IWord) => {
  console.log(index, row)
}

// 删除单词
const handleDelete = (index: number, row: IWord) => {
  ElMessageBox.confirm('您确定要删除吗?', {
    distinguishCancelAndClose: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
    .then(() => {
      deleteWorById(row.id + '').then((res) => {
        console.log('res', res)
        // 删除后查询获取单词列表
        homeStore.fetchWordList()
      })
    })
    .catch(() => {
      // catch error
    })
}
</script>

<style lang="scss" scoped>
.word {
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
