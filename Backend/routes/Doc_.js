import express from "express";
import {
  Add_DOC,
  Add_DOC_permissions,
  Add_User,
  Delete_DOC,
  Get_DOC,
  Test_User,
  Update_DOC,
} from "../controllers/Doc_.js";

const router = express.Router();

router.post("/test", Test_User);
router.post("/Add_user", Add_User);
router.post("/Add_doc", Add_DOC);
router.post("/Add_doc_permission", Add_DOC_permissions);
router.get("/Get_Doc", Get_DOC);
router.post("/Update_Doc", Update_DOC);
router.post("/Delete_DOC", Delete_DOC);

export default router;
