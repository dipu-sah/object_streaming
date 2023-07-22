import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { iUser } from 'src/@types/iUser';
import { HydratedDocument } from 'mongoose';
import { hash } from 'src/utils/UserPasswordHashing';
@Schema()
export class User implements iUser {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre<iUser>('save', async function (e) {
  this.password = hash(this.password);
  e();
});
