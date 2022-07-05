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
  console.log(userDetails,'userD')
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

  const userValues= userDetails? Object.values(userDetails) : null;  
   console.log(userValues,'userV')
  if (userValues) {
    return (
      <>
      <div>
         {
           userValues.map((value,index) => {
            return(
            <p key={index}> {value}</p>
            )
           })
         }
      </div>
      </>
    );
  }
};

export default UserDetails;
