// CSS
import styles from '../styles/forms/registerLogin.module.css';
import desktop from '../styles/desktop/desktopCss.module.css';
// LIBRARIES
import { getProviders, signIn, getCsrfToken } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from "yup";
// REACT
import { useState } from 'react';
// COMPONENTS
import PasswordShowHide from '@/components/passwordHide';

function Login({providers, csrfToken}) {
    const router = useRouter();
    const [error, setError] = useState("")
    const loginSchema = Yup.object().shape({
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required"),
    })
    const initialValues = {
        email: "",
        password: "",
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={async values => {
                signIn('credentials', {
                    email: values.email,
                    password: values.password,
                    redirect: false,
                })
                .then((res) => {
                    if (res.status === 200) {
                        router.push('/')
                    } else {
                        setError(res.error);
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
                }
            }
        >
        {formik => (
            <div id={desktop.loginForm}>
                <h1 className={`${styles.title} 'mobileSubheading'`} data-testid="loginTitle">Log In</h1>
                <Form className={styles.form} onSubmit={formik.handleSubmit}>
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                    <label htmlFor="email" className={"mobileSubheading"}>Email</label>
                    <Field type="email" name="email"/>
                    <ErrorMessage component="div" className={styles.error} name="email" />
                    <label htmlFor="password" className={"mobileSubheading"}>Password</label>
                    <Field type="password" name="password" component={PasswordShowHide} />
                    <ErrorMessage component="div" className={styles.error} name="password"/>
                    <div>{error && <SignInError error={error} />}</div>
                    <button type="submit" className={"mobileSubheading"}>Login</button>
                </Form>
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

export default Login;

const errors = {
    Signin: 'Try signing with a different account.',
    OAuthSignin: 'Try signing with a different account.',
    OAuthCallback: 'Try signing with a different account.',
    OAuthCreateAccount: 'Try signing with a different account.',
    EmailCreateAccount: 'Try signing with a different account.',
    Callback: 'Try signing with a different account.',
    OAuthAccountNotLinked:
      'To confirm your identity, sign in with the same account you used originally.',
    EmailSignin: 'Check your email address.',
    CredentialsSignin:
      'Sign in failed. Check the details you provided are correct.',
    default: 'Unable to sign in.',
  };

const SignInError = ({ error }) => {
    const errorMessage = error && (errors[error] ?? errors.default);
    return <div className={styles.error}>{errorMessage}</div>;
};

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);
    if (session) {
        return { redirect: { destination: "/" } };
    }
    const providers = await getProviders();
    return {
        props: {
            providers,
            csrfToken: await getCsrfToken(context),
        }
    }
}