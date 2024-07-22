import { makeData, wbsdata, wbsmapdata } from "./makeData.js";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ActionIcon, Box, Flex, Select, Table, Text } from "@mantine/core";
import { IconArrowRight, IconArrowDown } from "@tabler/icons-react";

const CustomCell = ({ getValue, row: { index }, column: { id }, table }) => {
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
      data={wbsmapdata}
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
          Choose WBS Item
        </Text>
      )}
    </Box>
  );
};

export const TableMapping = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "level",
        header: ({ table }) => (
          <>
            <Flex
              justify="flex-start"
              align="center"
              gap="xs"
              {...{
                onClick: table.getToggleAllRowsExpandedHandler(),
              }}
            >
              {table.getIsAllRowsExpanded() ? (
                <ActionIcon size={18}>
                  <IconArrowDown stroke={2} />
                </ActionIcon>
              ) : (
                <ActionIcon size={18} variant="default">
                  <IconArrowRight stroke={2} />
                </ActionIcon>
              )}
              Level
            </Flex>
          </>
        ),
        cell: ({ row, getValue }) => (
          <div
            style={{
              // Since rows are flattened by default,
              // we can use the row.depth property
              // and paddingLeft to visually indicate the depth
              // of the row
              paddingLeft: `${row.depth * 2}rem`,
            }}
          >
            <Flex justify="flex-start" align="center" gap="xs">
              {row.getCanExpand() ? (
                <Flex
                  justify="flex-start"
                  align="center"
                  gap="md"
                  {...{
                    onClick: row.getToggleExpandedHandler(),
                    style: { cursor: "pointer" },
                  }}
                >
                  {row.getIsExpanded() ? (
                    <ActionIcon size={18}>
                      <IconArrowDown stroke={2} />
                    </ActionIcon>
                  ) : (
                    <ActionIcon size={18} variant="default">
                      <IconArrowRight stroke={2} />
                    </ActionIcon>
                  )}
                </Flex>
              ) : (
                ""
              )}
              <span>{getValue()}</span>
            </Flex>
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        // accessorFn: (row) => row.code,
        accessorKey: "code",
        // cell: (info) => info.getValue(),
        header: () => <span>WBS Code</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "description",
        header: () => "Description",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "cbs",
        header: () => <span>CBS Code</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "parent",
        header: "Parent code",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "unit",
        header: "Unit of measure",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "cbs3",
        header: "CBS level 3 code",
        footer: (props) => props.column.id,
      },
      {
        header: "WBS Supplier Mapping",
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
    },

    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
  });

  useEffect(() => {
    table.setPageSize(50);
  }, []);

  return (
    <Table verticalSpacing="md">
      <Table.Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <Table.Th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
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
