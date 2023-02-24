import nc from 'next-connect'
import cors from 'cors'
import apiService from '../../services/api-service/api-service'

// I hate next
const getChannelsFromApi = nc()
  .use(cors())
  .get(async (req: any, res: any) => {
    const splitUrlFrom = 'url='
    const { url } = req
    const requestUrl = url.split(splitUrlFrom)[1]

    try {
      const response = await fetch(requestUrl)
      if (response.ok) {
        const playlistObject = await apiService.parsePlaylistItems(response)
        res.status(200).json(playlistObject)
      } else {
        res.statusMessage = 'Channels not found'
        res.status(404).json()
      }
    } catch (error) {
      res.statusMessage = error
      res.status(404).json()
    }
  })

// to check size of objects
function roughSizeOfObject(object: any) {
  const objectList = []
  const stack = [object]
  let bytes = 0

  while (stack.length) {
    const value = stack.pop()

    if (typeof value === 'boolean') {
      bytes += 4
    } else if (typeof value === 'string') {
      bytes += value.length * 2
    } else if (typeof value === 'number') {
      bytes += 8
    } else if (typeof value === 'object' && objectList.indexOf(value) === -1) {
      objectList.push(value)

      for (const i in value) {
        stack.push(value[i])
      }
    }
  }
  return bytes
}

export const config = {
  api: {
    bodyParser: false, // Defaults to true. Setting this to false disables body parsing and allows you to consume the request body as stream or raw-body.
    responseLimit: false, // Determines how much data should be sent from the response body. It is automatically enabled and defaults to 4mb.
    externalResolver: true, // Disables warnings for unresolved requests if the route is being handled by an external resolver like Express.js or Connect. Defaults to false.
  },
}

export default getChannelsFromApi
