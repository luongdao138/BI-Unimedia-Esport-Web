import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box } from '@material-ui/core'
import ESLoader from '@components/FullScreenLoader'
import useCancelDialog from './useCancelDialog'
import LinkButton from '@components/LinkButton'
import { LobbyDetail } from '@services/lobby.service'
import { LOBBY_STATUS, LOBBY_DIALOGS } from '@constants/lobby.constants'
import { useConfirm } from '@components/Confirm'

interface Props {
  hashKey: string
  lobby: LobbyDetail
}

const CancelDialog: React.FC<Props> = ({ lobby, hashKey }) => {
  const [isCanceled, setCanceled] = useState(false)
  const { t } = useTranslation(['common'])
  const { meta, cancelLobby } = useCancelDialog()
  const confirm = useConfirm()

  useEffect(() => {
    if (lobby && lobby.attributes) {
      const _status = lobby.attributes.status === LOBBY_STATUS.CANCELLED || lobby.attributes.status === LOBBY_STATUS.ENDED
      setCanceled(_status)
    }
  }, [lobby])

  return (
    <>
      <Box mt={3}>
        {!isCanceled && (
          <LinkButton
            onClick={() => {
              confirm({ ...LOBBY_DIALOGS.CANCEL_LOBBY })
                .then(() => {
                  hashKey && cancelLobby(hashKey)
                })
                .catch(() => {
                  /* ... */
                })
            }}
          >
            {t('common:lobby.cancel')}
          </LinkButton>
        )}
      </Box>
      {meta.pending && <ESLoader open={meta.pending} />}
    </>
  )
}

export default CancelDialog
