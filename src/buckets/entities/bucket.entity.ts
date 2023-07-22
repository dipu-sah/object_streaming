import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Mixed } from 'mongoose';
import { iBucketFile } from 'src/@types/iFile';
@Schema()
export class Bucket {
  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  bucketName: string;
}

export const BucketSchema = SchemaFactory.createForClass(Bucket);
export type BucketDocument = HydratedDocument<Bucket>;
