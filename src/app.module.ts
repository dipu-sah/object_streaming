import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BucketsModule } from './buckets/buckets.module';
import { FilesModule } from './files/files.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    BucketsModule,
    FilesModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://devdipukumar:2B2jjkby9ji6vPZm@cluster0.9f6or9k.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
