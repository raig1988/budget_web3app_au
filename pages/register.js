import styles from '../styles/forms/registerLogin.module.css';
import desktop from '../styles/desktop/desktopCss.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useSession, getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]";
import { useRef } from 'react';
import axios from 'axios';


const passwordReq = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*]).{5,}$/;

export default function Register({providers}) {
    const serverErrorRef = useRef(null)
    const { data: session } = useSession();
    const registerSchema = Yup.object().shape({
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required").min(5, 'Password is too short - should be 5 characters minimum.').matches(passwordReq, {message: "Please, at least use 1 lower letter, 1 capital letter, 1 symbol and 1 numeric character."}),
        confirmPassword: Yup.string().required("Confirm password is required").oneOf([Yup.ref("password"), null], "Passwords must match"),
    })
    
    const initialValues = {
        email: "",
        password: "",
        confirmPassword: "",
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={values => {
                    axios.post('/api/register', {
                        email: values.email,
                        password: values.password,
                        confirmPassword: values.confirmPassword,
                    })
                    .then(response => {
                        if (response.status == '200' && !session) {
                            signIn('credentials', {
                                email: values.email,
                                password: values.password
                            });
                        }
                    })
                    .catch(error => {
                        serverErrorRef.current.innerText = "Email already exists";
                    });
                }
            }
        >
        {formik => (
        <div id={desktop.registerForm}>
            <h1 className={`${styles.title} 'mobileSubheading'`} data-testid="registerTitle">Register</h1>
            <Form onSubmit={formik.handleSubmit} className={styles.form}>
                <label htmlFor="email" className={"mobileSubheading"}>Email</label>
                <Field name="email" type="email"/>
                <ErrorMessage component="div" className={styles.error} name="email" />
                <div ref={serverErrorRef} className={styles.error}></div>
                <label htmlFor="password" className={"mobileSubheading"}>Password</label>
                <Field name="password" type="password"/>
                <ErrorMessage component="div" className={styles.error} name="password" />
                <label htmlFor="confirmPassword" className={"mobileSubheading"}>Confirm password</label>
                <Field name="confirmPassword" type="password" />
                <ErrorMessage component="div" className={styles.error} name="confirmPassword" />
                <button type="submit" className={"mobileSubheading"}>Submit</button>
            </Form>
            {Object.values(providers).map(provider => {
                if (provider.name !== "Credentials") {
                    return (
                        <div key={provider.name}>
                        <button className='mobileSubheading' onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
                        </div>
                    )
                } else {
                    return;
                }
            }
            )}
        </div>
        )}
        </Formik>
    )
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);
    if (session) {
        return { redirect: { destination: "/" } };
    }
    const providers = await getProviders();
    return {
        props: {
            providers,
        }
    }
}