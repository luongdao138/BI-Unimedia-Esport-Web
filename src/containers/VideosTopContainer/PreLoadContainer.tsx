import React from 'react'
import { Box } from '@material-ui/core'
import ContentLoader from 'react-content-loader'

export const PreLoadContainer: React.FC = () => {
  return (
    <Box style={{ backgroundColor: 'rgba(0,0,0,0.33)', borderRadius: 8 }}>
      <ContentLoader
        speed={4}
        viewBox="0 0 465 368"
        backgroundColor="#6a6a6c"
        foregroundColor="#999999"
        style={{ borderWidth: 1 }}
        // {...props}
      >
        <rect x="8" y="272" rx="4" ry="4" width="453" height="16" />
        <rect x="0" y="0" rx="8" ry="8" width="465" height="256" />
        <circle cx="40" cy="334" r="30" />
        <rect x="92" y="328" rx="4" ry="4" width="160" height="16" />
      </ContentLoader>
    </Box>
  )
}

export default PreLoadContainer
