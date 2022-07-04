import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import UserDetails from "./UserDetails";
import {fetchAdminUserDetails,fetchSimpleUserDetails} from '../store/action'
import {useDispatch,useSelector} from 'react-redux'

const Admin = () => {
  const [userDatas, setUserDatas] = useState([]);
  const selectedUser=useSelector((state)=>state.userDetails.admin_user_details)
  console.log(selectedUser,'selUser')

  const dispatch=useDispatch();
  useEffect(() => {
    getAllUser();
  }, []);
  const getAllUser = async () => {
    try {
      const usersDetails = await getDocs(collection(db, "users"));
      setUserDatas(usersDetails.docs.map((item) => item.data()));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="userDetails">
        Hellow Admin User
          <Grid container spacing={2}  sx={{marginTop:"10px"}}>
            {userDatas.map((item) => (
             <Grid item xs={5} md={5} lg={5} sx={{marginLeft:"17px", padding:"15px", backgroundColor:"lightgray",borderRadius:"5px"}} onClick={() =>  dispatch(fetchAdminUserDetails(item))}>
                <span>
              {item.email}
              </span>
             </Grid>
          ))}
          </Grid>
          {
        selectedUser &&
        <UserDetails userDetails={selectedUser}/>
      }
        </div>     
      </div>
     
  );
};

export default Admin;
