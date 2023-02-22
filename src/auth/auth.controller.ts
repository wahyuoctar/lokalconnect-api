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

@ApiTags('auth')
@Controller('auth')
export class AuthController {}
