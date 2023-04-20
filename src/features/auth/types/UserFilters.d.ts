export interface UserFilters {
  query: string;
  role: string;
}

export enum UserFilterName {
  Query = 'query',
  Role = 'role',
}

export type UserFilterValue = string;
