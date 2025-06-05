import { useEffect, useState } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem('favUsers');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('favUsers', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (login: string) => {
    setFavorites(prev =>
      prev.includes(login)
        ? prev.filter(fav => fav !== login)
        : [...prev, login]
    );
  };

  const isFavorite = (login: string) => favorites.includes(login);

  return { favorites, toggleFavorite, isFavorite };
};
