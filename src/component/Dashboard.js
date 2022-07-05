import React from 'react'
import { useState , useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { authentication,db } from '../firebase/config';
import "./styles.css";
import { getDoc,doc  } from "firebase/firestore";
import { Button } from '@mui/material';
const Dashboard = () => {
    const [user,setUser] = useState(null)
    const [userDetails,setUserDetails] = useState(null)
    const navigate = useNavigate();
    const uid =  localStorage.getItem("userId")
    const userInfo = async() => {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUserDetails(docSnap.data()) 
        }
    }
    const setUserRole = (role) => {
        localStorage.setItem("userRole", role);
        setUser(role)
    } 
    const signOut = () => {
        localStorage.clear()
        navigate("/");  
        authentication.signOut()
    }
   useEffect(() => {
          if(user)
          {
             if(user === "simple")
             {
                navigate("/userPage");   
             }
             else{
                navigate("/adminPage");
             }
          }   
   },[user])
    useEffect(() => {
        userInfo()
    },[])
  return (
    <div className='dashboardContainer'>
            <Button onClick={signOut}> SignOut</Button>
         <div> 
           Hello {userDetails && userDetails.email }, this is the main screen
           <p> To continue, please choose your account type:
                 </p>
                  <div style={{display:"flex", marginTop:"35px", gap:"58px"}}>
                   <div className='btn' onClick={()=>setUserRole("simple")}> 
                      Simple User 
                     </div>      
                     <div className='btn' onClick={()=>setUserRole("admin")}>
                      Admin User
                     </div>  
                  </div>
         </div>
    </div>
  )
}

export default Dashboard