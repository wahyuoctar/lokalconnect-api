import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File } from './models/file.model';

@Injectable()
export class FilesService {
  constructor(@InjectModel(File) private readonly fileModel: typeof File) {}

  get model() {
    return this.fileModel;
  }
}
