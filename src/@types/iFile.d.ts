export interface iBucketFile {
  userId: ObjectId;
  object: Buffer;
  objectType: string;
  objectSize: Number;
  fileName: string;
}
