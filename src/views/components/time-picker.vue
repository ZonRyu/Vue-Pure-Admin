<script setup lang="ts">
import { ref, watch } from "vue";

defineOptions({
  name: "TimePicker"
});

const size = ref("default");
const dynamicSize = ref();

/** Time Picker */
const value = ref("");
const value1 = ref("");
const value3 = ref();

const value2 = ref(new Date(2016, 9, 10, 18, 30));

const makeRange = (start: number, end: number) => {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};
const disabledHours = () => {
  return makeRange(0, 16).concat(makeRange(19, 23));
};
const disabledMinutes = (hour: number) => {
  if (hour === 17) {
    return makeRange(0, 29);
  }
  if (hour === 18) {
    return makeRange(31, 59);
  }
};
const disabledSeconds = (hour: number, minute: number) => {
  if (hour === 18 && minute === 30) {
    return makeRange(1, 59);
  }
};

watch(size, val =>
  val === "disabled"
    ? (dynamicSize.value = "default")
    : (dynamicSize.value = size.value)
);

/** Time Selection */
const value4 = ref("");
const value5 = ref("");
const startTime = ref("");
const endTime = ref("");
</script>

<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <el-space wrap :size="40">
            <el-link
              v-tippy="{
                content: 'Click to view detailed documentation'
              }"
              href="https://element-plus.org/zh-CN/component/time-picker.html"
              target="_blank"
              style="font-size: 16px; font-weight: 800"
            >
              Time Picker
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
          href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/components/time-picker.vue"
          target="_blank"
        >
          Code location: src/views/components/time-picker.vue
        </el-link>
      </template>

      <div class="mb-2">Date and Time Selection</div>
      <el-space wrap>
        <p class="text-[15px]">Use mouse wheel to select</p>
        <el-time-picker
          v-model="value"
          placeholder="Select time"
          class="w-[140px]!"
          :size="dynamicSize"
          :disabled="size === 'disabled'"
        />
        <p class="text-[15px]">Use arrows to select</p>
        <el-time-picker
          v-model="value1"
          arrow-control
          placeholder="Select time"
          class="w-[140px]!"
          :size="dynamicSize"
          :disabled="size === 'disabled'"
        />
      </el-space>
      <el-divider />

      <div class="mb-2">Time Range Restrictions</div>
      <el-time-picker
        v-model="value2"
        class="w-[140px]!"
        :disabled-hours="disabledHours"
        :disabled-minutes="disabledMinutes"
        :disabled-seconds="disabledSeconds"
        placeholder="Arbitrary time"
        :size="dynamicSize"
        :disabled="size === 'disabled'"
      />
      <el-divider />

      <div class="mb-2">Arbitrary Time Range</div>
      <el-time-picker
        v-model="value3"
        class="w-[220px]!"
        is-range
        range-separator="to"
        start-placeholder="Start time"
        end-placeholder="End time"
        :size="dynamicSize"
        :disabled="size === 'disabled'"
      />
    </el-card>

    <el-card shadow="never" class="mt-4">
      <template #header>
        <div class="card-header">
          <el-link
            v-tippy="{
              content: 'Click to view detailed documentation'
            }"
            href="https://element-plus.org/zh-CN/component/time-select.html"
            target="_blank"
            style="font-size: 16px; font-weight: 800"
          >
            Time Select
          </el-link>
        </div>
      </template>

      <div class="mb-2">Fixed Time Points</div>
      <el-time-select
        v-model="value4"
        placeholder="Select time"
        class="w-[140px]!"
        start="08:30"
        step="00:15"
        end="18:30"
        :size="dynamicSize"
        :disabled="size === 'disabled'"
      />

      <div class="mb-2 mt-4">Time Format</div>
      <el-time-select
        v-model="value5"
        placeholder="Select time"
        class="w-[140px]!"
        start="00:00"
        step="00:30"
        end="23:59"
        format="hh:mm A"
        :size="dynamicSize"
        :disabled="size === 'disabled'"
      />

      <div class="mb-2 mt-4">Fixed Time Range</div>
      <el-space wrap>
        <el-time-select
          v-model="startTime"
          placeholder="Start time"
          class="w-[140px]!"
          :max-time="endTime"
          start="08:30"
          step="00:15"
          end="18:30"
          :size="dynamicSize"
          :disabled="size === 'disabled'"
        />
        <el-time-select
          v-model="endTime"
          placeholder="End time"
          class="w-[140px]!"
          :min-time="startTime"
          start="08:30"
          step="00:15"
          end="18:30"
          :size="dynamicSize"
          :disabled="size === 'disabled'"
        />
      </el-space>
    </el-card>
  </div>
</template>
