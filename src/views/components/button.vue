<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "ButtonPage"
});

const { VITE_PUBLIC_PATH } = import.meta.env;

const url = ref(`${VITE_PUBLIC_PATH}html/button.html`);
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">Introduce button page through iframe</span>
      </div>
      <el-link
        class="mt-2"
        href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/components/button.vue"
        target="_blank"
      >
        Code location src/views/components/button.vue
      </el-link>
    </template>
    <iframe :src="url" frameborder="0" class="iframe w-full h-[60vh]" />
  </el-card>
</template>
