const tableData = [
  {
    id: 1,
    name: "Tom",
    sex: 0, // 0代表男 1代表女
    hobby: 2,
    date: "2024-03-17"
  },
  {
    id: 2,
    name: "Jack",
    sex: 0,
    hobby: 1,
    date: "2024-03-18"
  },
  {
    id: 3,
    name: "Lily",
    sex: 1,
    hobby: 1,
    date: "2024-03-19"
  },
  {
    id: 4,
    name: "Mia",
    sex: 1,
    hobby: 3,
    date: "2024-03-20"
  }
];

const options = [
  {
    value: 0,
    label: "Morning coding"
  },
  {
    value: 1,
    label: "Afternoon coding"
  },
  {
    value: 2,
    label: "Evening coding"
  },
  {
    value: 3,
    label: "Late rest"
  }
];

const tableDataEdit = [
  {
    id: 1,
    name: "Tom",
    address: "home"
  },
  {
    id: 2,
    name: "Jack",
    address: "office"
  },
  {
    id: 3,
    name: "Lily",
    address: "library"
  },
  {
    id: 4,
    name: "Mia",
    address: "playground"
  }
];

export { tableData, tableDataEdit, options };
