import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Board } from '../boards/schemas/board.schema';
import { Reply } from '../boards/schemas/reply.schema';
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
  ): Promise<string | null> => {
    const isBoard = await Board.exists({ _id: targetId });
    const isReply = await Reply.exists({ _id: targetId });
    let dataType: string | null;
    if (isBoard) {
      dataType = 'board';
    } else if (isReply) {
      dataType = 'reply';
    } else {
      dataType = null;
    }
    return dataType;
  };

  private readonly confirmReport = async (
    userid: ObjectId,
    targetId: ObjectId,
    type: string,
  ): Promise<boolean> => {
    let result: boolean;
    if (type === 'board') {
      await Board.findByIdAndUpdate(targetId, {
        $addToSet: { report: userid },
      });
      result = true;
    } else if (type === 'reply') {
      await Reply.findByIdAndUpdate(targetId, {
        $addToSet: { report: userid },
      });
      result = true;
    } else {
      result = false;
    }
    return result;
  };
}
