import parser from 'iptv-playlist-parser'

export const fetchChannels = async (url: string): Promise<parser.Playlist | Error> => {
  const response = await fetch(`/api/service?url=${url}`, {
    method: 'GET',
  })
  if (response.ok) {
    return response.json()
  }
  throw new Error(response.statusText)
}
