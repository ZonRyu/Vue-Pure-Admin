<script setup lang="ts">
import { ref, watch } from "vue";
import { message } from "@/utils/message";
import { getKeyList } from "@pureadmin/utils";

defineOptions({
  name: "CheckButton"
});

const spaceSize = ref(20);
const size = ref("default");
const dynamicSize = ref();
const checked = ref(true);

const radio = ref("wait");
const radioBox = ref("complete");
const radioCustom = ref("progress");

const checkboxGroup = ref(["apple", "tomato"]);
const checkboxGroupBox = ref(["cucumber", "onion", "blueberry"]);
const checkboxGroupCustom = ref(["tomato", "watermelon", "strawberry"]);

/** Single selection (controllable spacing button style) */
const checkTag = ref([
  {
    title: "Waiting",
    checked: false
  },
  {
    title: "Progress",
    checked: true
  },
  {
    title: "Completed",
    checked: false
  }
]);
const curTagMap = ref({});
function onChecked(tag, index) {
  if (size.value === "disabled") return;
  curTagMap.value[index] = Object.assign({
    ...tag,
    checked: !tag.checked
  });
  checkTag.value.map(item => (item.checked = false));
  checkTag.value[index].checked = curTagMap.value[index].checked;
  const { title, checked } = curTagMap.value[index];
  message(checked ? `Selected ${title}` : `Cancel selection ${title}`, {
    type: "success"
  });
}

/** Multi selection (controllable spacing button style) */
const checkGroupTag = ref([
  {
    title: "apple",
    checked: true
  },
  {
    title: "tomato",
    checked: true
  },
  {
    title: "banana",
    checked: false
  }
]);
const curTagGroupMap = ref({});
function onGroupChecked(tag, index) {
  if (size.value === "disabled") return;
  curTagGroupMap.value[index] = Object.assign({
    ...tag,
    checked: !tag.checked
  });
  checkGroupTag.value[index].checked = curTagGroupMap.value[index].checked;
}

