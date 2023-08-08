// LIBRARIES
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
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
    FormErrorMessage,
    Select
  } from "@chakra-ui/react";

export default function ExpenseForm(props) {
    const initialValues = {
        day: "",
        category: "",
        description: "",
        amount: "",
    }
    const expenseSchema = Yup.object().shape({
        day: Yup.string().required("Day is required"),
        category: Yup.string().required("Select a category"),
        description: Yup.string().required("Description is required"),
        amount: Yup.string().required("Amount is required"),
    })
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={expenseSchema}
            onSubmit={(values, actions) => {
                props.setLoadingForm(true);
                axios.post('/api/registerExpense', {
                    address: props.session.user.address,
                    month: parseInt(props.month),
                    year: parseInt(props.year),
                    day: values.day,
                    category_id: parseInt(values.category),
                    description: values.description,
                    amount: values.amount,
                })
                .then(async res => {
                    const { address, month, year } = JSON.parse(res.config.data);
                    try {
                        const response = await axios.post("/api/getExpenseByMaY/", {
                            address: address,
                            month: month,
                            year: year,
                        });
                        const responseSummary = await axios.post("/api/getSummaryByMaY", {
                            address: address,
                            month: month,
                            year: year,
                        })
                        const responseStatus = await axios.post("/api/getMonthStatus", {
                            address: address,
                            month: month,
                            year: year,
                        })
                        props.setLoadingForm(false);
                        if (responseStatus.status == 200) {
                            props.setMonthStatus(responseStatus?.data[0]?.monthStatus);
                        }
                        if (response.status == 200) {
                          props.setExpenses(response.data);
                        }
                        if (responseSummary.status == 200) {
                            props.setSummary(responseSummary.data);
                        }
                      } catch(e) {
                          console.error(e);
                    }
                  })
                .catch(error => console.error(error));
                actions.resetForm();
            }}
        >
        {({errors, touched}) => (
            <Form>
                <FormControl isInvalid={!!errors.day && touched.day}>
                    <FormLabel className='mobileSubheading' htmlFor="day">Day</FormLabel>
                    <Field as={Input} name="day" type="number" min="1" max="31" variant="filled" />
                    <FormErrorMessage>{errors.day}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.category && touched.category}>
                    <FormLabel className='mobileSubheading' htmlFor="category">Category</FormLabel>
                    <Field as={Select} name="category" type="text" variant="filled" >
                        <option>Choose category</option>
                        {props.category.map(element => {
                            return <option key={element.id} value={element.id}>{element.category}</option>
                        })}
                    </Field>
                    <FormErrorMessage>{errors.category}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.description && touched.description}>
                    <FormLabel className='mobileSubheading' htmlFor="description">Description</FormLabel>
                    <Field as={Input} name="description" type="text" variant="filled" />
                    <FormErrorMessage>{errors.description}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.amount && touched.amount}>
                    <FormLabel className='mobileSubheading' htmlFor="amount">Amount</FormLabel>
                    <Field as={Input} name="amount" type="number" variant="filled" />
                    <FormErrorMessage>{errors.amount}</FormErrorMessage>
                </FormControl>
                <Button type="submit" className={"mobileSubheading"}>Save</Button>
            </Form>

        )}
        </Formik>
    )
}