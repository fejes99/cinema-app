import { User } from '../types/User';
import { UserFilters } from '../types/UserFilters';

export const defaultUserFilters: UserFilters = {
  query: '',
  role: '',
};

export const userSearchFilter = (users: User[], filters: UserFilters): User[] => {
  return users.filter((user) => {
    return (
      (filters.query === defaultUserFilters.query ||
        // user.firstName.toLowerCase().includes(filters.query.toLowerCase()) ||
        // user.lastName.toLowerCase().includes(filters.query.toLowerCase()) ||
        user.username.toLowerCase().includes(filters.query.toLowerCase())) &&
      // || user.email.toLowerCase().includes(filters.query.toLowerCase())
      (filters.role === defaultUserFilters.role || user.role === filters.role)
    );
  });
};
