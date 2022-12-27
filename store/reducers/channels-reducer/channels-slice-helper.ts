import parser from 'iptv-playlist-parser'
import { SerialsSeasonDictionary } from './channels-slice'

class ChannelsSliceHelper {
  handleSerialSeasons = (selectedSerial: parser.PlaylistItem[] | null) => {
    const serialSeasonsDictionary: SerialsSeasonDictionary = {}
    if (selectedSerial === null) {
      return null
    }
    if (Object.keys(selectedSerial as parser.PlaylistItem[]).length) {
      const splittedSerialNamesArray = Object.values(selectedSerial as parser.PlaylistItem[]).map((serial) =>
        serial.name.split(' ')
      )
      // [S01]
      const serialSeasons = Array.from(
        new Set(splittedSerialNamesArray.map((nameArray) => nameArray.find((value) => /^S[0-9]/.test(value))))
      )

      serialSeasons.forEach((seasonTitle) => {
        serialSeasonsDictionary[`Season ${seasonTitle?.slice(1)}`] = Object.values(
          selectedSerial as parser.PlaylistItem[]
        ).filter((serial) => serial.name.includes(`${seasonTitle}`))
      })
      return serialSeasonsDictionary
    }
    return null
  }
}

const channelsSliceHelper = new ChannelsSliceHelper()
export default channelsSliceHelper
