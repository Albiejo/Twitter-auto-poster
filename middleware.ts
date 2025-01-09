import { NextResponse } from "next/server";


export function middleware(req) {

    //const isLoggedin = req.cookies.get('authtoken') !== undefined;

    const isLoggedin = false;
    
    const url = req.nextUrl.clone();



          
    if (url.pathname === '/') {
        if (isLoggedin) {
            url.pathname = '/dashboard';
        } else {

            url.pathname = '/login';
        }

        return NextResponse.redirect(url);
    }

    

  // If the user is logged in and tries to access /login, redirect to /dashboard
    if (url.pathname === '/login' && isLoggedin) {
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }


     // If the user is not logged in and tries to access /dashboard, redirect to /login
    if (url.pathname === '/dashboard' && !isLoggedin) {
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }







    return NextResponse.next();

  
}


export const config = {
    //apply middleware only for the root route 
    matcher: ['/' , '/dashboard' , '/login']
}



