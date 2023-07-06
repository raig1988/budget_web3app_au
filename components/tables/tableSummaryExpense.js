// REACT
import { useMemo } from 'react';
// LIBRARIES
import { useTable } from 'react-table';
// CSS
import { thStyle, tableDetailSummary, tdStyle, tdStyleRed, tdStyleGreen, tdFooterStyle} from '../css/tableCss';

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
  
    return (
      <table {...getTableProps()} style={tableDetailSummary} data-testid='expensesTableSummary'>
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
                        tdStyleRed :
                        cell.render('Cell').props.cell.column.Header === "Net" && cell.render('Cell').props.value >= 0 ?
                        tdStyleGreen :
                        tdStyle
                        }
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
            {footerGroup.headers.map((column) => {
              return (
              <td
                {...column.getFooterProps()}
                style={tdFooterStyle}
              >
                {column.render("Footer")}
              </td>
            )}
            )}
          </tr>
        ))}
      </tfoot>
      </table>
    )
  }