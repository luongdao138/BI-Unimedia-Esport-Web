import { makeStyles } from '@material-ui/core/styles'
import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react'

interface StickyFooterProps {
  children: ReactNode
  height?: string
}

const ListContainer: React.FC<StickyFooterProps> = ({ height, children }) => {
  const classes = useStyles()
  return (
    <div style={{ height: height, overflowY: 'auto' }} className={classes.scroll}>
      {children}
    </div>
  )
}

const useStyles = makeStyles(() => ({
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
}))

export default ListContainer
