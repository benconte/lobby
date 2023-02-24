import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react';

function Favorites() {
  const { status, data: session } = useSession()
  const [hotels, setHotels] = useState<any>([])

  useEffect(() => {
    if (status === "authenticated") {
      fetch(`/api/favorites/${session?.user?.email}/getFavorites`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(res => res.json()).then((data: any) => {
        console.log(data)
        setHotels(data)
      })
    }
  }, [session, status])
  return (
    <div>favorites</div>
  )
}

export default Favorites
