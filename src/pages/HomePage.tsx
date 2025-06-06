import { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import './HomePage.css';
import NavBar from '../components/NavBar';
import type { IUserProps } from "../utils/types";
import { fetchUsers } from '../utils/fetchUsers';
import Loader from '../components/Loader';
import { useFavorites } from '../hooks/useFavorites';

const usersPerPage = 20;

const HomePage = () => {
  const [users, setUsers] = useState<IUserProps[]>([]);
  const [error, setError] = useState('');
  const [since, setSince] = useState(0);
  const [loading, setLoading] = useState(false);

  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      processUsers();
    };
    getUsers();
  }, [since]);
//This asshole di
  const processUsers = async () => {
    try {
      const data = await fetchUsers(since, usersPerPage);
      setUsers(data);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const handleNext = () => {
    if (users.length > 0) {
      setSince(since + usersPerPage);
    }
  };

  const handlePrev = () => {
    setSince(Math.max(0, since - usersPerPage));
  };

  if (loading) return <Loader />;
  if (error) return <h1>{error}</h1>;

  return (
    <div className='container'>
      <NavBar />
      <div id='users'>
        {users.map(user => (
          <UserCard
            key={user.id}
            id={user.id}
            login={user.login}
            avatar_url={user.avatar_url}
            profileLink={`/user/${user.login}`}
            favorite={isFavorite(user.login)}
            onFavoriteToggle={() => toggleFavorite(user.login)}
          />
        ))}
      </div>
      <div className='pagination'>
        <button id='prev' onClick={handlePrev} disabled={since === 0}>Prev</button>
        <button id='next' onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default HomePage;
