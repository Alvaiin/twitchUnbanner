import React, { useState } from 'react'
import { TextInput } from './TextInput'
import { LoadingSpinner } from './LoadingSpinner'
import PasswordInput from './PasswordInput'
import {
  redirect
} from 'react-router-dom'

export const LoginForm = (): JSX.Element => {
  const [submitting, setSubmitting] = useState(false)
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>): Response => {
    setSubmitting(true)
    e.preventDefault()
    setTimeout(() => {
      setSubmitting(false)
    }, 2000)
    console.log('SUBMIT')
    return redirect('/home')
  }
  return (
    submitting
      ? <LoadingSpinner/>
      : <form onSubmit={onFormSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <TextInput id='user' placeholder='Usuario'/>
                <PasswordInput/>
            </div>
            <button type="submit" disabled={submitting} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Login
            </button>
        </form>
  )
}
