import { Box, Typography } from '@material-ui/core'

interface ServerErrorProps {
  message: string
}

const ServerError: React.FC<ServerErrorProps> = ({ message }) => {
  return (
    <Box textAlign="center">
      <Typography color="secondary">{message}</Typography>
    </Box>
  )
}

export default ServerError
