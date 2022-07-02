import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: Date.now },
  contents: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, requird: true, ref: "User" },
  like: { type: Number, required: true, default: 0 },
  likeUser: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  posting: {
    type: mongoose.Schema.Types.ObjectId,
    requird: true,
    ref: "Posting",
  },
  report: [{ type: mongoose.Schema.Types.ObjectId, required: false }],
  reportCount: { type: Number, default: 0 },
});

commentSchema.pre("save", async function () {
  if (this.isModified("report") && this.report !== undefined) {
    this.reportCount = this.report.length;
  }
});

const Comment = mongoose.model("comment", commentSchema);
export default Comment;