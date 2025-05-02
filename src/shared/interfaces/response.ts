export interface IPagination {
  totalData?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

export interface IError {
  message: string;
  error?: number;
}

export interface IResponse<T> {
  statusCode?: any;
  data?: T;
  error?: IError;
  pagination?: IPagination | null;
}

export interface IDelete {
  affected?: number | null;
  message?: string;
}
