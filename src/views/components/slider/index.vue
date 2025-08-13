<script setup lang="ts">
import {
  Base,
  Step,
  Input,
  Size,
  Placement,
  Range,
  Vertical,
  Marks
} from "./components";

defineOptions({
  name: "PureSlider"
});
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <p class="font-medium">Slider</p>
        <el-link
          class="mt-2"
          href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/components/slider/index.vue"
          target="_blank"
        >
          Code location: src/views/components/slider/index.vue
        </el-link>
      </div>
    </template>
    <div class="mb-2">Basic Usage</div>
    <Base />
    <el-divider />
    <div class="mb-2">Discrete Value</div>
    <Step />
    <el-divider />
    <div class="mb-2">Slider with Input</div>
    <Input />
    <el-divider />
    <div class="mb-2">Different Sizes</div>
    <Size />
    <el-divider />
    <div class="mb-2">Position</div>
    <Placement />
    <el-divider />
    <div class="mb-2">Range Selection</div>
    <Range />
    <el-divider />
    <div class="mb-2">Vertical Mode</div>
    <Vertical />
    <el-divider />
    <div class="mb-2">Display Mark</div>
    <Marks class="mb-6" />
  </el-card>
</template>
