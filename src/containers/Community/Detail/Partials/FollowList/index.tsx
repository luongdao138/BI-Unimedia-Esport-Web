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
import { CommunityDetail, CommunityMember, ChangeCommunityMemberRoleParams } from '@services/community.service'
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

const initialValue: ChangeCommunityMemberRoleParams = {
  approve_members: [],
  cancel_members: [],
  remove_members: [],
  to_members: [],
  to_organizers: [],
  hash_key: '',
}

const FollowList: React.FC<Props> = ({ community }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const hash_key = community.attributes.hash_key
  const [open, setOpen] = useState(false)
  const { isModerator } = useCommunityHelper(community)
  const { getMembers, membersList, pages, resetMembers, membersMeta, submitMembers, resetMeta } = useFollowList()
  const { getCommunityDetail } = useCommunityDetail()
  const [hasChanged, setHasChanged] = useState(false)
  const [submitParams, setSubmitParams] = useState<ChangeCommunityMemberRoleParams | null>(initialValue)
  const [changedGroupedMembers, setChangedGroupedMembers] = useState<GroupedMembers[]>(null)
  const [groupedMembers, setGroupedMembers] = useState<GroupedMembers[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    return () => {
      resetMembers()
      resetMeta()
    }
  }, [])

  useEffect(() => {
    if (isSubmitting) {
      submitMembers(submitParams)
      setSubmitParams({ ...initialValue, hash_key: hash_key })
      setIsSubmitting(false)
    }
  }, [isSubmitting])

  const approve = (data: CommunityMember, index) => {
    index == 0
      ? setSubmitParams((prev) => {
          return { ...prev, approve_members: [...prev?.approve_members, data.attributes.id] }
        })
      : setSubmitParams((prev) => {
          return {
            ...prev,
            to_members: [...prev?.to_members, data.attributes.id],
          }
        })
  }
  const cancel = (data: CommunityMember) => {
    setSubmitParams((prev) => {
      return { ...prev, cancel_members: [...prev?.cancel_members, data.attributes.id] }
    })
  }
  const changeRole = (data: CommunityMember) => {
    setSubmitParams((prev) => {
      return {
        ...prev,
        to_organizers: [...prev?.to_organizers, data.attributes.id],
      }
    })
  }
  const remove = (data: CommunityMember) => {
    setSubmitParams((prev) => {
      return { ...prev, remove_members: [...prev?.remove_members, data.attributes.id] }
    })
  }
  const actionHandler = {
    [MEMBER_ROLE.MEMBER]: approve,
    [MEMBER_ROLE.NOT_MEMBER]: cancel,
    [MEMBER_ROLE.CO_ORGANIZER]: changeRole,
    [MEMBER_ROLE.LEAVE]: remove,
  }

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
      setChangedGroupedMembers(data)
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
      setSubmitParams({ ...initialValue, hash_key: hash_key })
      getMembers({ hash_key: hash_key, page: 1 })
    } else {
      resetMembers()
      resetMeta()
    }
  }, [open])

  const hasNextPage = pages && Number(pages.current_page) !== Number(pages.total_pages)

  const loadMore = () => {
    if (hasNextPage) {
      getMembers({ hash_key: hash_key, page: Number(pages.current_page) + 1 })
    }
  }

  const handleSubmit = () => {
    _.map(groupedMembers, (__, i) => {
      _.map(_.differenceWith(changedGroupedMembers[i].value, groupedMembers[i].value, _.isEqual), (m) => {
        const handler = actionHandler[m.attributes.member_role]
        if (handler) {
          handler(m, i)
        }
      })
    })
    setIsSubmitting(true)
    setHasChanged(false)
  }

  const handleSelectedValue = async (isApplying: boolean, id: number, value: number) => {
    const data = _.cloneDeep(changedGroupedMembers)
    _.set(
      _.find(data[!isApplying ? MemberSection.participating : MemberSection.applying].value, { attributes: { id: id } }),
      'attributes.member_role',
      Number(value)
    )
    setChangedGroupedMembers(data)
    setHasChanged(!_.isEqual(data, groupedMembers))
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
              {membersList.length === 0 && !membersMeta.loaded && membersMeta.pending && (
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
