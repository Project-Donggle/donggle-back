import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Board } from './board.schema';

export type ReplyDocument = Reply & Document;

@Schema()
export class Reply {
  @Prop({ required: true, default: Date.now })
  date: Date;

  @Prop({ required: true })
  body: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, requird: true, ref: 'User' })
  owner: User;

  @Prop({ required: true, default: 0 })
  likedCount: number;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  })
  likedUser: User[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    requird: true,
    ref: 'Board',
  })
  onboard: Board;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  reportedUser: User[];

  @Prop({ default: 0 })
  reportedCount: number;
}

export const ReplySchema = SchemaFactory.createForClass(Reply);
