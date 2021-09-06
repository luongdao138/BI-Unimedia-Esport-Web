import React from 'react'
import { LobbyDetail } from '@services/lobby.service'
import { Box, makeStyles, Theme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import { UserProfile } from '@services/user.service'
import RemainingDate from './Partials/RemainingDate'
import { LOBBY_PARTICIPANT_STATUS, LOBBY_STATUS } from '@constants/lobby.constants'
import StatusText from './Partials/StatusText'
import EntryMembersCount from '@components/EntryMembersCount'
import _ from 'lodash'

interface Props {
  lobby: LobbyDetail
  userProfile?: UserProfile
}

const SubStatusInfo: React.FC<Props> = ({ lobby }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const { status, is_freezed, participant_status, is_owner, entry_count, participants_count, max_participants } = lobby.attributes

  const isNotEntered = participant_status === null
  const isParticipant = participant_status === LOBBY_PARTICIPANT_STATUS.SELECTED
  const isNotParticipant = participant_status === LOBBY_PARTICIPANT_STATUS.NOT_SELECTED

  const entryClosedText = t('common:lobby.status.entry_closed') // 受付終了
  const notEnteredText = t('common:lobby.status.not_entered') // 実施中
  const participatedText = t('common:lobby.status.participated') // 参加中
  const notParticipatedText = t('common:lobby.status.not_participated') // 落選

  const entryMembersCount = is_freezed
    ? _.defaultTo(participants_count, 0)
    : _.defaultTo(entry_count, 0) + _.defaultTo(participants_count, 0)

  const maxMembersCount = _.defaultTo(max_participants, 0)

  const renderStatusInfo = () => {
    switch (status) {
      case LOBBY_STATUS.READY:
      case LOBBY_STATUS.RECRUITING:
        return <RemainingDate lobby={lobby} />
      case LOBBY_STATUS.ENTRY_CLOSED: {
        if (is_owner) return <RemainingDate lobby={lobby} />
        else {
          if (!is_freezed) {
            return <StatusText value={entryClosedText} />
          }
          if (is_freezed) {
            if (isNotEntered) return <RemainingDate lobby={lobby} />
            else if (isParticipant) return <RemainingDate lobby={lobby} />
            else if (isNotParticipant) return <StatusText value={notParticipatedText} />
          }
        }
        break
      }
      case LOBBY_STATUS.IN_PROGRESS: {
        if (isNotEntered) return <StatusText value={notEnteredText} />
        else if (isParticipant) return <StatusText value={participatedText} />
        else if (isNotParticipant) return <StatusText value={notParticipatedText} />
        break
      }
      case LOBBY_STATUS.ENDED:
        return <StatusText value={t('common:lobby.status.ended')} /> // 終了
      case LOBBY_STATUS.CANCELLED:
        return <StatusText value={t('common:lobby.status.cancelled')} isImportant /> // この募集は中止されました
      case LOBBY_STATUS.DELETED:
        return null // TODO
      default:
        return null
    }
  }

  const renderEntryMembersInfo = () => {
    if (status === LOBBY_STATUS.CANCELLED || status === LOBBY_STATUS.DELETED) return null

    return <EntryMembersCount entryCount={entryMembersCount} maxCount={maxMembersCount} />
  }

  return (
    <Box className={classes.body}>
      {renderStatusInfo()}
      {renderEntryMembersInfo()}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  roundInfoText: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  yellow: {
    color: Colors.yellow,
  },
}))

export default SubStatusInfo
