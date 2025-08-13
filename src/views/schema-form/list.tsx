import Base from "./form/base.vue";
import Dialog from "./form/dialog.vue";
import Drawer from "./form/drawer.vue";
import Steps from "./form/steps.vue";
import Search from "./form/search.vue";

const rendContent = (val: string) =>
  `Code location: src/views/schema-form/form/${val}.vue`;

export const list = [
  {
    key: "base",
    content: rendContent("base"),
    title: "Basic form",
    component: Base
  },
  {
    key: "dialog",
    content: rendContent("dialog"),
    title: "Dialog form",
    component: Dialog
  },
  {
    key: "drawer",
    content: rendContent("drawer"),
    title: "Drawer form",
    component: Drawer
  },
  {
    key: "steps",
    content: rendContent("steps"),
    title: "Steps form",
    component: Steps
  },
  {
    key: "search",
    content: rendContent("search"),
    title: "Search form",
    component: Search
  }
];
