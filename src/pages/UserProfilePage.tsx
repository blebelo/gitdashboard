import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { IUserDetails, IRepository } from '../utils/types';
import { fetchUserDetails, fetchUserRepos } from '../utils/fetchUserData';
import NavBar from '../components/NavBar';
import Loader from '../components/Loader';
import './UserProfilePage.css'

export default function UserProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<IUserDetails | null>(null);
  const [repos, setRepos] = useState<IRepository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!username) return;

      setLoading(true);
      setError('');
      
      try {
        const userData = await fetchUserDetails(username);
        setUser(userData);
        const repoData = await fetchUserRepos(username);
        setRepos(repoData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [username]);

if (loading){
    return <Loader />
}

return (
  error ? (
    <h1>{error}</h1>
  ) : (
    <div className="profile-container">
      <NavBar />
      <div className="profile-card">
        <img src={user?.avatar_url} alt="avatar" className="avatar" />
        <div>
          <h2>{user.name}</h2>
          <p>@{user.login}</p>
          <p>{user.bio}</p>
          <p><strong>Location:</strong> {user?.location || 'N/A'}</p>
          <p><strong>Followers:</strong> {user?.followers} | <strong>Following:</strong> {user?.following}</p>
          <p><strong>Public Repos:</strong> {user?.public_repos}</p>
        </div>
      </div>

      <div className="repos">
        <h3>Recent Repositories</h3>
        <ul>
          {repos.map(repo => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a> {repo.stargazers_count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
);

}
