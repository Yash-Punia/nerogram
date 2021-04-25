import React, { useContext } from 'react'
import { UserContext } from '../../context/user'
import { logout } from '../../services/auth'
import "./style.css"

export default function SignOutButton() {
    //react web hook use state
    const [, setUser] = useContext(UserContext).user;

    const signOutBtnClick = async () => {
        let userBySignOut = await logout();
        if(userBySignOut) setUser(null) 
    }

    return (
        <div className="signOutButton" onClick={signOutBtnClick}>
            <p>Sign Out</p>
        </div>
    )
}