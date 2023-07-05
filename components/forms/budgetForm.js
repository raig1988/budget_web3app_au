import styles from '../../styles/forms/expensesForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from 'axios';

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
            onSubmit={async values => {
                await axios.post('/api/setBudget', {
                    email: props.session.user.email,
                    category: values.category,
                    amount: values.amount,
                })
                .then(async res => {
                    if(res.status < 300) {
                        try {
                            const response = await axios.post('/api/getBudget', {
                            email: props.session.user.email,
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
            </Form>
        )}
        </Formik>
    )
}