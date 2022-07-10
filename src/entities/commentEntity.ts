import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: Date.now },
  contents: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, requird: true, ref: 'user' },
  like: { type: Number, required: true, default: 0 },
  likeUser: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  posting: {
    type: mongoose.Schema.Types.ObjectId,
    requird: true,
    ref: 'board',
  },
  report: [
    { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'user' },
  ],
  reportCount: { type: Number, default: 0 },
});

commentSchema.pre('save', async function () {
  if (this.isModified('report') && this.report !== undefined) {
    this.reportCount = this.report.length;
  }
});

const Comment = mongoose.model('comment', commentSchema);
export default Comment;
