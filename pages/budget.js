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


export default function Budget(props) {

  // budget state
  const [budget, setBudget] = useState(props.budget);

  // ref
  const budgetExplanationRef = useRef(null);
  // toggle
  const [toggleBudgetExplanation, setToggleBudgetExplanation] = useState(false);
  const { data: session } = useSession();

  if (session) {
    return (
      <div id={desktop.budgetForm}>
        <div className={styles.title}>
          <h1 className="mobileHeading" data-testid="budgetTitle">Register budget</h1>
          <Image 
            src={questionMarkBtn} 
            alt="question mark button" 
            onClick={() => toggleBudgetExp(toggleBudgetExplanation, setToggleBudgetExplanation, budgetExplanationRef)}
          />
        </div>
        <div ref={budgetExplanationRef} className={styles.summaryExplanation} data-testid='budgetExplanation'>
            For registering your budget (required for other areas of the app) set: <br></br>
            1. Enter your expense category. <br></br>
            * This will be used throught the app to register your expenses <br></br>
            2. Enter the amount you expect to expend for that specific category per month. <br></br>
            3. Use the delete button if you no longer wish to use that category. <br></br>
            <b>- If you want to edit the amount of a specific category: <br></br>
            1. Click over the amount cell and follow the prompts indicated.</b>
        </div>
        <BudgetForm session={session} setBudget={setBudget} />
        <TableBudget budget={budget} session={session} setBudget={setBudget} />
      </div>
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
  const budget = await prisma.budget.findMany({
    where: {
      userId: user.id,
    },
  });
  return {
    props: {
      budget: JSON.parse(JSON.stringify(budget)),
    },
  };
}
