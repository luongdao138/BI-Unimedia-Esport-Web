import { Box, makeStyles, Theme, Typography } from '@material-ui/core'
import { LobbyDetail } from '@services/lobby.service'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import { LOBBY_STATUS } from '@constants/lobby.constants'

interface Props {
  lobby: LobbyDetail
}

const InfoText: React.FC<Props> = ({ lobby }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const { status, is_freezed } = lobby.attributes

  const isAdminParticipated = false // TODO

  // admin participated? or not
  const calcText = () => {
    if (!is_freezed) return t('common:arena.not_held')
    if (status === LOBBY_STATUS.IN_PROGRESS && isAdminParticipated) return t('common:lobby.detail.admin_participated')
    if (status === LOBBY_STATUS.IN_PROGRESS && !isAdminParticipated) return t('common:lobby.detail.admin_not_participated')
    if (status === LOBBY_STATUS.ENDED) return t('common:lobby.detail.ended')
  }

  return (
    <Box display="flex" flexDirection="row">
      <Typography className={`${classes.roundInfoText} ${!is_freezed && classes.yellow}`}>{calcText()}</Typography>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  roundInfoText: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  yellow: {
    color: Colors.yellow,
  },
}))

export default InfoText
