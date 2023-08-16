import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const Login = () => {
    const {data:session}=useSession();
    const router=useRouter();

    //redirect if connected
    useEffect(() => {
      if(!session){
        
      }
      else{
        router.push("/")
      }
    },[session])



  return (
    <div className='flex justify-center items-center mt-[20%]'>
            <button className='bg-blue-400 p-2 rounded-x1 px-3 text-white' onClick={() => signIn()}>
                Login with Google

            </button>
    </div>
  )
}

export default Login