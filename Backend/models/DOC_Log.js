import mongoose from "mongoose";

const DOCS_Log_Schema = new mongoose.Schema(
  {
    Doc_Id: {
      type: mongoose.Types.UUID,
      required: true,
    },

    Updates_Verion: [
      {
        User_ID: {
          type: String,
          required: true,
        },
        DOC_Content: {
          type: String,
          required: true,
        },
        Time_Log: {
          type: String,
          required: true,
        },
        Difference:{
          type: String,
          required: true,
        }
      },
    ],
    Time_Log_last: String,
  },
  { timestamps: true }
);

const DOCS_Log = mongoose.model("DOCS_Log", DOCS_Log_Schema);
export default DOCS_Log;
