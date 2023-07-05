/// REACT
import { useMemo} from "react";
// CSS
import { tableStyle, thStyle, tdStyle, tdFooterStyle } from "../css/tableCss";
// LIBRARIES
import { useTable } from "react-table";
import axios from 'axios';

export default function TableBudget(props) {

  const data = useMemo(() => props.budget, [props.budget]);
  const columns = useMemo(
    () => [
      {
        Header: "Category",
        accessor: "category", // accessor is the "key" in the data
        Footer: "Total"
      },
      {
        Header: "Amount",
        accessor: "amount",
        Footer: info => {
          const total = useMemo(
            () =>
              info.rows.reduce((sum, row) => row.values.amount + sum, 0),
            [info.rows]
          )

          return total
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
  } = useTable({ columns, data }, (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        // Header: "Delete",
        Cell: ({ row }) => (
          <button onClick={() => {
            if (confirm("Are you sure to delete? Any related expenses to this category will be DELETED too!!")) {
              axios.delete('/api/deleteBudget/', {
                data: {
                  id: row.original.id,
                },
              })
              .then(async res => {
                try {
                  const response = await axios.post('/api/getBudget', {
                    email: props.session.user.email,
                  })
                  if (response.status === 200) {
                    props.setBudget(response.data);
                  }
                } catch(e) {
                  console.error(e);
                }
              })
              .catch(error => console.error(error));
            }
          }}
          >Delete</button>
        ),
      },
    ]);
  });

  return (
    <table
      {...getTableProps()}
      style={tableStyle}
      data-testid='budgetTable'
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={thStyle}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={tdStyle}
                    onClick={() => {
                      if (cell.render('Cell').props.cell.column.Header === 'Amount' && confirm("Do you want to edit the amount?")) {
                        let amount = prompt("Enter the new amount", "Example: 200")
                        if (amount) {
                          axios.put('/api/updateBudget/', {
                            id: cell.render('Cell').props.cell.row.original.id,
                            amount: parseFloat(amount),
                          })
                          .then(async res => {
                            try {
                              const response = await axios.post('/api/getBudget', {
                                email: props.session.user.email,
                              })
                              if (response.status === 200) {
                                props.setBudget(response.data);
                              }
                            } catch(e) {
                              console.error(e);
                            }
                          })
                          .catch(error => console.error(error))
                        }
                      }
                      else {
                        return null;
                      }
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        {footerGroups.map((footerGroup) => (
          <tr {...footerGroup.getFooterGroupProps()}>
            {footerGroup.headers.map((column) => (
              <td
                {...column.getFooterProps()}
                style={tdFooterStyle}
              >
                {column.render("Footer")}
              </td>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
}