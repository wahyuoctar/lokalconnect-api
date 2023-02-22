import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FilesService } from './files.service';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}
  @ApiOperation({
    summary: 'Get file',
  })
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Get(':id')
  async fileDetail(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
  ): Promise<StreamableFile> {
    const findFile = await this.fileService.model.findOne({
      where: {
        id,
      },
    });
    const file = createReadStream(join(findFile.path));
    res.header(
      'Content-Disposition',
      `attachment; filename="${findFile.name}"`,
    );
    return new StreamableFile(file);
  }
}
