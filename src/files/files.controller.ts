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
} from '@nestjs/common';
import { FilesService } from './files.service';
import { Express } from 'express';
import { UpdateFileDto } from './dto/update-file.dto';
import { ApiTags, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/utils/Auth/JwtAuthGuard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiConsumes('multipart/form-data')
  @Post()
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
  create(@UploadedFile('file') file: Express.Multer.File) {
    return this.filesService.create(file);
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: ObjectId,
    // @Res({ passthrough: true }) res: Response,
  ) {
    // const file = await this.filesService.findOne(id);
    // res.set({
    //   'content-type': file.getHeaders().type,
    // });
    // file.getStream().pipe(res);
    return this.filesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
