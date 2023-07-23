import { Injectable, StreamableFile } from '@nestjs/common';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BucketFile } from './entities/file.entity';
import { Model, ObjectId } from 'mongoose';
import { Readable } from 'stream';
import { Bucket } from 'src/buckets/entities/bucket.entity';
import { Types } from 'mongoose';
@Injectable()
export class FilesService {
  constructor(
    @InjectModel(BucketFile.name)
    private readonly bucketModel: Model<BucketFile>,
  ) {}
  create(bucketId: string, file: Express.Multer.File) {
    const bucketModel = new this.bucketModel({
      objectType: file.mimetype,
      objectSize: file.size,
      object: file.buffer,
      fileName: file.originalname.toString(),
      bucketId: new Types.ObjectId(bucketId),
    });
    return bucketModel
      .save()
      .then((e) => {
        return { message: 'File saved Succeffully', id: e._id };
      })
      .catch((e) => {
        throw e;
      });
  }

  findAll(userId: Types.ObjectId, bucketId: Types.ObjectId) {
    return this.bucketModel.aggregate([
      {
        $lookup: {
          as: 'allBucketsOfuser',
          from: 'buckets',
          localField: 'bucketId',
          foreignField: '_id',
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$userId', userId],
                },
              },
            },
            { $project: { _id: 0, userId: 1 } },
          ],
        },
      },
      {
        $addFields: {
          allBucketsOfuser_size: {
            $size: '$allBucketsOfuser',
          },
        },
      },
      {
        $match: {
          allBucketsOfuser_size: {
            $gt: 0,
          },
        },
      },
      { $project: { allBucketsOfuser_size: 0, allBucketsOfuser: 0 } },
      {
        $match: {
          bucketId,
        },
      },
    ]);
    // return this.bucketModel.find().populate('bucketId');
  }

  findOne(id: Types.ObjectId): Promise<StreamableFile> {
    return this.bucketModel.findById(id.toString()).then((e) => {
      console.log(e);

      const file = Readable.from(Buffer.from(e.object.toString(), 'binary'));
      return new StreamableFile(file, {
        length: parseInt(e.objectSize?.toString() || '0'),
        type: e.objectType,
      });
    });
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
