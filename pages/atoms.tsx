import { Box } from '@material-ui/core'
import ESButton from '@components/Button'

const Atoms: React.FC = () => {
  return (
    <Box margin={4}>
      <ESButton variant="contained">Primary</ESButton>
      <ESButton variant="contained" disabled>
        Primary Disabled
      </ESButton>
      <ESButton variant="outlined">Outlined</ESButton>
    </Box>
  )
}

export default Atoms
