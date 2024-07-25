import { mapelement, mapwbs, wbsdata } from "./makeData.js";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  flexRender,
  createColumnHelper,
  getSortedRowModel,
} from "@tanstack/react-table";
import { ActionIcon, Box, Flex, Select, Table, Text } from "@mantine/core";
import {
  IconArrowRight,
  IconArrowDown,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";

const CustomCell = ({
  getValue,
  row: { index },
  column: { id },
  table,
  type = "element",
}) => {
  const initialValue = getValue();

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    table.options.meta?.updateData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return isEditing ? (
    <Select
      placeholder="Pick WBS Item"
      data={type === "element" ? mapelement : mapwbs}
      searchable
      onBlur={handleBlur}
      value={value}
      onChange={setValue}
      style={{ width: "200px" }}
    />
  ) : (
    <Box
      onClick={handleDoubleClick}
      style={{ height: "36px", lineHeight: "36px" }}
    >
      {value ? (
        value
      ) : (
        <Text fz="sm" style={{ color: "#808080" }}>
          Choose {type === "element" ? "Element" : "WBS"}
        </Text>
      )}
    </Box>
  );
};

export const TableMapping = () => {
  const [columnFilters, setColumnFilters] = useState([]);

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.group({
        id: "hello",
        header: () => <span>WBS National Highways</span>,
        // footer: props => props.column.id,
        columns: [
          {
            accessorKey: "element",
            header: () => <span>Work Element</span>,
            footer: (props) => props.column.id,
            meta: {
              filterVariant: "select",
            },
          },
          {
            accessorKey: "level",
            header: () => "Level",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "wbs",
            header: "WBS Code",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "cbs",
            header: "CBS Code",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "desc",
            header: "Description",
            footer: (props) => props.column.id,
          },
        ],
      }),
      columnHelper.group({
        id: "hello2",
        header: () => <span>WBS Supplier</span>,
        // footer: props => props.column.id,
        columns: [
          {
            header: "Mapping Element",
            accessor: "test",
            cell: ({ getValue, row, column, table }) => (
              <CustomCell
                getValue={getValue}
                row={row}
                column={column}
                table={table}
              />
            ),
          },
          {
            header: "Mapping WBS",
            accessor: "test",
            cell: ({ getValue, row, column, table }) => (
              <CustomCell
                type="wbs"
                getValue={getValue}
                row={row}
                column={column}
                table={table}
              />
            ),
          },
        ],
      }),
    ],
    [],
  );

  const [data, setData] = useState(() => wbsdata);

  const [expanded, setExpanded] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
  });

  useEffect(() => {
    // table.setPageSize(50);
    table.setPageSize(300);
  }, []);

  return (
    <Table
      verticalSpacing="sm"
      striped
      highlightOnHover
      withTableBorder
      // withColumnBorders
    >
      <Table.Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <Table.Th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      style={{ display: "flex", alignItems: "center" }}
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: <IconSortAscending stroke={2} />,
                        desc: <IconSortDescending stroke={2} />,
                      }[header.column.getIsSorted()] ?? null}
                      {header.column.getCanFilter() ? (
                        <div style={{ marginLeft: "8px" }}>
                          <Filter column={header.column} />
                        </div>
                      ) : null}
                    </div>
                  )}
                </Table.Th>
              );
            })}
          </Table.Tr>
        ))}
      </Table.Thead>
      <Table.Tbody>
        {table.getRowModel().rows.map((row) => {
          return (
            <Table.Tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <Table.Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Td>
                );
              })}
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
};

function Filter({ column }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  return filterVariant === "range" ? (
    <div>
      <div className="flex space-x-2">
        {/* See faceted column filters example for min max values functionality */}
        {/*<DebouncedInput*/}
        {/*  type="number"*/}
        {/*  value={(columnFilterValue as [number, number])?.[0] ?? ''}*/}
        {/*  onChange={value =>*/}
        {/*    column.setFilterValue((old: [number, number]) => [value, old?.[1]])*/}
        {/*  }*/}
        {/*  placeholder={`Min`}*/}
        {/*  className="w-24 border shadow rounded"*/}
        {/*/>*/}
        {/*<DebouncedInput*/}
        {/*  type="number"*/}
        {/*  value={(columnFilterValue as [number, number])?.[1] ?? ''}*/}
        {/*  onChange={value =>*/}
        {/*    column.setFilterValue((old: [number, number]) => [old?.[0], value])*/}
        {/*  }*/}
        {/*  placeholder={`Max`}*/}
        {/*  className="w-24 border shadow rounded"*/}
        {/*/>*/}
      </div>
      <div className="h-1" />
    </div>
  ) : filterVariant === "select" ? (
    // <select
    //   onChange={(e) => column.setFilterValue(e.target.value)}
    //   value={columnFilterValue?.toString()}
    // >
    //   {/* See faceted column filters example for dynamic select options */}
    //   <option value="">All</option>
    //   <option value="complicated">complicated</option>
    //   <option value="relationship">relationship</option>
    //   <option value="single">single</option>
    // </select>
    <Select
      onChange={column.setFilterValue}
      value={columnFilterValue?.toString()}
      data={[
        "A - Preliminaries",
        "BC - Boxed Culverts / Underpasses",
        "C - Central Reserve",
        "EO - Extended Overbridges",
      ]}
      style={{ width: "200px" }}
      comboboxProps={{ width: 300, position: "bottom-start" }}
    />
  ) : (
    <div></div>
    // <DebouncedInput
    //   className="w-36 border shadow rounded"
    //   onChange={value => column.setFilterValue(value)}
    //   placeholder={`Search...`}
    //   type="text"
    //   value={(columnFilterValue ?? '') as string}
    // />
    // See faceted column filters example for datalist search suggestions
  );
}
