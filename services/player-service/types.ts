import { ParsedNonSerials, ParsedSeries } from '../../store/reducers/channels-reducer/channels-slice'

export interface PlaylistObject {
  liveChannelsObject: ParsedNonSerials
  moviesObject: ParsedNonSerials
  seriesObject: ParsedSeries
}
