import type { IUserProps } from './types';

export const fetchUsers = async (since: number, usersPerPage: number): Promise<IUserProps[]> => {
  const res = await fetch(`https://api.github.com/users?since=${since}&per_page=${usersPerPage}`);
  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }
  const data = await res.json();
  return data;
};
