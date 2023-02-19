import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    console.log("myrequest",request.nextUrl.pathname)
    if(request.cookies.has("next-auth.session-token")) {
        // return new NextResponse(
        //     JSON.stringify({ success: true, message: 'User is authenticated and allowed to access this page.' }),
        //     { status: 200, headers: { 'content-type': 'application/json' } }
        //   )
        return NextResponse.next()
    } else {
        return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
}

export const config = {
    matcher: ["/booking/:path*", "/protected"]
}