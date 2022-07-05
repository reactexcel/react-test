import React, { useState, useEffect } from "react";
import { authentication, db } from "../firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./styles.css";

const Login = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(authentication, provider);
      const user = res.user;
      const q = doc(db, "users", user.uid);

      await setDoc(q, {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });

      if (res) {
        localStorage.setItem("token", res.user.accessToken);
        localStorage.setItem("userId", res.user.uid);
        setToken(res.user.accessToken);
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  return (
    <>
      <div className="mainContainer">
        <h3> Please Login To Firebase Firestore: </h3>
        <div className="login_container">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ backgroundColor: "white", color: "gray" }}
            //   onClick={handleGoogleLogin}
            onClick={signInWithGoogle}
          >
            <img
              width="20px"
              style={{ marginBottom: "3px", marginRight: "5px" }}
              alt="Google sign-in"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            />
            Sign in with Google
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
