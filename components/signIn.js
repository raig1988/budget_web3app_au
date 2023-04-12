import { signIn } from 'next-auth/react';

function SignIn() {
    return (
        <div style={{textAlign: "center", margin: "80px 0px"}}>
            <p className="mobileSubheading" style={{margin: "0px 0px"}}>Not signed in</p> <br />
            <button onClick={() => signIn()}>Sign in</button>
        </div>
    )
}

export default SignIn;