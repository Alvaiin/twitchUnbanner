import React, { useEffect, useState } from 'react'
import { TextInput } from '../components/TextInput'
import Button from '../components/Button'
import { UsersList } from './UsersList'
import { User, UserBan } from '../types/types'
import { fetchAllBannedUsers, fetchUser } from '../services/UsersService'
import { LoadingSpinner } from '../components/LoadingSpinner'

const SearchChannelPage = () => {

    const hash = document.location.hash
    const accessToken = hash.slice(1, hash.length).split('&').at(0)?.split('=').at(1) ?? ''
    const regex = new RegExp('^[A-Za-z0-9\s]*$')
    const [textInput, setTextInput] = useState('')
    const [loggedUser, setLoggedUser] = useState<User>()
    const [channelUser, setChannelUser] = useState<User>()
    const [bannedUsers, setBannedUsers] = useState<UserBan[]>()
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState()

    useEffect(() => {
        fetchUser(accessToken).then((u) => {
            setLoggedUser(u);
            setIsLoading(false)
        })
    }, [])

    const onSubmit = (e: React.FormEvent) => {
        setErrorMessage(undefined)
        e.preventDefault()
        if (!regex.test(textInput)) {
            return
        }
        setIsLoading(true)
        fetchUser(accessToken, textInput).then((u) => {
            setChannelUser(u)
            fetchAllBannedUsers(accessToken, u).then((users) => {
                setBannedUsers(users)
            })
                .catch(e => { setErrorMessage(e.error) })
                .finally(() => { setIsLoading(false) })
        }).catch(e => {
            setErrorMessage(e.error)
            setIsLoading(false)
        })
    }

    const ontextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(e.target.value)
    }


    return (
        <div>
            <h1 className='text-4xl mb-10'>Escribi el nombre del canal para ver los usuarios baneados</h1>
            <form onSubmit={onSubmit}>
                <div className='flex justify-center align-middle'>
                    <TextInput onChange={ontextInputChange} className="px-6" id="channel" placeholder='Alvain'></TextInput>
                    <Button disabled={false}>Buscar</Button>
                </div>
            </form>
            <h2 className='mt-10'>Recorda que debes ser moderador del canal!</h2>
            {
                isLoading ? <LoadingSpinner /> :
                    errorMessage ? <label>{errorMessage}</label> :
                        loggedUser && channelUser && bannedUsers && <UsersList users={bannedUsers} channelUser={channelUser} accessToken={accessToken} loggedUser={loggedUser} />}
        </div>
    )
}

export default SearchChannelPage    