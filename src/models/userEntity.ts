import mongoose, { now } from "mongoose";
import { boolean } from "webidl-conversions";

const userSchema = new mongoose.Schema({
  social: {
    id: { type: String, required: true, unique: true },
    sort: { type: "naver" || "kakao" || "notSocial", required: true },
  },
  nickname: { type: String, default: "동글이", minLength: 2 },
  email: { type: String, required: true },
  board: {
    write: [{ type: mongoose.Schema.Types.ObjectId, ref: "board" }],
    liked: [{ type: mongoose.Schema.Types.ObjectId, ref: "board" }],
  },
  comment: {
    liked: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
    write: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  },
  location: {
    fixed: [
      { alias: { type: String, default: "집" }, coord: [Number] },
      { alias: { type: String, default: "회사" }, coord: [Number] },
      { alias: { type: String, default: "학교" }, coord: [Number] },
    ],
    now: [Number, Number],
  },
  agree: {
    ad: { type: Date },
    privacy: { type: Date },
  },
});

const user = mongoose.model("user", userSchema);
export default user;

/* 
- @식별번호 (자동생성)
- @회원가입 수단(네이버인지 카카오인지 이메일인지) (required : true)
- @이메일 (required : true)
- @광고성 정보 수신 동의 여부 boolean required : true
- @광고성 정보 수신 동의 시점 required : true
- @개인정보 수집 이용 동의 required : true // [https://layers7.tistory.com/39](https://layers7.tistory.com/39) ← 처리방침 작성법
- @닉네임 string required : true rgx/2자 이상, n자 이하 디자인팀 협의 필요? /
- @작성한 게시글 [objectID]
- @작성한 댓글 [objectID]
- @공감을 누른 게시글 [objectID]
- @공감을 누른 댓글 [objectID]
- @별도 지정한 좌표값 [ [Location] ] - [ {별명 : “히히” , x : num , y : num }]
- @실시간 좌표값
*/
