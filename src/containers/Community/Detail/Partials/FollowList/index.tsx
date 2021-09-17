import { useEffect, useState } from 'react'
import { Box, Typography, IconButton, Icon, Theme, Button, Grid } from '@material-ui/core'
import ESModal from '@components/Modal'
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
import useCommunityDetail from '../../useCommunityDetail'

type Props = {
  community: CommunityDetail
}

type GroupedMembers = {
  title: string
  value: CommunityMember[]
  isApplying: boolean
}

enum MemberSection {
  applying,
  participating,
}

const FollowList: React.FC<Props> = ({ community }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const hash_key = community.attributes.hash_key
  const [open, setOpen] = useState(false)
  const { isModerator } = useCommunityHelper(community)
  const {
    getMembers,
    membersList,
    pages,
    resetMembers,
    membersMeta,
    approveMembers,
    cancelMembers,
    changeMemberRole,
    removeMember,
    sendToast,
    resetMeta,
  } = useFollowList()
  const { getCommunityDetail } = useCommunityDetail()
  const [hasChanged, setHasChanged] = useState(false)
  const [groupedMembers, setGroupedMembers] = useState<GroupedMembers[]>([])
  const [initialValue, setInitialValue] = useState<GroupedMembers[]>([])

  useEffect(() => {
    if (membersList) {
      const data = _.map(
        _.groupBy(membersList, (m) => m.attributes.member_role == MEMBER_ROLE.REQUESTED),
        (m) => {
          return {
            title:
              m[MemberSection.applying].attributes.member_role == MEMBER_ROLE.REQUESTED
                ? t('common:community.applying')
                : t('common:community.participating'),
            value: m,
            isApplying: m[MemberSection.applying].attributes.member_role == MEMBER_ROLE.REQUESTED ? true : false,
          }
        }
      )
      !data[MemberSection.applying]?.isApplying && data.unshift({ value: [] } as GroupedMembers)
      !data[MemberSection.participating] && data.push({ value: [] } as GroupedMembers)
      setGroupedMembers(data)
      setInitialValue(data)
    }
  }, [membersList])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    getCommunityDetail(hash_key)
  }

  useEffect(() => {
    if (open) {
      getMembers({ hash_key: hash_key, role: CommunityMemberRole.all, page: 1 })
    } else {
      resetMembers()
      resetMeta()
    }
  }, [open])

  const hasNextPage = pages && Number(pages.current_page) !== Number(pages.total_pages)

  const loadMore = () => {
    if (hasNextPage) {
      getMembers({ hash_key: hash_key, role: CommunityMemberRole.all, page: Number(pages.current_page) + 1 })
      setHasChanged(false)
    }
  }

  const getDetailAndToast = () => {
    getMembers({ hash_key: hash_key, role: CommunityMemberRole.all, page: 1 })
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
    const applyingData: CommunityMember[] = _.differenceWith(
      groupedMembers[MemberSection.applying].value,
      initialValue[MemberSection.applying].value,
      _.isEqual
    )
    const participatingData: CommunityMember[] =
      groupedMembers[MemberSection.participating] &&
      _.differenceWith(groupedMembers[MemberSection.participating].value, initialValue[MemberSection.participating].value, _.isEqual)

    let approveUsers, cancelUsers, makeCoOrganizers, makeUsers, kickUsers
    if (!_.isEmpty(applyingData)) {
      approveUsers = handleApplyingParam(applyingData, MEMBER_ROLE.MEMBER)
      cancelUsers = handleApplyingParam(applyingData, null)
      if (!_.isEmpty(approveUsers)) {
        await approveMembers({ hash_key: hash_key, data: { member_ids: approveUsers } })
      }
      if (!_.isEmpty(cancelUsers)) {
        await cancelMembers({ hash_key: hash_key, data: { member_ids: cancelUsers } })
      }
      getDetailAndToast()
    }
    if (!_.isEmpty(participatingData)) {
      makeCoOrganizers = handleApplyingParam(participatingData, MEMBER_ROLE.CO_ORGANIZER)
      makeUsers = handleApplyingParam(participatingData, MEMBER_ROLE.MEMBER)
      kickUsers = handleApplyingParam(participatingData, MEMBER_ROLE.LEAVE)
      if (!_.isEmpty(makeCoOrganizers)) {
        await changeMemberRole({ hash_key: hash_key, data: { member_ids: makeCoOrganizers, member_role: MEMBER_ROLE.CO_ORGANIZER } })
      }
      if (!_.isEmpty(makeUsers)) {
        await changeMemberRole({ hash_key: hash_key, data: { member_ids: makeUsers, member_role: MEMBER_ROLE.MEMBER } })
      }
      if (!_.isEmpty(kickUsers)) {
        await removeMember({ hash_key: hash_key, data: { member_ids: kickUsers } })
      }
      getDetailAndToast()
    }
    setHasChanged(false)
  }

  const handleSelectedValue = async (isApplying: boolean, id: number, value: number) => {
    const data = JSON.parse(JSON.stringify(groupedMembers))

    _.set(
      _.find(data[!isApplying ? MemberSection.participating : MemberSection.applying].value, { attributes: { id: id } }),
      'attributes.member_role',
      Number(value)
    )

    setGroupedMembers(data)
    setHasChanged(true)
  }

  const userData = (participant) => {
    const _user = participant.attributes

    return { id: _user.id, attributes: { ..._user, avatar: _user.profile } }
  }

  const renderMemberList = () => {
    return (
      <Box>
        {groupedMembers[MemberSection.participating].value.map((participant, i) => (
          <UserListItem data={userData(participant)} key={i} nicknameYellow={false} />
        ))}
      </Box>
    )
  }

  const renderAdminMemberList = () => {
    return (
      <Box mt={4} height="100%" className={`${classes.scroll} ${classes.list}`}>
        {_.isArray(groupedMembers) &&
          groupedMembers
            .filter((g) => !_.isEmpty(g.value))
            .map((member, i) => {
              return (
                <Box key={i}>
                  <Typography key={i} variant="h3" className={classes.label}>
                    {member.title}
                  </Typography>
                  {!_.isEmpty(member) &&
                    member.value.map((m, j) => {
                      return <UserSelectBoxList key={j} isApplying={member.isApplying} member={m} setValue={handleSelectedValue} />
                    })}
                </Box>
              )
            })}
      </Box>
    )
  }

  return (
    <Box>
      <Box display="flex">
        <LoginRequired>
          <Button style={{ marginLeft: -6 }} onClick={handleClickOpen}>
            <Box display="flex" className={classes.rowContainer}>
              <Typography>{t('common:followers.title')}</Typography>
              <Box display="flex" className={classes.countContainer}>
                <Typography className={classes.count}>{FormatHelper.kFormatter(community.attributes.member_count)}</Typography>
                <Typography>{t('common:followers.th')}</Typography>
              </Box>
            </Box>
          </Button>
        </LoginRequired>
        {isModerator && community.attributes.has_requested && (
          <Button onClick={handleClickOpen}>
            <Typography className={classes.linkUnapproved} variant="body2">
              {t('common:community.unapproved_users_title')}
            </Typography>
          </Button>
        )}
      </Box>
      <ESModal open={open} handleClose={handleClose}>
        <ESStickyFooter
          disabled={false}
          noScroll
          show={isModerator}
          content={
            <>
              <ButtonPrimary
                round
                className={`${classes.footerButton} ${classes.confirmButton}`}
                onClick={handleSubmit}
                disabled={!hasChanged}
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
              {!_.isEmpty(groupedMembers) && !_.isEmpty(membersList) && (
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
                <Grid item xs={12}>
                  <Box my={4} display="flex" justifyContent="center" alignItems="center">
                    <ESLoader />
                  </Box>
                </Grid>
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
    alignItems: 'flex-end',
  },
  countContainer: {
    marginLeft: theme.spacing(0.5),
    alignItems: 'flex-end',
  },
  count: {
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: '28px',
    color: Colors.white,
  },
  label: {
    fontWeight: 'normal',
    marginBottom: theme.spacing(3.5),
  },
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
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
    marginLeft: theme.spacing(1),
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
