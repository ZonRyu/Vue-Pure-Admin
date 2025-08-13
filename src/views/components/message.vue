<script setup lang="ts">
import { h } from "vue";
import hot from "@/assets/svg/hot.svg?component";
import { message, closeAllMessage } from "@/utils/message";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Check from "~icons/ep/check";

defineOptions({
  name: "Message"
});
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium"> Message Notifications </span>
      </div>
      <el-link
        class="mt-2"
        href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/components/message.vue"
        target="_blank"
      >
        Code location: src/views/components/message.vue
      </el-link>
    </template>

    <h4 class="mb-4!">Element Plus message notifications, click to show message</h4>

    <el-space wrap>
      <el-button
        type="info"
        @click="message('Info message', { customClass: 'el' })"
      >
        Info
      </el-button>
      <el-button
        type="success"
        @click="
          message('Success message', { customClass: 'el', type: 'success' })
        "
      >
        Success
      </el-button>
      <el-button
        type="warning"
        @click="
          message('Warning message', { customClass: 'el', type: 'warning' })
        "
      >
        Warning
      </el-button>
      <el-button
        type="danger"
        @click="message('Error message', { customClass: 'el', type: 'error' })"
      >
        Error
      </el-button>
      <el-button
        @click="message('Closable message', { customClass: 'el', showClose: true })"
      >
        Closable
      </el-button>
      <el-button
        @click="
          message('Grouped messages', {
            customClass: 'el',
            type: 'success',
            grouping: true
          })
        "
      >
        Grouped Messages
      </el-button>
      <el-button
        @click="
          message('Custom message icon', {
            customClass: 'el',
            icon: useRenderIcon(Check)
          })
        "
      >
        Custom Icon
      </el-button>
      <el-button
        @click="
          message('3 seconds later close', {
            customClass: 'el',
            duration: 3000,
            onClose: () =>
              message('Message closed', { customClass: 'el', type: 'success' })
          })
        "
      >
        Custom delay close time and set close after other operations
      </el-button>
      <el-button
        @click="
          message(
            h('p', null, [
              h('span', null, 'Message can be '),
              h('i', { style: 'color: teal' }, 'VNode')
            ]),
            { customClass: 'el' }
          )
        "
      >
        Custom content
      </el-button>
      <el-button
        @click="
          message('<strong>This is <i>HTML</i> string</strong>', {
            customClass: 'el',
            dangerouslyUseHTMLString: true
          })
        "
      >
        HTML snippet as content
      </el-button>
    </el-space>

    <el-divider />

    <h4 class="mb-4!">
      Ant Design style message notifications, click to show message (Based on ElMessage
      restyling, does not affect the original ElMessage
      styles, with minimal usage and bundle size impact, and supports dark mode)
    </h4>

    <el-space wrap>
      <el-button type="info" @click="message('Info message')">Info</el-button>
      <el-button
        type="success"
        @click="message('Success message', { type: 'success' })"
      >
        Success
      </el-button>
      <el-button
        type="warning"
        @click="message('Warning message', { type: 'warning' })"
      >
        Warning
      </el-button>
      <el-button
        type="danger"
        @click="message('Error message', { type: 'error' })"
      >
        Error
      </el-button>
      <el-button @click="message('Closable message', { showClose: true })">
        Closable
      </el-button>
      <el-button
        @click="message('Grouped messages', { type: 'success', grouping: true })"
      >
        Grouped Messages
      </el-button>
      <el-button
        @click="
          message('Custom message icon', {
            icon: hot
          })
        "
      >
        Custom Icon
      </el-button>
      <el-button
        @click="
          message('3 seconds later close', {
            duration: 3000,
            onClose: () => message('Message closed', { type: 'success' })
          })
        "
      >
        Custom delay close time and set close after other operations
      </el-button>
      <el-button
        @click="
          message(
            h('p', null, [
              h('span', null, 'Message can be '),
              h('i', { style: 'color: teal' }, 'VNode')
            ])
          )
        "
      >
        Custom content
      </el-button>
      <el-button
        @click="
          message('<strong>This is <i>HTML</i> string</strong>', {
            dangerouslyUseHTMLString: true
          })
        "
      >
        HTML snippet as content
      </el-button>
    </el-space>

    <el-divider />

    <el-button @click="closeAllMessage"> Close All Messages </el-button>
  </el-card>
</template>
