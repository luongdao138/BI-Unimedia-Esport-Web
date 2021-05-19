import { Box, Theme } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'

export interface Props {
  onCancel: () => void
  onDone: () => void
}

export const FooterAction: React.FC<Props> = ({ onCancel, onDone }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])

  return (
    <Box className={classes.actionWrap}>
      <Box className={classes.actionButton}>
        <ButtonPrimary round gradient={false} onClick={onCancel}>
          {t('common:common.cancel')}
        </ButtonPrimary>
      </Box>
      <Box mr={2} />
      <Box className={classes.actionButton}>
        <ButtonPrimary round onClick={onDone}>
          {t('common:common.done')}
        </ButtonPrimary>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  actionWrap: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(11),
    display: 'flex',
    justifyContent: 'center',
    background: Colors.black,
    borderTop: '1px solid',
    borderTopColor: Colors.white_opacity[30],
  },
  actionButton: {
    maxWidth: '100%',
    width: 220,
  },
}))
