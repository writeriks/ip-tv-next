export const fetchChannels = async (username: string, password: string, url: string): Promise<Response> => {
  const response = await fetch(`/api/service?username=${username}&password=${password}&postUrl=${url}`, {
    method: 'POST',
  })
  return response
}
