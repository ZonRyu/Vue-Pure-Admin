<script setup lang="ts">
import { tableDataMore } from "./data";

const columns: TableColumnList = [
  {
    label: "Date",
    prop: "date",
    fixed: true
  },
  {
    label: "Name",
    prop: "name",
    children: [
      {
        label: "Address",
        children: [
          {
            label: "City",
            prop: "city"
          },
          {
            label: "Address",
            prop: "address"
          }
        ]
      }
    ]
  },
  {
    label: "Post-code",
    prop: "post-code"
  }
];
</script>

<template>
  <pure-table :data="tableDataMore" :columns="columns" alignWhole="center" />
</template>
