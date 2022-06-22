import mongoose from "mongoose";

const postingSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  title: { type: String, required: true },
  contents: { type: String, required: true },
  emotion: { type: Number, required: true },
  //댓글 등등 계속 추가 해야함
});

const Posting = mongoose.model("Posting", postingSchema);
export default Posting;
