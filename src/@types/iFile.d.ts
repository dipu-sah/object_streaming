import { Types } from 'mongoose';

export interface iBucketFile {
  object: Buffer;
  objectType: string;
  objectSize: Number;
  fileName: string;
  bucketId: Types.ObjectId;
}
