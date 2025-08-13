<script setup lang="ts">
import axios from "axios";
import Sortable from "sortablejs";
import UploadForm from "./form.vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import type { UploadFile } from "element-plus";
import { getKeyList, extractFields, downloadByData } from "@pureadmin/utils";

import EpPlus from "~icons/ep/plus?width=30&height=30";
import Eye from "~icons/ri/eye-line";
import Delete from "~icons/ri/delete-bin-7-line";

defineOptions({
  name: "PureUpload"
});

const fileList = ref([]);
const router = useRouter();
const curOpenImgIndex = ref(0);
const dialogVisible = ref(false);

const urlList = computed(() => getKeyList(fileList.value, "url"));
const imgInfos = computed(() => extractFields(fileList.value, "name", "size"));

const getImgUrl = name => new URL(`./imgs/${name}.jpg`, import.meta.url).href;
const srcList = Array.from({ length: 3 }).map((_, index) => {
  return getImgUrl(index + 1);
});

/** Before uploading files */
const onBefore = file => {
  if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
    message("Only image files are allowed");
    return false;
  }
  const isExceed = file.size / 1024 / 1024 > 2;
  if (isExceed) {
    message(`Single image size cannot exceed 2MB`);
    return false;
  }
};

/** When the number of uploaded files exceeds the maximum limit */
const onExceed = () => {
  message("Maximum of 3 images allowed, please delete some before uploading more");
};

/** Remove uploaded files */
const handleRemove = (file: UploadFile) => {
  fileList.value.splice(fileList.value.indexOf(file), 1);
};

/** Preview large image */
const handlePictureCardPreview = (file: UploadFile) => {
  curOpenImgIndex.value = fileList.value.findIndex(img => img.uid === file.uid);
  dialogVisible.value = true;
};

const getUploadItem = () => document.querySelectorAll("#pure-upload-item");

/** Thumbnail drag sorting */
const imgDrop = uid => {
  const CLASSNAME = "el-upload-list";
  const _curIndex = fileList.value.findIndex(img => img.uid === uid);
  getUploadItem()?.[_curIndex]?.classList?.add(`${CLASSNAME}__item-actions`);
  const wrapper: HTMLElement = document.querySelector(`.${CLASSNAME}`);
  Sortable.create(wrapper, {
    handle: `.${CLASSNAME}__item`,
    onEnd: ({ newIndex, oldIndex }) => {
      const oldFile = fileList.value[oldIndex];
      fileList.value.splice(oldIndex, 1);
      fileList.value.splice(newIndex, 0, oldFile);
      // fix: https://github.com/SortableJS/Sortable/issues/232 (firefox is ok, but chromium is bad. see https://bugs.chromium.org/p/chromium/issues/detail?id=410328)
      getUploadItem().forEach(ele => {
        ele.classList.remove(`${CLASSNAME}__item-actions`);
      });
    }
  });
};

