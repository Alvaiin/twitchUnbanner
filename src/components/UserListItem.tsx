import React, { useState } from 'react'
import { UserBan } from '../types/types'
import { Button } from '@tremor/react'

const UserListItem = ({ user, index, onClick }: { user: UserBan, index: number, onClick: (u: UserBan) => Promise<Response> }): JSX.Element => {

    const [isLoading, setisLoading] = useState(false)

    const unbanUser = () => {
        setisLoading(true)
        onClick(user).then(() => {
            setisLoading(false)
        })
    }
    return (
        <tr key={user.user_id} className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap px-6 py-4">
                {index + 1}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                {user.user_name}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                {user.reason}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                {user.moderator_name}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                {user.created_at}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                <Button onClick={unbanUser} loading={isLoading}>Unban</Button>
            </td>
        </tr>
    )
}

export default UserListItem