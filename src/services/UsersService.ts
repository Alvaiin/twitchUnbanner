import { TwitchApiResponse, User, UserBan } from "../types/types"

const clientId = import.meta.env.VITE_CLIENT_ID

export async function fetchAllBannedUsers(accessToken: string, user: User) {

    const url = `https://api.twitch.tv/helix/moderation/banned?broadcaster_id=${user.id}&first=100`
    const users = [];
    let pagination = '';
    let finished = false
    while (!finished) {
        const response = await fetch(`${url}${pagination}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Client-Id': clientId,
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 401)
            throw { error: 'No sos moderador de ese canal' }
        const json = await response.json() as TwitchApiResponse<UserBan>
        if (json?.pagination?.cursor !== undefined) {
            pagination = `&after=${json.pagination.cursor}`
        } else
            finished = true
        users.push(json.data)
    }
    return users.flatMap(c => c)
}

export const fetchUser = async (accessToken: string, channelName?: string) => {
    let url = `https://api.twitch.tv/helix/users`
    if (channelName)
        url = url.concat(`?login=${channelName}`)
    const { data } = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Client-Id': clientId,
            'Content-Type': 'application/json'
        }
    }).then(async res => await res.json() as TwitchApiResponse<User>)

    if (data.length === 0) {
        throw { error: 'No se encontro un canal con ese nombre' }
    }
    console.log("userId:", data[0].id)
    return data[0]
}

export const unbanUser = async ( accessToken: string, channelUser: User, loggedUser: User, user: UserBan) => {
    return fetch(`https://api.twitch.tv/helix/moderation/bans?broadcaster_id=${channelUser?.id}&moderator_id=${loggedUser.id}&user_id=${user.user_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Client-Id': clientId,
        'Content-Type': 'application/json'
      }
    })
}