import { Request, Response, RequestHandler, NextFunction } from "express";
import session from "express-session";
import board from "../models/boardEntity";
import User from "../models/userEntity";

declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any };
  }
} // 이거 왜 하는지 모름.  그냥 53번째 출에서 session에 user 속성이 없다 하여 추가해줌 (구글검색)

/* create */
export const postBoard = async (req: Request, res: Response) => {
  const {
    session: { _id, coord }, //좌표로 세션에 있다고 가정하였음. 추후 명확한 경로 생기면 수정필요 + _id, coord 속성이 없다고함
    body: { title, contents, emotion }, // 입력 정보가 제목 내용 감정 뿐?
  } = req;
  const user = await User.findById(_id);
  const notUser = !user;
  if (notUser) {
    return res.sendStatus(404);
  } else if (user) {
    try {
      const createPosting = await board.create({
        owner: _id,
        title,
        contents,
        emotion,
        coord,
      });
      user.posting.push(createPosting._id); // user 개체가 undefined라고 함
      user.save();
      return res.redirect(`${process.env.baseURL}/${_id}/${createPosting._id}`); // 리다이렉션 주소 정해야함. 글 쓰고 나면 어디로 보내줄지
    } catch (error) {
      return res.status(400);
    }
  }
};

/* read */
export const readBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await board.find();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400);
  }
};

/* update */
export const updateBoard: RequestHandler = async (req, res) => {
  const requestURL = req.url;
  const { user } = req.session;
  const { id, title, contents, emotion } = req.body;
  const targetPost = await board.findById(id);
  if (user && targetPost) {
    const ownerCheck = targetPost.owner === user._id;
    if (ownerCheck) {
      await board.findByIdAndUpdate(id, {
        title,
        contents,
        emotion,
      });
    }
    return res.status(200).send({ message: "success" });
  } else if (user && !targetPost) {
    return res.status(400).send({ messege: "can't find board" });
  } else {
    return res.status(400).send({ messege: "can't find user" });
  }
}; // 게시글이 갖고있는 정보 | url 파라미터 | user 정보 에 따라서 로직은 바뀔수 있음

/* delete */
export const deleteBoard: RequestHandler = async (req, res) => {
  const requestURL = req.url;
  const { user } = req.session;
  const { id } = req.body;
  const targetPost = await board.findById(id);
  if (user && targetPost) {
    const ownerCheck = targetPost.owner === user._id;
    if (ownerCheck) {
      await board.deleteOne({ _id: id });
    }
    return res.status(200).send({ message: "uccess" });
  } else if (user && !targetPost) {
    return res.status(400).send({ messege: "can't find board" });
  } else {
    return res.status(400).send({ messege: "can't find user" });
  }
}; // 게시글이 갖고있는 정보 | url 파라미터 | user 정보 에 따라서 로직은 바뀔수 있음
