import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

const useScrollClass = (): string => {
  const { scroll } = useStyles()
  return scroll
}

export default useScrollClass

const useStyles = makeStyles(() => ({
  scroll: {
    overflow: 'hidden',
    overflowY: 'auto',
    scrollbarColor: 'rgba(127,127,127,0.9)',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: 5,
      opacity: 1,
      padding: 2,
    },
    '&::-webkit-scrollbar-track': {
      paddingLeft: 1,
      background: Colors.grey['100'],
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(127,127,127,0.9)',
      borderRadius: 6,
    },
  },
}))
