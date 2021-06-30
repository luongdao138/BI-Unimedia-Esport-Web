import { useEffect, useState } from 'react'
import { Box, Typography, IconButton, Icon, Theme, Divider } from '@material-ui/core'
import ESModal from '@components/Modal'
import ESLoader from '@components/Loader'
import useInteresteds from './useInteresteds'
import UserListItem from '@components/UserItem'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroll-component'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import BlankLayout from '@layouts/BlankLayout'
import { TournamentDetail } from '@services/arena.service'
import TeamMemberItemExpanded from '../TeamMemberItemExpanded'
import ButtonPrimary from '@components/ButtonPrimary'
import _ from 'lodash'

interface InterestedListProps {
  pid?: number
  tournament: TournamentDetail
  open: boolean
  handleClose: () => void
  onSelect: (participant) => void
  handleUnset: () => void
}

const InterestedList: React.FC<InterestedListProps> = ({ pid, tournament, open, handleClose, onSelect, handleUnset }) => {
  const data = tournament.attributes
  const hash_key = data.hash_key
  const isTeam = data.participant_type > 1
  const classes = useStyles()
  const [hasMore, setHasMore] = useState(true)

  const { t } = useTranslation(['common'])
  const { interesteds, getInteresteds, resetMeta, page, meta } = useInteresteds()

  useEffect(() => {
    if (open) getInteresteds({ page: 1, hash_key: hash_key, p_id: pid })

    return () => resetMeta()
  }, [open])

  const fetchMoreData = () => {
    if (page.current_page >= page.total_pages) {
      setHasMore(false)
      return
    }
    getInteresteds({ page: page.current_page + 1, hash_key: hash_key })
  }

  const userData = (participant) => {
    const _user = participant.attributes.user
    return { id: _user.id, attributes: { ..._user, nickname: participant.attributes.name, avatar: participant.attributes.avatar_url } }
  }

  const deselectBtn = (handle, label) => {
    return (
      <Box flexShrink={0} height="100%" display="flex" justifyContent="center" alignItems="center">
        <ButtonPrimary style={{ padding: '12px' }} size="small" gradient={false} onClick={handle}>
          {label}
        </ButtonPrimary>
      </Box>
    )
  }

  const selectedItem = () => {
    if (!pid || !interesteds || interesteds.length < 1) return

    const selected = _.find(interesteds, (p) => p.id == pid)
    if (!selected) return
    return isTeam ? (
      <TeamMemberItemExpanded team={selected} rightItem={deselectBtn(handleUnset, t('common:tournament.deselect'))} hideFollow />
    ) : (
      <UserListItem data={userData(selected)} rightItem={deselectBtn(handleUnset, t('common:tournament.deselect'))} />
    )
  }

  return (
    <ESModal open={open} handleClose={handleClose}>
      <BlankLayout>
        <Box pt={7.5} className={classes.topContainer}>
          <Box py={2} display="flex" flexDirection="row" alignItems="center">
            <IconButton className={classes.iconButtonBg} onClick={handleClose}>
              <Icon className="fa fa-arrow-left" fontSize="small" />
            </IconButton>
            <Box pl={2}>
              <Typography variant="h2">{t('common:tournament.select_user')}</Typography>
            </Box>
          </Box>
          {selectedItem()}
          <Divider />
          {meta.loaded && !interesteds.length && (
            <div className={classes.loaderCenter}>
              <Typography>{t('common:common.no_data')}</Typography>
            </div>
          )}
          <InfiniteScroll
            dataLength={interesteds.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              meta.pending && (
                <div className={classes.loaderCenter}>
                  <ESLoader />
                </div>
              )
            }
            height={600}
          >
            {isTeam
              ? _.filter(interesteds, (p) => p.id != pid).map((participant, i) => (
                  <Box py={1} key={`team${i}`}>
                    <TeamMemberItemExpanded
                      team={participant}
                      rightItem={deselectBtn(() => onSelect(participant), t('common:arena.choice'))}
                      hideFollow
                    />
                  </Box>
                ))
              : _.filter(interesteds, (p) => p.id != pid).map((participant, i) => (
                  <UserListItem
                    data={userData(participant)}
                    key={i}
                    rightItem={deselectBtn(() => onSelect(participant), t('common:arena.choice'))}
                  />
                ))}
          </InfiniteScroll>
        </Box>
      </BlankLayout>
    </ESModal>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
  },
  loaderCenter: {
    paddingTop: theme.spacing(2),
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

export default InterestedList
