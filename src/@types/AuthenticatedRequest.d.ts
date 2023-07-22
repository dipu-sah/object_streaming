import { Request } from 'express';
import { iUser } from './iUser';
import { UserDocument } from 'src/users/entities/user.entity';
export interface AuthenticatedRequest extends Request {
  user: UserDocument;
}
