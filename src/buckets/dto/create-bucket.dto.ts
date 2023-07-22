import { iBucket } from 'src/@types/iBucket';
import { IsString, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateBucketDto implements Omit<iBucket, 'userId'> {
  @IsString()
  @IsDefined()
  @ApiProperty()
  bucketName: string;
}
