import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export default function NewTweet() {
  const [content, setContent] = useState('')
  const { data: session } = useSession()
  const router = useRouter()

  if (!session || !session.user) return null

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()

        if (!content) {
          alert('No content')
          return
        }

        //alert(content)
        // set API route with path and some settings for req body 
        await fetch('/api/tweet', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
              },

              body: JSON.stringify({
              content,
            }),
        })

        router.reload(window.location.pathname)

      }}
    >
      <div className='flex'>
        <div className='flex-1 px-1 pt-2 mt-2 mr-1 ml-1'>
            <p>Type some text and press Tweet</p>
          <textarea
            className='border p-4 w-full text-lg font-medium bg-transparent dark:bg-slate-800 outline-none color-primary bg-gray-200'
            rows={2}
            cols={50}
            placeholder="What's happening?"
            name='content'
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>

      <div className='flex'>
        <div className='flex-1 mb-5'>
          <button className='border float-right px-8 py-2 mt-0 mr-2 font-bold rounded-full bg-blue-400'>
            Tweet
          </button>
        </div>
      </div>

    </form>
  )
}