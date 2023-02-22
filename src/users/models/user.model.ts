import {
  Table,
  PrimaryKey,
  Default,
  DataType,
  Column,
  AllowNull,
  Unique,
  Validate,
  Model,
  Scopes,
  Sequelize,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import bcrypt from 'bcrypt';

import { File } from 'src/files/models/file.model';

@Scopes(() => ({
  withAvatar: {
    include: [
      {
        model: File,
        as: 'avatar',
        attributes: ['id', 'name', 'size'],
      },
    ],
  },
  withoutTimestamp: {
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'deletedAt'],
    },
  },
  withoutPassword: {
    attributes: {
      exclude: ['password'],
    },
  },
  withoutToken: {
    attributes: {
      exclude: ['resetPasswordToken', 'otpCode', 'verifEmailCode'],
    },
  },
}))
@Table({
  tableName: 'users',
})
export class User extends Model {
  @PrimaryKey
  @Default(Sequelize.literal('uuid_generate_v4()'))
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  role: string;

  @AllowNull(false)
  @Unique({
    name: 'Duplicate user username error.',
    msg: 'Username is registered.',
  })
  @Column
  username: string;

  @AllowNull(false)
  @Column
  get password() {
    return this.getDataValue('password');
  }

  set password(value: string) {
    this.setDataValue('password', bcrypt.hashSync(value, 10));
  }

  @AllowNull(false)
  @Unique({
    name: 'Duplicate user email error.',
    msg: 'Email is registered.',
  })
  @Validate({
    isEmail: true,
  })
  @Column
  email: string;

  @AllowNull(false)
  @Unique({
    name: 'Duplicate user phone number error.',
    msg: 'Phone number is registered.',
  })
  @Validate({
    isNumeric: true,
  })
  @Column
  phone: string;

  @ForeignKey(() => File)
  @Column(DataType.UUID)
  avatarId: string;

  @BelongsTo(() => File)
  avatar?: File;

  @Column
  lastLogin?: Date;

  @Default(false)
  @Column(DataType.BOOLEAN)
  otpStatus: boolean;

  @Column
  otpCode?: string;

  @Column
  otpExpiredAt?: Date;

  @Column
  otpResendAt?: Date;

  @Default(false)
  @Column(DataType.BOOLEAN)
  verifEmailStatus: boolean;

  @Column
  verifEmailCode?: string;

  @Column
  verifEmailExpiredAt?: Date;

  @Column
  resetPasswordToken?: string;

  @Column
  resetPasswordTokenExpiredAt?: Date;

  comparePasswordSync(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
