import React from 'react'
import { useRouter } from 'next/router'

function Business() {
    const router = useRouter();
    const { id } = router.query
    return (
        <div>
          <h3>Business page</h3>
          <span>The id of this business is {id}</span>
        </div>
    )
}

export default Business