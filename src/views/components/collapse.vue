<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "Collapse"
});

const radio = ref();
const collapseRef = ref();
const activeNames = ref(["1", "2", "3", "4", "5"]);
const isOpen = ref(true);

function onClick() {
  isOpen.value
    ? (activeNames.value = [])
    : radio.value === "accordion"
      ? (activeNames.value = ["5"])
      : (activeNames.value = ["1", "2", "3", "4", "5"]);
  isOpen.value = !isOpen.value;
}

const handleChange = (val: string[]) => {
  console.log(val);
};
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
            href="https://element-plus.org/zh-CN/component/collapse.html"
            target="_blank"
            style="font-size: 16px; font-weight: 800"
          >
            Collapse panel
          </el-link>
        </el-space>
      </div>
      <el-link
        class="mt-2"
        href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/components/collapse.vue"
        target="_blank"
      >
        Code location src/views/components/collapse.vue
      </el-link>
    </template>

    <div class="mb-2">Basic usage</div>
    <el-radio-group v-model="radio" class="mb-3">
      <el-radio value="">Multiple panels can be expanded at the same time</el-radio>
      <el-radio value="accordion">Only one panel can be expanded at a time</el-radio>
    </el-radio-group>
    <el-button size="small" text bg class="ml-8! mb-1!" @click="onClick">
      External trigger open, close
    </el-button>
    <el-collapse
      ref="collapseRef"
      v-model="activeNames"
      class="w-[360px]"
      :accordion="radio === 'accordion' ? true : false"
      @change="handleChange"
    >
      <el-collapse-item title="Monday" name="1">
        Monday departure, new chapter
      </el-collapse-item>
      <el-collapse-item title="Tuesday" name="2">
        Tuesday rhythm,携手共进
      </el-collapse-item>
      <el-collapse-item title="Wednesday" name="3">
        Wednesday enthusiasm, passion never fades
      </el-collapse-item>
      <el-collapse-item title="Thursday" name="4">
        Thursday progress,事半功倍
      </el-collapse-item>
      <el-collapse-item name="5">
        <template #title>
          Friday
          <IconifyIconOnline
            icon="streamline-emojis:beaming-face-with-smiling-eyes"
            class="ml-1"
            width="30"
          />
        </template>
        Friday joy,收尾归档
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>
