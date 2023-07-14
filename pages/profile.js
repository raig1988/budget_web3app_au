// CSS
import styles from '../styles/forms/registerLogin.module.css';
// COMPONENTS
import SignIn from '@/components/signIn';
// LIBRARIES
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import axios from 'axios'
// REACT
import { useState } from 'react';
// HELPER FUNCTIONS
import { passwordReq } from '@/lib/helperFunctions';

function Profile() {

    const { data: session } = useSession();

    if (session) {
        return (
            <div>
                <div className={styles.form}
                    style={
                        {
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                        }
                    }
                >
                    <h1 className={`${styles.title} 'mobileHeading'`}>Profile</h1>
                    <p className='mobileSubheading'>Click below to delete your account.</p>
                    <button
                        className={`${styles.deleteButton} mobileSubheading`}
                        style={
                            {
                                maxWidth: "300px",
                            }
                        }
                        onClick={() => {
                            if(confirm("Are you sure you want to delete your account? ALL YOUR DATA WILL BE LOST!")) {
                                axios.delete('/api/profile/deleteUser/', {
                                    data: {
                                        address: session.user.address,
                                    }
                                })
                                .then(res => {
                                    signOut({ callbackUrl: '/'});
                                })
                                .catch(error => console.error(error));
                            }
                        }}
                    >Delete account!
                    </button>
                </div>
            </div>
        )
    }
    return (
        <SignIn />
      )
}

export default Profile;

// const [showHidePassword, changeShowHidePassword] = useState(false);
// const [message, setMessage] = useState("")

// const initialValues = {
//     password: "",
//     confirmPassword: "",
// }
// const profileSchema = Yup.object().shape({
//     password: Yup.string().required("Password is required").min(5, 'Password is too short - should be 5 characters minimum.').matches(passwordReq, {message: "Please, at least use 1 lower letter, 1 capital letter, 1 symbol and 1 numeric character."}),
//     confirmPassword: Yup.string().required("Confirm password is required").oneOf([Yup.ref("password"), null], "Passwords must match"),
// })


{/* <Formik
    initialValues={initialValues}
    validationSchema={profileSchema}
    onSubmit={(values, actions) => {
        axios.put('/api/profile/changePassword', {
            address: session.user.address,
            password: values.password,
            confirmPassword: values.confirmPassword,
        })
        .then(res => {
            setMessage("Your password has been updated");
        })
        .catch(error => {
            console.error(error);
        })
        actions.resetForm();
    }}
>
{formik => (
    <>
        <h1 className={`${styles.title} 'mobileHeading'`}>Profile</h1>
        <h1 className={`${styles.title2} 'mobileSubHeading'`}>Change password</h1>
        <Form className={styles.form}>
            <label htmlFor="password" className={"mobileSubheading"}>Password</label>
            <Field name="password" type={showHidePassword ? "text" : "password"}></Field>
            <ErrorMessage component="div" className={styles.error} name="password" />
            <label htmlFor="confirmPassword" className={"mobileSubheading"}>Change password</label>
            <Field name="confirmPassword" type={showHidePassword ? "text" : "password"}></Field>
            <ErrorMessage component="div" className={styles.error} name="confirmPassword" />
            <div>
                <label style={{ marginRight: "5px"}} htmlFor="checkbox">Show password</label>
                <input type="checkbox" name="checkbox" onClick={() => changeShowHidePassword(!showHidePassword)}/>
            </div>
            <button type="submit" className={"mobileSubheading"}>Submit</button>
        </Form>
        {
            message ?
            <p className='mobileSubheading'>{message}</p> 
            : null
        }
    </>
)}
</Formik> */}