<script setup lang="ts">
import { ref, nextTick } from "vue";
import { cloneDeep, isAllEmpty } from "@pureadmin/utils";

defineOptions({
  name: "PureTag"
});

const size = ref("default");
const checked1 = ref(false);
const checked2 = ref(false);
const baseTag = ref("dark");
const tagList = ref([
  {
    type: "primary",
    text: "Primary"
  },
  {
    type: "success",
    text: "Success"
  },
  {
    type: "info",
    text: "Info"
  },
  {
    type: "warning",
    text: "Warning"
  },
  {
    type: "danger",
    text: "Danger"
  }
]);
const handleClose = tag => {
  tagList.value.splice(tagList.value.indexOf(tag), 1);
};
const copyTagList = cloneDeep(tagList.value);
function onReset() {
  tagList.value = cloneDeep(copyTagList);
}

/** Dynamic editing tags */
const inputValue = ref("");
const dynamicTags = ref(["Tag 1", "Tag 2", "Tag 3"]);
const inputVisible = ref(false);
const InputRef = ref();
const handleDynamicClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};
const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};
const handleInputConfirm = () => {
  if (!isAllEmpty(inputValue.value)) {
    dynamicTags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = "";
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
            href="https://element-plus.org/zh-CN/component/tag.html"
            target="_blank"
            style="font-size: 16px; font-weight: 800"
          >
            Tag tag
          </el-link>
          <el-radio-group v-model="size">
            <el-radio value="large">Large size</el-radio>
            <el-radio value="default">Default size</el-radio>
            <el-radio value="small">Small size</el-radio>
          </el-radio-group>
        </el-space>
      </div>
      <el-link
        class="mt-2"
        href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/components/tag.vue"
        target="_blank"
      >
        Code location src/views/components/tag.vue
      </el-link>
    </template>

    <div class="mb-2">Basic tag</div>
    <el-radio-group v-model="baseTag" class="mb-3">
      <el-radio label="dark" value="dark" />
      <el-radio label="light" value="light" />
      <el-radio label="plain" value="plain" />
    </el-radio-group>
    <br />
    <el-space class="mb-3">
      <el-checkbox
        v-if="tagList.length > 0"
        v-model="checked1"
        label="Removable"
      />
      <el-button v-else size="small" text bg class="mr-6!" @click="onReset">
        Reset
      </el-button>
      <el-button
        v-if="checked1 && tagList.length > 0"
        size="small"
        text
        bg
        class="mr-6! ml-4!"
        @click="tagList = []"
      >
        Remove all
      </el-button>
      <el-checkbox v-model="checked2" label="Circular" />
    </el-space>
    <br />
    <el-space wrap>
      <el-tag
        v-for="(tag, index) in tagList"
        :key="index"
        :type="tag.type as any"
        :effect="baseTag as any"
        :closable="checked1"
        :round="checked2"
        :size="size as any"
        :disabled="size === 'disabled'"
        @close="handleClose(tag)"
      >
        {{ tag.text }}
      </el-tag>
    </el-space>
    <el-divider />

    <div class="mb-2">Dynamic editing tags</div>
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag"
      class="mx-1"
      closable
      :size="size as any"
      :disable-transitions="false"
      @close="handleDynamicClose(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      class="ml-1 w-20!"
      size="small"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button
      v-else
      class="button-new-tag ml-1!"
      size="small"
      @click="showInput"
    >
      New tag
    </el-button>
  </el-card>
</template>

<style lang="scss" scoped>
:deep(.el-divider--horizontal) {
  margin: 17px 0;
}
</style>
