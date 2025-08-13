<script setup lang="ts">
import { ref, watch } from "vue";

defineOptions({
  name: "DateTimePicker"
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

const value1 = ref("");
const datetimeFormat = ref("");

const value2 = ref("");
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

const value3 = ref("");
const datePickerRef = ref();
const placement = ref("auto");
const checkTag = ref([
  {
    title: "auto", // https://popper.js.org/docs/v2/constructors/#options
    checked: false
  },
  {
    title: "auto-start",
    checked: false
  },
  {
    title: "auto-end",
    checked: false
  },
  {
    title: "top",
    checked: false
  },
  {
    title: "top-start",
    checked: false
  },
  {
    title: "top-end",
    checked: false
  },
  {
    title: "bottom",
    checked: false
  },
  {
    title: "bottom-start",
    checked: false
  },
  {
    title: "bottom-end",
    checked: false
  },
  {
    title: "right",
    checked: false
  },
  {
    title: "right-start",
    checked: false
  },
  {
    title: "right-end",
    checked: false
  },
  {
    title: "left",
    checked: false
  },
  {
    title: "left-start",
    checked: false
  },
  {
    title: "left-end",
    checked: false
  }
]);
const curTagMap = ref({});
function onChecked(tag, index) {
  if (size.value === "disabled") return;
  placement.value = tag.title;
  curTagMap.value[index] = Object.assign({
    ...tag,
    checked: !tag.checked
  });
  checkTag.value.map(item => (item.checked = false));
  checkTag.value[index].checked = curTagMap.value[index].checked;
  // External trigger to open/close the datetime picker panel
  curTagMap.value[index].checked
    ? datePickerRef.value.handleOpen()
    : datePickerRef.value.handleClose();
}

watch(size, val =>
  val === "disabled"
    ? (dynamicSize.value = "default")
    : (dynamicSize.value = size.value)
);
</script>

<template>
  <el-card shadow="never" :style="{ height: '100vh' }">
    <template #header>
      <div class="card-header">
        <el-space wrap :size="40">
          <el-link
            v-tippy="{
              content: 'Click to view detailed documentation'
            }"
            href="https://element-plus.org/zh-CN/component/datetime-picker.html"
            target="_blank"
            style="font-size: 16px; font-weight: 800"
          >
            Datetime Picker
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
        href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/components/datetime-picker.vue"
        target="_blank"
      >
        Code location: src/views/components/datetime-picker.vue
      </el-link>
    </template>

    <div class="mb-2">Date and Time</div>
    <el-date-picker
      v-model="value"
      type="datetime"
      class="w-[200px]!"
      placeholder="Select date and time"
      :shortcuts="shortcuts"
      :size="dynamicSize"
      :disabled="size === 'disabled'"
    />

    <div class="mb-2 mt-4">Default Start and End Times</div>
    <el-radio-group
      v-model="datetimeFormat"
      class="mb-2"
      :disabled="size === 'disabled'"
      @change="value1 = ''"
    >
      <el-radio value="">Date</el-radio>
      <el-radio value="YYYY-MM-DD HH:mm:ss">Year-Month-Day Hour:Minute:Second</el-radio>
      <el-radio value="x">Timestamp</el-radio>
    </el-radio-group>
    <br />
    <el-space wrap>
      <el-date-picker
        v-model="value1"
        type="datetime"
        class="w-[200px]!"
        placeholder="Select date and time"
        format="YYYY/MM/DD hh:mm:ss"
        :value-format="datetimeFormat"
        :size="dynamicSize"
        :disabled="size === 'disabled'"
      />
      <span class="ml-2">{{ value1 }}</span>
    </el-space>

    <div class="mb-2 mt-4">Date and Time Range</div>
    <el-date-picker
      v-model="value2"
      type="datetimerange"
      :shortcuts="shortcuts1"
      range-separator="to"
      start-placeholder="Start datetime"
      end-placeholder="End datetime"
      :popper-options="{
        placement: 'bottom-start'
      }"
      :size="dynamicSize"
      :disabled="size === 'disabled'"
    />

    <div class="mb-2 mt-4">
      The position of the pop-up panel can be controlled (if the pop-up position is not enough to fully display the panel, it will automatically adjust the position)
    </div>
    <el-space wrap class="w-[400px]">
      <el-tag
        v-for="(tag, index) in checkTag"
        :key="index"
        :type="tag.checked ? 'primary' : 'info'"
        class="mr-2 mb-2 cursor-pointer"
        effect="dark"
        @click="onChecked(tag, index)"
      >
        {{ tag.title }}
      </el-tag>
    </el-space>
    <el-date-picker
      ref="datePickerRef"
      v-model="value3"
      type="datetime"
      class="ml-[15%]"
      placeholder="Select date and time"
      :popper-options="{
        placement
      }"
      :size="dynamicSize"
      :disabled="size === 'disabled'"
    />
  </el-card>
</template>

<style lang="scss" scoped>
.tag-disabled {
  color: var(--el-disabled-text-color);
  cursor: not-allowed;
  background-color: var(--el-color-info-light-9);

  &:hover {
    background-color: var(--el-color-info-light-9);
  }

  &.is-active {
    background-color: var(--el-color-primary-light-9);
  }
}
</style>
