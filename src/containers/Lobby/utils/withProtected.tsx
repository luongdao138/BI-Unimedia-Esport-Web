/* eslint-disable @typescript-eslint/ban-types */
import { ESRoutes } from '@constants/route.constants'
import { useAppSelector } from '@store/hooks'
import { useRouter } from 'next/router'
import React, { ComponentType, useState, useEffect } from 'react'
import useLobbyHelper from '@containers/Lobby/hooks/useLobbyHelper'
import lobbyStore from '@store/lobby'

const { selectors } = lobbyStore

export function withProtected<T extends object>(Component: ComponentType<T>): React.FC {
  const AppWithProtected: React.FC<T> = (props) => {
    const router = useRouter()
    const [render, setRender] = useState(false)
    const lobby = useAppSelector(selectors.getLobbyDetail)
    const { isEditable } = useLobbyHelper(lobby)

    useEffect(() => {
      if (lobby && router.asPath.endsWith('/edit') && router.query.hash_key) {
        if (isEditable) {
          setRender(true)
        } else {
          router.push(ESRoutes.LOBBY_DETAIL.replace(/:id/gi, String(router.query.hash_key)))
          setRender(false)
        }
      } else {
        setRender(true)
      }
    }, [router, isEditable])

    return render ? <Component {...props} /> : <></>
  }

  return AppWithProtected
}

export default withProtected
