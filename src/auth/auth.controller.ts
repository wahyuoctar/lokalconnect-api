import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Patch,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiGoneResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import moment from 'moment';
import { Sequelize } from 'sequelize-typescript';
import { UsersService } from 'src/users/users.service';
import { User } from '../users/models/user.model';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { BadRequestException } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ResponseDto } from '../common/dto/response.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({
    summary: 'User login',
  })
  @ApiCreatedResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() body: LoginDto,
    @CurrentUser() user: User,
  ): Promise<ResponseDto> {
    const data = await this.authService.login(user);

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }
}
