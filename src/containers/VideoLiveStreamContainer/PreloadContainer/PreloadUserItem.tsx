import React from 'react'
import { Box, makeStyles } from '@material-ui/core'
import ContentLoader from 'react-content-loader'

export const PreloadUserItem: React.FC = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Box style={{ backgroundColor: 'transparent', borderRadius: 8 }}>
      <ContentLoader
        speed={1.5}
        viewBox="0 0 1000 64"
        height={50}
        backgroundColor="#6a6a6c"
        foregroundColor="#999999"
        className={classes.loadingContainer}
      >
        <circle cx="52" cy="32" r="32" />
        <circle cx="142" cy="32" r="32" />
        <circle cx="232" cy="32" r="32" />
        <circle cx="322" cy="32" r="32" />
        <circle cx="412" cy="32" r="32" />
      </ContentLoader>
    </Box>
  )
}
const useStyles = makeStyles(() => ({
  container: {},
  loadingContainer: {},
}))
export default PreloadUserItem
