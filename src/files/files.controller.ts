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
  Res,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { Express, Response } from 'express';
import { UpdateFileDto } from './dto/update-file.dto';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
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
    // res.headers.
    // console.log('FILE');
    // res.set({
    //   'content-type': file.getHeaders().type,
    // });
    // console.log(file.getHeaders());
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
