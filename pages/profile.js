import styles from '../styles/forms/registerLogin.module.css';
import desktop from '../styles/desktop/desktopCss.module.css';
import { useSession } from 'next-auth/react';
import SignIn from '@/components/signIn';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import axios from 'axios'
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

const passwordReq = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*]).{5,}$/;

function Profile() {
    const router = useRouter();
    const { data: session } = useSession();
    console.log(session)
    const initialValues = {
        password: "",
        confirmPassword: "",
    }
    const profileSchema = Yup.object().shape({
        password: Yup.string().required("Password is required").min(5, 'Password is too short - should be 5 characters minimum.').matches(passwordReq, {message: "Please, at least use 1 lower letter, 1 capital letter, 1 symbol and 1 numeric character."}),
        confirmPassword: Yup.string().required("Confirm password is required").oneOf([Yup.ref("password"), null], "Passwords must match"),
    })
    if (session) {
        return (
            <div id={desktop.profileForm}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={profileSchema}
                    onSubmit={values => {
                        axios.put('/api/profile/changePassword', {
                            email: session.user.email,
                            password: values.password,
                            confirmPassword: values.confirmPassword,
                        })
                        .then(res => {
                            console.log("Password changed")
                            router.push('/')
                        })
                        .catch(error => {
                            console.error(error);
                        })
                    }}
                >
                {formik => (
                    <>
                        <h1 className={`${styles.title} 'mobileHeading'`}>Profile</h1>
                        <h1 className={`${styles.title2} 'mobileSubHeading'`}>Change password</h1>
                        <Form className={styles.form}>
                            <label htmlFor="password" className={"mobileSubheading"}>Password</label>
                            <Field name="password" type="password"></Field>
                            <ErrorMessage component="div" className={styles.error} name="password" />
                            <label htmlFor="confirmPassword" className={"mobileSubheading"}>Change password</label>
                            <Field name="confirmPassword" type="password"></Field>
                            <ErrorMessage component="div" className={styles.error} name="confirmPassword" />
                            <button type="submit" className={"mobileSubheading"}>Submit</button>
                        </Form>
                    </>
                )}
                </Formik>
                <button
                    className={`${styles.deleteButton} mobileSubheading`}
                    onClick={() => {
                        if(confirm("Are you sure you want to delete your account? ALL YOUR DATA WILL BE LOST!")) {
                            axios.delete('/api/profile/deleteUser/', {
                                data: {
                                    email: session.user.email,
                                }
                            })
                            .then(res => {
                                console.log(res);
                                signOut();
                            })
                            .catch(error => console.error(error));
                        } else {
                            console.log("No")
                        }
                    }}
                >Delete account!
                </button>
            </div>
        )
    }
    return (
        <SignIn />
      )
}

export default Profile;