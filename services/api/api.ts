export const fetchChannels = async (url: string): Promise<Response> => {
  const response = await fetch(`/api/service?postUrl=${url}`, {
    method: 'POST',
  })
  return response
}
