import type { IUserDetails, IRepository } from './types';

export const fetchUserDetails = async (username: string): Promise<IUserDetails> => {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) throw new Error('User not found');
  return await res.json();
};

export const fetchUserRepos = async (username: string, perPage = 5): Promise<IRepository[]> => {
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=${perPage}`);
  if (!res.ok) throw new Error('Failed to fetch repositories');
  return await res.json();
};
