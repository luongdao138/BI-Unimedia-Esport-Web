import React from 'react'
import { TournamentDetail } from '@services/tournament.service'
import { Box, makeStyles, Theme } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
import IndividualEntryModal from './IndividualEntryModal'
import CloseRecruitmentModal from './CloseRecruitmentModal'
import useGetProfile from '@utils/hooks/useGetProfile'
import Summary from '../Summary'
import { Colors } from '@theme/colors'
import TeamEntryModal from './TeamEntryModal'

interface RecruitingActionProps {
  tournament: TournamentDetail
}
const RecruitingAction: React.FC<RecruitingActionProps> = ({ tournament }) => {
  // const { t } = useTranslation(['common'])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const classes = useStyles()
  const { userProfile } = useGetProfile()

  // console.log('user', userProfile)
  // console.log(tournament)

  // eslint-disable-next-line no-console
  const handleClose = () => console.log('handle close')

  // const renderModalView = () => {
  //   switch (tournament.attributes.participant_type) {
  //     case 1:
  //       return <IndividualModalView open={open} tournament={tournament} userProfile={userProfile} handleClose={handleClose} />
  //     case 2:
  //       return <TeamModalView open={open} tournament={tournament} handleClose={handleClose} />
  //   }
  // }

  return (
    <Box>
      <Summary detail={tournament} />

      <IndividualEntryModal tournament={tournament} userProfile={userProfile} handleClose={handleClose} />
      <TeamEntryModal tournament={tournament} userProfile={userProfile} handleClose={handleClose} />
      <CloseRecruitmentModal tournament={tournament} handleClose={handleClose} />
      {/* {renderModalView()} */}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  actionButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 24,
  },
  actionButton: {
    width: theme.spacing(35),
  },
  description: {
    marginTop: 24,
    color: Colors.grey[300],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export default RecruitingAction
