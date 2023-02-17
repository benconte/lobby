import { NextPage } from "next"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import Router from "next/router"

const Protected: NextPage = (): JSX.Element => {
    const { status, data: session } = useSession()

    console.log(status, session)

    useEffect(() => {
        if (status === "unauthenticated") Router.replace("/auth/signin");
    }, [status])

    if (status == "authenticated") {

        return (
            <div>the current authenticated user: {session?.user?.name}</div>
        )
    }

    return <div>Loading...</div>
}

export default Protected