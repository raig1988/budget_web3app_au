// COMPONENTS
import Image from "next/image";
import BudgetForm from "../components/forms/budgetForm";
import TableBudget from "../components/tables/tableBudget";
import SignIn from "../components/signIn";
// PUBLIC
import questionMarkBtn from "../public/images/questionMarkBtn.png";
// CSS
import styles from "../styles/budgetSummary.module.css";
import desktop from '../styles/desktop/desktopCss.module.css';
// LIBRARIES
import { getSession, useSession } from "next-auth/react";
import prisma from "../lib/client";
// REACT
import { useRef, useState } from 'react';
// helper functions
import { toggleBudgetExp } from "../lib/helperFunctions";
import axios from "axios";

export default function Budget(props) {

  // budget state
  const [budget, setBudget] = useState(props.budget);

  // ref
  const budgetExplanationRef = useRef(null);
  // toggle
  const [toggleBudgetExplanation, setToggleBudgetExplanation] = useState(false);
  const { data: session } = useSession();

  // token
  const [budgetStatus, setBudgetStatus] = useState(props.budgetStatus[0].budgetStatus);

  if (session) {
    return (
      <div id={desktop.budgetForm}>
        <div className={styles.title}>
          <h1 className="mobileHeading" data-testid="budgetTitle">Register budget</h1>
          <Image 
            className="questionMark"
            src={questionMarkBtn} 
            alt="question mark button" 
            onClick={() => toggleBudgetExp(toggleBudgetExplanation, setToggleBudgetExplanation, budgetExplanationRef)}
          />
        </div>
        <div 
          ref={budgetExplanationRef} 
          className={styles.summaryExplanation} 
          data-testid='budgetExplanation'
        >
          <p>For registering your budget (required for other areas of the app) set: </p>
          <ol 
            style={
              {
                paddingInlineStart: "20px",
              }
            }
          >
            <li>Enter your expense category. <br></br> * This will be used throught the app to register your expenses </li>
            <li>Enter the amount you expect to expend for that specific category per month.</li>
            <li>Use the delete button if you no longer wish to use that category. </li>
          </ol>
          <p>If you want to edit the amount of a specific category: </p>
          <ul
            style={
              {
                paddingInlineStart: "20px",
              }
            }
            >
            <li>Click over the amount cell and follow the prompts indicated.</li>
          </ul>
          <p>After completing your first budget, you will be able to close the budget and receive 20 BGT tokens.</p>
        </div>
        <BudgetForm session={session} setBudget={setBudget} setBudgetStatus={setBudgetStatus} budgetStatus={budgetStatus} />
        {
          budget.length > 0 ?
          <TableBudget budget={budget} session={session} setBudget={setBudget} />
          : null
        }
      </div>
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
  const budget = await prisma.budget.findMany({
    where: {
      userId: user.id,
    },
  });

  const budgetStatus = await prisma.budget.groupBy({
    by: ['budgetStatus'],
    where: {
        userId: user.id,
    },
  })
  return {
    props: {
      budget: JSON.parse(JSON.stringify(budget)),
      budgetStatus: JSON.parse(JSON.stringify(budgetStatus))
    },
  };
}
