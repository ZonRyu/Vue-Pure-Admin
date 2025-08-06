import { tableData } from "../../data";
import { delay } from "@pureadmin/utils";
import { ref, onMounted, reactive } from "vue";
import type { PaginationProps } from "@pureadmin/table";
import ThumbUp from "~icons/ri/thumb-up-line";
import Hearts from "~icons/ri/hearts-line";
import Empty from "./empty.svg?component";

export function useColumns() {
  const dataList = ref([]);
  const loading = ref(true);
  const columns: TableColumnList = [
    {
      sortable: true,
      label: "Serial number",
      prop: "id"
    },
    {
      sortable: true,
      label: "Number of people required",
      prop: "requiredNumber",
      filterMultiple: false,
      filterClassName: "pure-table-filter",
      filters: [
        { text: "≥16000", value: "more" },
        { text: "<16000", value: "less" }
      ],
      filterMethod: (value, { requiredNumber }) => {
        return value === "more"
          ? requiredNumber >= 16000
          : requiredNumber < 16000;
      }
    },
    {
      sortable: true,
      label: "Number of questions",
      prop: "questionNumber"
    },
    {
      sortable: true,
      label: "Solve quantity",
      prop: "resolveNumber"
    },
    {
      sortable: true,
      label: "User satisfaction",
      minWidth: 100,
      prop: "satisfaction",
      cellRenderer: ({ row }) => (
        <div class="flex justify-center w-full">
          <span class="flex items-center w-[60px]">
            <span class="ml-auto mr-2">{row.satisfaction}%</span>
            <iconifyIconOffline
              icon={row.satisfaction > 98 ? Hearts : ThumbUp}
              color="#e85f33"
            />
          </span>
        </div>
      )
    },
    {
      sortable: true,
      label: "Statistics date",
      prop: "date"
    },
    {
      label: "Operate",
      fixed: "right",
      slot: "operation"
    }
  ];

  /** Paging configuration */
  const pagination = reactive<PaginationProps>({
    pageSize: 10,
    currentPage: 1,
    layout: "prev, pager, next",
    total: 0,
    align: "center"
  });

  function onCurrentChange(page: number) {
    console.log("onCurrentChange", page);
    loading.value = true;
    delay(300).then(() => {
      loading.value = false;
    });
  }

  onMounted(() => {
    dataList.value = tableData;
    pagination.total = dataList.value.length;
    loading.value = false;
  });

  return {
    Empty,
    loading,
    columns,
    dataList,
    pagination,
    onCurrentChange
  };
}
