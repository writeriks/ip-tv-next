import nc from 'next-connect'
import cors from 'cors'
import parser from 'iptv-playlist-parser'

const getChannelsFromApi = nc()
  .use(cors())
  .post(async (req: any, res: any) => {
    const { postUrl, password, type, output } = req.query

    const url = `${postUrl}&password=${password}&type=${type}&output=${output}`

    const response = await fetch(url)

    if (response.status === 200) {
      const textResponse = await response.text()
      const channels = parser.parse(textResponse)
      res.status(200).json({ channels })
    }
  })

export default getChannelsFromApi
