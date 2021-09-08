import React from 'react'
import { Box } from '@material-ui/core'
import ContentLoader from 'react-content-loader'

export const PreloadChatContent: React.FC = (): JSX.Element => {
  return (
    <Box
      style={{ backgroundColor: 'transparent', display: 'flex', position: 'relative', justifyContent: 'center', alignContent: 'center' }}
    >
      <ContentLoader
        speed={1.5}
        width={'100%'}
        height={100}
        viewBox="0 0 1000 100"
        backgroundColor="#6a6a6c"
        foregroundColor="#999999"
        style={{
          borderWidth: 1,
          justifyContent: 'space-around',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <rect x="24" y="8" rx="4" ry="4" width="60%" height="16" />
        <rect x="24" y="42" rx="4" ry="4" width="80%" height="16" />
        <rect x="24" y="78" rx="4" ry="4" width="60%" height="16" />
      </ContentLoader>
    </Box>
  )
}

export default PreloadChatContent
