import { BadRequestException } from '@nestjs/common';
import _ from 'lodash';
import { FindOptions, Model, ModelStatic } from 'sequelize';

const functionPagination = async <T extends Model>(
  model: ModelStatic<T>,
  options: FindOptions<T>,
  page: number,
  limit?: number,
  scope?: string[],
) => {
  const [count, data] = await Promise.all([
    model.scope(scope).count({
      ...options,
      distinct: true,
      attributes: undefined,
      ...(_.isEmpty(options.include) && { col: `${model.name}.id` }),
    }),
    model.scope(scope).findAll({
      ...options,
      limit,
      offset: limit ? (page - 1) * limit : 0,
    }),
  ]);

  const totalPage = (limit ? Math.ceil(count / limit) : 1) || 1;
  const prevPage = page - 1 || null;
  const nextPage = page + 1 > totalPage ? null : page + 1;

  if (page > totalPage) {
    throw new BadRequestException('page out of index');
  }

  return {
    prevPage,
    nextPage,
    totalPage,
    page,
    limit,
    totalDocs: count,
    docs: data,
  };
};

export { functionPagination };
