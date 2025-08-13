<script setup lang="tsx">
import { h, ref, watch } from "vue";
import { message } from "@/utils/message";
import HomeFilled from "~icons/ep/home-filled";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Segmented, { type OptionsType } from "@/components/ReSegmented";

defineOptions({
  name: "Segmented"
});

/** Basic Usage */
const value = ref(4); // Must be of number type
const size = ref("default");
const dynamicSize = ref();

const optionsBasis: Array<OptionsType> = [
  {
    label: "Monday"
  },
  {
    label: "Tuesday"
  },
  {
    label: "Wednesday"
  },
  {
    label: "Thursday"
  },
  {
    label: "Friday"
  }
];

/** Tooltip */
const optionsTooltip: Array<OptionsType> = [
  {
    label: "Monday",
    tip: "Set sail on Monday, a new chapter begins"
  },
  {
    label: "Tuesday",
    tip: "On Tuesday we move in rhythm, working hand in hand"
  },
  {
    label: "Wednesday",
    tip: "On Wednesday we stay high-spirited, passion never fades"
  },
  {
    label: "Thursday",
    tip: "On Thursday we refine our skills, achieving twice the result with half the effort"
  },
  {
    label: "Friday",
    tip: "On Friday we rejoice, wrapping up and archiving"
  }
];

/** Disabled */
const optionsDisabled: Array<OptionsType> = [
  {
    label: "Monday"
  },
  {
    label: "Tuesday"
  },
  {
    label: "Wednesday",
    disabled: true
  },
  {
    label: "Thursday"
  },
  {
    label: "Friday",
    disabled: true
  }
];

/** Block */
const optionsBlock: Array<OptionsType> = [
  {
    label: "Monday"
  },
  {
    label: "Tuesday"
  },
  {
    label: "Wednesday"
  },
  {
    label: "Thursday"
  },
  {
    label: "Friday joy, wrap up and archive, weekend countdown",
    tip: "Friday joy, wrap up and archive, weekend countdown"
  }
];

/** Icon */
const optionsIcon: Array<OptionsType> = [
  {
    label: "Monday",
    icon: HomeFilled
  },
  {
    label: "Tuesday",
    icon: "ri:terminal-window-line"
  },
  {
    label: "Wednesday",
    icon: "streamline-emojis:cow-face"
  },
  {
    label: "Thursday",
    icon: "streamline-emojis:airplane"
  },
  {
    label: "Friday",
    icon: "streamline-emojis:2"
  }
];

/** Only Icon */
const optionsOnlyIcon: Array<OptionsType> = [
  {
    icon: HomeFilled
  },
  {
    icon: "ri:terminal-window-line"
  },
  {
    icon: "streamline-emojis:cow-face"
  },
  {
    icon: "streamline-emojis:airplane"
  },
  {
    icon: "streamline-emojis:2"
  }
];

/** Custom Render */
const optionsLabel: Array<OptionsType> = [
  {
    label: () => (
      <div>
        {h(useRenderIcon(HomeFilled), {
          class: "m-auto mt-1 w-[18px] h-[18px]"
        })}
        <p>Monday</p>
      </div>
    )
  },
  {
    label: () => (
      <div>
        {h(useRenderIcon("ri:terminal-window-line"), {
          class: "m-auto mt-1 w-[18px] h-[18px]"
        })}
        <p>Tuesday</p>
      </div>
    )
  },
  {
    label: () => (
      <div>
        {h(useRenderIcon("streamline-emojis:cow-face"), {
          class: "m-auto mt-1 w-[18px] h-[18px]"
        })}
        <p>Wednesday</p>
      </div>
    )
  }
];

const optionsChange: Array<OptionsType> = [
  {
    label: "Monday",
    value: 1
  },
  {
    label: "Tuesday",
    value: 2
  },
  {
    label: "Wednesday",
    value: 3
  }
];

/** Change Event */
function onChange({ index, option }) {
  const { label, value } = option;
  message(`Current selected item index is: ${index}, name is ${label}, value is ${value}`, {
    type: "success"
  });
}

watch(size, val => (dynamicSize.value = size.value));
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <el-space wrap :size="40">
          <span style="font-size: 16px; font-weight: 800"> Segmented </span>
          <el-radio-group v-model="size">
            <el-radio value="large">Large</el-radio>
            <el-radio value="default">Default</el-radio>
            <el-radio value="small">Small</el-radio>
          </el-radio-group>
        </el-space>
      </div>
      <el-link
        class="mt-2"
        href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/components/segmented.vue"
        target="_blank"
      >
        Code location: src/views/components/segmented.vue
      </el-link>
    </template>
    <el-scrollbar>
      <div class="mb-2">
        Basic Usage (v-model)<span class="text-primary">
          {{ optionsBasis[value].label }}
        </span>
      </div>
      <Segmented v-model="value" :options="optionsBasis" :size="dynamicSize" />
      <el-divider />
      <div class="mb-2">Tooltip</div>
      <Segmented :options="optionsTooltip" :size="dynamicSize" />
      <el-divider />
      <div class="mb-2">Change Event</div>
      <Segmented
        :options="optionsChange"
        :size="dynamicSize"
        @change="onChange"
      />
      <el-divider />
      <div class="mb-2">Disabled</div>
      <Segmented :options="optionsDisabled" :size="dynamicSize" />
      <el-divider />
      <div class="mb-2">Global Disable</div>
      <Segmented :options="optionsBasis" :size="dynamicSize" disabled />
      <el-divider />
      <div class="mb-2">Block</div>
      <Segmented :options="optionsBlock" block :size="dynamicSize" />
      <el-divider />
      <div class="mb-2">Icon</div>
      <Segmented :options="optionsIcon" :size="dynamicSize" />
      <el-divider />
      <div class="mb-2">Only Icon</div>
      <Segmented :options="optionsOnlyIcon" :size="dynamicSize" />
      <el-divider />
      <div class="mb-2">Custom Render</div>
      <Segmented :options="optionsLabel" :size="dynamicSize" />
    </el-scrollbar>
  </el-card>
</template>

<style scoped>
:deep(.el-divider--horizontal) {
  margin: 17px 0;
}
</style>
