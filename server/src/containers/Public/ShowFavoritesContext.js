// ShowFavoritesContext.js
import React, { createContext, useContext, useState } from 'react';

const ShowFavoritesContext = createContext();

export const useShowFavorites = () => useContext(ShowFavoritesContext);

export const ShowFavoritesProvider = ({ children }) => {
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <ShowFavoritesContext.Provider value={{ showFavorites, setShowFavorites }}>
      {children}
    </ShowFavoritesContext.Provider>
  );
};