function onSingleChecked() {
  if (size.value === "disabled") return;
  checked.value = !checked.value;
}

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
          <span style="font-size: 16px; font-weight: 800"> Optional button </span>
          <el-radio-group v-model="size">
            <el-radio value="large">Large size</el-radio>
            <el-radio value="default">Default size</el-radio>
            <el-radio value="small">Small size</el-radio>
            <el-radio value="disabled">Disabled</el-radio>
          </el-radio-group>
        </el-space>
      </div>
      <el-link
        class="mt-2"
        href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/components/check-button.vue"
        target="_blank"
      >
        Code location src/views/components/check-button.vue
      </el-link>
    </template>
    <div class="mb-2">Single selection (compact style button style)</div>
    <el-radio-group
      v-model="radio"
      :size="dynamicSize"
      :disabled="size === 'disabled'"
    >
      <el-radio-button value="wait">Waiting</el-radio-button>
      <el-radio-button value="progress">Progress</el-radio-button>
      <el-radio-button value="complete">Completed</el-radio-button>
    </el-radio-group>
    <el-divider />

    <div class="mb-2">Single selection (with border)</div>
    <el-radio-group
      v-model="radioBox"
      :size="dynamicSize"
      :disabled="size === 'disabled'"
    >
      <el-radio value="wait" border>Waiting</el-radio>
      <el-radio value="progress" border>Progress</el-radio>
      <el-radio value="complete" border>Completed</el-radio>
    </el-radio-group>
    <el-divider />

    <div class="mb-2">Single selection (custom content)</div>
    <el-radio-group
      v-model="radioCustom"
      :size="dynamicSize"
      :disabled="size === 'disabled'"
    >
      <el-radio-button value="wait">
        <span class="flex">
          <IconifyIconOnline icon="ri:progress-8-fill" class="mr-1" />
          Waiting
        </span>
      </el-radio-button>
      <el-radio-button value="progress">
        <span class="flex">
          <IconifyIconOnline icon="ri:progress-6-line" class="mr-1" />
          Progress
        </span>
      </el-radio-button>
      <el-radio-button value="complete">
        <span class="flex">
          <IconifyIconOnline icon="ri:progress-8-line" class="mr-1" />
          Completed
        </span>
      </el-radio-button>
    </el-radio-group>
    <el-divider />

    <div class="mb-2">Multi selection (compact style button style)</div>
    <el-checkbox-group
      v-model="checkboxGroup"
      :size="dynamicSize"
      :disabled="size === 'disabled'"
    >
      <el-checkbox-button value="apple">Apple</el-checkbox-button>
      <el-checkbox-button value="tomato">Tomato</el-checkbox-button>
      <el-checkbox-button value="banana">Banana</el-checkbox-button>
    </el-checkbox-group>
    <el-divider />

    <div class="mb-2">Multi selection (with border)</div>
    <el-checkbox-group
      v-model="checkboxGroupBox"
      :size="dynamicSize"
      :disabled="size === 'disabled'"
    >
      <el-checkbox value="cucumber" border>Cucumber</el-checkbox>
      <el-checkbox value="onion" border>Onion</el-checkbox>
      <el-checkbox value="blueberry" border>Blueberry</el-checkbox>
    </el-checkbox-group>
    <el-divider />

    <div class="mb-2">Multi selection (come up with a different experience)</div>
    <el-checkbox-group
      v-model="checkboxGroupCustom"
      class="pure-checkbox"
      :size="dynamicSize"
      :disabled="size === 'disabled'"
    >
      <el-checkbox-button value="tomato">
        <span class="flex">
          <IconifyIconOnline icon="streamline-emojis:tomato" class="mr-1" />
          Tomato
        </span>
      </el-checkbox-button>
      <el-checkbox-button value="watermelon">
        <span class="flex">
          <IconifyIconOnline
            icon="streamline-emojis:watermelon-1"
            class="mr-1"
          />
          Watermelon
        </span>
      </el-checkbox-button>
      <el-checkbox-button value="strawberry">
        <span class="flex">
          <IconifyIconOnline
            icon="streamline-emojis:strawberry-1"
            class="mr-1"
          />
          Strawberry
        </span>
      </el-checkbox-button>
    </el-checkbox-group>
    <el-divider />

    <div>Controllable spacing button style</div>
    <el-slider
      v-model="spaceSize"
      class="mb-2 w-[300px]!"
      :show-tooltip="false"
      :disabled="size === 'disabled'"
    />
    <div class="mb-2">Single selection (controllable spacing button style)</div>
    <el-space wrap :size="spaceSize">
      <el-check-tag
        v-for="(tag, index) in checkTag"
        :key="index"
        :class="[
          'select-none',
          size === 'disabled' && 'tag-disabled',
          tag.checked && 'is-active'
        ]"
        :checked="tag.checked"
        @change="onChecked(tag, index)"
      >
        {{ tag.title }}
      </el-check-tag>
    </el-space>
    <div class="mb-2 mt-4">
      Multi selection
      {{
        getKeyList(
          checkGroupTag.filter(tag => tag.checked),
          "title"
        )
      }}
    </div>
    <el-space wrap :size="spaceSize">
      <el-check-tag
        v-for="(tag, index) in checkGroupTag"
        :key="index"
        :class="[
          'select-none',
          size === 'disabled' && 'tag-disabled',
          tag.checked && 'is-active'
        ]"
        :checked="tag.checked"
        @change="onGroupChecked(tag, index)"
      >
        {{ tag.title }}
      </el-check-tag>
    </el-space>
    <el-divider />

    <div class="mb-2">Single optional button</div>
    <el-check-tag
      :class="[
        'select-none',
        size === 'disabled' && 'tag-disabled',
        checked && 'is-active'
      ]"
      :checked="checked"
      @change="onSingleChecked"
    >
      One person also needs to work hard 😊
    </el-check-tag>
  </el-card>
</template>

<style lang="scss" scoped>
:deep(.el-divider--horizontal) {
  margin: 17px 0;
}

:deep(.pure-checkbox) {
  .el-checkbox-button {
    /* Selected custom style */
    &.is-checked {
      .el-checkbox-button__inner {
        color: var(--el-color-primary);
        background-color: var(--el-color-primary-light-8);
        border-color: transparent;
        border-left-color: #fff;
      }
    }

    /* Disabled custom style */
    &.is-disabled {
      .el-checkbox-button__inner {
        color: var(--el-disabled-text-color);
        background-color: var(
          --el-button-disabled-bg-color,
          var(--el-fill-color-blank)
        );
        border-color: var(
          --el-button-disabled-border-color,
          var(--el-border-color-light)
        );
      }
    }
  }
}

/** Controllable spacing button disabled style */
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
