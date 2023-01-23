import React, { useState } from 'react';
import fire from '../../config/fire-config';
import User from '../User/User';

const CreatePost = () => {
const [title, setTitle] = useState('');
const [content, setContent] = useState('');
fire.auth().languageCode = 'ge';
fire.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("user Is Logged");
    if(!user.emailVerified)
    {
      sendEmailVerification();
      signOutWithEmailPassword();
    }
  } else {
    console.log("user Is not Logged");
  }
  });
  const handleSubmit = (event) => {
    event.preventDefault();

    fire.firestore()
  .collection('blog')
  .add({
    title: title,
    content: content,
  });

    console.log({
      "title": title,
      "content": content
    });
    setTitle('');
    setContent('');
 


}
const signOutWithEmailPassword = (event) => {

  fire.auth().signOut()
    .then((userCredential) => {
      console.log("Logged Out");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error Logged Out");
    });
  // [END auth_signin_password]
}
const signInWithEmailPassword = (event) => {
  var email = "sayedfmurad@gmail.com";
  var password = "hunter2";
  // [START auth_signin_password]
  fire.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  // [END auth_signin_password]
}

const signUpWithEmailPassword = (event) => {
  var email = "sayedfmurad@gmail.com";
  var password = "hunter2";
  // [START auth_signup_password]
  fire.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
  // [END auth_signup_password]
}


const sendEmailVerification = (event) => {
  // [START auth_send_email_verification]
  fire.auth().currentUser.sendEmailVerification()
    .then(() => {
    console.log("emailVerfication has been sent");
    });
  
}

const sendPasswordReset = (event) => {
  const email = "sayedfmurad@gmail.com";
  // [START auth_send_password_reset]
  fire.auth().sendPasswordResetEmail(email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
  // [END auth_send_password_reset]
}
  return (
    <div>
      <h2>Add Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title<br />
          <input type="text" value={title} 
           onChange={({target}) => setTitle(target.value)} />
        </div>
        <div>
          Content<br />
          <textarea value={content} 
           onChange={({target}) => setContent(target.value)} />
        </div>
        <button type="submit">Save</button>
      </form>
      <button onClick={signInWithEmailPassword}>signInWithEmailPassword</button>
      <button onClick={signUpWithEmailPassword}>signUpWithEmailPassword</button>
      <button onClick={sendEmailVerification}>sendEmailVerification</button>
      <button onClick={sendPasswordReset}>sendPasswordReset</button>
      <button onClick={signOutWithEmailPassword}>signOutWithEmailPassword</button>

    </div>
  )
}
export default CreatePost;