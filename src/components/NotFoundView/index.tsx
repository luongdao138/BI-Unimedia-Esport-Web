import { Box, Typography } from '@material-ui/core'
import { NotFoundType } from '@store/common/actions/types'
import { useTranslation } from 'react-i18next'

type Props = {
  notFoundType: NotFoundType
  topSpace?: boolean
}

const NotFoundView: React.FC<Props> = ({ notFoundType, topSpace }) => {
  const { t } = useTranslation(['common'])
  const getNotFoundText = () => {
    switch (notFoundType) {
      case NotFoundType.ARENA_NOT_FOUND:
        return t('common:arena.not_found')
      default:
        return ''
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
