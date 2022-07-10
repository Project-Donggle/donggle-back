import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  social: {
    id: { type: String, required: true, unique: true },
    //sort: { type: 'naver' || 'kakao' || 'notSocial', required: true },
  },
  nickname: { type: String, default: '동글이', minLength: 2 },
  email: { type: String, required: true },
  board: {
    write: [{ type: mongoose.Schema.Types.ObjectId, ref: 'board' }],
    liked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'board' }],
  },
  comment: {
    liked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
    write: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
  },
  location: {
    fixed: [
      { alias: { type: String, default: '집' }, coord: [Number] },
      { alias: { type: String, default: '회사' }, coord: [Number] },
      { alias: { type: String, default: '학교' }, coord: [Number] },
    ],
    now: [Number, Number],
  },
  agree: {
    ad: { type: Date },
    privacy: { type: Date },
  },
});

const User = mongoose.model('user', userSchema);
export default User;