/** Download images */
const onDownload = () => {
  [
    { name: "almond.jpeg", type: "img" },
    { name: "congratulations.png", type: "img" },
    { name: "cute-animal.gif", type: "gif" },
    { name: "pure-upload.csv", type: "other" },
    { name: "pure-upload.txt", type: "other" }
  ].forEach(img => {
    axios
      .get(`https://xiaoxian521.github.io/hyperlink/${img.type}/${img.name}`, {
        responseType: "blob"
      })
      .then(({ data }) => {
        downloadByData(data, img.name);
      });
  });
};
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <el-link
          v-tippy="{
            content: 'Click to view detailed documentation'
          }"
          href="https://element-plus.org/zh-CN/component/upload.html"
          target="_blank"
          style="font-size: 16px; font-weight: 800"
        >
          File Upload
        </el-link>
      </div>
      <el-link
        class="mt-2"
        href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/components/upload"
        target="_blank"
      >
        Code location: src/views/components/upload
      </el-link>
    </template>

    <el-button class="mb-4!" text bg @click="onDownload">
      Click to download safe files for upload testing
    </el-button>
    <p class="mb-4!">
      Comprehensive example<span class="text-[14px]">
        ( <span class="text-[red]">Auto upload</span>,
        drag-to-upload, drag-to-sort, set request headers, upload progress, large image preview,
        multiple file selection, maximum file count, file type restrictions, file size limits, delete files)
      </span>
    </p>
    <p v-show="fileList.length > 0" class="mb-4!">
      {{ imgInfos }}
    </p>
    <el-upload
      v-model:file-list="fileList"
      drag
      multiple
      class="pure-upload"
      list-type="picture-card"
      accept="image/jpeg,image/png,image/gif"
      action="https://run.mocky.io/v3/3aa761d7-b0b3-4a03-96b3-6168d4f7467b"
      :limit="3"
      :headers="{ Authorization: 'eyJhbGciOiJIUzUxMiJ9.admin' }"
      :on-exceed="onExceed"
      :before-upload="onBefore"
    >
      <EpPlus class="m-auto mt-4" />
      <template #file="{ file }">
        <div
          v-if="file.status == 'ready' || file.status == 'uploading'"
          class="mt-[35%]! m-auto"
        >
          <p class="font-medium">Uploading file</p>
          <el-progress
            class="mt-2!"
            :stroke-width="2"
            :text-inside="true"
            :show-text="false"
            :percentage="file.percentage"
          />
        </div>
        <div v-else @mouseenter.stop="imgDrop(file.uid)">
          <img
            class="el-upload-list__item-thumbnail select-none"
            :src="file.url"
          />
          <span
            id="pure-upload-item"
            :class="[
              'el-upload-list__item-actions',
              fileList.length > 1 && 'cursor-move!'
            ]"
          >
            <span
              title="View"
              class="hover:text-primary"
              @click="handlePictureCardPreview(file)"
            >
              <IconifyIconOffline
                :icon="Eye"
                class="hover:scale-125 duration-100"
              />
            </span>
            <span
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <span title="移除" class="hover:text-[var(--el-color-danger)]">
                <IconifyIconOffline
                  :icon="Delete"
                  class="hover:scale-125 duration-100"
                />
              </span>
            </span>
          </span>
        </div>
      </template>
    </el-upload>
    <!-- Sometimes the documentation may not be written, but it doesn't mean it's not there. Reading the source code is very beneficial. https://github.com/element-plus/element-plus/tree/dev/packages/components/image-viewer/src (emm... This reminds me of when I started this project, many things were only in English or without documentation, and when I needed to read the source code, I wanted to laugh🥹. Those美好时光都给这些坑了，giao） -->
    <el-image-viewer
      v-if="dialogVisible"
      :initialIndex="curOpenImgIndex"
      :url-list="urlList"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      @close="dialogVisible = false"
      @switch="index => (curOpenImgIndex = index)"
    />
    <!-- Insert custom content into the body, which makes it convenient to insert a pager or other elements at a specific position in the preview area when previewing images (user needs can be very flexible, open source component libraries are almost impossible to be perfect, and often finding other solutions is better) -->
    <teleport to="body">
      <div
        v-if="fileList[curOpenImgIndex] && dialogVisible"
        effect="dark"
        round
        size="large"
        type="info"
        class="img-name"
      >
        <p class="text-[#fff] dark:text-black">
          {{ fileList[curOpenImgIndex].name }}
        </p>
      </div>
    </teleport>
    <p class="el-upload__tip">
      Drag and drop up to 3 images in jpeg/png/gif format, each no larger than 2MB
    </p>
    <el-divider />

    <p class="my-4!">
      <span class="text-[red]">Manual upload</span> with form validation
      <span class="text-[14px]">
        (You can open browser console to Network tab, fill in the form and click submit to observe the request changes)
      </span>
    </p>
    <div class="flex justify-between">
      <UploadForm />
      <div>
        <p class="text-center">Upload interface related screenshots</p>
        <el-image
          class="w-[200px] rounded-md"
          :src="srcList[0]"
          :preview-src-list="srcList"
          fit="cover"
        />
      </div>
    </div>
    <el-divider />

    <div class="flex flex-wrap">
      <p>
        Crop and upload avatar please refer to
        <span
          class="font-bold text-[18x] cursor-pointer hover:text-[red]"
          @click="router.push({ name: 'SystemUser' })"
        >
          System Management - User Management
        </span>
        table operation bar upload avatar function
      </p>
      <p class="text-[red] text-[12px] flex flex-auto items-center justify-end">
        Disclaimer: The upload interface uses free open source
        <el-link
          href="https://designer.mocky.io/"
          target="_blank"
          style="font-size: 16px; font-weight: 800"
        >
          &nbsp;Mocky&nbsp;
        </el-link>
        <span class="font-bold text-[18x]"> Do not upload important information </span
        >, if any loss is caused, we will not be responsible
      </p>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
:deep(.card-header) {
  display: flex;

  .header-right {
    display: flex;
    flex: auto;
    align-items: center;
    justify-content: flex-end;
    font-size: 14px;
  }
}

:deep(.pure-upload) {
  .el-upload-dragger {
    background-color: transparent;
    border: none;
  }
}

.img-name {
  position: absolute;
  bottom: 80px;
  left: 50%;
  z-index: 4000;
  padding: 5px 23px;
  background-color: var(--el-text-color-regular);
  border-radius: 22px;
  transform: translateX(-50%);

  /** Comment out the left: 50%; bottom: 80px; transform: translateX(-50%); below
   *  Uncomment the left: 40px; top: 40px; below to experience a different feel. Ah? Still not up to the mark, adjust the position yourself🥹
   */
  // left: 40px;
  // top: 40px;
}
</style>
