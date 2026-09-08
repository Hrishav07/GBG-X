import React, { createContext, useContext, useState } from 'react';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [lang, setLang] = useState('EN');
  const [theme, setTheme] = useState('dark');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cartCount, setCartCount] = useState(2);
  const [wishlistCount, setWishlistCount] = useState(4);
  const [favorites, setFavorites] = useState([1, 4]);

  const toggleFav = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const addToCart = () => setCartCount(c => c + 1);

  return (
    <StoreContext.Provider value={{
      lang, setLang, theme, setTheme, isLoggedIn, setIsLoggedIn,
      cartCount, addToCart, wishlistCount, setWishlistCount, favorites, toggleFav
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}