import parser from 'iptv-playlist-parser'
import { setSelectedSerial } from '../../../../store/reducers/channels-reducer/channels-slice'
import store from '../../../../store/redux-store'

export interface SerialsSeasonDictionary {
  [key: string]: parser.PlaylistItem[]
}

class SerialEpisodesHelper {
  handleBackSeasons = () => {
    store.dispatch(setSelectedSerial(null))
  }

  handleSerialSeasons = (selectedSerial: parser.PlaylistItem[] | null) => {
    const serialSeasonsDictionary: SerialsSeasonDictionary = {}
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
  }
}

const serialEpisodesHelper = new SerialEpisodesHelper()
export default serialEpisodesHelper
