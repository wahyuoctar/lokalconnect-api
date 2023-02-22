/*
https://docs.nestjs.com/controllers#controllers
*/

import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Patch,
    Query,
    Req,
    Res,
    UnauthorizedException,
    UploadedFile,
    UseGuards,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConsumes,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
  } from '@nestjs/swagger';
  import { Request, Response } from 'express';
  import { Op } from 'sequelize';
  import { Sequelize } from 'sequelize-typescript';
  import fs from 'fs';
  import _ from 'lodash';
  import { FilesService } from 'src/files/files.service';
  @ApiTags('users')
  @Controller('users')
  export class UsersController {}
  