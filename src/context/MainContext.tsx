import React, { useState, createContext, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react';

export const UserContext = createContext<any>({})

function MainContext({ children }: { children: any }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>();
  const [favorites, setFavorites] = useState()

  // popup modal
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false)
    signOut()
  };

  const { status, data } = useSession()

  useEffect(() => {
    if (status === "authenticated") {
      setIsAuthenticated(true)
      setUser(data?.user)
    } else {
      setIsAuthenticated(false)
      setUser({})
    }
  }, [status, data])

  return (
    <UserContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
      favorites,
      setFavorites,
      handleOpenModal,
      handleCloseModal,
      openModal,
      setOpenModal,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default MainContext