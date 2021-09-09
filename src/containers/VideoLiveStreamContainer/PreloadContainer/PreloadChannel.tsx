import React from 'react'
import { Box, makeStyles } from '@material-ui/core'
import ContentLoader from 'react-content-loader'

export type PreloadChannelProps = {
  isMobile?: boolean
}
export const PreloadChannel: React.FC<PreloadChannelProps> = ({ isMobile }): JSX.Element => {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <ContentLoader
        speed={1.5}
        width={'100%'}
        height={!isMobile ? 100 : 50}
        viewBox="0 0 1000 100"
        backgroundColor="#6a6a6c"
        foregroundColor="#999999"
        className={classes.loaderContentRow}
      >
        <circle cx="80" cy="50" r="50" />
        <rect x="150" y="8" rx="4" ry="4" width="40%" height="14" />
        <rect x="150" y="42" rx="4" ry="4" width="45%" height="14" />
        <rect x="150" y="78" rx="4" ry="4" width="50%" height="14" />
        <circle cx="79%" cy="40" r="30" />
        <circle cx="87%" cy="40" r="30" />
        <circle cx="95%" cy="40" r="30" />
      </ContentLoader>
    </Box>
  )
}
const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignContent: 'center',
  },
  loaderContentRow: {
    borderWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  loaderContentColumn: {
    borderWidth: 1,
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))
export default PreloadChannel
