import { Injectable, StreamableFile } from '@nestjs/common';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BucketFile } from './entities/file.entity';
import { Model, ObjectId } from 'mongoose';
import { Readable } from 'stream';
@Injectable()
export class FilesService {
  constructor(
    @InjectModel(BucketFile.name)
    private readonly bucketModel: Model<BucketFile>,
  ) {}
  create(file: Express.Multer.File) {
    const bucketModel = new this.bucketModel({
      objectType: file.mimetype,
      objectSize: file.size,
      object: file.buffer,
      userId: '',
      fileName: file.originalname.toString(),
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

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: ObjectId): Promise<StreamableFile> {
    return this.bucketModel.findById(id).then((e) => {
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
