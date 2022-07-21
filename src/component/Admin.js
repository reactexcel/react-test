import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
// import UserDetails from "./UserDetails";
import { fetchAdminUserDetails } from "../store/action";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { authentication } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import './vue-component/dist/user-detail';

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
  padding: "14px",
};

const Admin = () => {
  const [userDatas, setUserDatas] = useState([]);
  const selectedUser = useSelector(
    (state) => state.userDetails.admin_user_details
  );
  const [addExtraField, setExtraField] = useState(false);
  const [newField, setNewField] = useState({
    fieldName: "",
    fieldValue: "",
  });
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
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
        [newField.fieldName]: newField.fieldValue,
      });
    } catch (error) {
      console.log("errr", error);
    }
    handleClose();
  };
  const signOut = () => {
    localStorage.clear();
    navigate("/");
    authentication.signOut();
  };

  return (
    <div>
      <div className="userDetails">
        <div className="fieldContainer">
          {" "}
          <span> Hellow Admin User </span>
          <Button onClick={signOut}> SignOut</Button>
        </div>
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
                cursor: "pointer",
              }}
              onClick={() => {
                dispatch(fetchAdminUserDetails(item));
                setShowDetails(true);
              }}
            >
              <span>{item.email}</span>
            </Grid>
          ))}
        </Grid>
        {selectedUser && <user-detail uid={selectedUser.uid}></user-detail>}
        {showDetails && (
          <Button
            sx={{ marginTop: "3px" }}
            onClick={() => setExtraField(!addExtraField)}
          >
            Add Extra Field
          </Button>
        )}
      </div>
      <Modal
        open={addExtraField}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <div className="fieldContainer">
              <Typography> Field Name</Typography>
              <TextField
                onChange={(e) =>
                  setNewField({ ...newField, fieldName: e.target.value })
                }
              />
            </div>
            <div className="fieldContainer">
              <Typography> Field Value</Typography>
              <TextField
                onChange={(e) =>
                  setNewField({ ...newField, fieldValue: e.target.value })
                }
              />
            </div>
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
