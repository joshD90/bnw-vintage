import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
//this is for our sign in process
export const signIn = (email, password) => {
  //this will sign us in with firebase preformed function.  This will also create a session
  //in indexedDb in our browser.  This will trigger the listener in our authContext which will
  //set our authState
  const myUser = signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //success
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      console.log(error.code, error.message);
    });
  //we promisify this function as we will be calling it asyncronously
  return new Promise((resolve, reject) => {
    resolve(myUser);
  });
};
//sign out
export const logout = () => {
  return signOut(auth);
};
