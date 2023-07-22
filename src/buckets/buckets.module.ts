import { Module } from '@nestjs/common';
import { BucketsService } from './buckets.service';
import { BucketsController } from './buckets.controller';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Bucket, BucketSchema } from './entities/bucket.entity';
@Module({
  controllers: [BucketsController],
  providers: [BucketsService],
  imports: [
    MongooseModule.forFeature([{ name: Bucket.name, schema: BucketSchema }]),
  ],
})
export class BucketsModule {}
