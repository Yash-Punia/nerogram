import React from 'react'
import "./style.css"
import { SignInBtn } from '../../components'

export default function CreatePost() {
    return (
        <div class="createPost">
            <SignInBtn/>
            <p style={{ marginLeft: "12px"}}>to Post and Comment</p>
        </div>
    )
}
