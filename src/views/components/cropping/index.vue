<script setup lang="tsx">
import avatar from "./avatar.png";
import { ref, onBeforeUnmount } from "vue";
import ReCropper from "@/components/ReCropper";
import { formatBytes } from "@pureadmin/utils";

defineOptions({
  name: "Cropping"
});

const infos = ref();
const popoverRef = ref();
const refCropper = ref();
const showPopover = ref(false);
const cropperImg = ref<string>("");

function onCropper({ base64, blob, info }) {
  console.log(blob);
  infos.value = info;
  cropperImg.value = base64;
}

onBeforeUnmount(() => {
  popoverRef.value.hide();
});
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
          Image cropping, based on the open source
          <el-link
            href="https://fengyuanchen.github.io/cropperjs/"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            cropperjs
          </el-link>
          for secondary encapsulation (tip: right-click the left cropping area below to enable the function menu)
        </span>
      </div>
      <el-link
        class="mt-2"
        href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/components/cropping"
        target="_blank"
      >
        Code location src/views/components/cropping
      </el-link>
    </template>
    <div v-loading="!showPopover" element-loading-background="transparent">
      <el-popover
        ref="popoverRef"
        :visible="showPopover"
        placement="right"
        width="300px"
      >
        <template #reference>
          <ReCropper
            ref="refCropper"
            class="w-[30vw]"
            :src="avatar"
            circled
            @cropper="onCropper"
            @readied="showPopover = true"
          />
        </template>
        <div class="flex flex-wrap justify-center items-center text-center">
          <el-image
            v-if="cropperImg"
            :src="cropperImg"
            :preview-src-list="Array.of(cropperImg)"
            fit="cover"
          />
          <div v-if="infos" class="mt-1">
            <p>
              Image size: {{ parseInt(infos.width) }} ×
              {{ parseInt(infos.height) }} pixels
            </p>
            <p>
              File size: {{ formatBytes(infos.size) }}（{{ infos.size }} 字节）
            </p>
          </div>
        </div>
      </el-popover>
    </div>
  </el-card>
</template>
