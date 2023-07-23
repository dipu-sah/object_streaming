import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Mixed } from 'mongoose';
import { iBucketFile } from 'src/@types/iFile';
@Schema()
export class BucketFile implements iBucketFile {
  // @Prop({ type: Types.ObjectId, required: true })
  // userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: BucketFile.name })
  bucketId: Types.ObjectId;

  @Prop({ type: Types.Buffer, required: true })
  object: Buffer;

  @Prop({ type: String, required: true })
  objectType: string;

  @Prop({ required: true })
  objectSize: Number;

  @Prop({ type: String, required: true })
  fileName: string;
}

export const BucketFileSchema = SchemaFactory.createForClass(BucketFile);
export type BucketFileDocument = HydratedDocument<BucketFile>;
