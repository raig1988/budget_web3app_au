// COMPONENTS
import ChartEvoExpenses from "../components/graphs/chartEvoExpenses";
import ChartExpByCategory from "../components/graphs/chartExpByCategory";
import TableYearSummary from "../components/tables/tableYearSummary";
import Image from "next/image";
import SignIn from "../components/signIn";
// PUBLIC
import questionMarkBtn from "../public/images/questionMarkBtn.png";
// CSS
import styles from "../styles/budgetSummary.module.css";
// LIBRARIES
import { useSession } from "next-auth/react";
import axios from "axios";
// REACT
import { useState, useRef } from "react";


export default function Summary() {
  // year
  const [year, setYear] = useState(new Date().getFullYear());
  const [summaryData, setSummaryData] = useState("");
  const [summaryMonth, setSummaryMonth] = useState("");
  const [summaryCategory, setSummaryCategory] = useState("")
  // ref
  const summaryExplanationRef = useRef(null)
  const chartEvoExpRef = useRef(null)
  const chartPieRef = useRef(null)
  // toggle
  const [toggleSummaryExplanation, setToggleSummaryExplanation] = useState(false);
  const [toggleChartEvoExp, setToggleChartEvoExp] = useState(false);
  const [togglePieChart, setTogglePieChart] = useState(false);
  const { data: session } = useSession();
  if (session) {
    return (
      <div className={styles.summaryGlobal}>
        <div className={styles.title}>
          <h1 className="mobileHeading" data-testid='summaryTitle'>Year Summary</h1>
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
        </div>
        <div ref={summaryExplanationRef} className={styles.summaryExplanation} data-testid='summaryExplanation'>
            1. Enter the year and click on display. <br></br>
            2. For the year summary table, click on each header to view data aggregated by that selection.
        </div>
        <div className={styles.summarySelector} data-testid='summarySelector'>
          <div>
            <p className={"mobileSubheading"}>Year</p>
            <input
              className={styles.summarySelector}
              type="number"
              min="1900"
              max="2100"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
              step="1"
              data-testid='summaryYearInput'
            />
          </div>
          <button className="mobileSubheading" onClick={() => {
              if (year) {
                axios
                  .post("/api/getTotalSummaryByYear", {
                    address: session.user.address,
                    year: year,
                  })
                  .then((res) => {
                    setSummaryData(res.data.summaryYear);
                    setSummaryMonth(res.data.aggregateMonth);
                    setSummaryCategory(res.data.summaryCategory)
                  })
                  .catch((error) => console.log(error));
              }
          }}>Display</button>
        </div>
          {summaryData.length > 0 ? (
              <div className={styles.table}>
                <TableYearSummary summaryData={summaryData} />
              </div>
            ) :
            (
              <div
                className={styles.noData}
              >
                Data doesn't exist for this year (yet)!
              </div>
            )
          }
          <div className={styles.graphs}>
          {summaryMonth.length > 0 ? (
            <div>
            <div className={styles.title}>
              <h1 className="mobileSubheading">Evolution of expenses</h1>
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
            </div>
            <div ref={chartEvoExpRef} className={styles.summaryExplanation}>
              This chart shows you the evolution of expenses by month in your local currency.
            </div>
            <ChartEvoExpenses summaryMonth={summaryMonth} />
            </div>
          ) : (
            <></>
          )}
          {summaryCategory.length > 0 ? (
            <div>
              <div className={styles.title}>
                <h1 className="mobileSubheading">Expenses by category</h1>
                <Image 
                  className="questionMark"
                  src={questionMarkBtn} 
                  alt="question mark button" 
                  onClick={() => {
                    if(!togglePieChart) {
                      chartPieRef.current.style.display = "block";
                      setTogglePieChart(prevState => !prevState)
                    } else {
                      chartPieRef.current.style.display = "none";
                      setTogglePieChart(prevState => !prevState);
                    }
                  }}
                />
              </div>
              <div ref={chartPieRef} className={styles.summaryExplanation}>
                This chart shows your year expenses divided by category.
              </div>
              <ChartExpByCategory summaryCategory={summaryCategory} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
  return <SignIn />;
}
