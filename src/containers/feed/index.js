import React, { useState, useEffect} from 'react'
import { Post } from '..'
import { db } from '../../firebase';
import './style.css'

export default function Feed() {
    const [posts, setPosts] = useState([]);

    // this is a handler when a hook changes
    // when input is emty then it means load on startup
    useEffect(() => {
        // any instant change in database is represented by a snapshot
        db.collection("posts").onSnapshot((snapshot) => {
            // map through all the documents
            // hence it gives one document at a time
            setPosts(snapshot.docs.map((doc) => ({
                id: doc.id, post: doc.data()
            })))
        })
    }, [])

    return (
        <div className="feed">
            { posts.map(({id, post}) => {
                return <Post
                            key={id}
                            id={id}
                            userPhotoURL={post.userPhotoURL}
                            username={post.username}
                            postImageURL={post.postImageURL}
                            caption={post.caption}
                            comments={post.comments}  
                        />
            })}
        </div>
    )
}
