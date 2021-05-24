import { Theme, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import ButtonPrimary from '@components/ButtonPrimary'

export type Props = {
  disabled: boolean
  title: string
  onClick: () => void
}

const ESStickyFooter: React.FC<Props> = ({ disabled, title, onClick }) => {
  const classes = useStyles()

  return (
    <Box className={classes.stickyFooter}>
      <Box className={classes.nextBtnHolder}>
        <Box maxWidth={280} className={classes.buttonContainer}>
          <ButtonPrimary type="submit" round fullWidth disabled={disabled} onClick={onClick}>
            {title}
          </ButtonPrimary>
        </Box>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  stickyFooter: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    background: Colors.black,
    borderTop: `1px solid #ffffff30`,
  },
  nextBtnHolder: {
    display: 'flex',
    marginBottom: theme.spacing(11),
    marginTop: theme.spacing(3),
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    margin: '0 auto',
  },
}))

ESStickyFooter.defaultProps = {
  disabled: false,
  title: '',
}

export default ESStickyFooter
