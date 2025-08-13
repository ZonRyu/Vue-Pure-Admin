<script setup lang="ts">
import { tableDataSortable } from "./data";

const columns: TableColumnList = [
  {
    label: "Date",
    prop: "date",
    sortable: true
  },
  {
    label: "Name",
    prop: "name"
  },
  {
    label: "Address",
    prop: "address",
    formatter: ({ address }) => `Formatted content: ${address}`
  }
];
</script>

<template>
  <pure-table
    :data="tableDataSortable"
    :columns="columns"
    :default-sort="{ prop: 'date', order: 'ascending' }"
  />
</template>
