import React from "react";
import Map from "../../components/Map";
import firebase from "firebase/app";

// const db = firebase.firestore();
// db.collection("markers");
// .get()
// .then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//     console.log(`${doc.id} => ${doc.data()}`);
//   });
// });

const ExplorePage = () => {
  // const db = firebase.firestore();
  // db.collection("markers")
  //   .get()
  //   .then((querySnapshot) => {
  //     console.log(querySnapshot);
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.data().position.longitude);
  //     });
  //   });
  return (
    <div>
      <Map />
    </div>
  );
};

export default ExplorePage;
