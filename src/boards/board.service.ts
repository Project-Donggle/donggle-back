import {
  Injectable,
  /* HttpException,
  HttpStatus,
  NotFoundException, */
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { CreateBoardDto } from './dtos/create-board.dto';
import { Board, BoardDocument } from './schemas/board.schema';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getUser(userName: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ userName }).lean();
      return user;
    } catch (err) {
      console.log('error...');
    }
  }

  async create(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    const createdBoard = new this.boardModel(createBoardDto);
    createdBoard.owner = user;
    return await createdBoard.save();
  }
  /* read */

  /* update */
  /* updateBoard = async (body, user, id) => {
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
  }; // 게시글이 갖고있는 정보 | url 파라미터 | user 정보 에 따라서 로직은 바뀔수 있음 */

  /* delete */
  /*  deleteBoard = async (id, user) => {
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
  }; // 게시글이 갖고있는 정보 | url 파라미터 | user 정보 에 따라서 로직은 바뀔수 있음 */
}
