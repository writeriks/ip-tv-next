import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [roomName, setRoomName] = useState('')

  const joinRoom = () => {
    router.push(`/monitor/${roomName || Math.random().toString(36).slice(2)}`)
  }

  return (
    <div>
      <Head>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Lets join a room!</h1>
        <input title="emir" onChange={(e) => setRoomName(e.target.value)} value={roomName} />
        <button onClick={joinRoom} type="button">
          Join Room
        </button>
      </main>
    </div>
  )
}
