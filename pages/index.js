import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Tweets from 'components/Tweets'
import prisma from 'lib/prisma'
import { getTweets } from 'lib/data.js'
import Link from 'next/link'

export default function Index({tweets}) {
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
      <Tweets tweets={tweets} />
      <div className='text-center p-4 border m-4'>
        <h2 className='mb-10'>Join the conversation, now!</h2>
        <Link href={'/api/auth/signin'}>
          <a
            className='border px-8 py-2 mt-5 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover-darker'
            href='/api/auth/signin'
          >
            Login
          </a>
        </Link>
      </div>
    </div>  
  )

}

export async function getServerSideProps() {
	const take = 3
  let tweets = await getTweets(prisma, take)
  tweets = JSON.parse(JSON.stringify(tweets))

  return {
    props: {
      tweets,
    },
  }
}