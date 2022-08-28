import React, { useState, useRef } from 'react'
import JoditEditor from "jodit-react";
import style from "../styles/docs.module.css"
import { useNavigate } from "react-router-dom";
import {db} from "../firebase-con"
import {collection,doc,getDocs,addDoc,updateDoc, deleteDoc,serverTimestamp,FieldValue} from "firebase/firestore"


function Docs() {

  const [content, setContent] = useState('')
 const [name, setname] = useState("")
 let navigate = useNavigate();
  const editor = useRef(null)
  const ref=collection(db,"content");
  const save= async()=>{
  
    await addDoc(ref,{name:name,text:content, time: serverTimestamp(),email:`${sessionStorage.getItem("email")}`})
    navigate("/docs")
  }

  return (
    <>

  {
    content.length==0?console.log("hiii"):<div> <h2 className={style.changes}>Do you want to save changes?</h2>
    <div className={style.save_changes}
    onClick={()=>{
save()
    }} >
      Save
    </div>
    </div>

  }

<div className={style.input_name}>
  <h2 className={style.name}>File Name:</h2>
  <input type="text" value={name} className={style.input} onChange={(e)=>{
    setname(e.target.value)
  }} />
</div>
 
      <div className={style.docs} >
        <JoditEditor
          ref={editor}
          value={content}
          tabIndex={1} // tabIndex of textarea
          onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={newContent => { }}
        />

      </div>
 
    </>
  )
}

export default Docs