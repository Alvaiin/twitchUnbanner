import React from 'react'
import { LoginForm } from '../components/LoginForm'

const LoginPage = (): JSX.Element => {
  return (
        <div>
            <h1 className='mt-10 mb-20'>Banking web</h1>
            <LoginForm />
        </div>
  )
}

export default LoginPage
