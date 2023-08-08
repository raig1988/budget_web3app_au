// COMPONENTS
import Image from "next/image";
import BudgetForm from "../components/forms/budgetForm";
import TableBudget from "../components/tables/tableBudget";
import SignIn from "../components/signIn";
// PUBLIC
import questionMarkBtn from "../public/images/questionMarkBtn.png";
// LIBRARIES
import { getSession, useSession } from "next-auth/react";
import prisma from "../lib/client";
// REACT
import { useRef, useState } from 'react';
// helper functions
import { toggleBudgetExp } from "../lib/helperFunctions";
import { Box, Card, CardBody, Flex, ListItem, OrderedList, Text, UnorderedList } from "@chakra-ui/react";
import Loading from "@/components/loading";

export default function Budget(props) {
  // budget state
  const [budget, setBudget] = useState(props.budget);
  // ref
  const budgetExplanationRef = useRef(null);
  // toggle
  const [toggleBudgetExplanation, setToggleBudgetExplanation] = useState(false);
  const { data: session } = useSession();
  // token
  const [budgetStatus, setBudgetStatus] = useState(props.budgetStatus || "");
  // loading
  const [loading, setLoading] = useState(false);

  return (
    <>
      {
        session ?
          <Box margin={"0px auto"}>
            <Flex alignItems="center" justifyContent={"space-between"} margin={"10px 0px"}>
              <Text className="mobileHeading" data-testid="budgetTitle">Register budget</Text>
              <Image 
                className="questionMark"
                src={questionMarkBtn} 
                alt="question mark button" 
                onClick={() => toggleBudgetExp(toggleBudgetExplanation, setToggleBudgetExplanation, budgetExplanationRef)}
              />
            </Flex>
            {/* Budget Explanation */}
            <Card
              display={"none"}
              ref={budgetExplanationRef} 
              data-testid='budgetExplanation'
            >
            <CardBody>
              <Text>For registering your budget (required for other areas of the app) set: </Text>
              <OrderedList 
                paddingInlineStart={"20px"}
              >
                <ListItem>Enter your expense category. <br></br> * This will be used throught the app to register your expenses </ListItem>
                <ListItem>Enter the amount you expect to expend for that specific category per month.</ListItem>
                <ListItem>Use the delete button if you no longer wish to use that category. </ListItem>
              </OrderedList>
              <Text>If you want to edit the amount of a specific category: </Text>
              <UnorderedList
                paddingInlineStart={"20px"}
                >
                <ListItem>Click over the amount cell and follow the prompts indicated.</ListItem>
              </UnorderedList>
              <Text>After completing your first budget, you will be able to close the budget and receive 20 BGT tokens.</Text>
            </CardBody>
            </Card>
            <BudgetForm session={session} setBudget={setBudget} setBudgetStatus={setBudgetStatus} budgetStatus={budgetStatus} setLoading={setLoading} />
            {
              loading == true ?
                <Loading /> 
              : null
            }
            {
              budget.length > 0 ?
                <TableBudget budget={budget} session={session} setBudget={setBudget} setLoading={setLoading} />
              : null
            }
          </Box>
        : <SignIn />
      } 
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
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
    return {
      props: {
        budget: JSON.parse(JSON.stringify(budget)),
        budgetStatus: JSON.parse(JSON.stringify(user.budgetStatus)),
      },
    };
  }

  return {
    props: {
      budget: "",
      budgetStatus: "",
    }
  }

}
