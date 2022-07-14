import {
  Controller,
  Patch,
  Delete,
  Body,
  Session,
  Param,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { SessionData } from 'express-session';
import { ObjectId } from 'mongoose';
import { UpdateBoardDto } from 'src/boards/dtos/update-board.dto';
import { BoardService } from './board.service';

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
    _id: ObjectId;
    coord: Array<number>;
  }
}

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  /* create - Responsible for 'Odd code' */
  @Post()
  create(@Body() body: UpdateBoardDto, @Session() session: SessionData) {
    try {
      return this.boardService.createBoard(body, session.user._id);
    } catch (error) {
      return error;
    }
  }
  /* read - Responsible for 'Jjae gi' */

  /* update - Responsible for 'FUNco' */
  @Patch('update/:id')
  update(
    @Param('id') id: ObjectId,
    @Body() body: UpdateBoardDto,
    @Session() session: SessionData,
  ): Promise<void> | NotFoundException {
    try {
      return this.boardService.updateBoard(body, session.user, id);
    } catch (error) {
      return error;
    }
  }

  /* update - Responsible for 'FUNco' */
  @Delete('delete/:id')
  delete(
    @Param('id') id: ObjectId,
    @Session() session: SessionData,
  ): Promise<void> | NotFoundException {
    return this.boardService.deleteBoard(id, session.user);
  }
}
