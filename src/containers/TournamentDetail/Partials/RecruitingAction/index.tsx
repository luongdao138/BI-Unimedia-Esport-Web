import React from 'react'
import { TournamentDetail } from '@services/tournament.service'
import { Box } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
import IndividualEntryModal from './IndividualEntryModal'
import CloseRecruitmentModal from './CloseRecruitmentModal'
import useGetProfile from '@utils/hooks/useGetProfile'
import Summary from '../Summary'
// import { Colors } from '@theme/colors'
import TeamEntryModal from './TeamEntryModal'

interface RecruitingActionProps {
  tournament: TournamentDetail
}

const ROLE = {
  // TODO const
  ADMIN: 'admin',
  CO_ORGANIZER: 'co_organizer',
  PARTICIPANT: 'participant',
  INTERESTED: 'interested',
}
const STATUS = {
  // TODO const
  RECRUITING: 'recruiting',
}

const RecruitingAction: React.FC<RecruitingActionProps> = ({ tournament }) => {
  // const { t } = useTranslation(['common'])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const classes = useStyles()
  const { userProfile } = useGetProfile()

  // console.log('user', userProfile)
  // console.log(tournament)

  // eslint-disable-next-line no-console
  const handleClose = () => console.log('handle close')

  const renderEntryModals = () => {
    if (tournament.attributes.participant_type === 1) {
      return <IndividualEntryModal tournament={tournament} userProfile={userProfile} handleClose={handleClose} />
    } else {
      return <TeamEntryModal tournament={tournament} userProfile={userProfile} handleClose={handleClose} />
    }
  }

  const renderModals = () => {
    const role = tournament.attributes.my_role
    const isModerator = role === ROLE.ADMIN || role === ROLE.CO_ORGANIZER

    if (isModerator && status === STATUS.RECRUITING) {
      return renderModeratorModal()
    } else {
      return renderEntryModals()
    }
  }

  const renderModeratorModal = () => {
    return <CloseRecruitmentModal tournament={tournament} handleClose={handleClose} />
  }

  return (
    <Box>
      <Summary detail={tournament} />

      {renderModals()}
    </Box>
  )
}

// const useStyles = makeStyles((theme: Theme) => ({
//   actionButtonContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     marginTop: 24,
//   },
//   actionButton: {
//     width: theme.spacing(35),
//   },
//   description: {
//     marginTop: 24,
//     color: Colors.grey[300],
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// }))

export default RecruitingAction
