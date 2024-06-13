import React, { useState, useEffect } from "react";
import style from "../styles/Home.module.css";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase-con";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const location = useLocation();
  const { state } = location;

  const provider = new GoogleAuthProvider();
  let navigate = useNavigate();
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        sessionStorage.setItem("name", result.user.displayName);
        sessionStorage.setItem("email", result.user.email);
        sessionStorage.setItem("url", result.user.photoURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Save_User = async () => {
    await axios
      .post("http://localhost:5001/doc/Add_user", {
        User_name: sessionStorage.getItem("name"),
        Email: sessionStorage.getItem("email"),
      })
      .then(function (response) {
        console.log(response.data);
        sessionStorage.setItem("User_ID", response.data.User_ID);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const Save_and_nav = async () => {
    await signInWithGoogle();
    await Save_User();
    navigate("../extra");
  };

  useEffect(() => {
    if (state?.error_ !== null) {
      toast("Please Login to you Account", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, []);

  return (
    <>
      <Navbar yes="no" />
      <h1 className={style.heading}>
        Build your best ideas together, in Google Docs
      </h1>
      <h3 className={style.sub_heading}>
        Create and collaborate on online documents in real-time and from any
        device.
      </h3>
      <div
        className={style.button_try_docs}
        onClick={() => {
          Save_and_nav();
        }}
      >
        <h3 className={style.button_text}>
          <div style={{ textDecoration: "none", color: "white" }}>
            {" "}
            Try Docs For Work
          </div>
        </h3>
      </div>
      <hr />
      <div className={style.img_box}>
        <img src="home_1.png" alt="" className={style.img_head} />
      </div>
      <hr />
      <h3 className={style.sub_head_1}>See what you can do with Google Docs</h3>
      <div className={style.what_can_do_1}>
        <img src="home_2.jpg" alt="" className={style.img_what_can} />
        <div className={style.home_p_text}>
          <h2 className={style.p_head}>
            Seamless collaboration, from anywhere
          </h2>
          <p className={style.home_text}>
            Edit together in real-time with easy sharing, and use comments,
            suggestions, and action items to keep things moving. Or use
            @-mentions to pull relevant people, files, and events into your
            online Docs for rich collaboration.
          </p>
        </div>
      </div>
      <div className={style.what_can_do_2}>
        <div className={style.home_p_text}>
          <h2 className={style.p_head}>
            Seamless collaboration, from anywhere
          </h2>
          <p className={style.home_text}>
            Edit together in real-time with easy sharing, and use comments,
            suggestions, and action items to keep things moving. Or use
            @-mentions to pull relevant people, files, and events into your
            online Docs for rich collaboration.
          </p>
        </div>
        <img src="home_2.jpg" alt="" className={style.img_what_can} />
      </div>
      <div className={style.what_can_do_3}>
        <img src="home_3.jpg" alt="" className={style.img_what_can_extra} />
        <div className={style.home_p_text}>
          <h2 className={style.p_head}>
            Seamless collaboration, from anywhere
          </h2>
          <p className={style.home_text}>
            Edit together in real-time with easy sharing, and use comments,
            suggestions, and action items to keep things moving. Or use
            @-mentions to pull relevant people, files, and events into your
            online Docs for rich collaboration.
          </p>
        </div>
      </div>
      <div className={style.what_can_do_4}>
        <div className={style.home_p_text}>
          <h2 className={style.p_head}>
            Seamless collaboration, from anywhere
          </h2>
          <p className={style.home_text}>
            Edit together in real-time with easy sharing, and use comments,
            suggestions, and action items to keep things moving. Or use
            @-mentions to pull relevant people, files, and events into your
            online Docs for rich collaboration.
          </p>
        </div>
        <img src="home_4.jpg" alt="" className={style.img_what_can} />
      </div>
      <hr />
      <h1 className={style.sub_head_3}>Ready to get started?</h1>
      <div className={style.button_try_docs_sub}>
        <h3 className={style.button_text}>
          {" "}
          <Link to="docs" style={{ textDecoration: "none", color: "white" }}>
            {" "}
            Try Docs For Work
          </Link>
        </h3>
      </div>
      <hr />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default Home;
