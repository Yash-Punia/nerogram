import {auth, provider} from "../firebase";

//through export, any file can use this function
export const signInWithGoogle = async () => {
    let user;

    //we use asynchronous functions because
    //we wait for sign in to happen then we do rest of the stuff
    await auth.signInWithPopup(provider).then((res) => {
        console.log(res.user);
        user = res.user;
    }).catch((err) => {
        console.log(err.message);
    })

    return user; 
}