<script setup lang="ts">
import { ref } from "vue";
import { list } from "./high/list";

defineOptions({
  name: "PureTableHigh"
});

const selected = ref(0);

function tabClick({ index }) {
  selected.value = index;
}
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
          Advanced usage fully utilizes TSX syntax to maximize the flexibility of
          <el-link
            href="https://github.com/pure-admin/pure-admin-table"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            @pureadmin/table
          </el-link>
          , allowing you to maintain the entire table by simply configuring the columns
        </span>
      </div>
      <el-link
        class="mt-2"
        href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/table/high"
        target="_blank"
      >
        Code location: src/views/table/high
      </el-link>
    </template>

    <el-alert
      title="All tables in advanced usage have row-key set. The backend needs to return a field with unique values, such as id. Purpose: 1. To optimize Table rendering, especially when fields are in deep structures; 2. To prevent internal confusion in table components after dragging (required for drag and drop functionality)"
      type="info"
      :closable="false"
    />

    <el-tabs @tab-click="tabClick">
      <template v-for="(item, index) of list" :key="item.key">
        <el-tab-pane :lazy="true">
          <template #label>
            <span
              v-tippy="{
                maxWidth: 'none',
                content: `(Example ${index + 1}) ${item.content}`
              }"
            >
              {{ item.title }}
            </span>
          </template>
          <component :is="item.component" v-if="selected == index" />
        </el-tab-pane>
      </template>
    </el-tabs>
  </el-card>
</template>

<style scoped>
:deep(.el-tabs__nav-wrap)::after {
  height: 1px;
}

:deep(.el-tabs__header) {
  margin-top: 10px;
}

:deep(.el-alert__title) {
  font-size: 15px;
}

:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
  font-size: 16px;
  color: var(--el-text-color-primary);
}

:deep(.el-tabs__nav-next.is-disabled),
:deep(.el-tabs__nav-prev.is-disabled) {
  opacity: 0.5;
}
</style>
