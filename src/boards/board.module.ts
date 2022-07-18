import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from './schemas/board.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
