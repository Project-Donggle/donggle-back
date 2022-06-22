import express, { Request, Response } from "express";
import session from "express-session";
import Posting from "../models/Posting";
import User from "../models/User";

export const postPosting = async (req: Request, res: Response) => {
  const {
    session: { _id, coord }, //좌표로 세션에 있다고 가정하였음. 추후 명확한 경로 생기면 수정필요
    body: { title, contents, emotion }, // 입력 정보가 제목 내용 감정 뿐?
  } = req;
  const user = await User.findById(_id);
  const notUser = !user;
  if (notUser) {
    return res.sendStatus(404);
  } else if (user) {
    try {
      const createPosting = await Posting.create({
        owner: _id,
        title,
        contents,
        emotion,
        coord,
      });
      user.posting.push(createPosting._id);
      user.save();
      return res.redirect(`${process.env.baseURL}/${_id}/${createPosting._id}`); // 리다이렉션 주소 정해야함. 글 쓰고 나면 어디로 보내줄지
    } catch (error) {
      return res.status(400);
    }
  }
};
