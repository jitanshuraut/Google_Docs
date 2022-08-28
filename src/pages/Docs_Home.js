import React,{useState,useEffect} from 'react'
import style from "../styles/docs_home.module.css"

import { collection, query, where, doc, getDocs, addDoc, updateDoc, deleteDoc, serverTimestamp, FieldValue } from "firebase/firestore"
import {db} from "../firebase-con"
import {Link, useNavigate} from 'react-router-dom';


function Docs_Home() {


  const q = query(collection(db, "content"), where("email", "==", `${sessionStorage.getItem("email")}`));
 
    const [file, setfile] = useState([])
    const navigate = useNavigate();
    useEffect(()=>{
        const getuser=async()=>{
          const data=await getDocs(q);
          setfile(data.docs.map((doc)=>
            ({...doc.data(),id:doc.id})
          ))
        }
        getuser()
     
      },[])

      console.log(file)

    return (
        <>

        
            <div className={style.starter_box}>
                <h1 className={style.st_head}>Start a new document</h1>
                <hr />
                <div className={style.box_st}>
                    <Link to="creat">
                        <img src="plus.png" alt="" className={style.st_box} />
                    </Link>
                </div>
            </div>
            <div className={style.ext_box}>
                <h1 className={style.docus_head}>Recent Documents</h1>
            </div>

            <div className={style.documents}>

            {
    file.map((user)=>{
      return(
        
        <div className={style.box_docs}>
        <img src="gd.png" alt="" className={style.docs_img} />
        <div className={style.titel_docs}>
            <h3 className={style.titel_name}>{user.name.length>10?user.name.slice(0,8)+"...":user.name}</h3>
           
            <img src="edit.png" alt="" className={style.edit_logo} onClick={()=>{
              navigate('edit',{state:{id:user.id,name:user.name,text:user.text}});
            }}  />
         
        </div>
        
    </div>
          
      )
    })
   }

                
            </div>
        </>
    )
}

export default Docs_Home