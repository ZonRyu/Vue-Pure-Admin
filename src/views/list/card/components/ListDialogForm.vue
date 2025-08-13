<script setup lang="ts">
import { ref, watch } from "vue";
import { message } from "@/utils/message";
import { FormInstance } from "element-plus";

const SELECT_OPTIONS = [
  { label: "Gateway", value: 1 },
  { label: "Artificial Intelligence", value: 2 },
  { label: "Cloud Virtual Machine", value: 3 },
  { label: "Firewall", value: 4 },
  { label: "Unknown", value: 5 }
];

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => {
      return {};
    }
  }
});

const ruleFormRef = ref<FormInstance>();

const formVisible = ref(false);
const formData = ref(props.data);
const textareaValue = ref("");

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      message("Submit successfully", { type: "success" });
      formVisible.value = false;
      resetForm(formEl);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const closeDialog = () => {
  formVisible.value = false;
  resetForm(ruleFormRef.value);
};

const emit = defineEmits(["update:visible"]);
watch(
  () => formVisible.value,
  val => {
    emit("update:visible", val);
  }
);

watch(
  () => props.visible,
  val => {
    formVisible.value = val;
  }
);

watch(
  () => props.data,
  val => {
    formData.value = val;
  }
);

const rules = {
  name: [{ required: true, message: "Please enter product name", trigger: "blur" }]
};
</script>

<template>
  <el-dialog
    v-model="formVisible"
    title="New Product"
    :width="680"
    draggable
    :before-close="closeDialog"
  >
    <!-- Form content -->
    <el-form
      ref="ruleFormRef"
      :model="formData"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="Product Name" prop="name">
        <el-input
          v-model="formData.name"
          :style="{ width: '480px' }"
          placeholder="Please enter product name"
        />
      </el-form-item>
      <el-form-item label="Product Status" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio value="0">Disabled</el-radio>
          <el-radio value="1">Enabled</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Product Description" prop="description">
        <el-input
          v-model="formData.description"
          :style="{ width: '480px' }"
          placeholder="Please enter product description"
        />
      </el-form-item>
      <el-form-item label="Product Type" prop="type">
        <el-select
          v-model="formData.type"
          clearable
          :style="{ width: '480px' }"
        >
          <el-option
            v-for="(item, index) in SELECT_OPTIONS"
            :key="index"
            :value="item.value"
            :label="item.label"
          >
            {{ item.label }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Remarks" prop="mark">
        <el-input
          v-model="textareaValue"
          type="textarea"
          :style="{ width: '480px' }"
          placeholder="Please enter content"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDialog">Cancel</el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Confirm
      </el-button>
    </template>
  </el-dialog>
</template>
