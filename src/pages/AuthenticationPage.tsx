import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'
import Button from '../components/Button'

const AuthenticationPage = (): JSX.Element => {
  const clientId = 'nyh8ev412398bcshxuqw8kec11t8n6'
  const scope = encodeURIComponent('moderator:manage:banned_users')
  const { userName } = useContext(UserContext)
  return (
    <div className='flex flex-col min-h-screen justify-center'>
      <h1 className='mb-20'>Ingresa con tu cuenta de Twitch para ver los usuarios baneados de los canales que moderas</h1>
      <a href={`https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=https://alvaiin.github.io/twitchUnbanner/searchChannel&response_type=token&scope=${scope}`}>
        <Button disabled={false}>Ingresa</Button>
      </a>
    </div>
  )
}

export default AuthenticationPage
