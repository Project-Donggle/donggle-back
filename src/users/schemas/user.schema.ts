import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop(
    raw({
      id: { type: String, required: true, unique: true },
      sort: {
        type: String /* 'naver' || 'kakao' || 'notSocial' */,
        required: true,
      },
    }),
  )
  social: object;

  @Prop({ default: '동글이', minLength: 2 })
  nickname: string;

  @Prop({ required: true })
  email: string;

  @Prop(
    raw({
      write: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }],
      liked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }],
    }),
  )
  board: object;

  @Prop(
    raw({
      liked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
      write: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
    }),
  )
  comment: object;

  @Prop(
    raw({
      fixed: [
        { alias: { type: String, default: '집' }, coord: [Number] },
        { alias: { type: String, default: '회사' }, coord: [Number] },
        { alias: { type: String, default: '학교' }, coord: [Number] },
      ],
      now: [Number],
    }),
  )
  location: object;

  @Prop(
    raw({
      ad: { type: Date },
      privacy: { type: Date },
    }),
  )
  agree: object;
}

export const UserSchema = SchemaFactory.createForClass(User);
