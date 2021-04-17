import React, { useContext, useState } from 'react'
import "./style.css"
import { SignInBtn } from '../../components'
import { UserContext } from '../../context/user'

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { db, storage } from '../../firebase';
import makeid from '../../helper/functions';

import firebase from "firebase";

export default function CreatePost() {
    const [user, setUser] = useContext(UserContext).user;
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
            
            var selectedImageSrc = URL.createObjectURL(e.target.files[0]);
            var imagePreview = document.getElementById("image-preview");
            imagePreview.src = selectedImageSrc;
            imagePreview.style.display = "block";
        }
    }
    
    const handleUpload = () => {
        if(image) {
            var imageName = makeid(10);
            //ref is for name and put actually puts the content
            const uploadTask = storage.ref(`images/${imageName}.jpg`).put(image);
            uploadTask.on("state_changed", (snapshot) => {
                const progress = Math.round(snapshot.bytesTransferred/snapshot.totalBytes)*100;

                setProgress(progress); 
            },(err) => {
                console.log(err);
            }, () => {
                // get the download url and upload the post info

                storage.ref("images").child(`${imageName}.jpg`).getDownloadURL().then((imageURL) => {
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        postImageURL: imageURL,
                        userPhotoURL: user.photoURL,
                        username: user.email.replace("@gmail.com","")
                    })
                })
            })
        }
    }

    return (
        <div class="createPost">
            {user ? (
                <div className="createPost__loggedIn">
                    <p>Create Post</p>
                    <div className="createPost__loggedInCenter">
                        <textarea 
                            className="createPost__textarea" 
                            rows="3" 
                            value={caption} 
                            onChange={ (e) => setCaption(e.target.value)}
                            placeholder="Enter caption here"
                        ></textarea>
                        <div className="createPost__imagePreview">
                            <img id="image-preview"></img>
                        </div>
                    </div>
                    <div className="createPost__bottom">
                        <div className="createPost__imageUpload">
                            <label htmlFor="fileInput">
                                <AddAPhotoIcon style={{cursor:"pointer", fontSize:"20px"}}/>
                            </label>
                            <input id="fileInput" type="file" accept="image/*" onChange={handleChange}/>
                        </div>
                        <button className="createPost__uploadBtn" onClick={handleUpload} style={{color: caption ? "#fff" : "#666"}}>
                            {`Upload ${progress != 0 ? progress : ""}`}
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                <SignInBtn/>
                <p style={{ marginLeft: "12px"}}>to Post and Comment</p>
                </div>
            )}
        </div>
    )
}
