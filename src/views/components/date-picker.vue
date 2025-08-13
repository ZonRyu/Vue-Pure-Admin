<script setup lang="ts">
import { ref, watch } from "vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

defineOptions({
  name: "DatePicker"
});

const size = ref("default");
const dynamicSize = ref();

const value = ref("");
const shortcuts = [
  {
    text: "Today",
    value: new Date()
  },
  {
    text: "Yesterday",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      return date;
    }
  },
  {
    text: "One week ago",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      return date;
    }
  }
];

const disabledDate = (time: Date) => {
  return time.getTime() > Date.now();
};

const value1 = ref("");
const value2 = ref("");
const value3 = ref("");
const value4 = ref("");

const value5 = ref("");
const shortcuts1 = [
  {
    text: "Last week",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    }
  },
  {
    text: "Last month",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    }
  },
  {
    text: "Three months ago",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    }
  }
];

const value6 = ref("");
const shortcuts2 = [
  {
    text: "This month",
    value: [new Date(), new Date()]
  },
  {
    text: "This year",
    value: () => {
      const end = new Date();
      const start = new Date(new Date().getFullYear(), 0);
      return [start, end];
    }
  },
  {
    text: "Six months ago",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setMonth(start.getMonth() - 6);
      return [start, end];
    }
  }
];

const value7 = ref("");
const dateFormat = ref("");

const value8 = ref("");

const value9 = ref("2023-10-30");
const holidays = [
  "2023-10-22",
  "2023-10-23",
  "2023-10-24",
  "2023-10-25",
  "2023-10-26",
  "2023-10-27",
  "2023-10-28",
  "2023-10-29",
  "2023-10-30",
  "2023-10-31"
];

const isHoliday = ({ dayjs }) => {
  return holidays.includes(dayjs.format("YYYY-MM-DD"));
};

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
            href="https://element-plus.org/zh-CN/component/date-picker.html"
            target="_blank"
            style="font-size: 16px; font-weight: 800"
          >
            Date Picker
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
        href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/components/date-picker.vue"
        target="_blank"
      >
        Code location: src/views/components/date-picker.vue
      </el-link>
    </template>

    <div class="mb-2">Select a day</div>
    <el-date-picker
      v-model="value"
      type="date"
      class="w-[160px]!"
      placeholder="Select a date"
      :disabled-date="disabledDate"
      :shortcuts="shortcuts"
      :popper-options="{
        placement: 'bottom-start'
      }"
      :size="dynamicSize"
      :disabled="size === 'disabled'"
    />

    <div class="mb-2 mt-4">Select week, month, year, or multiple dates</div>
    <el-space wrap>
      <el-date-picker
        v-model="value1"
        type="week"
        class="w-[160px]!"
        format="YYYY年第ww周"
        placeholder="Select a week of the year"
        :size="dynamicSize"
        :disabled="size === 'disabled'"
      />
      <el-date-picker
        v-model="value2"
        type="month"
        class="w-[160px]!"
        placeholder="Select a month"
        :size="dynamicSize"
        :disabled="size === 'disabled'"
      />
      <el-date-picker
        v-model="value3"
        type="year"
        class="w-[160px]!"
        placeholder="Select a year"
        :size="dynamicSize"
        :disabled="size === 'disabled'"
      />
      <el-date-picker
        v-model="value4"
        type="dates"
        class="w-[160px]!"
        placeholder="Select multiple dates"
        :size="dynamicSize"
        :disabled="size === 'disabled'"
      />
    </el-space>

    <div class="mb-2 mt-4">Select a date range</div>
    <el-date-picker
      v-model="value5"
      type="daterange"
      class="w-[240px]!"
      unlink-panels
      range-separator="to"
      start-placeholder="Start date"
      end-placeholder="End date"
      :shortcuts="shortcuts1"
      :popper-options="{
        placement: 'bottom-start' // Position of the dropdown panel, or 'top-start', 'bottom-end', 'top-end', etc. See https://popper.js.org/docs/v2/constructors/#options
      }"
      :size="dynamicSize"
      :disabled="size === 'disabled'"
    />

    <div class="mb-2 mt-4">Select month range</div>
    <el-date-picker
      v-model="value6"
      type="monthrange"
      unlink-panels
      range-separator="to"
      start-placeholder="Start month"
      end-placeholder="End month"
      :shortcuts="shortcuts2"
      :popper-options="{
        placement: 'bottom-start'
      }"
      :size="dynamicSize"
      :disabled="size === 'disabled'"
    />

    <div class="mb-2 mt-4">Date Format</div>
    <el-radio-group
      v-model="dateFormat"
      class="mb-2"
      :disabled="size === 'disabled'"
      @change="value7 = ''"
    >
      <el-radio value="">Date</el-radio>
      <el-radio value="YYYY-MM-DD">Year-Month-Day</el-radio>
      <el-radio value="x">Timestamp</el-radio>
    </el-radio-group>
    <br />
    <el-space wrap>
      <el-date-picker
        v-model="value7"
        type="date"
        class="w-[160px]!"
        placeholder="Select a date"
        format="YYYY/MM/DD"
        :value-format="dateFormat"
        :size="dynamicSize"
        :disabled="size === 'disabled'"
      />
      <span class="ml-2">{{ value7 }}</span>
    </el-space>

    <div class="mb-2 mt-4">Custom Prefix</div>
    <el-date-picker
      v-model="value8"
      type="date"
      class="w-[160px]!"
      placeholder="Select a date"
      :prefix-icon="useRenderIcon('twemoji:spiral-calendar')"
      :size="dynamicSize"
      :disabled="size === 'disabled'"
    />

    <div class="mb-2 mt-4">Custom Content</div>
    <el-date-picker
      v-model="value9"
      type="date"
      placeholder="Select a date"
      format="YYYY/MM/DD"
      value-format="YYYY-MM-DD"
      :size="dynamicSize"
      :disabled="size === 'disabled'"
    >
      <template #default="scope">
        <div class="cell" :class="{ current: scope.isCurrent }">
          <span class="text">{{ scope.text }}</span>
          <span v-if="isHoliday(scope)" class="holiday" />
        </div>
      </template>
    </el-date-picker>
  </el-card>
</template>

<style scoped>
.cell {
  box-sizing: border-box;
  height: 30px;
  padding: 3px 0;
}

.cell .text {
  position: absolute;
  left: 50%;
  display: block;
  width: 24px;
  height: 24px;
  margin: 0 auto;
  line-height: 24px;
  border-radius: 50%;
  transform: translateX(-50%);
}

.cell.current .text {
  color: #fff;
  background: #626aef;
}

.cell .holiday {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 6px;
  height: 6px;
  background: var(--el-color-danger);
  border-radius: 50%;
  transform: translateX(-50%);
}
</style>
