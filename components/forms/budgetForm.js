// CSS
import styles from '../../styles/forms/expensesForm.module.css';
// LIBRARIES
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { transferTokenBudget } from '@/lib/transferToken';

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
                                props.setBudgetStatus(budgetResponse.data[0]?.budgetStatus)
                            }
                            const response = await axios.post('/api/getBudget', {
                            address: props.session.user.address,
                             })
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
        {formik => (
            <Form className={styles.form} data-testid='budgetForm'>
                <div>
                    <label className="mobileSubheading" htmlFor="category">Category</label>
                    <Field type="text" name="category" />
                </div>
                    <ErrorMessage component="div" className={styles.error} name="category" />
                <div>
                    <label className="mobileSubheading" htmlFor="amount">Amount</label>
                    <Field type="number" name="amount" />
                </div>
                    <ErrorMessage component="div" className={styles.error} name="amount" />
                    <button type="submit" className={"mobileSubheading"}>Register</button>
                    {
                        props.budgetStatus == false ?
                        <button 
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
                        </button>
                        : null
                    }
            </Form>
        )}
        </Formik>
    )
}