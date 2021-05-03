import { Box } from '@material-ui/core'
import ESButton from '@components/Button'

const Atoms: React.FC = () => {
  return (
    <Box margin={4}>
      <ESButton variant="contained" color="primary" size="large" round gradient>
        Primary
      </ESButton>
      <ESButton
        variant="contained"
        color="primary"
        size="large"
        round
        gradient
        disabled
      >
        Disabled
      </ESButton>
      <ESButton variant="contained" color="primary">
        Primary
      </ESButton>
      <ESButton variant="contained" color="primary" disabled>
        Disabled
      </ESButton>
      <ESButton variant="outlined" round>
        Outlined
      </ESButton>
      <ESButton variant="outlined" round disabled>
        disabled
      </ESButton>
      <ESButton variant="outlined">Outlined</ESButton>
      <ESButton variant="outlined" disabled>
        disabled
      </ESButton>
    </Box>
  )
}

export default Atoms
