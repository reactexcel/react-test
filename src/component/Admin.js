import { collection, getDocs,doc, updateDoc,onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import UserDetails from "./UserDetails";
import { fetchAdminUserDetails, fetchSimpleUserDetails } from "../store/action";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { async } from "@firebase/util";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "370px",
  height: "200px",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
  padding:"14px",
};

const Admin = () => {
  const [userDatas, setUserDatas] = useState([]);
  const selectedUser = useSelector(
    (state) => state.userDetails.admin_user_details
  );
  console.log(selectedUser, "selUser");
  const [addExtraField, setExtraField] = useState(false);
  const [newAddress, setAddNewAddress] = useState(" ");
  const [showDetails,setShowDetails] = useState(false);

  const dispatch = useDispatch();
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
  const handleClose = () => setExtraField(false);

  const handleSubmit = async () => {
    try {
      const updateRef = doc(db, "users", selectedUser.uid);
      const updateRes = await updateDoc(updateRef, {
        address: newAddress,
      });

    } catch (error) {
        console.log('errr',error)
    }
    handleClose()
  };

  return (
    <div>
      <div className="userDetails">
        Hellow Admin User
        <Grid container spacing={2} sx={{ marginTop: "10px" }}>
          {userDatas.map((item) => (
            <Grid
              item
              xs={5}
              md={5}
              lg={5}
              sx={{
                marginLeft: "17px",
                marginTop: "2px",
                padding: "15px",
                backgroundColor: "lightgray",
                borderRadius: "5px",
              }}
              onClick={() =>{
                 dispatch(fetchAdminUserDetails(item));
                 setShowDetails(true)
              }}
            >
              <span>{item.email}</span>
            </Grid>
          ))}
        </Grid>
        {selectedUser && <UserDetails uid={selectedUser.uid} />}
         {
          showDetails &&
             <Button
             sx={{ marginTop: "3px" }}
             onClick={() => setExtraField(!addExtraField)}
           >
             Add Extra Field
           </Button>
        }
        
      </div>
      <Modal
        open={addExtraField}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <Typography> user Address</Typography>
            <TextField
              fullWidth
              onChange={(e) => setAddNewAddress(e.target.value)}
            />
          </div>
          <Button onClick={handleSubmit} fullWidth>
            {" "}
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Admin;
