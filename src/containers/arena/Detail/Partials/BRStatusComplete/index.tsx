import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import { Colors } from '@theme/colors'

import { TournamentDetail } from '@services/arena.service'
import BRHeaderContent from '../BRHeaderContent'
import ESButton from '@components/Button'
import useArenaHelper from '@containers/arena/hooks/useArenaHelper'
import ActionLabelButton from '../ActionComponent/ActionLabelButton'
import { ButtonGroup } from '../BRHeaderContent'
import useBRStatusComplete from './useBRStatusComplete'

import WinnerAvatar from './WinnerAvatar'
import ESLoader from '@components/FullScreenLoader'
import ButtonPrimary from '@components/ButtonPrimary'
import SummaryModal from '../SummaryModal'
import moment from 'moment'

interface BRStatusBRStatusCompleteProps {
  arena: TournamentDetail
}
const BRStatusComplete: React.FC<BRStatusBRStatusCompleteProps> = ({ arena }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const dateInterval = `${TournamentHelper.formatDate(arena.attributes.start_date)} ～ ${TournamentHelper.formatDate(
    arena.attributes.end_date
  )}`
  const { toParticipants, isModerator, isTeamLeader, toMatches, isFreezed, isParticipant, toResults } = useArenaHelper(arena)
  const { winner, winnerMeta } = useBRStatusComplete()

  const [showSummaryModal, setShowSummaryModal] = useState(false)
  if (winnerMeta.pending) return <ESLoader open />

  return (
    <BRHeaderContent
      header={
        <Typography className={classes.header}>
          {t('tournament.holding_period')}
          <span> {dateInterval}</span>
        </Typography>
      }
      content={
        isFreezed ? (
          winnerMeta.loaded && (isTeamLeader || isModerator) ? (
            <Box display="flex" flexDirection="column" alignItems="center">
              {winner ? (
                <WinnerAvatar src={winner.avatar} name={winner.name} user_code={winner.user_code} />
              ) : (
                <>
                  <Box color="#fff">
                    <Typography variant="h5" gutterBottom>
                      {t('arena.status.completed')}
                    </Typography>
                  </Box>
                  <Typography>{t('arena.result_incomplete')}</Typography>
                </>
              )}
              <ButtonGroup mt={3}>
                <ESButton onClick={toParticipants} variant="outlined" fullWidth>
                  {t('tournament.participants')}
                </ESButton>
                {isModerator || (isTeamLeader && isParticipant) ? (
                  <ActionLabelButton variant="outlined" fullWidth onClick={toMatches} disabled={!(isModerator || isTeamLeader)}>
                    {t('arena.input_result')}
                  </ActionLabelButton>
                ) : null}
                <ESButton onClick={toResults} variant="outlined" fullWidth disabled={!winner}>
                  {t('tournament.results')}
                </ESButton>
              </ButtonGroup>
            </Box>
          ) : (
            <Box textAlign="center">
              <Typography color="secondary" variant="body1">
                {t('arena.result_incomplete')}
              </Typography>
            </Box>
          )
        ) : (
          <Box textAlign="center">
            <Typography color="secondary" variant="body1">
              {t('arena.not_held')}
            </Typography>
          </Box>
        )
      }
      footer={
        isModerator ? (
          <div className={classes.footerContainer}>
            <ButtonGroup size="large">
              <div>
                <ButtonPrimary
                  round
                  fullWidth
                  onClick={() => setShowSummaryModal(true)}
                  disabled={!winner || !moment().isSameOrAfter(moment(arena.attributes.end_date))}
                >
                  {t('tournament.summary')}
                </ButtonPrimary>
              </div>
            </ButtonGroup>
            <SummaryModal open={showSummaryModal} tournament={arena} handleClose={() => setShowSummaryModal(false)} />
          </div>
        ) : null
      }
    />
  )
}

const useStyles = makeStyles((theme) => ({
  header: {
    color: Colors.white_opacity['70'],
    '& span': {
      fontWeight: 700,
      paddingLeft: theme.spacing(1),
    },
  },
  footerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  [theme.breakpoints.down('sm')]: {
    header: {
      '& span': {
        display: 'block',
      },
    },
  },
}))

export default BRStatusComplete
