import { User, UserState } from '@/types';

export const filterUsers = (users: User[], filters: UserState): User[] => {
  return users.filter((user) =>
    Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      const userValue = user[key as keyof User].toString().toLowerCase();
      return userValue.includes(value.toLowerCase());
    })
  );
};
