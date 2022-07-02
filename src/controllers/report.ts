import { RequestHandler } from "express";
import Posting from "../models/boardEntity";
import Comment from "../models/commentEntity";
import session from "express-session";
import { ObjectId } from "mongoose";

// 신고자(user)와 신고대상 (글 or 댓글)의 ID를 받는다고 가정
const handleReport: RequestHandler = async (req, res) => {
  const { user } = req.session;
  const { target } = req.body;
  let userId: ObjectId;
  let targetId: ObjectId;
  if (user) {
    userId = user._id;
  } else {
    return res.status(400).send({ messege: "bad request. can't find user" });
  }
  if (target) {
    targetId = target._id;
  } else {
    return res
      .status(400)
      .send({ messege: "bad request. can't find target docs" });
  }
  const dataType = await dataTypeCheck(targetId);
  let reportResult: boolean;
  if (dataType === null) {
    return res.status(400).send({ messege: "bad request. can't find data" });
  } else {
    reportResult = await confirmReport(userId, targetId, dataType);
  }

  if (reportResult) {
    res.status(200).send({ messege: "Report confirmed" });
  } else {
    res.status(300).send({ message: "Report processing failed" });
  }
};

const dataTypeCheck = async (targetId: ObjectId): Promise<String | null> => {
  const isPosting = await Posting.exists({ _id: targetId });
  const isComment = await Comment.exists({ _id: targetId });
  let dataType: String | null;
  if (isPosting) {
    dataType = "posting";
  } else if (isComment) {
    dataType = "comment";
  } else {
    dataType = null;
  }
  return dataType;
};

const confirmReport = async (
  userid: ObjectId,
  targetId: ObjectId,
  type: String
): Promise<boolean> => {
  let result: boolean;
  if (type === "posting") {
    await Posting.findOneAndUpdate(
      { _id: targetId },
      { $push: { report: userid } }
    );
    result = true;
  } else if (type === "comment") {
    await Comment.findOneAndUpdate(
      { _id: targetId },
      { $push: { report: userid } }
    );
    result = true;
  } else {
    result = false;
  }
  return result;
};
