<script setup lang="ts">
import { ref, watch } from "vue";
// https://plus-pro-components.com/components/check-card-group.html
import "plus-pro-components/es/components/check-card-group/style/css";
import { PlusCheckCardGroup } from "plus-pro-components";

defineOptions({
  name: "CheckCard"
});

const size = ref("default");
const dynamicSize = ref();
const list = ref("0");
const list1 = ref([]);

const options = [
  {
    title: "Title One",
    value: "0",
    description: "Hold onto your dreams and achieve extraordinary things",
    avatar:
      "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
  },
  {
    title: "Title Two",
    value: "1",
    description: "Every effort is an opportunity for growth",
    avatar:
      "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg"
  }
];

watch(size, val =>
  val === "disabled"
    ? (dynamicSize.value = "default")
    : (dynamicSize.value = size.value)
);
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <el-space wrap :size="40">
          <el-link
            v-tippy="{
              content: 'Click to view detailed documentation'
            }"
            href="https://plus-pro-components.com/components/check-card-group.html"
            target="_blank"
            style="font-size: 16px; font-weight: 800"
          >
            Check Card Group
          </el-link>
          <el-radio-group v-model="size">
            <el-radio value="large">Large</el-radio>
            <el-radio value="default">Default</el-radio>
            <el-radio value="small">Small</el-radio>
            <el-radio value="disabled">Disabled</el-radio>
          </el-radio-group>
        </el-space>
      </div>
      <el-link
        class="mt-2"
        href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/components/check-card.vue"
        target="_blank"
      >
        Code location: src/views/components/check-card.vue
      </el-link>
    </template>

    <div class="mb-2 mt-4">Single Selection</div>
    <PlusCheckCardGroup
      v-model="list"
      :options="options"
      :size="dynamicSize"
      :disabled="size === 'disabled'"
    />

    <div class="mb-2 mt-4">Multiple Selection</div>
    <PlusCheckCardGroup
      v-model="list1"
      :options="options"
      :size="dynamicSize"
      :disabled="size === 'disabled'"
      multiple
    />
  </el-card>
</template>
