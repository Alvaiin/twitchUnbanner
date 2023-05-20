import './App.css'
import React from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import AuthenticationPage from './pages/AuthenticationPage'
import SearchChannelPage from './pages/SearchChannelPage'


const router = createBrowserRouter([
  {
    path: '/twitchUnbanner/',
    element: <AuthenticationPage />
  },
  {
    path: '/twitchUnbanner/searchChannel',
    element: <SearchChannelPage />
  }
])

function App(): JSX.Element {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
