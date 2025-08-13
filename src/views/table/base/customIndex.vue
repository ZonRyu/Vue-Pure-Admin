<script setup lang="ts">
import { tableData } from "./data";

const indexMethod = (index: number) => {
  return index * 2;
};

const columns: TableColumnList = [
  {
    type: "index",
    index: indexMethod
  },
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
  <pure-table :data="tableData" :columns="columns" />
</template>
