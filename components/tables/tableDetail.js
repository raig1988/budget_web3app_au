// REACT
import { useMemo } from 'react';
// LIBRARIES
import { useTable } from 'react-table';
import axios from 'axios';
// CSS
import { thStyle, tdStyle, tableDetailSummary } from '../css/tableCss';

export default function TableDetail(props) {

  const data = useMemo(() => props.expenses, [props.expenses])
  const columns = useMemo(
    () => [
      {
        Header: 'Day',
        accessor: 'day', // accessor is the "key" in the data
      },
      {
        Header: 'Category',
        accessor: 'category.category',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        Cell: ({value}) => `${value.toLocaleString()}` ,
      },
    ],
    []
  )
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    { columns, data }, 
    (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        // Header: "Delete",
        Cell: ({ row }) => (
          <button onClick={() => {
            if (confirm("Are you sure to delete?")) {
                axios.delete('/api/deleteExpense/', {
                  data: {
                    id: row.original.id,
                  },
                })
                .then(async res => {
                  try {
                    const response = await axios.post("/api/getExpenseByMaY/", {
                        email: props.session.user.email,
                        month: props.month,
                        year: props.year,
                    })
                    if (response.status == 200) {
                      props.setExpenses(response.data);
                    }
                  } catch(e) {
                      console.error(e);
                  }
                })
                .catch(e => {
                  console.error(e);
                })
            }
          }}
          >Delete</button>
        ),
      },
    ])
  })

  return (
    <table {...getTableProps()} style={tableDetailSummary}  data-testid='expensesTableDetail'>
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
                    style={tdStyle}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}