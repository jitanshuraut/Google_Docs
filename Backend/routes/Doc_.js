import express from "express";
import {
  Add_DOC,
  Add_DOC_permissions,
  Add_User,
  Delete_DOC,
  Get_All_DOC,
  Get_DOC,
  Query_Doc,
  Test_User,
  Update_DOC,
  Update_DOC_Name,
} from "../controllers/Doc_.js";

const router = express.Router();

router.post("/test", Test_User);
router.post("/Add_user", Add_User);
router.post("/Add_doc", Add_DOC);
router.post("/Add_doc_permission", Add_DOC_permissions);
router.get("/Get_Doc/:Doc_Id", Get_DOC);
router.post("/Update_Doc", Update_DOC);
router.post("/Delete_DOC", Delete_DOC);
router.get("/All_Doc/:User_ID", Get_All_DOC);
router.put("/upadtename",Update_DOC_Name);
router.get("/Search",Query_Doc)




export default router;
