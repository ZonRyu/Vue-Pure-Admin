<script setup lang="ts">
import { tableData } from "./data";

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
  <pure-table :data="tableData" :columns="columns" />
</template>
