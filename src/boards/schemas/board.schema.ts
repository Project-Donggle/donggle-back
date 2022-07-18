import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Reply } from './reply.schema';

export type BoardDocument = Board & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Board {
  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  contents: string;

  @Prop({ required: true, default: 0 })
  like: number;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  })
  likeUser: User[];

  @Prop({ required: true, default: 0 })
  view: number;

  @Prop()
  emotion: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }] })
  comments: Reply[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  owner: User;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  })
  report: User[];

  @Prop({ default: 0 })
  reportCount: number;
}

export const BoardSchema = SchemaFactory.createForClass(Board);

/*
boardSchema.pre('save', async function () {
  if (this.isModified('report') && this.report !== undefined) {
    this.reportCount = this.report.length;
  }
});

const Board = mongoose.model('board', boardSchema);
export default Board;
 */
