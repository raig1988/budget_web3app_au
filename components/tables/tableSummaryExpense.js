// REACT
import { useMemo } from 'react';
// LIBRARIES
import { useTable } from 'react-table';
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

export default function TableSummaryExpense(props) {
    const data = useMemo(() => props.summary, [props.summary])
    const columns = useMemo(
      () => [
        {
          Header: 'Category',
          accessor: 'category', // accessor is the "key" in the data
          Footer: "Total"
        },
        {
          Header: 'Amount',
          accessor: '_sum.amount',
          Cell: ({value}) => `${value.toLocaleString()}` ,
          Footer: info => {
            const total = useMemo(
              () =>
                info.rows.reduce((sum, row) => row.values['_sum.amount'] + sum, 0),
                [info.rows]
            )
            return parseFloat(total.toFixed(2)).toLocaleString()
          }
        },
        {
          Header: 'Budget',
          accessor: 'amount',
          Cell: ({value}) => `${value.toLocaleString()}` ,
          Footer: info => {
            const total = useMemo(
              () =>
                info.rows.reduce((sum, row) => row.values['amount'] + sum, 0),
                [info.rows]
            )
            return parseFloat(total.toFixed(2)).toLocaleString()
          }
        },
        {
          Header: 'Net',
          accessor: 'net',
          Cell: ({value}) => `${value.toLocaleString()}` ,
          Footer: info => {
            const total = useMemo(
              () =>
                info.rows.reduce((sum, row) => row.values['net'] + sum, 0),
                [info.rows]
            )
            return parseFloat(total.toFixed(2)).toLocaleString();
          }
        },
      ],
      []
    )
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      footerGroups,
      rows,
      prepareRow,
    } = useTable({ columns, data })
  
    // maxWidth={{ base: "350px",  lg: "100%"}}
    return (
      <TableContainer >
        <Table {...getTableProps()} data-testid='expensesTableSummary'>
          <Thead>
            {headerGroups.map(headerGroup => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <Th
                    {...column.getHeaderProps()}
                  >
                    {column.render('Header')}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <Td
                        {...cell.getCellProps()}
                        style={
                          cell.render('Cell').props.cell.column.Header === "Net" && cell.render('Cell').props.value < 0 ? 
                          {
                            color: "#AD0000",
                            fontWeight: "bold",
                          } :
                          cell.render('Cell').props.cell.column.Header === "Net" && cell.render('Cell').props.value >= 0 ?
                          {
                            color: "green",
                            fontWeight: "bold",
                          }
                          : null
                          }
                      >
                        {cell.render('Cell')}
                      </Td>
                    )
                  })}
                </Tr>
              )
            })}
          </Tbody>
          <Tfoot>
          {footerGroups.map((footerGroup) => (
            <Tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => {
                return (
                <Td
                  {...column.getFooterProps()}
                >
                  {column.render("Footer")}
                </Td>
              )}
              )}
            </Tr>
          ))}
        </Tfoot>
        </Table>
      </TableContainer>
    )
  }