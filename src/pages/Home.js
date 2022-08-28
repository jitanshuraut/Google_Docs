import React, { useState } from 'react'
import style from "../styles/Home.module.css"
import Footer from '../components/Footer';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {auth} from "../firebase-con"
import { useNavigate } from "react-router-dom";

function Home() {

    let navigate = useNavigate();
   const [authen, setauthen] = useState(0)
    const provider = new GoogleAuthProvider();




    const signInWithGoogle = () => {

     
        signInWithPopup(auth, provider)
            .then((result) => {
                // setUser({
                //     name: result.user.displayName,
                //     email: result.user.email,
                //     url: result.user.photoURL
                // })
              
                sessionStorage.setItem("name",result.user.displayName)
                sessionStorage.setItem("email",result.user.email)
                sessionStorage.setItem("url",result.user.photoURL)



             

            })
            .catch((error) => {
                console.log(error);
            });
      
    };


    const location = useLocation();
    return (
        <>
     

            <h1 className={style.heading}>Build your best ideas together, in Google Docs</h1>

            <h3 className={style.sub_heading}>Create and collaborate on online documents in real-time and from any device.</h3>

            <div className={style.button_try_docs} onClick={()=>{

             
                signInWithGoogle()
                
            }}>
                <h3 className={style.button_text}>
                    <Link to={sessionStorage.getItem("email")?"docs":"spinner"} style={{ "textDecoration": "none", "color": "white" }}> Try Docs For Work</Link>
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
                    <h2 className={style.p_head}>Seamless collaboration, from anywhere</h2>
                    <p className={style.home_text}>
                        Edit together in real-time with easy sharing, and use comments, suggestions, and action items to keep things moving. Or use @-mentions to pull relevant people, files, and events into your online Docs for rich collaboration.
                    </p>
                </div>
            </div>
            <div className={style.what_can_do_2}>
                <div className={style.home_p_text}>
                    <h2 className={style.p_head}>Seamless collaboration, from anywhere</h2>
                    <p className={style.home_text}>
                        Edit together in real-time with easy sharing, and use comments, suggestions, and action items to keep things moving. Or use @-mentions to pull relevant people, files, and events into your online Docs for rich collaboration.
                    </p>
                </div>
                <img src="home_2.jpg" alt="" className={style.img_what_can} />
            </div>
            <div className={style.what_can_do_3}>
                <img src="home_3.jpg" alt="" className={style.img_what_can_extra} />
                <div className={style.home_p_text}>
                    <h2 className={style.p_head}>Seamless collaboration, from anywhere</h2>
                    <p className={style.home_text}>
                        Edit together in real-time with easy sharing, and use comments, suggestions, and action items to keep things moving. Or use @-mentions to pull relevant people, files, and events into your online Docs for rich collaboration.
                    </p>
                </div>
            </div>
            <div className={style.what_can_do_4}>
                <div className={style.home_p_text}>
                    <h2 className={style.p_head}>Seamless collaboration, from anywhere</h2>
                    <p className={style.home_text}>
                        Edit together in real-time with easy sharing, and use comments, suggestions, and action items to keep things moving. Or use @-mentions to pull relevant people, files, and events into your online Docs for rich collaboration.
                    </p>
                </div>
                <img src="home_4.jpg" alt="" className={style.img_what_can} />
            </div>
            <hr />
            <h1 className={style.sub_head_3}>Ready to get started?</h1>
            <div className={style.button_try_docs_sub}>
                <h3 className={style.button_text}>   <Link to="docs" style={{ "textDecoration": "none", "color": "white" }}> Try Docs For Work</Link>
                </h3>
            </div>

            <hr />

            <Footer />

        </>
    )
}

export default Home