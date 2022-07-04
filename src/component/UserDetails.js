import React from "react";

const UserDetails = ({ userDetails }) => {
   if(userDetails)
   {
    return (
      <div>
        <p> {userDetails.email}</p>
        <p> {userDetails.authProvider} </p>
        <p> {userDetails.name} </p>
      </div>
    );
    }
};

export default UserDetails;
