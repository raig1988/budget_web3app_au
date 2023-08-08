// REACT
import { useMemo } from "react";
// LIBRARIES
import { useTable } from "react-table";
import axios from "axios";
// CHAKRA
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";

export default function TableDetail(props) {
  const data = useMemo(() => props.expenses, [props.expenses]);
  const columns = useMemo(
    () => [
      {
        Header: "Day",
        accessor: "day", // accessor is the "key" in the data
      },
      {
        Header: "Category",
        accessor: "category.category",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ value }) => `${value.toLocaleString()}`,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, (hooks) => {
      hooks.visibleColumns.push((columns) => [
        ...columns,
        {
          // Header: "Delete",
          Cell: ({ row }) => (
            <Button
              onClick={() => {
                if (confirm("Are you sure to delete?")) {
                  props.setLoadingForm(true);
                  axios
                    .delete("/api/deleteExpense/", {
                      data: {
                        id: row.original.id,
                      },
                    })
                    .then(async (res) => {
                      try {
                        const response = await axios.post(
                          "/api/getExpenseByMaY/",
                          {
                            address: props.session.user.address,
                            month: props.month,
                            year: props.year,
                          }
                        );
                        props.setLoadingForm(false);
                        if (response.status == 200) {
                          props.setExpenses(response.data);
                        }
                      } catch (e) {
                        console.error(e);
                      }
                    })
                    .catch((e) => {
                      console.error(e);
                    });
                }
              }}
            >
              Delete
            </Button>
          ),
        },
      ]);
    });

    // maxWidth={{ base: "350px",  lg: "100%"}}
  return (
    <TableContainer >
      <Table {...getTableProps()} data-testid="expensesTableDetail">
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
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
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
