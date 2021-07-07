import { Box, Typography } from '@material-ui/core'

interface ServerErrorProps {
  message: string
}

const ServerError: React.FC<ServerErrorProps> = ({ message }) => {
  return (
    <Box pb={8}>
      <Box pb={20 / 8} textAlign="center">
        <Typography color="secondary">{message}</Typography>
      </Box>
    </Box>
  )
}

export default ServerError
