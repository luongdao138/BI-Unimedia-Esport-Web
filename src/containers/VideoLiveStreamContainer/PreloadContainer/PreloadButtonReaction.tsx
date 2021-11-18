import React from 'react'
import { Box, makeStyles } from '@material-ui/core'
import ContentLoader from 'react-content-loader'

export const PreloadButtonReaction: React.FC = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <ContentLoader
        speed={1.5}
        width={'100%'}
        viewBox="0 0 1000 100"
        backgroundColor="#6a6a6c"
        foregroundColor="#999999"
        className={classes.loaderContentRow}
      >
        <rect x="0" y="16" rx="8" ry="8" width="15%" height="16" />
        <rect x="18%" y="16" rx="8" ry="8" width="15%" height="16" />
        <rect x="36%" y="16" rx="8" ry="8" width="15%" height="16" />
        <rect x="54%" y="16" rx="8" ry="8" width="15%" height="16" />
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
export default PreloadButtonReaction
