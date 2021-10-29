import React from 'react'
import { Box, makeStyles } from '@material-ui/core'
import ContentLoader from 'react-content-loader'

export const PreloadChatContainer: React.FC = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <ContentLoader
        speed={1.5}
        width={'100%'}
        viewBox="0 0 1200 2400"
        backgroundColor="#6a6a6c"
        foregroundColor="#999999"
        className={classes.loaderContentRow}
      >
        <rect x="5%" y="0" rx="16" ry="16" width="90%" height="3%" />
        <rect x="5%" y="10%" rx="16" ry="16" width="90%" height="3%" />
        <rect x="5%" y="20%" rx="16" ry="16" width="90%" height="3%" />
        <rect x="5%" y="30%" rx="16" ry="16" width="90%" height="3%" />
        <rect x="5%" y="40%" rx="16" ry="16" width="90%" height="3%" />
        <rect x="5%" y="50%" rx="16" ry="16" width="90%" height="3%" />
        <rect x="5%" y="60%" rx="16" ry="16" width="90%" height="3%" />
        <rect x="5%" y="70%" rx="16" ry="16" width="90%" height="3%" />
        <rect x="5%" y="80%" rx="16" ry="16" width="90%" height="3%" />
        <rect x="5%" y="90%" rx="16" ry="16" width="90%" height="3%" />
      </ContentLoader>
    </Box>
  )
}
const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    position: 'relative',
    borderRadius: 16,
  },
  loaderContentRow: {
    borderWidth: 8,
    backgroundColor: '#6a6a6c',
  },
}))
export default PreloadChatContainer
