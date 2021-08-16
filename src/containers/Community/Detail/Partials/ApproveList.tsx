import { useState } from 'react'
import { Box, Typography, IconButton, Icon, Theme, Link } from '@material-ui/core'
import ESModal from '@components/Modal'
import UserSelectBoxList from '../../Partials/UserSelectBoxList'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import BlankLayout from '@layouts/BlankLayout'
import LoginRequired from '@containers/LoginRequired'
import ESLabel from '@components/Label'
import ESStickyFooter from '@components/StickyFooter'
import ButtonPrimary from '@components/ButtonPrimary'
import i18n from '@locales/i18n'

const Participants: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const dummy_data = [
    {
      avatar: 'https://s3-ap-northeast-1.amazonaws.com/dev-esports-avatar/2144/1625798112-2144.jfif',
      username: 'わたなべ',
      mail: '@watanabe',
    },
    {
      avatar: '',
      username: 'わたなべわたなべわたなべわたなべわたなべわたなべわたなべわたなべわたなべわたなべわたなべわたなべわたなべ',
      mail: '@watanabeわたなべわたなべわたなべわたなべわたなべわたなべわたなべわたなべ',
    },
    {
      avatar: '',
      username: 'わたなべ',
      mail: '@watanabe',
    },
    {
      avatar: 'https://s3-ap-northeast-1.amazonaws.com/dev-esports-avatar/2144/1625798112-2144.jfif',
      username: 'わたなべ',
      mail: '@watanabe',
    },
    {
      avatar: 'https://s3-ap-northeast-1.amazonaws.com/dev-esports-avatar/2144/1625798112-2144.jfif',
      username: 'わたなべ',
      mail: '@watanabe',
    },
  ]

  return (
    <>
      <LoginRequired>
        <Box display="flex" alignItems="center" ml={2}>
          <Link className={classes.linkUnapproved} onClick={handleClickOpen}>
            {t('common:community.unapproved_users_title')}
          </Link>
        </Box>
      </LoginRequired>
      <ESModal open={open} handleClose={handleClose}>
        <ESStickyFooter
          disabled={false}
          noScroll
          content={
            <>
              <ButtonPrimary round className={`${classes.footerButton} ${classes.confirmButton}`}>
                {i18n.t('common:community.confirm_follow_list')}
              </ButtonPrimary>
            </>
          }
        >
          <BlankLayout>
            <Box pt={7.5} className={classes.topContainer}>
              <Box py={2} display="flex" flexDirection="row" alignItems="center">
                <IconButton className={classes.iconButtonBg} onClick={handleClose}>
                  <Icon className="fa fa-arrow-left" fontSize="small" />
                </IconButton>
                <Box pl={2}>
                  <Typography variant="h2">{t('common:community.follow_list')}</Typography>
                </Box>
              </Box>
              <Box mt={3} />
              <ESLabel label={t('common:community.applying')} />
              <Box mt={4} />
              <div id="scrollableDiv" style={{ height: '100%', paddingRight: 10 }} className={`${classes.scroll} ${classes.list}`}>
                {dummy_data.map((d, i) => {
                  return <UserSelectBoxList key={i} username={d.username} mail={d.mail} avatar={d.avatar} />
                })}
              </div>
              <ESLabel label={t('common:community.participating')} />
              <Box mt={4} />
              <div id="scrollableDiv" style={{ height: '100%', paddingRight: 10 }} className={`${classes.scroll} ${classes.list}`}>
                {dummy_data.map((d, i) => {
                  return <UserSelectBoxList key={i} username={d.username} mail={d.mail} avatar={d.avatar} />
                })}
              </div>
            </Box>
          </BlankLayout>
        </ESStickyFooter>
      </ESModal>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  rowContainer: {
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  countContainer: {
    marginLeft: 8,
    alignItems: 'center',
  },
  count: {
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 24,
    color: Colors.white,
  },
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
  },
  loaderCenter: {
    textAlign: 'center',
  },
  scroll: {
    scrollbarColor: '#222 transparent',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: 5,
      opacity: 1,
      padding: 2,
    },
    '&::-webkit-scrollbar-track': {
      paddingLeft: 1,
      background: 'rgba(0,0,0,0.5)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#222',
      borderRadius: 6,
    },
  },
  list: {
    overflow: 'auto',
    overflowX: 'hidden',
  },
  linkUnapproved: {
    textDecoration: 'underline',
    color: 'yellow',
    cursor: 'pointer',
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    topContainer: {
      paddingTop: 0,
    },
  },
}))

export default Participants
