// LIBRARIES
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { transferTokenBudget } from '@/lib/transferToken';
// CHAKRA
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Input,
    VStack,
    FormErrorMessage
  } from "@chakra-ui/react";

export default function BudgetForm(props) {

    const initialValues = {
        category: "",
        amount: "",
    }
    const budgetSchema = Yup.object().shape({
        category: Yup.string().required("Category is required"),
        amount: Yup.string().required("Amount is required"),
    })
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={budgetSchema}
            onSubmit={(values, actions) => {
                props.setLoading(true);
                axios.post('/api/setBudget', {
                    address: props.session.user.address,
                    category: values.category,
                    amount: values.amount,
                })
                .then(async res => {
                    if(res.status < 300) {
                        try {
                            const budgetResponse = await axios.post('/api/getBudgetStatus', {
                                address: props.session.user.address,
                             })
                            if (budgetResponse.status === 200) {
                                props.setBudgetStatus(budgetResponse.data?.budgetStatus)
                            }
                            const response = await axios.post('/api/getBudget', {
                                address: props.session.user.address,
                             })
                            props.setLoading(false);
                            if (response.status === 200) {
                                props.setBudget(response.data);
                            }
                        } catch(e) {
                            console.error(e);
                        }
                    }
                })
                .catch(error => console.error(error))
                actions.resetForm();
        }}
        >
        {({errors, touched}) => (
            <Form data-testid='budgetForm'>
                <FormControl isInvalid={!!errors.category && touched.category}>
                    <FormLabel className="mobileSubheading" htmlFor="category">Category</FormLabel>
                    <Field as={Input} type="text" name="category" variant="filled" />
                    <FormErrorMessage>{errors.category}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.amount && touched.amount}>
                    <FormLabel className="mobileSubheading" htmlFor="amount">Amount</FormLabel>
                    <Field as={Input} type="number" name="amount" variant="filled" />
                    <FormErrorMessage>{errors.amount}</FormErrorMessage>
                </FormControl>
                <Flex justifyContent={"space-around"}>
                    <Button type="submit" className={"mobileSubheading"}>Register</Button>
                    {
                        props.budgetStatus == false ?
                        <Button 
                            className={"mobileSubheading"}
                            onClick={async () => {
                                try {
                                    const res = await axios.post("/api/updateBudgetStatus", {
                                        address: props.session.user.address,
                                    });
                                    if (res.status == 200) {
                                        props.setBudgetStatus(true);
                                    }
                                    await transferTokenBudget(props.session.user.address);
                                } catch(e) {

                                }
                            }}
                        >Close budget
                        </Button>
                        : null
                    }

                </Flex>
            </Form>
        )}
        </Formik>
    )
}