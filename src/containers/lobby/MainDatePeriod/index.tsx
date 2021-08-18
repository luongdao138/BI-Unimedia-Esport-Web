import React from 'react'
import { LobbyDetail } from '@services/lobby.service'
import { Box } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'

interface Props {
  lobby: LobbyDetail
}

const SubActionButtons: React.FC<Props> = (_) => {
  // const classes = useStyles()
  // const { t } = useTranslation(['common'])

  return <Box></Box>
}

// const useStyles = makeStyles((theme: Theme) => ({}))

export default SubActionButtons
