import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BucketsService } from './buckets.service';
import { CreateBucketDto } from './dto/create-bucket.dto';
import { UpdateBucketDto } from './dto/update-bucket.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/Auth/JwtAuthGuard';
import { AuthenticatedRequest } from 'src/@types/AuthenticatedRequest';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Bucket')
@Controller('buckets')
export class BucketsController {
  constructor(private readonly bucketsService: BucketsService) {}

  @Post()
  create(
    @Body() createBucketDto: CreateBucketDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.bucketsService.create(req.user._id, createBucketDto);
  }

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    return this.bucketsService.findAll(req.user._id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.bucketsService.findOne(id, req.user._id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBucketDto: UpdateBucketDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.bucketsService.update(id, req.user._id, updateBucketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.bucketsService.remove(id, req.user._id);
  }
}
