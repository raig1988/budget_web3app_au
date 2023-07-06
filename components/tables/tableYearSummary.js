// REACT
import { useMemo } from "react";
// LIBRARIES
import { useGroupBy, useExpanded, useTable } from "react-table";
// CSS
import { tableStyle, thStyle, tdFooterStyle, tdSummary } from "../css/tableCss";

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

  return (
    <table {...getTableProps()} style={tableStyle} data-testid="summaryTableYear">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} style={thStyle}>
                {column.canGroupBy ? (
                  <span {...column.getGroupByToggleProps()}>
                    {column.isGrouped ? "🛑 " : "👊 "}
                  </span>
                ) : null}
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={
                      tdSummary(cell)
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
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        {footerGroups.map((group) => (
          <tr {...group.getFooterGroupProps()}>
            {group.headers.map((column) => (
              <td {...column.getFooterProps()} style={tdFooterStyle}>
                {column.render("Footer")}
              </td>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
}
