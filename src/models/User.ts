import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  socialId: { type: String, required: true, unique: true },
  socialType: { type: String, required: true },
  socialNickname: { type: String },
  nickname: { type: String, default: "닉네임" },
  email: { type: String },
  posting: [{ type: mongoose.Schema.Types.ObjectId, ref: "Posting" }],
});

const User = mongoose.model("User", userSchema);
export default User;
