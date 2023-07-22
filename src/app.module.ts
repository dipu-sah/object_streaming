import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BucketsModule } from './buckets/buckets.module';
import { FilesModule } from './files/files.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './utils/JwtStrategy';
@Module({
  imports: [
    BucketsModule,
    FilesModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://devdipukumar:2B2jjkby9ji6vPZm@cluster0.9f6or9k.mongodb.net/?retryWrites=true&w=majority',
    ),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtStrategy],
})
export class AppModule {}
