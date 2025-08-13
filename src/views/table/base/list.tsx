import Base from "./base.vue";
import Stripe from "./stripe.vue";
import Border from "./border.vue";
import Status from "./status.vue";
import FixHeader from "./fixHeader.vue";
import FixColumn from "./fixColumn.vue";
import FluidHeight from "./fluidHeight.vue";
import GroupHeader from "./groupHeader.vue";
import Radio from "./radio.vue";
import MultipleChoice from "./multipleChoice.vue";
import Sortable from "./sortable.vue";
import Filters from "./filters.vue";
import ColumnTemplate from "./column-template/index.vue";
import HeaderRenderer from "./header-renderer/index.vue";
import Expand from "./expand.vue";
import TreeTable from "./tree.vue";
import TotalRow from "./totalRow.vue";
import Merge from "./merge.vue";
import CustomIndex from "./customIndex.vue";
import Layout from "./layout.vue";
import NestProp from "./nestProp.vue";
import ImgPreview from "./imgPreview.vue";

const rendContent = (val: string) =>
  `Code location: src/views/table/base/${val}.vue`;

export const list = [
  {
    key: "base",
    content: rendContent("base"),
    title: "Basic table",
    component: Base
  },
  {
    key: "stripe",
    content: rendContent("stripe"),
    title: "Stripe table",
    component: Stripe
  },
  {
    key: "border",
    content: rendContent("border"),
    title: "Border table",
    component: Border
  },
  {
    key: "status",
    content: rendContent("status"),
    title: "Status table",
    component: Status
  },
  {
    key: "fixHeader",
    content: rendContent("fixHeader"),
    title: "Fixed header",
    component: FixHeader
  },
  {
    key: "fixColumn",
    content: rendContent("fixColumn"),
    title: "Fixed column",
    component: FixColumn
  },
  {
    key: "fixColumnHeader",
    content: rendContent("fixColumn"),
    title: "Fixed column and header",
    component: () => <FixColumn height={"360"} />
  },
  {
    key: "groupHeader",
    content: rendContent("groupHeader"),
    title: "Group header",
    component: GroupHeader
  },
  {
    key: "fluidHeight",
    content: rendContent("fluidHeight"),
    title: "Fluid height",
    component: FluidHeight
  },
  {
    key: "radio",
    content: rendContent("radio"),
    title: "Radio",
    component: Radio
  },
  {
    key: "multipleChoice",
    content: rendContent("multipleChoice"),
    title: "Multiple choice",
    component: MultipleChoice
  },
  {
    key: "sortable",
    content: rendContent("sortable"),
    title: "Sorting and formatting",
    component: Sortable
  },
  {
    key: "filters",
    content: rendContent("filters"),
    title: "Filters",
    component: Filters
  },
  {
    key: "column-template",
    content: rendContent("column-template/index"),
    title: "Custom column template",
    component: ColumnTemplate
  },
  {
    key: "header-renderer",
    content: rendContent("header-renderer/index"),
    title: "Custom header renderer",
    component: HeaderRenderer
  },
  {
    key: "expand",
    content: rendContent("expand"),
    title: "Expand row",
    component: Expand
  },
  {
    key: "tree",
    content: rendContent("tree"),
    title: "Tree table",
    component: TreeTable
  },
  {
    key: "totalRow",
    content: rendContent("totalRow"),
    title: "Total row",
    component: TotalRow
  },
  {
    key: "merge",
    content: rendContent("merge"),
    title: "Merge row or column",
    component: Merge
  },
  {
    key: "customIndex",
    content: rendContent("customIndex"),
    title: "Custom index",
    component: CustomIndex
  },
  {
    key: "layout",
    content: rendContent("layout"),
    title: "Table layout",
    component: Layout
  },
  {
    key: "nestProp",
    content: rendContent("nestProp"),
    title: "Nest prop",
    component: NestProp
  },
  {
    key: "imgPreview",
    content: rendContent("imgPreview"),
    title: "Image preview",
    component: ImgPreview
  }
];
