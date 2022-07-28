<template>
  <el-container>
    <el-aside>
      <el-scrollbar>
        <div style="height: 400vh">
          <el-button @click="toRoute('about')">About</el-button>
          <el-button @click="toRoute('home')">Home</el-button>
        </div>
      </el-scrollbar>
    </el-aside>
    <el-main>
      <el-scrollbar>
        <div class="component-loader-wrapper">
          <slot />
        </div>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const toRoute = (nameRoutte) => {
  router.push({ name: nameRoutte });
};
</script>

<style scoped>
.el-aside {
  --el-aside-padding: 20px;
  padding: var(--el-aside-padding);
}

.component-loader-wrapper {
  position: relative;
}
</style>
