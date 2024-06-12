import mongoose from "mongoose";
const { Schema } = mongoose;
const User_Schema = new Schema(
  {
    User_ID: {
      type: String,
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
