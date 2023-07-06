// CSS
import styles from '../styles/forms/registerLogin.module.css';
import desktop from '../styles/desktop/desktopCss.module.css';
// LIBRARIES
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useSession, getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]";
import axios from 'axios';
// REACT
import { useRef, useState } from 'react';
// HELPER FUNCTIONS
import { passwordReq } from '@/lib/helperFunctions';
// COMPONENTS
import PasswordShowHide from '@/components/passwordHide';

export default function Register({providers}) {

    const [showHidePassword, changeShowHidePassword] = useState(false);
    const [message, setMessage] = useState("")

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
                            setMessage("Your account is being created.. please wait")
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
                <Field name="password" type={showHidePassword ? "text" : "password"} />
                <ErrorMessage component="div" className={styles.error} name="password" />
                <label htmlFor="confirmPassword" className={"mobileSubheading"}>Confirm password</label>
                <Field name="confirmPassword" type={showHidePassword ? "text" : "password"}/>
                <ErrorMessage component="div" className={styles.error} name="confirmPassword" />
                <div>
                    <label style={{ marginRight: "5px"}} htmlFor="checkbox">Show password</label>
                    <input type="checkbox" name="checkbox" onClick={() => changeShowHidePassword(!showHidePassword)}/>
                </div>
                <button type="submit" className={"mobileSubheading"}>Submit</button>
            </Form>
            {
                message ?
                <p className="mobileSubheading">{message}</p>
                : null
            }
            {/* PROVIDERS NOT CURRENTLY IN USE */}
            {/* {Object.values(providers).map(provider => {
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
            )} */}
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