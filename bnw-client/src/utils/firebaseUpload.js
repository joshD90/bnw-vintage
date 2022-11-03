import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const upload = (file) => {
  console.log(file.name);
  //create the space where the file will be uploaded to
  const storageRef = ref(storage, `images/test/${file.name}`);
  console.log(storageRef, "storage Ref");
  //upload the file / blob
  const uploadTask = uploadBytesResumable(storageRef, file);

  //Listen for any changes in the task and feed these back
  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //check on tast progress
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is ", progress, " % completed");
        //send feedback if the upload is paused or running
        switch (snapshot.state) {
          case "paused":
            console.log("Upload has been paused");
            break;
          case "running":
            console.log("Upload is still running");
            break;
        }
      },
      (error) => {
        //error handling
        switch (error.code) {
          case "storage/unauthorized":
            console.log(
              error,
              "need further permission to complete this action"
            );
            reject(error);
            break;
          case "storage/cancelled":
            console.log(error, "user has cancelled the upload");
            reject(error);
            break;
          case "storage/unknown":
            console.log("unknown error occurred", error);
            reject(error);
            break;
        }
      },
      () => {
        //successful upload
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("SUCCESS", url);
          resolve(url);
        });
      }
    );
  });
};
