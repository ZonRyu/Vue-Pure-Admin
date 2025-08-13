<script setup lang="ts">
import { ref } from "vue";
import { tableData } from "./data";

type TableLayout = "fixed" | "auto";

const tableLayout = ref<TableLayout>("fixed");

const columns: TableColumnList = [
  {
    label: "Date",
    prop: "date"
  },
  {
    label: "Name",
    prop: "name"
  },
  {
    label: "Address",
    prop: "address"
  }
];
</script>

<template>
  <div>
    <el-radio-group v-model="tableLayout">
      <el-radio-button label="fixed" value="fixed" />
      <el-radio-button label="auto" value="auto" />
    </el-radio-group>

    <pure-table
      :data="tableData"
      :columns="columns"
      :table-layout="tableLayout"
    />
  </div>
</template>
