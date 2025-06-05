import { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import './HomePage.css';
import NavBar from '../components/NavBar';
import Loader from '../components/Loader';
import { useFavorites } from '../hooks/useFavorites';
import { fetchUserDetails } from '../utils/fetchUserData';
import type { IUserProps, IUserDetails } from "../utils/types";
import './HomePage.css';

const FavoritesPage = () => {
  const [favoriteUsers, setFavoriteUsers] = useState<IUserProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchFavoriteUsers = async () => {
      const usernames = favorites;
      setLoading(true);
      try {
        const usersDetails: IUserDetails[] = await Promise.all(
          usernames.map(username => fetchUserDetails(username))
        );

        const users: IUserProps[] = usersDetails.map(user => ({
          id: user.id,
          login: user.login,
          avatar_url: user.avatar_url,
          profileLink: `/user/${user.login}`,
          favorite: isFavorite(user.login),
          onFavoriteToggle: () => toggleFavorite(user.login),
        }));

        setFavoriteUsers(users);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch favorite users');
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteUsers();
  }, [favorites]);

  if (loading) return <Loader />;
  if (error) return <h1>{error}</h1>;

  return (
    <div className='container'>
      <NavBar />
      <div id='users'>
        {favoriteUsers.length === 0 ? (
          <h2>No favorite users yet.</h2>
        ) : (
          favoriteUsers.map(user => (
            <UserCard
              key={user.id}
              {...user}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
