import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { Express } from 'express';
import { UpdateFileDto } from './dto/update-file.dto';
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectId, Types } from 'mongoose';
import { JwtAuthGuard } from 'src/utils/Auth/JwtAuthGuard';
import { AuthenticatedRequest } from 'src/@types/AuthenticatedRequest';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiConsumes('multipart/form-data')
  @Post(':bucketId')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiParam({
    name: 'bucketId',
    schema: { type: 'string' },
    required: true,
  })
  create(
    @UploadedFile('file') file: Express.Multer.File,
    @Param('bucketId') bucketId,
  ) {
    return this.filesService.create(bucketId, file);
  }

  @Get('/bucket/:bucketId')
  @ApiParam({
    name: 'bucketId',
    schema: { type: 'string' },
    required: true,
  })
  findAll(@Req() request: AuthenticatedRequest, @Param('bucketId') bucketId) {
    return this.filesService.findAll(
      request.user._id,
      new Types.ObjectId(bucketId),
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    schema: { type: 'string' },
    required: true,
  })
  async findOne(
    @Param('id') id: string,
    // @Res({ passthrough: true }) res: Response,
  ) {
    // const file = await this.filesService.findOne(id);
    // res.set({
    //   'content-type': file.getHeaders().type,
    // });
    // file.getStream().pipe(res);

    return this.filesService.findOne(new Types.ObjectId(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,

    @Body() updateFileDto: UpdateFileDto,
  ) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
