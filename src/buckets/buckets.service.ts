import { Injectable } from '@nestjs/common';
import { CreateBucketDto } from './dto/create-bucket.dto';
import { UpdateBucketDto } from './dto/update-bucket.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Bucket } from './entities/bucket.entity';
@Injectable()
export class BucketsService {
  constructor(
    @InjectModel(Bucket.name) private readonly bucketModel: Model<Bucket>,
  ) {}
  create(userId: Types.ObjectId, createBucketDto: CreateBucketDto) {
    return new this.bucketModel({ ...createBucketDto, userId })
      .save()
      .then((e) => e);
  }

  findAll(userId: Types.ObjectId) {
    return this.bucketModel.find({ userId: new Types.ObjectId(userId) });
  }

  findOne(id: string, userId: Types.ObjectId) {
    return this.bucketModel.findOne({ _id: id, userId });
  }

  update(id: string, userId: Types.ObjectId, updateBucketDto: UpdateBucketDto) {
    return this.bucketModel.updateOne({ userId, _id: id }, {});
  }

  remove(id: string, userId: Types.ObjectId) {
    return this.bucketModel.deleteOne({ userId, _id: id });
  }
}
