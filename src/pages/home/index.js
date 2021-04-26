import React, { useState, useContext } from 'react'
import "./style.css"
import { SignInBtn } from '../../components'
import { CreatePost, Navbar } from '../../containers'
import Feed from '../../containers/feed'
import { UserContext } from '../../context/user'

export default function Home() {
    const img = process.env.PUBLIC_URL + 'aurora.jpeg' 
    const [user, setUser] = useContext(UserContext).user;
    return (
        <div className="wrapper" style={{background:`url(${img})`,backgroundAttachment:'fixed', backgroundSize:'cover', height:'fit-content', width: '100%'}}>
            <div className="home">
                <Navbar/>
                <CreatePost/>
                {user ? (<Feed/>) : <></>}
            </div>
        </div>
    )
}