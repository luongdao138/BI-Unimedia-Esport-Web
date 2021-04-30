import { Button, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles(() => ({
  // MuiButton-containedPrimary MuiButton-containedSizeSmall
  containedPrimary: {
    // background: theme.palette.primary,
    '& .MuiButton-containedSizeSmall': {
      color: 'red',
    },
  },
}))

const Atoms: React.FC = () => {
  const classes = useStyles()
  return (
    <Box margin={4}>
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Button variant="contained" color="primary" disabled>
        Primary Disabled
      </Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="outlined" size="small" classes={classes}>
        Outlined Small
      </Button>
      <Button
        variant="contained"
        size="small"
        color="primary"
        classes={classes}
      >
        Outlined Small
      </Button>
    </Box>
  )
}

export default Atoms
