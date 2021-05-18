/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, makeStyles, Typography, Theme } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { TournamentDetail } from '@services/tournament.service'
import { useTranslation } from 'react-i18next'
import ESButton from '@components/Button'

interface Props {
  detail: TournamentDetail
  extended?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Summary: React.FC<Props> = ({ detail }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation(['common'])
  const classes = useStyles()

  const buildHeaderValue = () => {
    return `エントリー期間 2021年04月01日 - 2021年04月30日`
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography variant="body1">{buildHeaderValue()}</Typography>
      </Box>

      <Box className={classes.body}>
        <Box>
          <Typography>{'エントリー期間'}</Typography>
        </Box>
        <Box>
          <Typography>{' 2021年04月01日'}</Typography>
        </Box>

        <Box className={classes.actionButtonContainer}>
          <Box className={classes.actionButton}>
            <ESButton variant="outlined" fullWidth onClick={() => {}}>
              エントリーメンバー
            </ESButton>
          </Box>
          <Box className={classes.actionButton}>
            <ESButton variant="outlined" fullWidth onClick={() => {}}>
              グループチャット
            </ESButton>
          </Box>
          <Box className={classes.actionButton}>
            <ESButton variant="outlined" fullWidth onClick={() => {}}>
              対戦表
            </ESButton>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: '#FFFFFF0F',
    borderRadius: 4,
    padding: 6,
  },
  header: {
    backgroundColor: theme.palette.common.black,
    borderRadius: 4,
    height: 36,
    color: Colors.grey[300],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  actionButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionButton: {
    width: theme.spacing(20),
    margin: 8,
  },
}))

Summary.defaultProps = {
  extended: false,
}

export default Summary
