import React, { useState, createContext } from 'react'

const UserContext = createContext<any>({})

function MainContext({ children }: { children: any }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState();
    const [favorites, setFavorites] = useState()
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