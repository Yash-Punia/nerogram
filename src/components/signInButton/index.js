import React, { useContext } from 'react'
import { UserContext } from '../../context/user'
import { signInWithGoogle } from '../../services/auth'
import "./style.css"

export default function SignInButton() {
    //react web hook use state
    const [, setUser] = useContext(UserContext).user;

    const signInBtnClick = async () => {
        let userBySignIn = await signInWithGoogle();
        if(userBySignIn) setUser(userBySignIn) 
    }

    return (
        <div className="signInButton" onClick={signInBtnClick}>
            <p>Sign In</p>
        </div>
    )
}