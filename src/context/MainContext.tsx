import React, { useState, createContext, useEffect } from 'react'
import { useSession } from 'next-auth/react';

const UserContext = createContext<any>({})

function MainContext({ children }: { children: any }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<any>();
    const [favorites, setFavorites] = useState()

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
        setFavorites
    }}>
        {children}
    </UserContext.Provider>
  )
}

export default MainContext