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
  arena: LobbyDetail
}

const CancelDialog: React.FC<Props> = ({ arena, hashKey }) => {
  const [isCanceled, setCanceled] = useState(false)
  const { t } = useTranslation(['common'])
  const { meta, cancelTournament } = useCancelDialog()
  const confirm = useConfirm()

  useEffect(() => {
    if (arena && arena.attributes) {
      const _status = arena.attributes.status === LOBBY_STATUS.CANCELLED || arena.attributes.status === LOBBY_STATUS.ENDED
      setCanceled(_status)
    }
  }, [arena])

  return (
    <>
      <Box mt={3}>
        {!isCanceled && (
          <LinkButton
            onClick={() => {
              confirm({ ...LOBBY_DIALOGS.CANCEL_LOBBY })
                .then(() => {
                  hashKey && cancelTournament(hashKey)
                })
                .catch(() => {
                  /* ... */
                })
            }}
          >
            {t('common:tournament_cancel.confirm_cancel_btn')}
          </LinkButton>
        )}
      </Box>
      {meta.pending && <ESLoader open={meta.pending} />}
    </>
  )
}

export default CancelDialog
