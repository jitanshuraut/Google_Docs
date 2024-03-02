import mongoose from "mongoose";

const User_Schema = new mongoose.Schema(
  {
    User_ID: {
      type: mongoose.Types.UUID,
      required: true,
    },
    User_name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      unique: true,
      index: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
  },
  { timestamps: true },
  { strict: true }
);

const user = mongoose.model("user", User_Schema);
export default user;
