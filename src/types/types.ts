export interface TwitchApiResponse<T> {
  data: T[]
  pagination?: Pagination
}

export interface User {
  id: string
  login: string
  display_name: string
  type: string
  broadcaster_type: string
  description: string
  profile_image_url: string
  offline_image_url: string
  view_count: number
  email: string
  created_at: string
}

export interface UserBan {
  user_id: string
  user_login: string
  user_name: string
  expires_at: string
  created_at: string
  reason: string
  moderator_id: string
  moderator_login: string
  moderator_name: string
}

export interface Pagination {
  cursor: string
}
