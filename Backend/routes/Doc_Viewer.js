import express from "express";
import { Viewer } from "../controllers/Doc_Viewer";
import { Test_User } from "../controllers/Doc_";

const router = express.Router();
router.get("/Viewer_Doc", Viewer);
router.post("/test", Test_User);

export default router;
