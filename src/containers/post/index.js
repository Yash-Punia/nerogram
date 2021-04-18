import React, { useState, useContext } from 'react'
import { Comment, CommentInput } from '../../components';
import { UserContext } from '../../context/user';
import { db, storage } from '../../firebase';
import "./style.css"

export default function Post({userPhotoURL, username, id, postImageURL, caption, comments}) {
    const [user, setUser] = useContext(UserContext).user;

    const deletePost = () => {
        // delete image from firebase storage

        //get reference to image file
        var imageRef = storage.refFromURL(postImageURL);

        imageRef.delete().then(() => {
            console.log("Delete successful");
        }).catch((err) => {
            console.log(err);
        })

        // delete the post info from firebase firestore
        db.collection("posts").doc(id).delete().then(() => {
            console.log("Delete post info successful");
        }).catch((err) => {
            console.log(`Error post info deletion: ${err}`);
        })
    }
    return (
        <div className="post">

            {/* POST HEADER */}
            <div className="post__header">
                <div className="post__headerLeft">
                    <img src={userPhotoURL}/>
                    <p style={{marginLeft:"16px"}}>{username}</p>
                </div>
            <button onClick={deletePost} className="post__delete">Delete</button>
            </div>

            {/* POST IMAGE */}
            <div style={{backgroundImage:`url(${postImageURL})`}} className="post__content">
                <img className="post__image" src={postImageURL}/>
            </div>

            {/* POST CAPTION */}
            <div className="post__caption">
                <span style={{color:"#ff0066"}}><strong>{username}:</strong></span>
                <p>{caption}</p>
            </div>

            {/* COMMENTS */}
            {comments ? comments.map((comment) => {
                return <Comment comment={comment.comment} username={comment.username}/>
            }):<></>}

            {/* ADD A COMMENT IF LOGGED IN*/}
            { user ? (
                <CommentInput documentId={id} />
            ): <></>}
        </div>
    )
}
