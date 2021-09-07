import { createRef } from 'react'
import { Theme, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import ButtonPrimary from '@components/ButtonPrimary'
import { useRect } from '@utils/hooks/useRect'

export type Props = {
  disabled: boolean
  title?: string
  onClick?: () => void
  show?: boolean
  content?: JSX.Element
  style?: {
    position?: string
  }
}

const contentRef = createRef<HTMLDivElement>()

const ESContentFooter: React.FC<Props> = ({ disabled, title, onClick, children, show, content }) => {
  const classes = useStyles()
  const contentRect = useRect(contentRef)
  const bottomHeight = contentRect.height

  return (
    <Box className={`${classes.wrapper}`} style={{ paddingBottom: bottomHeight }}>
      {children}
      {show && (
        <div className={classes.stickyFooter} ref={contentRef}>
          <Box className={`${classes.nextBtnHolder}`}>
            {content ? (
              content
            ) : (
              <Box maxWidth={280} className={classes.buttonContainer}>
                <ButtonPrimary type="submit" round fullWidth disabled={disabled} onClick={() => onClick && onClick()}>
                  {title || ''}
                </ButtonPrimary>
              </Box>
            )}
          </Box>
        </div>
      )}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    marginBottom: 0,
    height: '100%',
    position: 'relative',
  },
  stickyFooter: {
    position: 'absolute',
    width: '100%',
    background: Colors.black,
    borderTop: `1px solid`,
    borderTopColor: Colors.text['300'],
  },
  nextBtnHolder: {
    display: 'flex',
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    margin: '0 auto',
  },
}))

ESContentFooter.defaultProps = {
  disabled: false,
  title: '',
  show: true,
}

export default ESContentFooter
