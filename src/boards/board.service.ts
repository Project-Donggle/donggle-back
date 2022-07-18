import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { CreateBoardDto } from './dtos/create-board.dto';
import { UpdateBoardDto } from './dtos/update-board.dto';
import { Board, BoardDocument } from './schemas/board.schema';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const targetCreate = await new this.boardModel(createBoardDto);
    return targetCreate.save();
  }

  async readBoard(boardId: string): Promise<Board> {
    const targetRead = await this.boardModel.findById(boardId).exec();
    if (!targetRead) {
      throw new NotFoundException(`Board #${boardId} not found`);
    }
    return targetRead;
  }

  async updateBoard(
    boardId: string,
    updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    const targetUpdate = await this.boardModel.findByIdAndUpdate(
      boardId,
      updateBoardDto,
      { new: true },
    );
    if (!targetUpdate) {
      throw new NotFoundException(`Board #${boardId} not found`);
    }
    return targetUpdate;
  } // 게시글이 갖고있는 정보 | url 파라미터 | user 정보 에 따라서 로직은 바뀔수 있음

  async deleteBoard(boardId: string): Promise<Board> {
    const targetDelete = await this.boardModel.findByIdAndDelete(boardId);
    if (!targetDelete) {
      throw new NotFoundException(`Board #${boardId} not found`);
    }
    return targetDelete;
  } // 게시글이 갖고있는 정보 | url 파라미터 | user 정보 에 따라서 로직은 바뀔수 있음
}
