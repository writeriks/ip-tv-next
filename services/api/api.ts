import parser from 'iptv-playlist-parser'

export const fetchChannels = async (
  username: string,
  password: string,
  url: string
): Promise<parser.Playlist | Error> => {
  const response = await fetch(`/api/service?username=${username}&password=${password}&postUrl=${url}`, {
    method: 'POST',
  })
  if (response.ok) {
    return response.json()
  }
  throw new Error(response.statusText)
}
