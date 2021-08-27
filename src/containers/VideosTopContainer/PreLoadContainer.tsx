import React from 'react'
import { Box } from '@material-ui/core'
import ContentLoader from 'react-content-loader'

export const PreLoadContainer: React.FC = () => {
  return (
    <Box style={{ backgroundColor: 'rgba(0,0,0,0.33)', borderRadius: 8 }}>
      <ContentLoader
        speed={4}
        viewBox="0 0 465 234"
        backgroundColor="#6a6a6c"
        foregroundColor="#999999"
        style={{ borderWidth: 1 }}
        // {...props}
      >
        <circle cx="27" cy="199" r="20" />
        <rect x="7" y="155" rx="4" ry="4" width="453" height="14" />
        <rect x="0" y="0" rx="8" ry="8" width="465" height="143" />
        <rect x="58" y="192" rx="4" ry="4" width="117" height="15" />
      </ContentLoader>
    </Box>
  )
}

export default PreLoadContainer
