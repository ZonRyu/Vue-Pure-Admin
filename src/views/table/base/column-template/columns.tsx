import { message } from "@/utils/message";
import { tableData } from "../data";

// 如果您不习惯tsx写法，可以传slot，然后在template里写
// 需是hooks写法（函数中有return），避免失去响应性
export function useColumns() {
  const columns: TableColumnList = [
    {
      label: "Date",
      prop: "date",
      cellRenderer: ({ row }) => (
        <div style="display: flex; align-items: center">
          <iconify-icon-online icon="ep:timer" />
          <span style="margin-left: 10px">{row.date}</span>
        </div>
      )
    },
    {
      label: "Name",
      prop: "name",
      cellRenderer: ({ row }) => (
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          {{
            default: () => (
              <>
                <div>name: {row.name}</div>
                <div>address: {row.address}</div>
              </>
            ),
            reference: () => <el-tag>{row.name}</el-tag>
          }}
        </el-popover>
      )
    },
    {
      label: "Address",
      prop: "address"
    },
    {
      label: "Operation",
      cellRenderer: ({ index, row }) => (
        <>
          <el-button size="small" onClick={() => handleEdit(index + 1, row)}>
            Edit
          </el-button>
          <el-button
            size="small"
            type="danger"
            onClick={() => handleDelete(index + 1, row)}
          >
            Delete
          </el-button>
        </>
      )
    }
  ];

  const handleEdit = (index: number, row) => {
    message(`You modified the ${index} row, data: ${JSON.stringify(row)}`, {
      type: "success"
    });
  };

  const handleDelete = (index: number, row) => {
    message(`You deleted the ${index} row, data: ${JSON.stringify(row)}`);
  };

  return {
    columns,
    tableData
  };
}
