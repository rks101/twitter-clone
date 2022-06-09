import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return null
  }

  /*if (status === 'authenticated') {
    return (<p>Wait...</p>)
  }*/

  if (session) {
    router.push('/home')
  }

  //return <a href='/api/auth/signin'>login</a>


  return (
		<div className='mt-10'>
      <p className='text-center p-4 border m-4'>
        <h2 className='mb-10'>Join the conversation, now!</h2>
        <a
          className='border px-8 py-2 mt-5 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover-darker'
          href='/api/auth/signin'
        >
          Login
        </a>
      </p>
    </div>  
  )

}
