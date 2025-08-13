<script setup lang="ts">
import { ref } from "vue";

const value1 = ref(0);
const value2 = ref(10);
const value3 = ref(0);
const value4 = ref(0);
const value5 = ref(0);

const formatTooltip = (val: number) => {
  return val / 100;
};
</script>

<template>
  <div class="slider-demo-block">
    <span class="demonstration">Default value</span>
    <el-slider v-model="value1" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Custom initial value</span>
    <el-slider v-model="value2" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Hide Tooltip</span>
    <el-slider v-model="value3" :show-tooltip="false" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Format Tooltip</span>
    <el-slider v-model="value4" :format-tooltip="formatTooltip" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Disabled</span>
    <el-slider v-model="value5" disabled />
  </div>
</template>

<style lang="scss" scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
  max-width: 600px;
}

.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}

.slider-demo-block .demonstration {
  flex: 1;
  margin-bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 44px;
  color: var(--el-text-color-secondary);
  white-space: nowrap;
}

.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}
</style>
