import { HydratedDocument, Model, QueryWithHelpers } from 'mongoose';

interface PaginateQueryParams {
  limit?: number;
  page?: number;
}

interface ProjectQueryHelpers<T> {
  paginate({}: PaginateQueryParams): QueryWithHelpers<
    HydratedDocument<T>[],
    HydratedDocument<T>,
    ProjectQueryHelpers<T>
  >;
}

export type PaginateModel<T> = Model<T, ProjectQueryHelpers<T>>;
