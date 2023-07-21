import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BucketsModule } from './buckets/buckets.module';
import { FilesModule } from './files/files.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [BucketsModule, FilesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
