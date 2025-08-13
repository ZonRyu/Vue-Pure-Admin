<script setup lang="ts">
import { reactive, ref } from "vue";
import { formUpload } from "@/api/mock";
import { message } from "@/utils/message";
import { createFormData } from "@pureadmin/utils";

import UploadIcon from "~icons/ri/upload-2-line?width=26&height=26";

const formRef = ref();
const uploadRef = ref();
const validateForm = reactive({
  fileList: [],
  date: ""
});

const submitForm = formEl => {
  if (!formEl) return;
  formEl.validate(valid => {
    if (valid) {
      // Upload multiple files in a single API call
      const formData = createFormData({
        files: validateForm.fileList.map(file => ({ raw: file.raw })), // File data
        date: validateForm.date // Other fields
      });
      formUpload(formData)
        .then(({ success }) => {
          if (success) {
            message("Submission successful", { type: "success" });
          } else {
            message("Submission failed");
          }
        })
        .catch(error => {
          message(`Submission error: ${error}`, { type: "error" });
        });
    } else {
      return false;
    }
  });
};

const resetForm = formEl => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<template>
  <el-form ref="formRef" :model="validateForm" label-width="82px">
    <el-form-item
      label="Attachments"
      prop="fileList"
      :rules="[{ required: true, message: 'Attachments cannot be empty' }]"
    >
      <el-upload
        ref="uploadRef"
        v-model:file-list="validateForm.fileList"
        drag
        multiple
        action="#"
        class="w-[200px]!"
        :auto-upload="false"
      >
        <div class="el-upload__text">
          <UploadIcon class="m-auto mb-2" />
          Click or drag files to upload
        </div>
      </el-upload>
    </el-form-item>
    <el-form-item
      label="Date"
      prop="date"
      :rules="[{ required: true, message: 'Date cannot be empty' }]"
    >
      <el-date-picker
        v-model="validateForm.date"
        type="datetime"
        class="w-[200px]!"
        placeholder="Please select date and time"
        value-format="YYYY-MM-DD HH:mm:ss"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" text bg @click="submitForm(formRef)">
        Submit
      </el-button>
      <el-button text bg @click="resetForm(formRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>
