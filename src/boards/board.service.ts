import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import Board from './schemas/board.schema';

@Injectable()
export class BoardService {
  /* create */
  createBoard async (body, _id){
    const user = await User.findById(_id);
    const { title, contents, emotion } = body;

    Board.
  }
  /* read */

  /* update */
  updateBoard = async (body, user, id) => {
    const { title, contents, emotion } = body;
    const targetPost = await Board.findById(id);
    if (!targetPost) {
      throw new NotFoundException('Borad not found');
    } else {
      const ownerCheck = targetPost.owner === user._id;
      if (!ownerCheck) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
    }
    await Board.findByIdAndUpdate(id, {
      title,
      contents,
      emotion,
    });
  }; // 게시글이 갖고있는 정보 | url 파라미터 | user 정보 에 따라서 로직은 바뀔수 있음

  /* delete */
  deleteBoard = async (id, user) => {
    const targetPost = await Board.findById(id);
    if (!targetPost) {
      throw new NotFoundException('Borad not found');
    } else {
      const ownerCheck = targetPost.owner === user._id;
      if (!ownerCheck) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
    }
    await Board.findByIdAndDelete(id);
  }; // 게시글이 갖고있는 정보 | url 파라미터 | user 정보 에 따라서 로직은 바뀔수 있음
}
