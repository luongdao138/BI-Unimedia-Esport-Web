import { useEffect, useState } from 'react'
import { Box, Typography, IconButton, Icon, Theme, Button } from '@material-ui/core'
import ESModal from '@components/Modal'
import ESLabel from '@components/Label'
import UserListItem from '@components/UserItem'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import BlankLayout from '@layouts/BlankLayout'
import LoginRequired from '@containers/LoginRequired'
import ESStickyFooter from '@components/StickyFooter'
import ButtonPrimary from '@components/ButtonPrimary'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import useCommunityHelper from '@containers/Community/hooks/useCommunityHelper'
import { CommunityDetail, CommunityMember } from '@services/community.service'
import UserSelectBoxList from '../../../Partials/UserSelectBoxList'
import useFollowList from './useFollowList'

type Props = {
  community: CommunityDetail
}

const FollowList: React.FC<Props> = ({ community }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [members, setMembers] = useState<Array<CommunityMember>>([])
  const { isModerator, isAutomatic } = useCommunityHelper(community)
  const { /* getMembers, */ membersList, resetMembers } = useFollowList()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    setMembers(membersList)
  }, [members])

  useEffect(() => {
    if (open) {
      // TODO add params
      // getMembers()
    } else {
      resetMembers()
    }
    return () => resetMembers()
  }, [open])

  const userData = (participant) => {
    const _user = participant.attributes.user
    return { id: _user.id, attributes: { ..._user, nickname: participant.attributes.name, avatar: participant.attributes.avatar_url } }
  }

  const handleSubmit = () => {
    //
  }

  const handleValue = () => {
    // let
  }

  const dummyData = [
    {
      id: '4371',
      type: 'community_participant',
      attributes: {
        role: 'participant',
        name: 'わたなべ',
        user: {
          id: 2144,
          nickname: 'わたなべ',
          user_code: 'watanabe',
        },
        avatar_url: 'https://s3-ap-northeast-1.amazonaws.com/dev-esports-avatar/2144/1625798112-2144.jfif',
        is_followed: false,
        is_blocked: false,
      },
    },
    {
      id: '4371',
      type: 'community_participant',
      attributes: {
        role: 'participant',
        name: 'たなべ',
        user: {
          id: 2144,
          nickname: 'わたなべ',
          user_code: 'watanabe',
        },
        avatar_url: null,
        is_followed: false,
        is_blocked: false,
      },
    },
    {
      id: '4371',
      type: 'community_participant',
      attributes: {
        role: 'participant',
        name: 'わたなべ',
        user: {
          id: 2144,
          nickname: 'わたなべ',
          user_code: 'watanabe',
        },
        avatar_url: 'https://s3-ap-northeast-1.amazonaws.com/dev-esports-avatar/2144/1625798112-2144.jfif',
        is_followed: false,
        is_blocked: false,
      },
    },
  ]

  const renderMemberList = () => {
    return (
      <div id="scrollableDiv" style={{ height: 600, paddingRight: 10 }} className={`${classes.scroll} ${classes.list}`}>
        {dummyData.map((participant, i) => (
          <UserListItem data={userData(participant)} key={i} nicknameYellow={false} />
        ))}
      </div>
    )
  }

  const renderAdminMemberList = () => {
    return (
      <Box mt={3}>
        {isAutomatic && (
          <>
            <ESLabel label={t('common:community.applying')} />
            <Box mt={4} />
            <Box height="100%" paddingRight={10} className={`${classes.scroll} ${classes.list}`}>
              {dummyData.map((m, i) => {
                return (
                  <UserSelectBoxList
                    key={i}
                    username={m.attributes.user.nickname}
                    nickname={m.attributes.user.user_code}
                    avatar={m.attributes.avatar_url}
                    isAutomatic
                    value={handleValue}
                  />
                  // <UserSelectBoxList key={i} username={m.attributes.nickname} nickname={m.attributes.user_code} avatar={m.attributes.profile} isAutomatic/>
                )
              })}
            </Box>
          </>
        )}
        <ESLabel label={t('common:community.participating')} />
        <Box mt={4} />
        <Box height="100%" paddingRight={10} className={`${classes.scroll} ${classes.list}`}>
          {dummyData.map((d, i) => {
            return (
              <UserSelectBoxList
                key={i}
                username={d.attributes.user.nickname}
                nickname={d.attributes.user.user_code}
                avatar={d.attributes.avatar_url}
              />
              // <UserSelectBoxList key={i} username={d.attributes.nickname} nickname={d.attributes.user_code} avatar={d.attributes.profile} />
            )
          })}
        </Box>
      </Box>
    )
  }

  return (
    <div>
      <LoginRequired>
        <Button style={{ marginLeft: -6 }} onClick={handleClickOpen}>
          <Box display="flex" className={classes.rowContainer}>
            <Typography>{t('common:following.title')}</Typography>
            <Box display="flex" className={classes.countContainer}>
              <Typography className={classes.count}>{FormatHelper.kFormatter(999)}</Typography>
              <Typography>{t('common:followers.th')}</Typography>
            </Box>
          </Box>
        </Button>
      </LoginRequired>
      <ESModal open={open} handleClose={handleClose}>
        <ESStickyFooter
          disabled={false}
          noScroll
          show={!isModerator}
          content={
            <>
              <ButtonPrimary round className={`${classes.footerButton} ${classes.confirmButton}`} onClick={handleSubmit}>
                {t('common:community.confirm_follow_list')}
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
              {!isModerator ? renderAdminMemberList() : renderMemberList()}
            </Box>
          </BlankLayout>
        </ESStickyFooter>
      </ESModal>
    </div>
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
    marginRight: theme.spacing(1.25),
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

export default FollowList
