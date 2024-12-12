import React from 'react'
import { signIn , signOut , useSession } from 'next-auth/react';



const AuthButton = () => {

    const {data:session} = useSession();



  return (
    <div>AuthButton</div>
  )
}

export default AuthButton