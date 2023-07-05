// REACT
import { useMemo } from 'react';
// LIBRARIES
import { useTable } from 'react-table';
// CSS
import {thStyle} from '../css/tableCss';

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
          Footer: info => {
            const total = useMemo(
              () =>
                info.rows.reduce((sum, row) => row.values['_sum.amount'] + sum, 0),
                [info.rows]
            )
            return total.toFixed(2)
          }
        },
        {
          Header: 'Budget',
          accessor: 'amount',
          Footer: info => {
            const total = useMemo(
              () =>
                info.rows.reduce((sum, row) => row.values['amount'] + sum, 0),
                [info.rows]
            )
            return total.toFixed(2)
          }
        },
        {
          Header: 'Net',
          accessor: 'net',
          Footer: info => {
            const total = useMemo(
              () =>
                info.rows.reduce((sum, row) => row.values['net'] + sum, 0),
                [info.rows]
            )
            return total.toFixed(2)
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
  
    return (
      <table {...getTableProps()} style={{ borderSpacing: '0px', margin: 'auto'}} data-testid='expensesTableSummary'>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  style={thStyle}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={
                        cell.render('Cell').props.cell.column.Header === "Net" && cell.render('Cell').props.value < 0 ? 
                        {
                          background: '#AF0000',
                          border: 'solid 1px black',
                          color: 'white',
                          textAlign: 'center',
                        } :
                        cell.render('Cell').props.cell.column.Header === "Net" && cell.render('Cell').props.value >= 0 ?
                        {
                          background: 'green',
                          border: 'solid 1px black',
                          color: 'white',
                          textAlign: 'center',
                        } :
                        {
                        padding: '10px',
                        border: 'solid 1px black',
                        background: '#D9D9D9',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
        <tfoot>
        {footerGroups.map((footerGroup) => (
          <tr {...footerGroup.getFooterGroupProps()}>
            {footerGroup.headers.map((column) => (
              <td
                {...column.getFooterProps()}
                style={{
                  padding: '10px',
                  border: 'solid 1px black',
                  background: '#D9D9D9',
                  fontWeight: "bold",
                }}
              >
                {column.render("Footer")}
              </td>
            ))}
          </tr>
        ))}
      </tfoot>
      </table>
    )
  }