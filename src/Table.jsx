import {useState} from "react";
import {AgGridReact} from "@ag-grid-community/react";
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';
// Theme
import {ModuleRegistry} from '@ag-grid-community/core';

// React Grid Logic
import '@ag-grid-community/styles/ag-grid.css';
// Core CSS
import '@ag-grid-community/styles/ag-theme-quartz.css';

import data from './data.json'

ModuleRegistry.registerModules([ClientSideRowModelModule]);

var filterParams = {
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("/");
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0]),
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  },
  minValidYear: 2000,
  maxValidYear: 2024,
  inRangeFloatingFilterDateFormat: "Do MMM YYYY",
};

export const Table = () => {
  const [rowData, setRowData] = useState(data.data);

  const [colDefs, setColDefs] = useState([
    {field: 'transactionID'},
    {field: 'GLPeriod', filter: "agDateColumnFilter", filterParams: filterParams},
    {field: 'Value'},
    {field: 'ptc', headerName: 'Project Task Code'},
    {field: 'ca', headerName: 'Control Account'},
    {field: 'P6Task', filter: false},
    {field: 'ec', headerName: 'Expenditure Category', filter: true},
    {field: 'et', headerName: 'Expenditure Type'},
    {field: 'sn', headerName: 'Supplier name'},
    {field: 'ts', headerName: 'Transaction Source'},
    {field: 'Description'},
  ]);

  const defaultColDef = {
    flex: 1,
    minWidth: 150,
    filter: true,
    floatingFilter: true,
  };

  return (
    <div
      className="ag-theme-quartz"
      style={{width: '100%', height: '100%'}}
    >
      <AgGridReact rowData={rowData} columnDefs={colDefs} defaultColDef={defaultColDef}/>
    </div>
  )
}