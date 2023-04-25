import { Types } from 'mongoose';

export interface IAuthUser {
  token?: string;
  email?: string;
  fullname?: string;
  type?: number;
  id?: Types.ObjectId;
}
