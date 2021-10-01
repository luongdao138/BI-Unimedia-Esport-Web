import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import { use100vh } from 'react-div-100vh'
import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react'
import { Colors } from '@theme/colors'
import { ButtonGroup } from '@containers/arena/Detail/Partials/BRHeaderContent'

interface StickyFooterProps {
  primaryButton?: JSX.Element
  secondaryButton?: JSX.Element
  children: ReactNode
  headerHeight?: number
  hideFooter: boolean
}

const StickyFooter: React.FC<StickyFooterProps> = ({ primaryButton, secondaryButton, children, headerHeight = 60, hideFooter = true }) => {
  const classes = useStyles()
  const height = use100vh()
  return (
    <div style={{ height: `calc(${height}px - ${headerHeight}px)`, overflowY: 'auto', paddingBottom: 60 }} className={classes.scroll}>
      {children}
      {hideFooter ? null : (
        <Box className={classes.actionButtonContainer}>
          <ButtonGroup size="large">
            {secondaryButton ? <Box>{secondaryButton}</Box> : null}
            <Box>{primaryButton}</Box>
          </ButtonGroup>
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
    width: '100%',
  },
}))

export default StickyFooter
