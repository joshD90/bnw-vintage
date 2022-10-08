import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const signIn = (email, password) => {
  const myUser = signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //success
      const user = userCredential.user;
      console.log(user, "from the sign in itself");
      return user;
    })
    .catch((error) => {
      console.log(error.code, error.message);
    });

  return new Promise((resolve, reject) => {
    resolve(myUser);
  });
};

export { signIn };
