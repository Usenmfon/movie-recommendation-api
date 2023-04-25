import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { isEmail } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String })
  fullname: string;

  @Prop({
    type: String,
    validate: [
      { validator: isEmail, message: () => 'please enter a valid email' },
    ],
  })
  email: string;

  @Prop({ type: Number, default: 0 })
  type: number;

  @Prop({ type: String })
  password: string;

  @Prop({ type: Boolean, default: false })
  isActive: boolean;

  @Prop({ type: String })
  refreshToken: string;

  @Prop({ type: Number, default: 0 })
  attempt: number;

  @Prop({ type: Date })
  last_attempt: Date;
}

@Schema({ timestamps: true })
export class RefreshToken {
  @Prop({ type: Types.ObjectId, ref: 'User', unique: true })
  user: User;

  @Prop({ type: Number, required: true })
  code: number;

  @Prop({ type: Number, default: 0 })
  attempt: number;

  @Prop({ type: String, default: 'password', enum: ['password'] })
  type: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
