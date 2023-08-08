// COMPONENTS
import ChartEvoExpenses from "../components/graphs/chartEvoExpenses";
import ChartExpByCategory from "../components/graphs/chartExpByCategory";
import TableYearSummary from "../components/tables/tableYearSummary";
import Image from "next/image";
import SignIn from "../components/signIn";
// PUBLIC
import questionMarkBtn from "../public/images/questionMarkBtn.png";
// LIBRARIES
import { useSession } from "next-auth/react";
import axios from "axios";
// REACT
import { useState, useRef } from "react";
import { Button, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInputField, NumberInputStepper, NumberInput, Box, Flex, Text, OrderedList, ListItem, Card, CardBody } from "@chakra-ui/react";
import Loading from "@/components/loading";


export default function Summary() {
  // year
  const [year, setYear] = useState(new Date().getFullYear());
  const [summaryData, setSummaryData] = useState("");
  const [summaryMonth, setSummaryMonth] = useState("");
  const [summaryCategory, setSummaryCategory] = useState("")
  // ref
  const summaryExplanationRef = useRef(null)
  const chartEvoExpRef = useRef(null)
  const chartPieExpRef = useRef(null)
  const tableSummaryRef = useRef(null);
  const evoChartRef = useRef(null)
  const pieChartRef = useRef(null)
  // toggle
  const [toggleSummaryExplanation, setToggleSummaryExplanation] = useState(false);
  const [toggleChartEvoExp, setToggleChartEvoExp] = useState(false);
  const [togglePieChartExp, setTogglePieChartExp] = useState(false);
  const [toggleTableSummary, setToggleTableSummary] = useState(false);
  const [toggleChartEvo, setToggleChartEvo] = useState(false);
  const [togglePieChart, setTogglePieChart] = useState(false);
  const { data: session } = useSession();
  // loading
  const [loading, setLoading] = useState(false);

  if (session) {
    return (
      <Box margin={"0px auto"}>
        <Flex justifyContent={"center"} gap={"40px"}>
          <Text className="mobileHeading" data-testid='summaryTitle'>Year Summary</Text>
          <Image 
            className="questionMark"
            src={questionMarkBtn} 
            alt="question mark button" 
            onClick={() => {
              if (!toggleSummaryExplanation) {
                summaryExplanationRef.current.style.display = "block";
                setToggleSummaryExplanation(prevState => !prevState);
              } else {
                summaryExplanationRef.current.style.display = "none";
                setToggleSummaryExplanation(prevState => !prevState);
              }
            }}
            data-testid='summaryQuestionMarkImage'
          />
        </Flex>
        <Card display={"none"} maxWidth={"500px"} margin={"10px auto"} ref={summaryExplanationRef} data-testid='summaryExplanation'>
            <CardBody>
              <OrderedList>
                <ListItem>Enter the year and click on display.</ListItem>
                <ListItem>For the year summary table, click on each header to view data aggregated by that selection.</ListItem>
              </OrderedList>
            </CardBody>
        </Card>
        <Box maxWidth={"500px"} margin="auto" data-testid='summarySelector'>
            <Flex gap={"40px"} alignItems={"center"}>
              <FormControl>
                <FormLabel className={"mobileSubheading"}>Year</FormLabel>
                <NumberInput
                  min={new Date().getFullYear() - 20}
                  max={new Date().getFullYear() + 10}
                  value={year}
                  onChange={(value) => {
                    setYear(value);
                  }}
                  variant="filled"
                  data-testid='summaryYearInput'
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper/>
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <Button 
                className="mobileSubheading" 
                onClick={() => {
                  if (!toggleTableSummary && !toggleChartEvo && !togglePieChart) {
                    tableSummaryRef.current.style.display = "block";
                    evoChartRef.current.style.display = "block";
                    pieChartRef.current.style.display = "block";
                    setToggleTableSummary(prevState => !prevState);
                    setToggleChartEvo(prevState =>!prevState);
                    setTogglePieChart(prevState => !prevState);
                  } else {
                    tableSummaryRef.current.style.display = "none";
                    evoChartRef.current.style.display = "none";
                    pieChartRef.current.style.display = "none";
                    setToggleTableSummary(prevState => !prevState);
                    setToggleChartEvo(prevState =>!prevState);
                    setTogglePieChart(prevState => !prevState);
                  }
                  if (year) {
                    setLoading(true);
                    axios
                      .post("/api/getTotalSummaryByYear", {
                        address: session.user.address,
                        year: year,
                      })
                      .then((res) => {
                        setLoading(false);
                        setSummaryData(res.data.summaryYear);
                        setSummaryMonth(res.data.aggregateMonth);
                        setSummaryCategory(res.data.summaryCategory)
                      })
                      .catch((error) => console.log(error));
                  }
                }}
              >Display</Button>
            </Flex>
        </Box>
        {
          summaryData.length > 0 ? (
            <Box 
              overflowX={"auto"}
              margin={"20px"}
              display={"none"}
              ref={tableSummaryRef}
            >
              <TableYearSummary summaryData={summaryData} />
            </Box>
          ) :
          (
            <Box
              margin={"20px"}
              textAlign={"center"}
              display={"none"}
              ref={tableSummaryRef}
            >
              {
                loading == true ?
                  <Loading />
                : <Text>Data doesn't exist for this year (yet)!</Text>
              }
            </Box>
          )
        }

        <div id="graph-container">
            {
              summaryMonth.length > 0 ? (
              <div style={{ maxWidth: "700px "}} ref={evoChartRef}>
                <Flex justifyContent={"center"} alignItems={"center"} gap={"40px"} margin={"10px 0px"}>
                  <Text className="mobileSubheading">Evolution of expenses</Text>
                  <Image 
                    className="questionMark"
                    src={questionMarkBtn} 
                    alt="question mark button" 
                    onClick={() => {
                      if (!toggleChartEvoExp) {
                        chartEvoExpRef.current.style.display = "block";
                        setToggleChartEvoExp(prevState => !prevState)
                      } else {
                        chartEvoExpRef.current.style.display = "none";
                        setToggleChartEvoExp(prevState => !prevState)
                      }
                    }}  
                  />
                </Flex>
                <Card display={"none"} margin={"10px auto"} maxWidth={"500px"} ref={chartEvoExpRef} >
                  <CardBody>
                    This chart shows you the evolution of expenses by month in your local currency.
                  </CardBody>
                </Card>
                <ChartEvoExpenses summaryMonth={summaryMonth} />
              </div>
              ) : <div style={{ display: "none"}} ref={evoChartRef}></div>
            }
            {
              summaryCategory.length > 0 ? (
              <div style={{ maxWidth: "700px "}} ref={pieChartRef}>
                <Flex justifyContent={"center"} alignItems={"center"} gap={"40px"} margin={"10px 0px"}>
                  <Text className="mobileSubheading">Expenses by category</Text>
                  <Image 
                    className="questionMark"
                    src={questionMarkBtn} 
                    alt="question mark button" 
                    onClick={() => {
                      if(!togglePieChartExp) {
                        chartPieExpRef.current.style.display = "block";
                        setTogglePieChartExp(prevState => !prevState)
                      } else {
                        chartPieExpRef.current.style.display = "none";
                        setTogglePieChartExp(prevState => !prevState);
                      }
                    }}
                  />
                </Flex>
                <Card display={"none"} margin={"10px auto"} maxWidth={"500px"} ref={chartPieExpRef}>
                  <CardBody>
                    This chart shows your year expenses divided by category.
                  </CardBody>
                </Card>
                <ChartExpByCategory summaryCategory={summaryCategory} />
              </div>
            ) : <div style={{ display: "none"}} ref={pieChartRef}></div>
          }
        </div>
      </Box>
    );
  }
  return <SignIn />;
}
