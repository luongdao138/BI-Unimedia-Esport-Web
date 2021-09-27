import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import { use100vh } from 'react-div-100vh'
import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react'
import { Colors } from '@theme/colors'

interface StickyFooterProps {
  primaryButton?: JSX.Element
  secondaryButton?: JSX.Element
  children: ReactNode
  headerHeight?: number
  hideFooter: boolean
}

function StickyFooter({ primaryButton, secondaryButton, children, headerHeight = 60, hideFooter = true }: StickyFooterProps) {
  const classes = useStyles()
  const height = use100vh()
  return (
    <div style={{ height: `calc(${height}px - ${headerHeight}px)`, overflowY: 'auto', paddingBottom: 60 }} className={classes.scroll}>
      {children}
      {hideFooter ? null : (
        <Box className={classes.actionButtonContainer}>
          {secondaryButton ? <Box className={classes.actionButton}>{secondaryButton}</Box> : null}
          <Box className={classes.actionButton}>{primaryButton}</Box>
        </Box>
      )}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  scroll: {
    scrollbarColor: '#000 transparent',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: 5,
      opacity: 1,
      padding: 2,
    },
    '&::-webkit-scrollbar-track': {
      paddingLeft: 1,
      background: 'rgba(0,0,0,0.3)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#000',
      borderRadius: 6,
    },
  },
  actionButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    backgroundColor: theme.palette.common.black,
    borderTop: `1px solid ${Colors.white_opacity['15']}`,
  },
  actionButton: {
    width: theme.spacing(35),
    margin: 8,
  },
}))

export default StickyFooter
