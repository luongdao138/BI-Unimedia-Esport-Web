import { useEffect, useState } from 'react'
import VideoSearchContainer from '@containers/Search/VideoSearch'
import { Box, makeStyles, Typography, IconButton, Icon, Theme } from '@material-ui/core'
import { searchTypes } from '@constants/common.constants'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { Colors } from '@theme/colors'
import PageWithLayoutType from '@constants/page'
import useSearch from '@containers/Search/useSearch'
import StreamLayout from '@layouts/StreamLayout'

const SearchPage: PageWithLayoutType = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()
  const { searchType, searchKeyword } = useSearch()
  const [type, setType] = useState<number>(searchType)
  const [keyword, setKeyword] = useState<string>(searchKeyword)

  useEffect(() => {
    setType(searchType)
    setKeyword(searchKeyword)
  }, [searchType, searchKeyword])

  const renderSwitch = () => {
    switch (type) {
      case searchTypes.VIDEO:
        return <VideoSearchContainer />
      default:
        return <></>
    }
  }

  const renderKeyword = () => {
    switch (type) {
      case searchTypes.VIDEO:
        if (keyword) {
          return t('common:video.video_results').replace(/:key/gi, keyword)
        }
        return t('common:user.user_results_all')
      default:
        return <></>
    }
  }

  return (
    <StreamLayout minimizeLayout>
      <Box className={classes.wrapContainer}>
        <Box py={2} pl={3} display="flex" flexDirection="row" alignItems="center" borderBottom="1px solid #70707070">
          <IconButton className={classes.iconButtonBg} onClick={() => router.back()}>
            <Icon className={`fa fa-arrow-left ${classes.icon}`} fontSize="small" />
          </IconButton>
          <Typography variant="h2" className={classes.label}>
            {renderKeyword()}
          </Typography>
        </Box>
        <Box className={classes.wrapContent}>{renderSwitch()}</Box>
      </Box>
    </StreamLayout>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    marginRight: theme.spacing(2),
  },
  icon: {
    fontSize: 12,
  },
  container: {
    padding: 24,
    paddingTop: 16,
  },
  label: {
    wordBreak: 'break-all',
    fontWeight: 'bold',
  },
  wrapContainer: {
    background: "url(/images/pattern.png) center 60px repeat-x #212121 fixed", 
    paddingRight: "98px",
    minHeight: '100vh',
  },
  wrapContent: {
    padding: '0 24px 24px',
  },
  [theme.breakpoints.down(1281)]: {
    wrapContainer: {
      paddingRight: 24
    },
  },
  [theme.breakpoints.down(769)]: {
    wrapContainer: {
      paddingRight: 0
    },
  }
}))

export default SearchPage
