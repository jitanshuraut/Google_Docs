import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import style from "../styles/docs.module.css";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-con";
import { collection, addDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
// import Modal from 'react-modal';
import { Link } from "react-router-dom";

const editorConfig = {
  readonly: false,
  toolbar: true,
  spellcheck: true,
  language: "en",
  toolbarButtonSize: "medium",
  toolbarAdaptive: false,
  showCharsCounter: true,
  showWordsCounter: true,
  showXPathInStatusbar: false,
  askBeforePasteHTML: true,
  askBeforePasteFromWord: true,
  //defaultActionOnPaste: "insert_clear_html",
  uploader: {
    insertImageAsBase64URI: true,
  },
  width: window.innerWidth,
  height: window.innerHeight / 1.5,
};
const customStyles = {
  content: {
    top: "10%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
  },
};

function Docs() {
  const location = useLocation();
  const [no, setno] = useState("display");
  const { from } = location.state;
  const [content, setContent] = useState(from);
  const [name, setname] = useState("Untitled");
  let navigate = useNavigate();
  const editor = useRef(null);
  const ref = collection(db, "content");
  let date = new Date().toLocaleDateString();

  const save = async () => {
    await addDoc(ref, {
      name: name,
      text: content,
      time: date,
      email: `${sessionStorage.getItem("email")}`,
    });
    navigate("/docs");
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className={style.nav}>
        <div className={style.head_box}>
          <Link
            to="/docs"
            style={{
              textDecoration: "none",
              color: "black",
              display: "flex",
              alignItems: "center",
              width: "70%",
            }}
          >
            <img src="/gd.png" alt="" className={style.logo} />
            <h1 className={style.heading}>Google Docs /</h1>
          </Link>
          <input
            type="text"
            value={name}
            className={style.input}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <div
            className={style.save_changes}
            onClick={() => {
              save();
            }}
          >
            Save
          </div>
        </div>

        <div className={style.ext_img_}>
          <i class="fa-solid fa-share-from-square fa-xl" id={style.ico}></i>
          <i
            class="fa-sharp fa-solid fa-trash fa-xl"
            id={style.ic}
            onClick={openModal}
          ></i>
          <Link to="/profile">
            <img
              src={sessionStorage.getItem("url")}
              alt=""
              className={style.profile}
            />
          </Link>
        </div>
      </div>

      <div className={style.docs}>
        <JoditEditor
          config={editorConfig}
          value={content}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {}}
        />
      </div>
    </>
  );
}

export default Docs;
