import List from "./list.vue";
import TreeList from "./treeList.vue";
import PageList from "./pageList.vue";

const rendContent = (val: string) =>
  `Code location: src/views/table/virtual/${val}.vue`;

export const list = [
  {
    key: "list",
    content: rendContent("list"),
    title: "Virtual table",
    component: List
  },
  {
    key: "treeList",
    content: rendContent("treeList"),
    title: "Virtual tree table",
    component: TreeList
  },
  {
    key: "pageList",
    content: rendContent("pageList"),
    title: "Pagination table",
    component: PageList
  }
];
