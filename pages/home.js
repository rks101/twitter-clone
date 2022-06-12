import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import NewTweet from 'components/NewTweet'
import Tweets from 'components/Tweets'
import prisma from 'lib/prisma'
import { getTweets } from 'lib/data'


export default function Home({tweets}) {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const router = useRouter()

  if (loading) {
    return null
  }

  if (!session) {
    router.push('/')
  }

  // if name is not setup, load setup page
  if (session && !session.user.name) {
    router.push('/setup')
  }


  //return <NewTweet />
  return (
    <>
    <NewTweet />
    <Tweets tweets={tweets}/>
    </>
  )
}

export async function getServerSideProps() {
	let tweets = await getTweets(prisma)
  tweets = JSON.parse(JSON.stringify(tweets))

  return {
    props: {
      tweets,
    },
  }
}


/**
 * The tweets get constructed serverside, in getServerSideProps. They are then passed on to the clientside via the props in the Home function component (which serves as a page).

export default function Home({ tweets })

In the Home component, the tweets from the incoming props (a parameter which all React components have) are then supposed to be passed on to the Tweets component in the return statement. This is the way the Home component has been designed. What the Home component displays is what's inside its return statement,

The tweets are passed on to the Tweets component like this:

<Tweets tweets={tweets} />

Again, they are passed on via props, this time the Tweets component's props. The left side 'tweets' are the name of the prop in the Tweets component. The right side 'tweets' are the actual data, the incoming tweets from the Home component.

Here below they travel into the Tweets component which has the logic for displaying them.

export default function Tweets({ tweets })

So we have the chain:

1. Tweets (the actual data) get constructed serverside
2. They are passed on to the clientside via Home's props
3. They are then passed on to the actual component which displays them, again via props. 

*/

/**
 * 
 */