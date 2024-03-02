import mongoose from "mongoose";
import Permissions from "./Permissions.js";
const DOCSSchema = new mongoose.Schema(
  {
    Doc_Id: {
      type: mongoose.Types.UUID,
      required: true,
    },

    User_ID: {
      type: mongoose.Types.UUID,
      required: true,
    },
    DOC_name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    DOC_Content: String,
    DOC_Size: String,
    DOC_Time_Update: String,
    DOC_Update_ID: {
      type: mongoose.Types.UUID,
      required: true,
      unique: true,
    },
    Permissions: [
      {
        User_ID: {
          type: String,
          required: true,
        },
        User_ID_hash: {
          type: String,
          required: true,
        },
        Permission: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const DOCS = mongoose.model("DOCS", DOCSSchema);
export default DOCS;
