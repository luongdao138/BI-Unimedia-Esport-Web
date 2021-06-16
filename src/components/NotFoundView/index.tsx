import { Box, Typography } from '@material-ui/core'
import { NotFoundType } from '@store/common/actions/types'

type Props = {
  notFoundType: NotFoundType
  topSpace?: boolean
}

const NotFoundView: React.FC<Props> = ({ notFoundType, topSpace }) => {
  const getNotFoundText = () => {
    switch (notFoundType) {
      case NotFoundType.ARENA_NOT_FOUND:
        return 'このページは無効化されました。'
      default:
        return 'Not Found'
    }
  }
  const isTopSpace = topSpace === true
  return (
    <Box className="content">
      <Box style={{ paddingTop: isTopSpace ? 106 : 32, textAlign: 'center' }}>
        <Typography style={{ color: '#ffffff9c' }}>{getNotFoundText()}</Typography>
      </Box>
    </Box>
  )
}

export default NotFoundView
