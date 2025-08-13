import { ref } from "vue";
import { tableData, options } from "../data";
import { clone, delObjectProperty } from "@pureadmin/utils";

export function useColumns() {
  const editMap = ref({});
  const dataList = ref(clone(tableData, true));

  const columns: TableColumnList = [
    {
      label: "Name",
      prop: "name",
      cellRenderer: ({ row, index }) => (
        <>
          {editMap.value[index]?.editable ? (
            <el-input v-model={row.name} />
          ) : (
            <p>{row.name}</p>
          )}
        </>
      )
    },
    {
      label: "Gender",
      prop: "sex",
      cellRenderer: ({ row, index }) => (
        <>
          {editMap.value[index]?.editable ? (
            <el-switch
              v-model={row.sex}
              inline-prompt
              active-value={0}
              inactive-value={1}
              active-text="Male"
              inactive-text="Female"
            />
          ) : (
            <p>{row.sex === 0 ? "Male" : "Female"}</p>
          )}
        </>
      )
    },
    {
      label: "Hobby",
      prop: "hobby",
      cellRenderer: ({ row, index }) => (
        <>
          {editMap.value[index]?.editable ? (
            <el-select v-model={row.hobby} clearable placeholder="Select hobby">
              {options.map(item => {
                return (
                  <el-option
                    key={item.value}
                    label={item.label}
                    value={item.value}
                  />
                );
              })}
            </el-select>
          ) : (
            <el-tag type="primary">
              {options.filter(opt => opt.value == row.hobby)[0]?.label}
            </el-tag>
          )}
        </>
      )
    },
    {
      label: "Date",
      prop: "date",
      cellRenderer: ({ row, index }) => (
        <>
          {editMap.value[index]?.editable ? (
            <el-date-picker
              v-model={row.date}
              type="date"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
              placeholder="Select date"
            />
          ) : (
            <p>{row.date}</p>
          )}
        </>
      ),
      minWidth: 110
    },
    {
      label: "Operation",
      fixed: "right",
      slot: "operation"
    }
  ];

  function onEdit(row, index) {
    editMap.value[index] = Object.assign({ ...row, editable: true });
  }

  function onSave(index) {
    editMap.value[index].editable = false;
  }

  function onCancel(index) {
    editMap.value[index].editable = false;
    dataList.value[index] = delObjectProperty(editMap.value[index], "editable");
  }

  return {
    editMap,
    columns,
    dataList,
    onEdit,
    onSave,
    onCancel
  };
}
