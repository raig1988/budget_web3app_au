// REACT
import { useMemo } from "react";
// LIBRARIES
import { useGroupBy, useExpanded, useTable } from "react-table";
// CHAKRA
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tfoot,
} from "@chakra-ui/react";

export default function TableYearSummary(props) {
  const data = useMemo(() => props.summaryData, [props.summaryData]);

  const columns = useMemo(
    () => [
      {
        Header: "Month",
        accessor: "monthName",
      },
      {
        Header: "Category",
        accessor: "category",
        Footer: "Total by Year",
        Aggregated: "Total by Category",
      },
      {
        Header: "Amount",
        accessor: "_sum.amount",
        aggregate: "sum",
        Cell: ({value}) => `${value.toLocaleString()}` ,
        Aggregated: ({ value }) => `${parseFloat(value.toFixed(2)).toLocaleString()}`,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (sum, row) => row.values["_sum.amount"] + sum,
                0
              ),
            [info.rows]
          );
          return parseFloat(total.toFixed(2)).toLocaleString();
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state: { groupBy, expanded },
  } = useTable({ columns, data }, useGroupBy, useExpanded);

  // maxWidth={{ base: "350px",  lg: "100%"}} margin={"auto auto"}
  return (
    <TableContainer >
      <Table {...getTableProps()} data-testid="summaryTableYear" >
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()} >
                  {column.canGroupBy ? (
                    <span {...column.getGroupByToggleProps()}>
                      {column.isGrouped ? "🛑 " : "👊 "}
                    </span>
                  ) : null}
                  {column.render("Header")}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td
                      {...cell.getCellProps()}
                      style={
                        cell.isGrouped ? 
                        {
                          background: "#217D1C",
                          color: "white"
                        } :
                        cell.isAggregated || cell.isPlaceholder ?
                        {
                          background: "black",
                          color: "white",
                        } : null
                      }
                    >
                      {cell.isGrouped ? (
                        <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? "👇" : "👉"}
                          </span>{" "}
                          {cell.render("Cell")} ({row.subRows.length})
                        </>
                      ) : cell.isAggregated ? (
                        cell.render("Aggregated")
                      ) : cell.isPlaceholder ? null : (
                        cell.render("Cell")
                      )}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          {footerGroups.map((group) => (
            <Tr {...group.getFooterGroupProps()}>
              {group.headers.map((column) => (
                <Td {...column.getFooterProps()} >
                  {column.render("Footer")}
                </Td>
              ))}
            </Tr>
          ))}
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
