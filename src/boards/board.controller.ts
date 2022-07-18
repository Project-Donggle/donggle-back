import {
  Controller,
  Body,
  Session,
  Get,
  Post,
  /* Patch,
  Delete,
  Param,
  NotFoundException, */
} from '@nestjs/common';
import { SessionData } from 'express-session';
import { ObjectId } from 'mongoose';
import { CreateBoardDto } from './dtos/create-board.dto';
/* import { UpdateBoardDto } from 'src/boards/dtos/update-board.dto'; */
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
  async create(@Body() body: CreateBoardDto, @Session() session: SessionData) {
    try {
      const user = await this.boardService.getUser(session.user._id);
      return await this.boardService.create(body, user);
    } catch (error) {
      return error;
    }
  }

  /* read - Responsible for 'Jjae gi' */
  @Get(':id')
  async read(): Promise<void> {
    return console.log(`read Board`);
  }

  /* update - Responsible for 'FUNco' */
  /* @Patch(':id')
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
  } */

  /* update - Responsible for 'FUNco' */
  /*  @Delete(':id')
  delete(
    @Param('id') id: ObjectId,
    @Session() session: SessionData,
  ): Promise<void> | NotFoundException {
    return this.boardService.deleteBoard(id, session.user);
  } */
}
