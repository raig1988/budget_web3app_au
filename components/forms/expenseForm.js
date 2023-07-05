import styles from '../../styles/forms/expensesForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from 'axios';

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
            onSubmit={values => {
                axios.post('/api/registerExpense', {
                    email: props.session.user.email,
                    month: parseInt(props.month),
                    year: parseInt(props.year),
                    day: values.day,
                    category_id: parseInt(values.category),
                    description: values.description,
                    amount: values.amount,
                })
                .then(async res => {
                    const { email, month, year } = JSON.parse(res.config.data);
                    try {
                        const response = await axios.post("/api/getExpenseByMaY/", {
                            email: email,
                            month: month,
                            year: year,
                        })
                        if (response.status == 200) {
                          props.setExpenses(response.data);
                        }
                      } catch(e) {
                          console.error(e);
                    }
                  })
                .catch(error => console.error(error))
            }}
        >
        {formik => (
            <Form className={styles.form}>
                <div>
                    <label className='mobileSubheading' htmlFor="day">Day</label>
                    <Field name="day" type="number" min="1" max="31"/>
                </div>
                <ErrorMessage component="div" className={styles.error} name="day" />
                <div>
                    <label className='mobileSubheading' htmlFor="category">Category</label>
                    <Field as="select" name="category" type="text">
                        <option>Choose category</option>
                        {props.category.map(element => {
                            return <option key={element.id} value={element.id}>{element.category}</option>
                        })}
                    </Field>
                </div>
                <ErrorMessage component="div" className={styles.error} name="category" />
                <div>
                    <label className='mobileSubheading' htmlFor="description">Description</label>
                    <Field name="description" type="text"/>
                </div>
                <ErrorMessage component="div" className={styles.error} name="description" />
                <div>
                    <label className='mobileSubheading' htmlFor="amount">Amount</label>
                    <Field name="amount" type="number"/>
                </div>
                <ErrorMessage component="div" className={styles.error} name="amount" />
                <button type="submit" className={"mobileSubheading"}>Save</button>
            </Form>

        )}
        </Formik>
    )
}