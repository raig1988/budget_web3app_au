import Image from "next/image";
import questionMarkBtn from "../public/images/questionMarkBtn.png";
import ExpenseForm from "../components/forms/expenseForm";
import TableDetail from "../components/tables/tableDetail";
import TableSummaryExpense from "../components/tables/tableSummaryExpense";
import { useRef, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import SignIn from "../components/signIn";
import prisma from "../lib/client";
import axios from "axios";
import styles from "../styles/expenses.module.css";

export default function Expenses(props) {
  // html references
  const expenseFormRef = useRef(null);
  const tableDetailRef = useRef(null);
  const tableSumExpRef = useRef(null);
  // toggle handlers
  const [logExpenseToggle, setLogExpenseToggle] = useState(false);
  const [detailTableToggle, setDetailTableToggle] = useState(false);
  const [tableSumExpToggle, setTableSumExpToggle] = useState(false);
  function toggleLogExpense(e) {
    if (e.target.dataset.id === "questionMark") {
      if (!logExpenseToggle) {
        expenseFormRef.current.style.display = "block";
        setLogExpenseToggle((prevState) => !prevState);
      } else {
        expenseFormRef.current.style.display = "none";
        setLogExpenseToggle((prevState) => !prevState);
      }
    } else if (e.target.dataset.id === "tableDetail") {
      if (!detailTableToggle) {
        tableDetailRef.current.style.display = "block";
        setDetailTableToggle((prevState) => !prevState);
        if (tableSumExpToggle) {
          tableSumExpRef.current.style.display = "none";
          setTableSumExpToggle((prevState) => !prevState);
        }
      } else {
        tableDetailRef.current.style.display = "none";
        setDetailTableToggle((prevState) => !prevState);
      }
    } else if (e.target.dataset.id === "tableSummaryExpense") {
      if (!tableSumExpToggle) {
        tableSumExpRef.current.style.display = "block";
        setTableSumExpToggle((prevState) => !prevState);
        if (detailTableToggle) {
          tableDetailRef.current.style.display = "none";
          setDetailTableToggle((prevState) => !prevState);
        }
      } else {
        tableSumExpRef.current.style.display = "none";
        setTableSumExpToggle((prevState) => !prevState);
      }
    }
  }
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
              min="1900"
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
            <p className="mobileParagraph">Show / Hide</p>
          </div>
          <Image
            src={questionMarkBtn}
            alt="question mark button"
            onClick={toggleLogExpense}
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
          />
        </div>
        <div className={styles.tableButtons}>
          <button
            className="mobileSubheading"
            onClick={(e) => {
              toggleLogExpense(e);
              if (month && year && !detailTableToggle) {
                axios
                  .post("/api/getExpenseByMaY/", {
                    email: session.user.email,
                    month: month,
                    year: year,
                  })
                  .then((res) => {
                    setExpenses(res.data);
                  })
                  .catch((error) => console.log(error));
              }
            }}
            data-id="tableDetail"
            data-testid='expensesTableDetailBtn'
          >
            Detail
          </button>
          <button
            className="mobileSubheading"
            onClick={(e) => {
              toggleLogExpense(e);
              if (month && year && !tableSumExpToggle) {
                axios
                  .post("/api/getSummaryByMaY", {
                    email: session.user.email,
                    month: month,
                    year: year,
                  })
                  .then((res) => {
                    setSummary(res.data);
                  })
                  .catch((error) => console.log(error));
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
            <TableDetail expenses={expenses} />
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
