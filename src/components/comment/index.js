import React from 'react'
import './style.css'

export default function Comment({username, comment}) {
    return (
        <div class="comment">
            <p>
                <span style={{marginRight:"16px"}}><strong>{username}:</strong></span>
                {comment}
            </p>
        </div>
    )
}
