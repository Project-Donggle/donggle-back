import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Patch,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { CreateBoardDto } from './dtos/create-board.dto';
import { UpdateBoardDto } from 'src/boards/dtos/update-board.dto';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async createBoard(@Res() response, @Body() createBoardDto: CreateBoardDto) {
    try {
      const newBoard = await this.boardService.createBoard(createBoardDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Board has been created successfully',
        newBoard,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Board not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get(':id')
  async readBoard(@Res() response, @Param('id') boardId: string) {
    try {
      const readBoard = await this.boardService.readBoard(boardId);
      return response.status(HttpStatus.OK).json({
        message: 'Board found successfully',
        readBoard,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Patch(':id')
  async updateBoard(
    @Res() response,
    @Param('id') boardId: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    try {
      const updateBoard = await this.boardService.updateBoard(
        boardId,
        updateBoardDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Board has been successfully updated',
        updateBoard,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async deleteBoard(@Res() response, @Param('id') boardId: string) {
    try {
      const deleteBoard = await this.boardService.deleteBoard(boardId);
      return response.status(HttpStatus.OK).json({
        message: 'Board deleted successfully',
        deleteBoard,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
