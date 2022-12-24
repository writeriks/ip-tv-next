import nc from 'next-connect'
import cors from 'cors'
import parser from 'iptv-playlist-parser'

const defaultType = 'm3u_plus'
const defaultOutput = 'mpegts'

const getChannelsFromApi = nc()
  .use(cors())
  .post(async (req: any, res: any) => {
    const { postUrl, username, password, type, output } = req.query

    const url = `${postUrl}?username=${username}&password=${password}&type=${defaultType}&output=${defaultOutput}`

    const response = await fetch(url)

    if (response.status === 200) {
      const textResponse = await response.text()
      const channels = parser.parse(textResponse)
      console.log('🚀 ~ file: service.ts:20 ~ .post ~ channels', channels)

      res.status(200).json({ channels })
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
