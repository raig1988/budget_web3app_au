// COMPONENTS
import Image from "next/image";
import SignIn from "../components/signIn";
import ExpenseForm from "../components/forms/expenseForm";
import TableDetail from "../components/tables/tableDetail";
import TableSummaryExpense from "../components/tables/tableSummaryExpense";
// PUBLIC
import questionMarkBtn from "../public/images/questionMarkBtn.png";
// REACT
import { useRef, useState } from "react";
// LIBRARIES
import { getSession, useSession } from "next-auth/react";
import prisma from "../lib/client";
import axios from "axios";
// import helper functions
import { toggleLogExpense, summaryOrDetail } from "../lib/helperFunctions";
import { transferToken } from "@/lib/transferToken";
// CHAKRA
import { Button, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Flex, Box, Text, ListItem, OrderedList, Card, CardBody } from "@chakra-ui/react";
import Loading from "@/components/loading";


export default function Expenses(props) {
  // html references
  const expenseFormRef = useRef(null);
  const tableDetailRef = useRef(null);
  const tableSumExpRef = useRef(null);
  // toggle handlers
  const [logExpenseToggle, setLogExpenseToggle] = useState(false);
  const [detailTableToggle, setDetailTableToggle] = useState(false);
  const [tableSumExpToggle, setTableSumExpToggle] = useState(false);
  // set states with ref
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  // expenses & summary received from db and send to tableDetail and tableSummary
  const [expenses, setExpenses] = useState("");
  const [summary, setSummary] = useState("");
  const { data: session } = useSession();
  // nft
  const [monthStatus, setMonthStatus] = useState(false);
  // loding
  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);

  if (session) {
    return (
      <Box margin={"0px auto"}>
        <Text textAlign={"center"} className={"mobileHeading"} data-testid='expensesTitle'>Monthly expenses</Text>
        <Flex gap={"20px"} maxWidth={"500px"} data-testid='expensesSelector'>
          <FormControl >
            <FormLabel textAlign="center" className={"mobileSubheading"}>Month</FormLabel>
            <NumberInput 
                min={1} 
                max={12} 
                variant={"filled"}
                value={month}
                onChange={(value) => {
                  setMonth(value);
                }}
            >
              <NumberInputField
                textAlign={"center"}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center" className={"mobileSubheading"}>Year</FormLabel>
            <NumberInput 
                min={new Date().getFullYear()} 
                max={new Date().getFullYear()} 
                variant={"filled"}
                value={year}
                onChange={(value) => {
                  setYear(value);
                }}
            >
              <NumberInputField
                textAlign={"center"}
              />
            </NumberInput>
          </FormControl>
        </Flex>
        <Flex justifyContent={"space-around"} alignItems={"center"} margin={"20px 0px"} data-testid='expensesLog'>
          <Box>
            <Text margin={"10px 0px"} className="mobileSubheading">Log an expense</Text>
            <Text margin={"10px 0px"} className="mobileParagraph">Click '?' to display / hide</Text>
          </Box>
          <Image
            className="questionMark"
            src={questionMarkBtn}
            alt="question mark button"
            onClick={(e) => toggleLogExpense(e, logExpenseToggle, setLogExpenseToggle, expenseFormRef)}
            data-id="questionMark"
            data-testid='expensesImage'
          />
        </Flex>
        <Box display={"none"} maxWidth={"500px"} ref={expenseFormRef} data-testid='expensesLogForm'>
          <Card margin={"10px 0px"}>
            <CardBody>
              <OrderedList
                paddingInlineStart="20px"
              >
                <ListItem>Enter the month and year.</ListItem>
                <ListItem>Enter the day.</ListItem>
                <ListItem>Choose a category from the list (make sure you have created the category on Budget)</ListItem>
                <ListItem>Finally, enter the expense description and amount in your local currency and click save.</ListItem>
                <ListItem>Once a month, after setting your expenses, you are going to be able to mint 10 BGT tokens by clicking on the close button.</ListItem>
              </OrderedList>
            </CardBody>
          </Card>
          <ExpenseForm
            month={month}
            year={year}
            category={props.category}
            session={session}
            setExpenses={setExpenses}
            setSummary={setSummary}
            setMonthStatus={setMonthStatus}
            setLoadingForm={setLoadingForm}
          />
        </Box>
        <Flex justifyContent={"space-around"} margin={"10px 0px"}>
          <Button
            className="mobileSubheading"
            onClick={async (e) => {
              summaryOrDetail(e, detailTableToggle, setDetailTableToggle, tableDetailRef, tableSumExpToggle, setTableSumExpToggle, tableSumExpRef);
              if (month && year && !detailTableToggle) {
                try {
                  setLoading(true);
                  const res = await axios.post("/api/getMonthStatus", {
                    address: session.user.address,
                    month: month,
                    year: year,
                  })
                  if (res.status == 200) {
                    if (res.data == null) {
                      setMonthStatus(false);
                    } else if (res.data != null) {
                      setMonthStatus(res?.data?.monthStatus);
                    }
                  }
                  const response = await axios.post("/api/getExpenseByMaY/", {
                      address: session.user.address,
                      month: month,
                      year: year,
                  })
                  setLoading(false);
                  if (response.status == 200) {
                    setExpenses(response.data);
                  }
                } catch(e) {
                    console.error(e);
                }
              }
            }}
            data-id="tableDetail"
            data-testid='expensesTableDetailBtn'
          >
            Detail
          </Button>
          <Button
            className="mobileSubheading"
            onClick={async (e) => {
              summaryOrDetail(e, detailTableToggle, setDetailTableToggle, tableDetailRef, tableSumExpToggle, setTableSumExpToggle, tableSumExpRef);
              if (month && year && !tableSumExpToggle) {
                try {
                  setLoading(true);
                  const response = await axios.post("/api/getSummaryByMaY", {
                    address: session.user.address,
                    month: month,
                    year: year,
                  })
                  setLoading(false);
                  if (response.status == 200) {
                    setSummary(response.data);
                  }
                } catch(e) {
                  console.error(e);
                }
              }
            }}
            data-id="tableSummaryExpense"
            data-testid='expensesTableSummaryBtn'
          >
            Summary
          </Button>
          {
            monthStatus == false && expenses.length > 0 ?
            <Button
              className="mobileSubheading"
              onClick={async (e) => {
                try {
                  // do not transfer if month status == true
                  if (monthStatus == false) {
                    await transferToken(session.user.address);
                  }
                  const response = await axios.post("/api/updateMonthStatus", {
                    address: session.user.address,
                    month: month,
                    year: year,
                  })
                  if (response.status == 200) {
                    setMonthStatus(true);
                  }
                } catch(e) {
                  console.error(e);
                }
              }}
            >
              Close month
            </Button>
              : null
          }
        </Flex>
        {/* loading when new expense is added */}
        {
          loadingForm == true ?
            <Loading />
          : null
        }
        {
          expenses.length > 0 ? (
          <Box
            display={"none"}
            ref={tableDetailRef}>
            <TableDetail expenses={expenses} setExpenses={setExpenses} session={session} month={month} year={year} setLoadingForm={setLoadingForm} />
          </Box>
        ) : (
          <Box
            textAlign={"center"}
            display={"none"}
            margin={"20px 0px"}
            overflowX={"auto"}
            ref={tableDetailRef}
            data-testid="expensesDetailNoData"
          >
          {
            loading == true ?
              <Loading />
              :
              <Text>Data doesn't exist for this month (yet)!</Text>
          }
          </Box>
        )
        }
        {
          summary.length > 0 ? (
          <Box
            display={"none"}      
            ref={tableSumExpRef} 
          >
            <TableSummaryExpense summary={summary} />
          </Box>
        ) : (
          <Box
            textAlign={"center"}
            display={"none"}
            margin={"20px 0px"}
            overflowX={"auto"}
            ref={tableSumExpRef}
            data-testid="expensesSummaryNoData"
          >
          {
            loading == true ?
              <Loading />
              :
              <Text>Data doesn't exist for this month (yet)!</Text>
          }
          </Box>
        )}
      </Box>
    );
  }

  return <SignIn />;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        address: session.user.address,
      },
    });
    const category = await prisma.budget.findMany({
      where: {
        userId: user.id,
      },
      select: {
        category: true,
        id: true,
      },
    });
  
    return {
      props: {
        category: JSON.parse(JSON.stringify(category)),
      },
    };
  } else {
    return {
      props: {
        category: "",
      }
    }
  }
}
