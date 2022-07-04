import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/config";

const UserDetails = ({ uid }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    getAllUser();
  }, [uid]);

  const getAllUser = async () => {
    try {
      const usersDetailsRef = doc(db, "users", uid);
      const unsubscribe = onSnapshot(usersDetailsRef, (querySnapshot) => {
          setUserDetails(querySnapshot.data());
      });
    } catch (error) {
      console.log(error);
    }
  };
  if (userDetails) {
    return (
      <>
      <div>
        <p> {userDetails.email}</p>
        <p> {userDetails.authProvider} </p>
        <p> {userDetails.name} </p>
        {userDetails.address && <p>{userDetails.address}</p>}
      </div>
      </>
    );
  }
};

export default UserDetails;
