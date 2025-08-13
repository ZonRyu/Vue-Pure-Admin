<script setup lang="ts">
import dayjs from "dayjs";
import { ref } from "vue";
import { ReText } from "@/components/ReText";

defineOptions({
  name: "PureText"
});

const customContent = ref("Custom tooltip content");

const changeTooltipContent = () => {
  customContent.value =
    "The current time is: " + dayjs().format("YYYY-MM-DD HH:mm:ss");
};
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
          Text truncation, based on
          <el-link
            href="https://element-plus.org/zh-CN/component/text.html"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            el-text
          </el-link>
          and
          <el-link
            href="https://vue-tippy.netlify.app/basic-usage"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            VueTippy
          </el-link>
          automatically shows a tooltip after truncation, supports multi-line truncation
        </span>
      </div>
      <el-link
        class="mt-2"
        href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/components/text.vue"
        target="_blank"
      >
        Code location: src/views/components/text.vue
      </el-link>
    </template>

    <div class="mb-2">Basic Usage</div>
    <el-space wrap>
      <ul class="content">
        <li>
          <ReText>
            Test text, this is a slightly long text, when it is too long, it will be truncated after the tooltip is hovered
          </ReText>
          <ReText :lineClamp="2">
            Test text, this is a slightly long text, lineClamp parameter is 2, that is, when it is too long, it will be truncated after the tooltip is hovered
          </ReText>
        </li>
      </ul>
    </el-space>

    <el-divider />

    <div class="mb-2">Custom Tooltip Content</div>
    <div class="mb-2">
      <el-button @click="changeTooltipContent">
        Click to switch the tooltip content below
      </el-button>
    </div>
    <el-space wrap>
      <ul class="content">
        <li>
          <ReText :tippyProps="{ content: customContent }">
            Props writing -
            Test text, this is a slightly long text, when it is too long, it will be truncated after the tooltip is hovered
          </ReText>
        </li>
        <li>
          <ReText>
            <template #content>
              <div>
                <b>This is slot writing: </b>
                <div>{{ customContent }}</div>
              </div>
            </template>
            Slot writing -
            Test text, this is a slightly long text, when it is too long, it will be truncated after the tooltip is hovered
          </ReText>
        </li>
      </ul>
    </el-space>

    <el-divider />
    <div class="mb-2">Custom el-text configuration</div>
    <el-space wrap>
      <ul class="content">
        <li>
          <ReText type="primary" size="large">
            Test text, this is a slightly long text, when it is too long, it will be truncated after the tooltip is hovered
          </ReText>
        </li>
        <li>
          <ReText :lineClamp="4" type="info">
            Test text, this is a very very long, very very long, very very long, very very long, very very long, very very long, very very long, very very long, very very long, very very long, very very long, very very long, very very long text, lineClamp parameter is 4, that is, when it is too long, it will be truncated after the tooltip is hovered
          </ReText>
        </li>
      </ul>
    </el-space>

    <el-divider />
    <div class="mb-2">Custom VueTippy configuration</div>
    <el-space wrap>
      <ul class="content">
        <li>
          <ReText
            :tippyProps="{ offset: [0, -20], theme: 'light', arrow: false }"
          >
            Offset white arrowless -
            Test text, this is a slightly long text, when it is too long, it will be truncated after the tooltip is hovered
          </ReText>
        </li>
        <li>
          <ReText :lineClamp="4" :tippyProps="{ followCursor: true }">
            Mouse following -
            Test text, this is a very very long, very very long, very very long, very very long, very very long, very very long, very very long, very very long, very very long, very very long, very very long, very very long, very very long text, lineClamp parameter is 4, that is, when it is too long, it will be truncated after the tooltip is hovered
          </ReText>
        </li>
      </ul>
    </el-space>

    <el-divider />
    <div class="mb-2">Component Nesting: If you don't need to truncate, set truncated to false</div>
    <el-space wrap>
      <ul class="content">
        <li>
          <ReText tag="p" :lineClamp="2">
            This is a paragraph. Paragraph start
            <ReText :truncated="false">
              【 This is ReText
              <ReText tag="sup" size="small" :truncated="false">
                superscript 】
              </ReText>
            </ReText>
            <el-text>
              【 This is El-Text
              <el-text tag="sub" size="small"> subscript 】 </el-text>
            </el-text>
            <el-text tag="ins">【Inserted】</el-text>
            <el-text tag="del">【Deleted】</el-text>
            <el-text tag="mark">【Marked】</el-text>
            Paragraph end.
          </ReText>
        </li>
      </ul>
    </el-space>
  </el-card>
</template>

<style lang="scss" scoped>
.content {
  width: 400px;
  padding: 15px;
  overflow: hidden;
  resize: horizontal;
  background-color: var(--el-color-info-light-9);
  border-radius: 8px;
}
</style>
