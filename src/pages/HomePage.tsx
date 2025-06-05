import { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import './HomePage.css'
import NavBar from '../components/NavBar';
import type {IUserProps}  from "../utils/types";


const usersPerPage: number = 20;

export default function HomePage() {
  const [users, setUsers] = useState<IUserProps[]>([]);
  const [error, setError] = useState<string>('');
  const [since, setSince] = useState<number>(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`https://api.github.com/users?since=${since}&per_page=${usersPerPage}`);
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchUsers();
  }, [since]);

  const handleNext = (): void => {
    if (users.length > 0) {
      setSince(since + usersPerPage);
    }
  };

  const handlePrev = () => {
    setSince(since - usersPerPage);
  };

  return (
      <div className='container'>
        <NavBar />
        
      <div id='users' >
        {users.map(user => (
            <UserCard
            key={user.id}
            login={user.login}
            avatar_url={user.avatar_url}
            profileLink={`/user/${user.login}`} id={0}            />
        ))}
      </div>
        
      <div className='pagenation'>
        <button id='prev' onClick={handlePrev} disabled={since === 0}>Prev</button>
        <button id='next' onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}
