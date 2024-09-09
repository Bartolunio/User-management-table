export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export interface Filters {
  name: string;
  username: string;
  email: string;
  phone: string;
}

export interface UserState {
  users: User[];
  filteredUsers: User[];
  filters: Filters;
}

export type FilterType = keyof Filters;

export interface FilterField {
  key: FilterType;
  placeholder: string;
  type: 'text' | 'email';
}
