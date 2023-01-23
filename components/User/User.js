import MessageHelper from "../Utils/MessageHelper"
import fire from '../../config/fire-config';

class User{
        IsLogged(user){}
        IsLogged2(user){}
        IsNotLogged(){}
        IsNotLogged2(){}
      
     getCurUser(){return fire.auth().currentUser;}

      LogOutSuc(user){}
      LogOutErr(errorCode,errorMessage){} 
      LogOut() {
        
        fire.auth().signOut()
          .then((userCredential) => {
            var user = userCredential.user;
            this.LogOutSuc(user);
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            this.LogOutErr(errorCode,errorMessage);
          });
        // [END auth_signin_password]
      }

     LogInSuc(user){}
     LogInErr(errorCode,errorMessage){}
     LogIn(email,password){
        // [START auth_signin_password]
        fire.auth().signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            this.LogInSuc(user);
            // ...
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            this.LogInErr(errorCode,errorMessage);
          });
        // [END auth_signin_password]
      }

     signUpSuc(user){}
     signUpErr(errorCode,errorMessage){}
     signUp(email,password){
        // [START auth_signup_password]
        fire.auth().createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            this.signUpSuc(user);
            // ...
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            this.signUpErr(errorCode,errorMessage);
            // ..
          });
        // [END auth_signup_password]
      }
      
     sendEmailVerificationSuc(){}
     sendEmailVerification(){
        fire.auth().currentUser.sendEmailVerification()
          .then(() => {
          this.sendEmailVerificationSuc();
          });
      }
    
     sendPasswordResetSuc(){}
     sendPasswordResetErr(){}
     sendPasswordReset(email){
            fire.auth().sendPasswordResetEmail(email)
          .then(() => {
           this.sendPasswordResetErr();
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            this.sendPasswordResetErr();
          });
        // [END auth_send_password_reset]
      }
     getfire(){return fire;}
}
const mUser = new User();
fire.auth().onAuthStateChanged(function(user) {
    if (user) {
        mUser.IsLogged();
        mUser.IsLogged2();
    } else {
        mUser.IsNotLogged();
        mUser.IsNotLogged2();
    }
    });
    
export default mUser;