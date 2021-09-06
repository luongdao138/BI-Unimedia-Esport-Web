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
  noScroll?: boolean
  content?: JSX.Element
  noSpacing?: boolean
  noBottomSpace?: boolean
  classes?: {
    nextBtnHolder?: string
  }
  style?: {
    position?: string
  }
}

const contentRef = createRef<HTMLDivElement>()

const ESContentFooter: React.FC<Props> = ({
  disabled,
  title,
  onClick,
  children,
  show,
  noScroll,
  content,
  noSpacing,
  noBottomSpace,
  classes: classesOverrides,
}) => {
  const classes = useStyles()
  const isNoBottmSpace = noBottomSpace === true
  const contentRect = useRect(contentRef)
  const bottomHeight = contentRect.height

  return (
    <Box className={`${classes.wrapper} ${!noScroll && classes.scroll}`} style={{ paddingBottom: bottomHeight }}>
      {children}
      {show && (
        <div className={classes.stickyFooter} ref={contentRef}>
          <Box
            className={`${isNoBottmSpace ? classes.nextBtnHolderNoSpace : classes.nextBtnHolder} ${noSpacing && classes.noSpacing} ${
              classesOverrides?.nextBtnHolder ? classesOverrides?.nextBtnHolder : ''
            }`}
          >
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
  scroll: {
    overflow: 'scroll',
  },
  wrapper: {
    marginBottom: 0,
    height: '100%',
  },
  stickyFooter: {
    position: 'absolute',
    left: 0,
    bottom: 0,
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
  nextBtnHolderNoSpace: {
    display: 'flex',
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(3),
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    margin: '0 auto',
  },
  [theme.breakpoints.down('md')]: {
    nextBtnHolder: {
      marginBottom: theme.spacing(5),
    },
  },
  noSpacing: {
    marginBottom: 0,
    marginTop: 0,
  },
}))

ESContentFooter.defaultProps = {
  disabled: false,
  title: '',
  show: true,
  noScroll: false,
}

export default ESContentFooter
