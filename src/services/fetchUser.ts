import { TwitchApiResponse, User } from "../types/types"

const clientId = import.meta.env.VITE_CLIENT_ID

export const fetchLoggedUser = async (accesToken: string): Promise<User> => {
    return await fetch(`https://api.twitch.tv/helix/users`, {
        headers: {
            Authorization: `Bearer ${accesToken}`,
            'Client-Id': clientId,
            'Content-Type': 'application/json'
        }
    }).then(async res => await res.json() as TwitchApiResponse<User>)
        .then(response => response.data[0])

}