import React, { useState } from "react";
import Button from "@mui/material/Button";
import {useDispatch,useSelector} from 'react-redux'
import { useEffect } from "react";
import {fetchAdminUserDetails,fetchSimpleUserDetails} from '../store/action'
import { authentication,db } from '../firebase/config';
import "./styles.css";
import { getDoc,query,where,addDoc, collection,setDoc, doc  } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";
const SimpleUser = () => {
  const [showDetails,setShowDetails] = useState(false);
  const dispatch=useDispatch();
  const state=useSelector((state)=>state.userDetails.simple_user_details)
  const uid = localStorage.getItem("userId");
  const navigate = useNavigate();
  const userInfo = async () => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        dispatch(fetchSimpleUserDetails(docSnap.data()))
    }
  };

  const signOut = () => {
    localStorage.clear()
    navigate("/");  
    authentication.signOut()
}
  useEffect(() => {
    userInfo();
  }, []);

  console.log(state,'state')
  return (
    <div>
      <div className="userDetails">
    
        <div className="fieldContainer"> <span>   hello simple user </span> 
       <Button onClick={signOut}> SignOut</Button>
         </div>
        <Button className="btn" onClick={()=>setShowDetails(!showDetails) }>see you document</Button>
         {
             showDetails  &&  state &&
          <UserDetails uid={state.uid} />
         }
      </div>
    </div>
  );
};

export default SimpleUser;
