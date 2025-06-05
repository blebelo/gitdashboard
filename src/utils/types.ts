export interface IUserProps {
  id: number;
  login: string;
  avatar_url: string;
  profileLink: string;
  favorite: boolean;
  onFavoriteToggle: () => void;
}

export interface IUserDetails extends IUserProps {
  name: string;
  bio: string;
  location: string;
  followers: number;
  following: number;
  public_repos: number;
}

export interface IRepository {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
}
