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
// CSS
import styles from "../styles/expenses.module.css";
// import helper functions
import { toggleLogExpense, summaryOrDetail } from "../lib/helperFunctions";
import { transferToken } from "@/lib/transferToken";

export default function Expenses(props) {

  // html references
  const expenseFormRef = useRef(null);
  const tableDetailRef = useRef(null);
  const tableSumExpRef = useRef(null);
  // toggle handlers
  const [logExpenseToggle, setLogExpenseToggle] = useState(false);
  const [detailTableToggle, setDetailTableToggle] = useState(false);
  const [tableSumExpToggle, setTableSumExpToggle] = useState(false);

  // handle value of inputs
  // set states with ref
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  // expenses & summary received from db and send to tableDetail and tableSummary
  const [expenses, setExpenses] = useState("");
  const [summary, setSummary] = useState("");
  const { data: session } = useSession();

  // nft
  const [monthStatus, setMonthStatus] = useState(false);

  if (session) {
    return (
      <>
        <h1 className={`${styles.title} "mobileHeading"`} data-testid='expensesTitle'>Monthly expenses</h1>
        <div className={`${styles.expensesSelector}`} data-testid='expensesSelector'>
          <div>
            <p className={"mobileSubheading"}>Month</p>
            <input
              type="number"
              min="1"
              max="12"
              value={month}
              step="1"
              onChange={(e) => {
                setMonth(e.target.value);
              }}
            />
          </div>
          <div>
            <p className={"mobileSubheading"}>Year</p>
            <input
              type="number"
              min={new Date().getFullYear()}
              max={new Date().getFullYear()}
              value={year}
              step="1"
              onChange={(e) => {
                setYear(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={styles.logExpenseSubheading} data-testid='expensesLog'>
          <div>
            <p className="mobileSubheading">Log an expense</p>
            <p className="mobileParagraph">Click '?' to display / hide</p>
          </div>
          <Image
            className="questionMark"
            src={questionMarkBtn}
            alt="question mark button"
            onClick={(e) => toggleLogExpense(e, logExpenseToggle, setLogExpenseToggle, expenseFormRef)}
            data-id="questionMark"
            data-testid='expensesImage'
          />
        </div>
        <div className={styles.formBlock} ref={expenseFormRef} data-testid='expensesLogForm'>
          <div className={styles.logExpenseExplanation}>
            <ol
              style={
                {
                  paddingInlineStart: "20px",
                }
              } 
            >
              <li>Enter the month and year.</li>
              <li>Enter the day.</li>
              <li>Choose a category from the list 
                (make sure you have
            created the category on Budget) 
              </li>
              <li>Finally, enter the expense description and amount in your local
            currency and click save.</li>
              <li>
                Once a month, after setting your expenses, you are going to be able to mint 10 BGT tokens by clicking on the close button.
              </li>
            </ol>
          </div>
          <ExpenseForm
            month={month}
            year={year}
            category={props.category}
            session={session}
            setExpenses={setExpenses}
            setSummary={setSummary}
            setMonthStatus={setMonthStatus}
          />
        </div>
        <div className={styles.tableButtons}>
          <button
            className="mobileSubheading"
            onClick={async (e) => {
              summaryOrDetail(e, detailTableToggle, setDetailTableToggle, tableDetailRef, tableSumExpToggle, setTableSumExpToggle, tableSumExpRef);
              if (month && year && !detailTableToggle) {
                try {
                  const res = await axios.post("/api/getMonthStatus", {
                    address: session.user.address,
                    month: month,
                    year: year,
                  })
                  if (res.status == 200) {
                    setMonthStatus(res?.data[0]?.monthStatus);
                  }
                  const response = await axios.post("/api/getExpenseByMaY/", {
                      address: session.user.address,
                      month: month,
                      year: year,
                  })
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
          </button>
          <button
            className="mobileSubheading"
            onClick={async (e) => {
              summaryOrDetail(e, detailTableToggle, setDetailTableToggle, tableDetailRef, tableSumExpToggle, setTableSumExpToggle, tableSumExpRef);
              if (month && year && !tableSumExpToggle) {
                try {
                  const response = await axios.post("/api/getSummaryByMaY", {
                    address: session.user.address,
                    month: month,
                    year: year,
                  })
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
          </button>
          {
            monthStatus == false && expenses.length > 0 ?
            <button
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
            </button>
              : null
          }
        </div>
        {expenses.length > 0 ? (
          <div className={styles.table} ref={tableDetailRef}>
            <TableDetail expenses={expenses} setExpenses={setExpenses} session={session} month={month} year={year} />
          </div>
        ) : expenses.length === 0 ? (
          <div
            className={styles.table}
            style={{ textAlign: "center" }}
            ref={tableDetailRef}
            data-testid="expensesDetailNoData"
          >
            Data doesn't exist for this month (yet)!
          </div>
        ) : (
          <div
            className={styles.table}
            style={{ textAlign: "center" }}
            ref={tableDetailRef}
            data-testid="expensesLoadingDataDetail"
          >
            Loading... Please, wait
          </div>
        )}
        {summary.length > 0 ? (
          <div className={styles.table} ref={tableSumExpRef} >
            <TableSummaryExpense summary={summary} />
          </div>
        ) : summary.length === 0 ? (
          <div
            className={styles.table}
            style={{ textAlign: "center" }}
            ref={tableSumExpRef}
            data-testid="expensesSummaryNoData"
          >
            Data doesn't exist for this month (yet)!
          </div>
        ) : (
          <div
            className={styles.table}
            style={{ textAlign: "center" }}
            ref={tableSumExpRef}
            data-testid='expensesLoadingDataSum'
          >
            Loading... Please, wait
          </div>
        )}
      </>
    );
  }
  return <SignIn />;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
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
}
