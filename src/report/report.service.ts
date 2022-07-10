import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import Board from '../entities/boardEntity';
import Comment from '../entities/commentEntity';
import { ObjectId } from 'mongoose';

@Injectable()
export class ReportService {
  // 신고자(user)와 신고대상 (글 or 댓글)의 ID를 받는다고 가정
  handleReport = async (id, user) => {
    let userId: ObjectId = user._id;
    let targetId: ObjectId = id;
    const dataType = await this.dataTypeCheck(targetId);
    let reportResult: boolean;
    if (dataType === null) {
      throw new NotFoundException();
    } else {
      reportResult = await this.confirmReport(userId, targetId, dataType);
    }

    if (!reportResult) {
      throw new HttpException(
        'Server error, can not confirm report',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  };

  private readonly dataTypeCheck = async (
    targetId: ObjectId,
  ): Promise<String | null> => {
    const isPosting = await Board.exists({ _id: targetId });
    const isComment = await Comment.exists({ _id: targetId });
    let dataType: String | null;
    if (isPosting) {
      dataType = 'posting';
    } else if (isComment) {
      dataType = 'comment';
    } else {
      dataType = null;
    }
    return dataType;
  };

  private readonly confirmReport = async (
    userid: ObjectId,
    targetId: ObjectId,
    type: String,
  ): Promise<boolean> => {
    let result: boolean;
    if (type === 'posting') {
      await Board.findByIdAndUpdate(targetId, {
        $addToSet: { report: userid },
      });
      result = true;
    } else if (type === 'comment') {
      await Comment.findByIdAndUpdate(targetId, {
        $addToSet: { report: userid },
      });
      result = true;
    } else {
      result = false;
    }
    return result;
  };
}
