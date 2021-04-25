import React, { useContext } from 'react'
import { SignInBtn } from '../../components'
import { SignOutBtn } from '../../components'
import { UserContext } from '../../context/user'
import "./style.css"

export default function Navbar() {

    const [user, setUser] = useContext(UserContext).user;

    return (
        <div className="navbar">
            <div className="navbar__logo">
                <img src={process.env.PUBLIC_URL + 'logo192.png'} />
                <p>Nerogram</p>
            </div>
            <div>
                {!user ? <></> : <SignOutBtn />}  
            </div>
        </div>
    )
}
