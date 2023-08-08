/// REACT
import { useMemo} from "react";
// LIBRARIES
import { useTable } from "react-table";
import axios from 'axios';
// CHAKRA
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from '@chakra-ui/react'


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
          <Button onClick={() => {
            if (confirm("Are you sure to delete? Any related expenses to this category will be DELETED too!!")) {
              props.setLoading(true);
              axios.delete('/api/deleteBudget/', {
                data: {
                  id: row.original.id,
                },
              })
              .then(async res => {
                try {
                  const response = await axios.post('/api/getBudget', {
                    address: props.session.user.address,
                  })
                  props.setLoading(false);
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
          >Delete</Button>
        ),
      },
    ]);
  });

  return (
    <TableContainer>
      <Table
        {...getTableProps()}
        data-testid='budgetTable'
        variant="simple"
      >
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td
                      {...cell.getCellProps()}
                      style={
                          cell.render('Cell').props.cell.column.Header === 'Amount' ? 
                            {
                              cursor: "pointer",
                            }
                          : null
                      }
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
                                  address: props.session.user.address,
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
                      }}
                    >
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          {footerGroups.map((footerGroup) => (
            <Tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                <Td
                  {...column.getFooterProps()}
                >
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