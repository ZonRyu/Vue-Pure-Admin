<script setup lang="ts">
const tableData = [
  {
    userInfo: { name: "Test1", age: 22 },
    other: [
      { sex: "Female" },
      {
        more: {
          content: '<div><span style="color: red">I am an HTML fragment</span></div>'
        }
      }
    ],
    role: "Designer"
  },
  {
    userInfo: { name: "Test2", age: 28 },
    other: [
      { sex: "Male" },
      {
        more: {
          content:
            '<img width="100" height="100" src="https://pure-admin.github.io/pure-admin-table/imgs/11.jpg">'
        }
      }
    ],
    role: "Backend"
  },
  {
    userInfo: { name: "Test3", age: 20 },
    other: [
      { sex: "Female" },
      {
        more: {
          content:
            '<img width="100" height="100" src="https://pure-admin.github.io/pure-admin-table/imgs/1.jpg">'
        }
      }
    ],
    role: "Developer Motivator"
  },
  {
    userInfo: { name: "Test4", age: 26 },
    other: [
      { sex: "Male" },
      {
        more: {
          content:
            '<a href="https://github.com/xiaoxian521" target="_black">I am a link, click me to Follow</a>'
        }
      }
    ],
    role: "Frontend"
  }
];

const columns: TableColumnList = [
  {
    label: "Name",
    prop: "userInfo.name"
  },
  {
    label: "Gender",
    prop: "other[0].sex"
  },
  {
    label: "Age",
    prop: "userInfo.age"
  },
  {
    label: "Html Fragment",
    slot: "content"
  },
  {
    label: "Role",
    prop: "role"
  }
];
</script>

<template>
  <pure-table :data="tableData" :columns="columns">
    <template #content="{ row }">
      <span v-html="row.other[1].more.content" />
    </template>
  </pure-table>
</template>
