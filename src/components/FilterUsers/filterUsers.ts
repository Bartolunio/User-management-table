import { User, Filters } from '@/types';

export const filterUsers = (users: User[], filters: Filters): User[] => {
  return users.filter((user) =>
    Object.entries(filters).every(([key, value]) => {
      if (!value) {
        return true;
      }
      const userValue = user[key as keyof User].toString().toLowerCase();
      return userValue.includes(value.toLowerCase());
    })
  );
};
