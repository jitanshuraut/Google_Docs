import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  Component,
} from "react";
import styles from "../styles/docs.module.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LuShare2 } from "react-icons/lu";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function EDocs() {
  const socket = io("http://localhost:5001");
  const location = useLocation();
  const { state } = location;
  const [Email, setEmail] = useState("");
  let navigate = useNavigate();

  const error_ = {
    error_: "Please Login",
  };

  useEffect(() => {
    if (!state?.Socket_id) {
      navigate("/", { state: { error: "Document content not found" } });
    }
  }, [state, navigate]);

  const [content, setContent] = useState(state?.DOC_CONTENT || "");
  const [roomId, setRoomId] = useState(state?.Socket_id || "");
  const [userId, setUserId] = useState(sessionStorage.getItem("User_ID"));
  const [name, setname] = useState(state?.DOC_NAME || "");

  useEffect(() => {
    socket.emit("joinRoom", { roomId, userId });

    socket.on("documentState", ({ content }) => {
      setContent(content);
    });

    socket.on("documentUpdate", ({ newContent }) => {
      setContent(newContent);
    });

    // Add event listener for window unload

    return () => {
      socket.disconnect();
    };
  }, [navigate, location.state, userId, roomId, socket]);
  useEffect(() => {
    const handleUnload = () => {
      socket.disconnect();
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [socket]);

  const update_Name = async () => {
    try {
      // Doc_Id, User_ID, newDocName
      console.log(name);
      const response = await axios.put("http://localhost:5001/doc/upadtename", {
        User_ID: userId,
        Doc_Id: roomId,
        newDocName: name,
      });
      console.log("Document updated successfully:", response.data);
    } catch (error) {
      console.error("Error adding document:", error);
      throw error;
    }
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

  const [selectedOption, setSelectedOption] = useState("view-only");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const copyText = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard!");
        toast("Copyed to clip board", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch(() => {
        console.log("Failed to copy text");
      });
  };

  const Share_doc = async () => {
    try {
      // Doc_Id, User_ID, newDocName
      const response = await axios.post(
        "http://localhost:5001/doc/Add_doc_permission",
        {
          Rec_Email: Email,
          Doc_Id: roomId,
          Sed_User_Id: userId,
        }
      );

      if (response.data.success) {
        toast("Share doc done", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log("Document edit done:", response.data);
      } else {
        toast("User not found", {
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
    } catch (error) {
      console.error("Error adding document:", error);
      throw error;
    }
  };

  return (
    <>
      <div className={styles.nav}>
        <div className={styles.head_box}>
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
            <img src="/gd.png" alt="" className={styles.logo} />
            <h1 className={styles.heading}>Google Docs /</h1>
          </Link>
          <input
            type="text"
            value={name}
            className={styles.input}
            onChange={(e) => {
              setname(e.target.value);
            }}
            onBlur={() => {
              update_Name();
            }}
          />
        </div>
        <div className={styles.ext_img_}>
          {/* <i class="fa-solid fa-share-from-square fa-xl" id={styles.ico}></i>
           */}
          <LuShare2 id={styles.ico} onClick={openModal} />
          <i class="fa-sharp fa-solid fa-trash fa-xl" id={styles.ic}></i>
          <Link to="/profile">
            <img
              src={sessionStorage.getItem("url")}
              alt=""
              className={styles.profile}
            />
          </Link>
        </div>
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          className="Modal"
          contentLabel="Example Modal"
        >
          <h2 id="Modal_Heading">Share Document</h2>
          <select
            id="mode-select"
            value={selectedOption}
            onChange={handleChange}
          >
            <option value="view-only">View Only</option>
            <option value="edit">Edit</option>
          </select>
          <div>
            {selectedOption === "view-only" && (
              <div id="modal-link-box">
                <p>Document Link.</p>
                <p
                  id="modal-link"
                  onClick={() => {
                    copyText("copy text");
                  }}
                >
                  localhost:3000/view/doc/{roomId}
                </p>
              </div>
            )}
            {selectedOption === "edit" && (
              <div>
                <p>Enter Email</p>
                <input
                  type="text"
                  id="model-input"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <button
                  id="model-send"
                  onClick={async () => {
                    await Share_doc();
                    closeModal();
                  }}
                >
                  Send Doc
                </button>
              </div>
            )}
          </div>

          <button onClick={closeModal} id="modal-close">
            done
          </button>
        </Modal>
      </div>

      <div className={styles.docs}>
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onReady={(editor) => {
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const newContent = editor.getData();
            console.log(newContent);
            setContent(newContent);
            socket.emit("documentChange", { roomId, userId, newContent });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
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

export default EDocs;
