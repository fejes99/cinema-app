import { User } from 'features/auth/types/User';

export const isAdmin = (user: User): boolean => user.role === 'Admin';
