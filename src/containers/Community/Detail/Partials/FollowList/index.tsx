import { useEffect, useState } from 'react'
import { Box, Typography, IconButton, Icon, Theme, Button } from '@material-ui/core'
import ESModal from '@components/Modal'
import ESLabel from '@components/Label'
import UserListItem from '@components/UserItem'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import InfiniteScroll from 'react-infinite-scroll-component'
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
import ESLoader from '@components/Loader'
import { MEMBER_ROLE } from '@constants/community.constants'

type Props = {
  community: CommunityDetail
}

const FollowList: React.FC<Props> = ({ community }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const hash_key = community.attributes.hash_key
  const [open, setOpen] = useState(false)
  const { isModerator, isAutomatic } = useCommunityHelper(community)
  const {
    getMembers,
    membersList,
    pages,
    resetMeta,
    membersMeta,
    approveMembers,
    cancelMembers,
    changeMemberRole,
    removeMember,
    sendToast,
  } = useFollowList()
  const [applyingValues, setApplyingValues] = useState<Array<CommunityMember>>([])
  const [participatingValues, setParticipatingValues] = useState<Array<CommunityMember>>([])
  const [initialValues, setInitialValues] = useState<Array<Array<CommunityMember>>>([])
  const [hasChosenApplying, setHasChosenApplying] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      getMembers({ hash_key: hash_key, role: CommunityMemberRole.all, page: 1 })
    }
    return () => {
      resetMeta()
    }
  }, [open])

  useEffect(() => {
    const participating = _.filter(
      membersList,
      (m) => m.attributes.member_role != MEMBER_ROLE.ADMIN && m.attributes.member_role != MEMBER_ROLE.REQUESTED
    )
    const applying = _.filter(membersList, (m) => m.attributes.member_role == MEMBER_ROLE.REQUESTED)
    setParticipatingValues(participating)
    setApplyingValues(applying)
    setInitialValues([applying, participating])
  }, [membersList])

  const hasNextPage = pages && Number(pages.current_page) !== Number(pages.total_pages)

  const loadMore = () => {
    if (hasNextPage) {
      getMembers({ hash_key: hash_key, role: CommunityMemberRole.all, page: Number(pages.current_page) + 1 })
    }
  }

  const getDetailAndToast = () => {
    getMembers({ hash_key: hash_key, role: CommunityMemberRole.all, page: pages.current_page })
    sendToast(t('common:community.change_applying_members_toast'))
  }

  const handleApplyingParam = (data, role) => {
    return _.map(
      _.filter(data, (d) => handleValue(d.attributes.member_role) == role),
      (m) => m.attributes.id
    )
  }

  const handleValue = (value) => {
    switch (Number(value)) {
      case MEMBER_ROLE.ON_HOLD:
        return MEMBER_ROLE.REQUESTED
      case MEMBER_ROLE.NOT_MEMBER:
        return null
      default:
        return Number(value)
    }
  }

  const handleSubmit = async () => {
    const data: Array<CommunityMember> = _.differenceWith(applyingValues, initialValues[0], _.isEqual)
    const approve = handleApplyingParam(data, MEMBER_ROLE.MEMBER)
    const cancel = handleApplyingParam(data, null)

    if (approve.length > 0) {
      await approveMembers({ hash_key: hash_key, data: { member_ids: approve } })
    }
    if (cancel.length > 0) {
      await cancelMembers({ hash_key: hash_key, data: { member_ids: cancel } })
    }
    getDetailAndToast()
    setHasChosenApplying(false)
  }

  const handleSelectedValue = async (isApplying: boolean, id: number, value: number) => {
    const data = JSON.parse(JSON.stringify(isApplying ? applyingValues : participatingValues))

    _.set(_.find(data, { attributes: { id: id } }), 'attributes.member_role', Number(value))

    if (isApplying) {
      setApplyingValues(data)
    } else {
      setParticipatingValues(data)
      if (Number(value) == MEMBER_ROLE.LEAVE) {
        await removeMember({ data: { member_id: id }, hash_key: hash_key })
        getDetailAndToast()
      } else {
        changeMemberRole({ data: { member_id: id, member_role: handleValue(value) }, hash_key: hash_key })
        sendToast(t('common:community.change_applying_members_toast'))
      }
    }
    isApplying && setHasChosenApplying(true)
  }

  const renderMemberList = () => {
    return (
      <Box>
        {participatingValues.map((participant, i) => (
          <UserListItem data={participant} key={i} nicknameYellow={false} />
        ))}
      </Box>
    )
  }

  const renderAdminMemberList = () => {
    return (
      <Box mt={3}>
        {!isAutomatic && applyingValues.length > 0 && (
          <>
            <ESLabel label={t('common:community.applying')} />
            <Box mt={4} height="100%" paddingRight={10} className={`${classes.scroll} ${classes.list}`}>
              {applyingValues.map((member, i) => {
                return <UserSelectBoxList key={i} member={member} isApplying setValue={handleSelectedValue} />
              })}
            </Box>
          </>
        )}
        <ESLabel label={t('common:community.participating')} />
        <Box mt={4} height="100%" paddingRight={10} className={`${classes.scroll} ${classes.list}`}>
          {participatingValues.map((member, i) => {
            return <UserSelectBoxList key={i} member={member} setValue={handleSelectedValue} />
          })}
        </Box>
      </Box>
    )
  }

  return (
    <Box>
      <Box display="flex">
        <LoginRequired>
          <Button style={{ marginLeft: -6 }} onClick={handleClickOpen}>
            <Box display="flex" className={classes.rowContainer}>
              <Typography>{t('common:following.title')}</Typography>
              <Box display="flex" className={classes.countContainer}>
                <Typography className={classes.count}>{FormatHelper.kFormatter(participatingValues.length)}</Typography>
                <Typography>{t('common:followers.th')}</Typography>
              </Box>
            </Box>
          </Button>
        </LoginRequired>
        {isModerator && !!applyingValues && applyingValues.length > 0 && (
          <Typography className={classes.linkUnapproved} variant="body2">
            {t('common:community.unapproved_users_title')}
          </Typography>
        )}
      </Box>
      <ESModal open={open} handleClose={handleClose}>
        <ESStickyFooter
          disabled={false}
          noScroll
          show={isModerator && applyingValues.length > 0}
          content={
            <>
              <ButtonPrimary
                round
                className={`${classes.footerButton} ${classes.confirmButton}`}
                onClick={handleSubmit}
                disabled={!hasChosenApplying}
              >
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
              {!!membersList && membersList.length > 0 && (
                <Box id="scrollableDiv" style={{ height: 600, paddingRight: 10 }} className={`${classes.scroll} ${classes.list}`}>
                  <InfiniteScroll
                    dataLength={membersList.length}
                    next={loadMore}
                    hasMore={hasNextPage}
                    scrollableTarget="scrollableDiv"
                    scrollThreshold={0.99}
                    style={{ overflow: 'hidden ' }}
                    loader={null}
                  >
                    {isModerator ? renderAdminMemberList() : renderMemberList()}
                  </InfiniteScroll>
                </Box>
              )}
              {membersMeta.pending && (
                <Box className={classes.loader}>
                  <ESLoader />
                </Box>
              )}
            </Box>
          </BlankLayout>
        </ESStickyFooter>
      </ESModal>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  rowContainer: {
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  countContainer: {
    marginLeft: theme.spacing(1),
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
  linkUnapproved: {
    textDecoration: 'underline',
    color: 'yellow',
    marginLeft: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
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
