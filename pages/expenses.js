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
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  // expenses & summary received from db and send to tableDetail and tableSummary
  const [expenses, setExpenses] = useState("");
  const [summary, setSummary] = useState("");
  const { data: session } = useSession();

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
              min="2010"
              max="2100"
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
            1. Enter the month and year. <br></br>
            2. Enter the day. <br></br>
            3. Choose a category from the list <br></br>* Make sure you have
            created the category on Budget <br></br>
            4. Finally, enter the expense description and amount in your local
            currency and click save.
          </div>
          <ExpenseForm
            month={month}
            year={year}
            category={props.category}
            session={session}
            setExpenses={setExpenses}
            setSummary={setSummary}
          />
        </div>
        <div className={styles.tableButtons}>
          <button
            className="mobileSubheading"
            onClick={async (e) => {
              summaryOrDetail(e, detailTableToggle, setDetailTableToggle, tableDetailRef, tableSumExpToggle, setTableSumExpToggle, tableSumExpRef);
              if (month && year && !detailTableToggle) {
                try {
                  const response = await axios.post("/api/getExpenseByMaY/", {
                      email: session.user.email,
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
                    email: session.user.email,
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
      email: session.user.email,
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
