import mongoose from 'mongoose';

const postingSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: Date.now },
  location: [{ type: String, required: true }],
  title: { type: String, required: true },
  contents: { type: String, required: true },
  like: { type: Number, required: true, default: 0 },
  likeUser: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  view: { type: Number, required: true, default: 0 },
  emotion: { type: String },
  comments: [
    { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'comment' },
  ],
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
  report: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'user',
    },
  ],
  reportCount: { type: Number, default: 0 },
});

postingSchema.pre('save', async function () {
  if (this.isModified('report') && this.report !== undefined) {
    this.reportCount = this.report.length;
  }
});

const Board = mongoose.model('board', postingSchema);
export default Board;
