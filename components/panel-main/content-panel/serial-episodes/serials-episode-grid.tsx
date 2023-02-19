import { Grid } from '@chakra-ui/react'
import { PlaylistItem } from 'iptv-playlist-parser'
import React from 'react'
import EpisodeItem from './episode-item'

interface SerialsEpisodeGridProps {
  episodesBySeason: PlaylistItem[]
}

const SerialsEpisodeGrid: React.FC<SerialsEpisodeGridProps> = ({ episodesBySeason }) => (
  <Grid templateRows="repeat(1, 1fr)" gap={1}>
    {episodesBySeason.map((episode, index) => (
      <EpisodeItem key={`${index}-${episode.name}`} episode={episode} />
    ))}
  </Grid>
)

export default SerialsEpisodeGrid
