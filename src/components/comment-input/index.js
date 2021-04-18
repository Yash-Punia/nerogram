import React,{ useContext, useState } from 'react'
import './style.css'
import SendIcon from '@material-ui/icons/Send';
import { db } from '../../firebase';
import { UserContext } from '../../context/user';
import firebase from "firebase";

export default function CommentInput(documentId) {
    const [comment, setComment] = useState("");
    const [user, setUser] = useContext(UserContext).user;

    const handleChange = (e) => {
        setComment(e.target.value)
    }

    const addComment = () => {
        db.collection("posts").doc(documentId.documentId).update({
            comments: firebase.firestore.FieldValue.arrayUnion({
                comment: comment,
                username: user.displayName,
            })
        }).then(() => {
            setComment("")
            console.log("Comment Added successfully");
        }).catch((err) => {
            console.log(`Comment Addition Error: ${err}`)
        })
    }

    return (
        <div className="commentInput">
            <textarea onChange={handleChange} placeholder="Add a comment" value={comment} className="commentInput__textArea" rows="1"></textarea>
            <div onClick={addComment} className="commentInput__sendBtn">
                <SendIcon/>
            </div>
        </div>
    )
}
