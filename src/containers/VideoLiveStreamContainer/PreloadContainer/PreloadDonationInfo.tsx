import React from 'react'
import { Box } from '@material-ui/core'
import ContentLoader from 'react-content-loader'

export const PreloadDonationInfo: React.FC = (): JSX.Element => {
  return (
    <Box
      style={{
        backgroundColor: 'transparent',
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        alignContent: 'center',
        paddingRight: '15px',
      }}
    >
      <ContentLoader
        speed={1.5}
        width={'100%'}
        height={'130'}
        viewBox="0 0 1000 400"
        backgroundColor="#6a6a6c"
        foregroundColor="#999999"
        style={{
          borderWidth: 1,
          flexDirection: 'column',
        }}
      >
        <rect x="300" y="120" rx="4" ry="4" width="40%" height="20" />
        {/* <rect x="200" y="42" rx="4" ry="4" width="70%" height="16" /> */}
        <rect x="300" y="200" rx="4" ry="4" width="80%" height="20" />
        <circle cx="130" cy="190" r="130" />
      </ContentLoader>
    </Box>
  )
}

export default PreloadDonationInfo
