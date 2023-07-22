import { Module } from '@nestjs/common';
import { BucketsService } from './buckets.service';
import { BucketsController } from './buckets.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [BucketsController],
  providers: [BucketsService],
})
export class BucketsModule {}
