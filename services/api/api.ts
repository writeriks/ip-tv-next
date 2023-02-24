import { PlaylistObject } from '../player-service/types'

export const fetchChannels = async (url: string): Promise<PlaylistObject | Error> => {
  const response = await fetch(`/api/service?url=${url}`, {
    method: 'GET',
  })
  if (response.ok) {
    const playlistObject: PlaylistObject = await response.json()
    return playlistObject
  }
  throw new Error(response.statusText)
}
