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
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { functionPagination } from 'src/common/func/pagination.func';
import { User } from './models/user.model';
import { ListUserDto } from './dto/list-user.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly sequelize: Sequelize,
  ) {}

  @ApiOperation({
    summary: 'Get all user resource.',
  })
  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async getAll(
    @Res() res: Response,
    @Query() query: ListUserDto,
    @CurrentUser() user: User,
  ) {
    const { limit, page, search, order, ...filter } = query;
    console.log(user);

    const data = await functionPagination<User>(
      this.usersService.model,
      {
        where: {
          ...(search && {
            [Op.or]: [
              {
                username: {
                  [Op.iLike]: `%${search}%`,
                },
              },
              {
                phone: {
                  [Op.iLike]: `%${search}%`,
                },
              },
              {
                name: {
                  [Op.iLike]: `%${search}%`,
                },
              },
              {
                email: {
                  [Op.iLike]: `%${search}%`,
                },
              },
            ],
          }),
          ...(filter?.status &&
            (filter.status === 'active'
              ? { deletedAt: null }
              : { deletedAt: { [Op.not]: null } })),
        },
        paranoid: false,
        order,
      },
      page,
      limit,
      ['withoutPassword', 'withoutToken'],
    );
    return res.json({
      statusCode: HttpStatus.OK,
      data,
    });
  }

  @ApiOperation({
    summary: 'Create user resource.',
  })
  @Post()
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateUserDto,
  ) {
    const transaction = await this.sequelize.transaction();
    try {
      if (
        body.password.search(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/,
        ) < 0
      ) {
        throw new BadRequestException(
          'password should contain at least 8 characters, one uppercase, one lowercase, one number and one special case character',
        );
      }
      const data = await this.usersService.model
        .scope(['withoutPassword', 'withoutTimestamp', 'withoutToken'])
        .create({ ...body }, { transaction });
      await transaction.commit();
      return res.json({
        statusCode: HttpStatus.CREATED,
        data: await data.reload(),
      });
    } catch (error) {
      await transaction.commit();
      throw error;
    }
  }
}
