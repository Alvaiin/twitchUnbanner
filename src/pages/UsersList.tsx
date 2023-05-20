
import { User, UserBan } from '../types/types'
import UserListItem from "../components/UserListItem";
import { useState } from 'react';
import { Button, Text } from '@tremor/react';
import Modal from 'react-modal'
import { unbanUser } from '../services/UsersService';
const clientId = import.meta.env.VITE_CLIENT_ID

export const UsersList = ({ users, channelUser, loggedUser, accessToken }: { users: UserBan[], channelUser: User, loggedUser: User, accessToken: string }): JSX.Element => {

  const [bannedUsers, setBannedUsers] = useState(users)
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onClick = (user: UserBan) => {
    return unbanUser(accessToken, channelUser, loggedUser, user).then((res) => {
      if (res.ok) {
        setBannedUsers(prevState => {
          let newState = [...prevState]
          newState.splice(newState.indexOf(user), 1)
          return newState
        })
      }
      return res
    })
  }

  const unbanAll = () => {
    setModalIsOpen(false)
    fetchUnbannAll(bannedUsers)
  }

  const fetchUnbannAll = async (bannedUsers: UserBan[]) => {
    bannedUsers.forEach((user: UserBan) => {
      unbanUser(accessToken, channelUser, loggedUser, user).then((res) => {
        if (res.ok) {
          setBannedUsers(prevState => {
            let newState = [...prevState]
            newState.splice(newState.indexOf(user), 1)
            return newState
          })
        }
        return res
      })
    });
  }

  return (
    <>
      <Modal
        style={customStyles} contentLabel="Confirmar UnbannAll" isOpen={modalIsOpen}>
        <Text className='mb-5 text-xl'>Desea desbanear a todos los usuarios?</Text>
        <div className='flex justify-around '>
          <Button onClick={() => setModalIsOpen(false)} color="red">Rechazar</Button>
          <Button onClick={unbanAll}>Confirmar</Button>
        </div>
      </Modal>
      <Button onClick={() => setModalIsOpen(true)} color='red'>UNBAN ALL</Button>
      <table className="min-w-full text-left text-sm font-light" >
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th className="px-6 py-4">
              #
            </th>
            <th className="px-6 py-4">
              Usuario
            </th>
            <th className="px-6 py-4">
              Razon
            </th>
            <th className="px-6 py-4">
              Mod
            </th>
            <th className="px-6 py-4">
              Fecha
            </th>
          </tr>
        </thead>
        <tbody>
          {bannedUsers.map((u: UserBan, index) => <UserListItem key={u.user_id} user={u} index={index} onClick={onClick} />)}
        </tbody>
      </table >
    </>
  )
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};