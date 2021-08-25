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
import { CommunityDetail, CommunityMember, CommunityMemberRole } from '@services/community.service'
import UserSelectBoxList from '../../../Partials/UserSelectBoxList'
import useFollowList from './useFollowList'
import _ from 'lodash'
import { useRouter } from 'next/router'
import ESLoader from '@components/Loader'

type Props = {
  community: CommunityDetail
}

const FollowList: React.FC<Props> = ({ community }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { isModerator, isAutomatic } = useCommunityHelper(community)
  const { getMembers, membersList, resetMembers, membersMeta } = useFollowList()
  const [applyingValues, setApplyingValues] = useState<Array<CommunityMember>>([])
  const [participatingValues, setParticipatingValues] = useState<Array<CommunityMember>>([])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      getMembers({ hash_key: String(router.query.community_id), role: CommunityMemberRole.all })
    } else {
      resetMembers()
    }
    return () => resetMembers()
  }, [open])

  useEffect(() => {
    const participating = _.filter(
      membersList,
      (m) => m.attributes.member_role != CommunityMemberRole.admin && m.attributes.member_role != CommunityMemberRole.requested
    )
    const applying = _.filter(membersList, (m) => m.attributes.member_role == CommunityMemberRole.requested)
    setParticipatingValues(participating)
    setApplyingValues(applying)
  }, [membersList])

  const userData = (participant) => {
    const _user = participant.attributes.user
    return { id: _user.id, attributes: { ..._user, nickname: participant.attributes.name, avatar: participant.attributes.avatar_url } }
  }

  const handleSubmit = () => {
    //
  }

  const renderMemberList = () => {
    return (
      <div id="scrollableDiv" style={{ height: 600, paddingRight: 10 }} className={`${classes.scroll} ${classes.list}`}>
        {applyingValues.map((participant, i) => (
          <UserListItem data={userData(participant)} key={i} nicknameYellow={false} />
        ))}
      </div>
    )
  }

  const renderAdminMemberList = () => {
    return (
      <Box mt={3}>
        {isAutomatic && applyingValues.length > 0 && (
          <>
            <ESLabel label={t('common:community.applying')} />
            <Box mt={4} />
            <Box height="100%" paddingRight={10} className={`${classes.scroll} ${classes.list}`}>
              {applyingValues.map((member, i) => {
                return <UserSelectBoxList key={i} member={member} isAutomatic />
              })}
            </Box>
          </>
        )}
        <ESLabel label={t('common:community.participating')} />
        <Box mt={4} />
        <Box height="100%" paddingRight={10} className={`${classes.scroll} ${classes.list}`}>
          {participatingValues.map((member, i) => {
            return <UserSelectBoxList key={i} member={member} />
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
          show={isModerator}
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
              {membersMeta.loaded && (isModerator ? renderAdminMemberList() : renderMemberList())}
              {membersMeta.pending && (
                <Box className={classes.loader}>
                  <ESLoader />
                </Box>
              )}
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
  loader: {
    textAlign: 'center',
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
