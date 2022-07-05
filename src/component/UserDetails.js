import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
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

  const userValues = userDetails ? Object.values(userDetails) : null;
  if (userValues) {
    return (
      <>
        <div>
          {userValues.map((value, index) => {
            return <p key={index}> {value}</p>;
          })}
        </div>
      </>
    );
  }
};

export default UserDetails;
