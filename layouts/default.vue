<template>
  <div class="layout">
    <div class="right">
      <el-menu
        :default-active="currentIndex"
        class="el-menu-vertical-demo"
        background-color="#15152B"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/">
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="user">
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="word">
          <span>单词管理</span>
        </el-menu-item>
        <el-menu-item index="collect">
          <span>收藏夹管理</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="left">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMenu, ElMenuItem } from 'element-plus'

// 刷新路由获取路径赋给currentIndex
const route = useRoute()
const currentIndex = ref(route.name as string)
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo {
  width: 150px;
  height: 100vh;
}

.layout {
  display: flex;
  gap: 10px;
  .right {
    width: 150px;
    height: 100vh;
  }

  .left {
    flex: 1;
  }
}
</style>
