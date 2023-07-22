import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { BucketFile, BucketFileSchema } from './entities/file.entity';
@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [
    MongooseModule.forFeature([
      { name: BucketFile.name, schema: BucketFileSchema },
    ]),
  ],
})
export class FilesModule {}
